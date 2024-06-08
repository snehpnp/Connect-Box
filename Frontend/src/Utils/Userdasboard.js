import axios from "axios";

export const dashboardData = async (UserDetails) => {
    const broker_id = UserDetails.broker;

    if (broker_id === "2" || broker_id === 2) {
        const config1 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/limits/getRmsLimits',
            headers: {
                'Authorization': `Bearer ${UserDetails.demat_userid} ${UserDetails.access_token}`,
                'Content-Type': 'application/json',
            },
        };

        const config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/positionAndHoldings/positionBook',
            headers: {
                'Authorization': `Bearer ${UserDetails.demat_userid} ${UserDetails.access_token}`,
                'Content-Type': 'application/json',
            },
            data: {
                "ret": "DAY"
            }
        };

        try {
            // First API call
            const response1 = await axios(config1);
            if (response1.data[0]?.stat !== "Ok") {
                return null;
            }

            let unrealisedProfitLossSum = 0;
            let realisedProfitLossSum = 0;

            // Second API call
            const response2 = await axios(config2);
            if (response2.data.stat === "Ok") {
                unrealisedProfitLossSum = response2.data.reduce((sum, item) => sum + parseFloat(item.unrealisedprofitloss), 0);
                realisedProfitLossSum = response2.data.reduce((sum, item) => sum + parseFloat(item.realisedprofitloss), 0);
            }

            // Combine results
            return {
                limitsData: response1.data[0].net,
                positionData: response2.data || [],
                unrealisedProfitLossSum: (unrealisedProfitLossSum + realisedProfitLossSum) || 0,
            };
        } catch (error) {
            console.error("Error:", error);
            throw error; // Throw the error to be caught by the calling function
        }
    } else if (broker_id === "12" || broker_id === 12) {
        // Logic for broker 12
    }

    // Return null if broker_id is not handled
    return null;
};
