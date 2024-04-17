import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
    getAllServices,
    getCatogries,
    getexpirymanualtrade,
    getAllStrikePriceApi,
    getStrategyData

  } from "../../../ReduxStore/Slice/Comman/Makecall/make";





const Makecall = () => {
    const dispatch = useDispatch();


    const [ForDisabledSubmit, SetForDisabledSubmit] = useState(false)
   
  const [AllServices, setAllServices] = useState({ loading: true,data: []});
  const [CatagoryData, setCatagoryData] = useState({ loading: true, data: []});
  const [expirydateSelect, setExpirydateSelect] = useState({ loading: true, data: []});
  const [strikePriceAll, setStrikePriceAll] = useState({ loading: true, data: []});
  const [strategyDataAll, setStrategyDataAll] = useState({ loading: true, data: []});
  
  const [selectStrategy, setSelectStrategy] = useState("");
  
  const [strikePrice, setStrikePrice] = useState('')
  const [strikePriceErr, setStrikePriceErr] = useState('')

  const [optionType, setOptionType] = useState('')
  const [optionTypeErr, setOptionTypeErr] = useState('')


  const [expiryOnChange, setExpiryOnChange] = useState('');
  const [showstrikePrice, setShowstrikePrice] = useState(0)

  const [selectCatagoryid, SetSelectCatagoryId] = useState('')
  const [scriptSegment, SetScriptSegment] = useState('')
  const [selectCatagoryidSegment, SetSelectCatagorySegment] = useState('')
  
  const [scriptname, SetScriptname] = useState('')
  const [scriptnameErr, SetScriptnameErr] = useState('')

  const [tradeType, setTradeType] = useState('LE')
  const [tradeTypeErr, setTradeTypeErr] = useState('')
  const [changeDropdown, setChangeDropdown] = useState(0)



  const [markettime, setMarkettime] = useState("1")
  const [EntryPriceBA, SetEntryPriceBA] = useState('at')
  const [showmarkettime, setShowMarkettime] = useState(1)
  const [showhideAtBelow, setShowhideAtBelow] = useState(0)

  const [EntryPrice, SetEntryPrice] = useState('')
  const [EntryPriceErr, SetEntryPriceErr] = useState('')
  const [EntryPriceBAErr, SetEntryPriceBAErr] = useState('')
  const [EntryPriceRange_one, SetEntryPriceRange_one] = useState('')
  const [EntryPriceRange_oneErr, SetEntryPriceRange_oneErr] = useState('')
  const [EntryPriceRange_two, SetEntryPriceRange_two] = useState('')
  const [EntryPriceRange_twoErr, SetEntryPriceRange_twoErr] = useState('')

  const [IntradayDelivery, setIntradayDelivery] = useState("1")

  const [selectedTimeExit, setselectedTimeExit] = useState('');
  const [selectedTimeNoTrade, setselectedTimeNoTrade] = useState('');

  const [showhideTargetStoploss, setShowhideTargetStoploss] = useState(0)
  const [WiseTypeDropdown, setWiseTypeDropdown] = useState("")

  const [target1, setTarget1] = useState(0)
  const [stoploss, setStopLoss] = useState(0)
  const [targetStoplossDropdown, setTargetStoplossDropdown] = useState('')
  const [target1Err, setTarget1Err] = useState('')
  const [stoplossErr, setStopLossErr] = useState('')


  const handleTimeChangeExit = (event) => {
    setselectedTimeExit(event.target.value);
  };

  const handleTimeChangeNoTrade = (event) => {
    setselectedTimeNoTrade(event.target.value);
  };

 

console.log(

 " scriptSegment " , scriptSegment ,  "\n",
 " scriptname " , scriptname , "\n",
 " expiryOnChange " , expiryOnChange , "\n",
 " strikePrice " , strikePrice , "\n",
 " optionType " , optionType , "\n",
 " selectStrategy " , selectStrategy , "\n",
 " tradeType " , tradeType, "\n",
 " markettime " , markettime, "\n",
 " EntryPrice " , EntryPrice, "\n",
 " EntryPriceRange_one " , EntryPriceRange_one, "\n",
 " EntryPriceRange_two " , EntryPriceRange_two, "\n",
 " EntryPriceBA " , EntryPriceBA, "\n",
 " IntradayDelivery " , IntradayDelivery, "\n",
 " selectedTimeExit " , selectedTimeExit, "\n",
 " selectedTimeNoTrade " , selectedTimeNoTrade, "\n",
 " WiseTypeDropdown " , WiseTypeDropdown, "\n",
 " target1 " , target1, "\n",
 " stoploss " , stoploss, "\n",
 " targetStoplossDropdown " , targetStoplossDropdown, "\n",
 

)
  

 
  const UserLocalDetails = JSON.parse(localStorage.getItem("user_details"));
  
//  console.log("get user details ",UserLocalDetails.token)
 
 // console.log("CatagoryData ",CatagoryData.data)

 const getAllSteategyApiFun = async () => {
    await dispatch(getStrategyData(
        {
        req :{

        user_id: UserLocalDetails.user_id
        },
       
        token:UserLocalDetails.token}
       ))
      .unwrap()
      .then((response) => {

        console.log("response ",response.data)
        if (response.status) {
            setStrategyDataAll({
            loading: false,
            data: response.data,
          });
        }else{
            setStrategyDataAll({
                loading: false,
                data: [],
              });

        }
      });
  };

   
      const getCatogriesFun = async () => {
        await dispatch(getCatogries(
            {
            req :{

             id: "1"
            },
           
            token:UserLocalDetails.token}
           ))
          .unwrap()
          .then((response) => {
    
            console.log("response ",response.data)
            if (response.status) {
              setCatagoryData({
                loading: false,
                data: response.data,
              });
            }
          });
      };


      useEffect(() => {
        getCatogriesFun();
        getAllSteategyApiFun()
      }, []);

      
      const getAllServicesFun = async () => {

           

            await dispatch(getAllServices(
                {
                req :
                {
                    category_id: selectCatagoryid
                },
            
                token:UserLocalDetails.token}
            ))
            .unwrap()
            .then((response) => {

                if (response.status) {
                setAllServices({
                    loading: false,
                    data: response.data,
                });
                } else {
                setAllServices({
                    loading: false,
                    data: [],
                });
                }
            });
      };



  useEffect(() => {

   
    setAllServices({loading: false,data: []});
    getAllServicesFun()
    console.log("CatagoryData.data ",CatagoryData.data)
   
    console.log("selectCatagoryid ",selectCatagoryid)
    
    let datra = CatagoryData.data && CatagoryData.data.filter((x) => {
        if ((selectCatagoryid) == x._id) {
          return x
        }
      })
  
    //  console.log("datra ---- ",datra)
    // let datra = scriptdata && scriptdata.filter((x) => {
    //   if ((selectCatagoryid) == parseInt(x.id)) {
    //     return x
    //   }
    // })


    // let stExhange = scriptdata && scriptdata.filter((x) => {
    //   if (onChangeScriptname.includes(x.name)) {
    //     return x
    //   }
    // })

    if(datra.length > 0){
        SetScriptSegment(datra && datra[0].segment)
    }
    // SetScriptExchangeValue(datra && datra[0].name)
    // console.log("datra", datra && datra[0].segment);


  }, [selectCatagoryid])


const selectCatagoryId = (e) => {
    setStrikePrice('');
    setOptionType('');
    setExpiryOnChange('')
       
    //     alert(e.target.value)
    //    return 
    
    setShowstrikePrice(0);
    // previousToken.current = "";
    // liveToken.current = "";
    // setLiveprice("");
    setExpirydateSelect({loading: false,data: []});
    setStrikePriceAll({loading: false,data: []});
    SetSelectCatagoryId(e.target.value);
   
    }



    const selectscriptname = (e) => {
        setStrikePrice('');
        setOptionType('');
        setExpiryOnChange('')
        setShowstrikePrice(0);
        // previousToken.current = "";
       //  liveToken.current = "";
       //  setLiveprice("");
       
        setExpirydateSelect({loading: false,data: []});
        setStrikePriceAll({loading: false,data: []});
        SetScriptname(e.target.value);
    //     if(selectCatagoryid == '24'){
    //     gettoken(selectCatagoryid,e.target.value);
    //    }
    
      }





   const getExpirybackend = async (selectCatagoryid,symbol) => {
     
     if(selectCatagoryid != '' && symbol != ''){
        console.log("selectCatagoryid ",selectCatagoryid)
        console.log("symbol ",symbol)

       
        await dispatch(getexpirymanualtrade(
            {
            req :
            {
                category_id: selectCatagoryid,
                symbol: symbol
            },
        
            token:UserLocalDetails.token
           }
        ))
        .unwrap()
        .then((response) => {
            
            if (response.status) {
                setExpirydateSelect({
                loading: false,
                data: response.data,
            });
            } else {
                setExpirydateSelect({
                loading: false,
                data: [],
            });
            }
        });






     }
      
        

    // const data = { categorie_id: selectCatagoryid , symbol : symbol }
    // const response = await getexpirymanualtrade(data);
    // setExpirydateSelect(response.data.data);

    }  



   
    useEffect(() => {
        getExpirybackend(selectCatagoryid,scriptname)
    }, [scriptname]);
       
   
    const selectExpiryFun = (e) => {
        setStrikePrice('');
        setOptionType('');
        setStrikePriceAll([]);
      //  alert(scriptSegment)
      //  setShowstrikePrice(0);
         
        setExpiryOnChange(e.target.value)
        

            if(scriptSegment ==  'F'){
           // gettoken(selectCatagoryid,scriptname,e.target.value,scriptSegment);
            }
            else if(scriptSegment ==  'MF'){

             // gettoken(selectCatagoryid,scriptname,e.target.value,scriptSegment);
              }
            else if(scriptSegment ==  'cF'){

           //   gettoken(selectCatagoryid,scriptname,e.target.value,scriptSegment);
              }
            else if(scriptSegment ==  'O'){

              setShowstrikePrice(1);
              getAllStrikePrice(selectCatagoryid,scriptname,e.target.value,scriptSegment)
            }
            else if(scriptSegment ==  'MO'){

              setShowstrikePrice(1);
              getAllStrikePrice(selectCatagoryid,scriptname,e.target.value,scriptSegment)
            }
            else if(scriptSegment ==  'CO'){

              setShowstrikePrice(1);
              getAllStrikePrice(selectCatagoryid,scriptname,e.target.value,scriptSegment)
            }

        
    } 
    
    

    const getAllStrikePrice = async (selectCatagoryid,symbol,expiry,segment) => {

       
        console.log("selectCatagoryid ",selectCatagoryid)
        console.log("symbol ",symbol)
        console.log("expiry ",expiry)
        console.log("segment ",segment)
        



     
    //     const data = { categorie_id: selectCatagoryid , symbol : symbol ,expiry : expiry ,segment : segment}
    //     const response = await getAllStrikePriceApi(data);
    //     console.log("response strike price -",response);
    //    setStrikePriceAll(response.data.data);

    await dispatch(getAllStrikePriceApi(
        {
        req :
        {
            category_id: selectCatagoryid,
            symbol: symbol,
            expiry: expiry,
            segment: segment
        },
    
        token:UserLocalDetails.token
       }
    ))
    .unwrap()
    .then((response) => {
        
        if (response.status) {
            setStrikePriceAll({
            loading: false,
            data: response.data,
        });
        } else {
            setStrikePriceAll({
            loading: false,
            data: [],
        });
        }
    });



 }


 const selectStrikePrice = (e) => {
    if(e.target.value != ""){
      setStrikePrice(e.target.value)
      if(optionType != ''){
        if(selectCatagoryid == '26'){
        let segment = 'O' 
      //  gettoken(selectCatagoryid,scriptname,expiryOnChange,segment,e.target.value,optionType);
        }
       else if(selectCatagoryid == '35'){
          let segment = 'MO' 
        //  gettoken(selectCatagoryid,scriptname,expiryOnChange,segment,e.target.value,optionType);
          }
        else if(selectCatagoryid == '36'){
            let segment = 'CO' 
           // gettoken(selectCatagoryid,scriptname,expiryOnChange,segment,e.target.value,optionType);
         }
      }

    }else{
      setStrikePrice('')
      setOptionType('')
    }
   
  }
       
   
  const selectOptionType = (e) => {
     
    if(strikePrice == ''){
     alert('please alert select strike price');
     return
    }
    setOptionType(e.target.value);
    if(selectCatagoryid == '26'){
      let segment = 'O' 
     // gettoken(selectCatagoryid,scriptname,expiryOnChange,segment,strikePrice,e.target.value);
      }
     else if(selectCatagoryid == '35'){
        let segment = 'MO' 
        //gettoken(selectCatagoryid,scriptname,expiryOnChange,segment,strikePrice,e.target.value);
        }
      else if(selectCatagoryid == '36'){
          let segment = 'CO' 
        //  gettoken(selectCatagoryid,scriptname,expiryOnChange,segment,strikePrice,e.target.value);
       }
}



const dropdownSelect = (num) => {
    if (num == "1") {
      return setChangeDropdown(1)
    } else if (num == "0") {
      return setChangeDropdown(0)
    }
  }


  
const selectMarkettime = (e) => {
    if(e.target.value == "2"){
      if(EntryPriceBA == 'at'){
        SetEntryPriceBA('above')
      }else{
        SetEntryPriceBA('above')
      }
      setShowMarkettime(0)
    }else{
      setShowMarkettime(1)
      SetEntryPriceBA('at')
    }
    setMarkettime(e.target.value)
  }

  const selectAtAboveBelow = (e) => {
   
    if(e.target.value =='range'){
    setShowhideAtBelow(1)
    SetEntryPriceBA(e.target.value);
    }else{
     setShowhideAtBelow(0)
     SetEntryPriceBA(e.target.value);
    }
  
  }


  const selectWiseTypeDropdown = (e) => {
    if(e.target.value == ''){
     setShowhideTargetStoploss(0)
     setWiseTypeDropdown(e.target.value)
    }else{
     setShowhideTargetStoploss(1)
     setWiseTypeDropdown(e.target.value)
    }
   
   }

   const selectTargetStoplossDropdown =(e) => {
    setTargetStoplossDropdown(e.target.value)
  }


  const GenerateMakeCall = async (e) => {

    e.preventDefault();
    alert("Done")
  }




    return (
        <div>
            <div className="content container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                            <h5 className="card-title mb-0 w-auto">

                                <i className="fas fa-money-bill-wave pe-2" />
                                Make Call
                            </h5>
                            <div className="pay-btn text-end w-auto" />
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Script Type * </label>


                                                        <select className="form-select" onChange={(e) => {
                                                        
                                                        selectCatagoryId(e);
                                                       // SetonChangeScriptname(e.target.innerText)
                                                       // setScriptDataErr('')
                                                         SetScriptname("")
                                                       // SetForDisabledSubmit(false)
                                                        }}>
                                                            <option name="none" disabled="">Select Script Type</option>

                                                            {CatagoryData.data && CatagoryData.data?.map((x, index) => {

                                                            if (x.segment !== "FO") {
                                                                return <option key={x._id} name={x.segment} value={x._id}>{x.name}</option>
                                                            }     
                                                            

                                                            })}
                                                            
                                                        </select>


                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Script Name</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                             <select className="form-select" onChange={(e) => {        selectscriptname(e);
                                                              SetScriptnameErr(''); 
                                                            // selecttype(''); 
                                                             dropdownSelect("1") 
                                                            
                                                             }}
                                                                >

                                                                <option name="none" disabled="">Select Script Name</option>

                                                                {
                                                                AllServices.data && AllServices.data.map((x) => {
                                                                return <option value={x.name}>{x.name}</option>
                                                                })
                                                            }
                                                                </select>
                                                            </li>
                                                            <li>
                                                               
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Expiry Date</label>
                                                        <select className="form-select" name="expiry_date" onChange={(e) => { selectExpiryFun(e) }} selected>

                                                        
                                                        <option value="">Select Expiry Date</option>
                                                        {expirydateSelect.data && expirydateSelect.data?.map((sm, i) =>
                                                        <option value={sm.uniqueExpiryValues}>{sm.uniqueExpiryValues}</option>)}
                                                        </select>
                                                    </div>
                                                </div>

                                                 

                                                 {
                                                    showstrikePrice == 1 ?
                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Strike Price - -</label>
                                                        <select className="form-select" onChange={(e) => { selectStrikePrice(e); setStrikePriceErr('') }}>
                                                        <option selected value="">--Select strike price--</option>
                                                            {
                                                            strikePriceAll.data && strikePriceAll.data.map((x) => {
                                                                return <option value={x.strike}>{x.strike}</option>
                                                            })
                                                            }
                                                        </select>
                                                    </div>
                                                  </div>
                                                    : 
                                                    ""
                                                 }
                                               
                                               

                                               {
                                               strikePrice && showstrikePrice == 1 ? 
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Option-Type Call/Put -</label>
                                                        <select className="form-select" onChange={(e) => { selectOptionType(e) ;setOptionTypeErr(''); }}>
                                                        <option selected value="" >--Select--</option>
                                                        <option value="CE">CALL</option>
                                                        <option value="PE">PUT</option>
        
                                                        </select>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                               }

                                                


                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Select Strategy -</label>
                                                        <select className="form-select" onChange={(e) => setSelectStrategy(e.target.value)} name="strategyname">

                                                           <option value="">-- Select Strategy Tag--</option>
                                                        {strategyDataAll.data && strategyDataAll.data.map((sm, i) =>
                                                        <option value={sm.strategy_name}>{sm.strategy_name}</option>)}  


                                                        </select>
                                                    </div>
                                                </div>




                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Type -</label>
                                                        <select className="form-select" onChange={(e) => { setTradeType(e.target.value); setTradeTypeErr(''); dropdownSelect("0") }}>
                                          
                                                        <option selected={tradeType == "LE"} value="LE">Buy</option>
                                                        <option selected={tradeType == "SE"} value="SE">Sell</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Market Time -</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="form-select" onChange={(e) => { selectMarkettime(e) }}>
                                                 <option value="1" selected={markettime == "1"}>DAY</option>
                                                 <option value="2" selected={markettime == "2"}>AMO</option>
                                                                </select>
                                                            </li>
                                                            <li>
                                                               
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Entry Price :</label>
                                                        

                                                        {
                                                            showhideAtBelow == 0 ? 
                                                            
                                                            <input type="number" name="exampleFormControlInput1" className="form-control show_entry_price" onChange={(e) => {
                                                                SetEntryPrice(e.target.value);
                                                                SetEntryPriceErr('')
                                                                }} value={EntryPrice} />
                                                            
                                                            :

                                                            <>

                                                            <div className="row mt-2">
                                                            <div class="col-sm-6 col-lg-6">
                                                            <input type="number" name="exampleFormControlInput1" className="form-control"  onChange={(e) => {
                                                            SetEntryPriceRange_one(e.target.value);
                                                            SetEntryPriceRange_oneErr('')
                                                            }} value={EntryPriceRange_one} /> 
                                                            </div>
                                                            
                                                            <div class="col-sm-6 col-lg-6">
                                                            <input type="number" name="exampleFormControlInput1" className="form-control"  onChange={(e) => {
                                                            SetEntryPriceRange_two(e.target.value);
                                                            SetEntryPriceRange_twoErr('')
                                                            }} value={EntryPriceRange_two} />
                                                            </div>
                                                            </div>
                                                            
                                            
                                                            
                                                            </>



                                                        }
                                                        





                                                    </div>

                                                    <div className="row mt-2">

                                                        {
                                                            showmarkettime == 1 ? 
                                                            <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_check">
                                                                    <input
                                                                        id="at_check"
                                                                        type="radio"
                                                                        name="at_check"
                                                                        value="at" 
                                                                        checked={EntryPriceBA=='at'?true:false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    At
                                                                </label>
                                                            </div>
                                                        </div>
                                                            :
                                                            ""

                                                        }

                                                       
                                                        
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_above">
                                                                    <input
                                                                        id="at_above"
                                                                        type="radio"
                                                                        name="at_above"
                                                                        value="above"
                                                                        checked={EntryPriceBA=='above'?true:false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    Above
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_below">
                                                                    <input
                                                                        id="at_below"
                                                                        type="radio"
                                                                        name="at_below"
                                                                        value="below"
                                                                        checked={EntryPriceBA=='below'?true:false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    Below
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_range">
                                                                    <input
                                                                        id="at_range"
                                                                        type="radio"
                                                                        name="at_range"
                                                                        value="range"
                                                                        checked={EntryPriceBA=='range'?true:false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    Range
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-4">

                                                <div className="input-block mb-3">
                                                        <label>Intraday / Delivery -</label>
                                                        <select className="form-select" onChange={(e) => { setIntradayDelivery(e.target.value)}}>
                                                        <option  selected={IntradayDelivery == "1"} value="1">Intraday</option>
                                                        <option selected={IntradayDelivery == "2"} value="2">Delivery</option>
                                                        </select>
                                                    </div>

              
             
              </div> 

              {IntradayDelivery == "1" ? 
              
              EntryPriceBA == "at" ?   <>
              <div className="col-lg-4">
                <label for="exampleFormControlSelect1" > Exit Time  :  &nbsp; </label>
                 {/* <input type="text" className="form-control" onChange={(e) => { setStopLoss(e.target.value); setStopLossErr('') }} /> */}
                 <input type="time" id="appt" className="form-control" name="appt" 
                 min="09:15" 
                 max="15:15"
                 value={selectedTimeExit}
                 onChange={handleTimeChangeExit}/>
             
               </div> 

               <div className="col-lg-4 col-md-4 col-sm-12">
                
               </div>

              </>  :
               <>
                <div className="col-lg-4">
                <label for="exampleFormControlSelect1" > Exit Time  :  &nbsp; </label>
                 {/* <input type="text" className="form-control" onChange={(e) => { setStopLoss(e.target.value); setStopLossErr('') }} /> */}
                 <input type="time" id="appt" className="form-control" name="appt" 
                 min="09:15" 
                 max="15:15"
                 value={selectedTimeExit}
                 onChange={handleTimeChangeExit}/>
             
               </div>
 
 
              <div className="col-lg-4 col-md-4 col-sm-12">
                <label for="exampleFormControlSelect1" > No Trade Time : &nbsp; </label>
                 {/* <input type="text" className="form-control" onChange={(e) => { setStopLoss(e.target.value); setStopLossErr('') }} /> */}
                 
                 <input type="time" id="appt" className="form-control" name="appt"
                 min="09:15" 
                 max="15:15"
                 value={selectedTimeNoTrade}
                 onChange={handleTimeChangeNoTrade}/>
                 
              </div>
              </>
             
           : IntradayDelivery == "2" ? <>
             <div className="col-lg-4 col-md-4 col-sm-12">
               <label for="exampleFormControlSelect1" > No Trade Time : &nbsp; </label>
                {/* <input type="text" className="form-control" onChange={(e) => { setStopLoss(e.target.value); setStopLossErr('') }} /> */}
                
                <input type="time" id="appt" className="form-control" name="appt"
                min="09:15" 
                max="15:15"
                value={selectedTimeNoTrade}
                onChange={handleTimeChangeNoTrade}/>
                
             </div>
             
             <div className="col-lg-4 col-md-4 col-sm-12">
                
             </div>
             
             </> :
              ""
             
              }



                                                
                                                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                    <div className="input-block mb-3 ">
                                                        <label>Wise Type -</label>
                                                        <select className="form-select" onChange={(e) => { selectWiseTypeDropdown(e) }}>
                                                        <option selected value="">Select Wise Type</option>
                                                        <option  selected={WiseTypeDropdown == "1"} value="1">Percentage(%)</option>
                                                        <option selected={WiseTypeDropdown == "2"} value="2">Points</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                {
                                                    showhideTargetStoploss == 1 ? 
                                                     
                                                    <>
                                                      <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                    <div className="input-block mb-3">
                                                        <label>Target -</label>
                                                         
                                                        <input type="number" className="form-control" onChange={(e) => { setTarget1(e.target.value); setTarget1Err("") }} />
                                                     
                                                        {target1Err ? <p style={{ color: "#ff8888", fontSize: '10px' }}> *{target1Err}</p> : ''}
                                                    </div>
                                                </div>
                                              
                                                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                    <div className="input-block mb-3">
                                                        <label>Stop Loss  -</label>
                                                        <input type="number" className="form-control" onChange={(e) => { setStopLoss(e.target.value); setStopLossErr('') }} />
                                                       
                                                    </div>
                                                </div>
                                              
                                                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                    <div className="input-block mb-3">
                                                        <label>Taget/StopLoss Status - -</label>
                                                        <select className="form-select" aria-label="Default select example" onChange={(e) => { selectTargetStoplossDropdown(e);}}>
                                                        <option selected value=""> --select-- </option>
                                                        {target1 == 'not' || target1 == '' ? ""
                                                        :  
                                                        <>
                                                        <option value="1">Target</option>
                                                        </>
                                                        }

                                                        {stoploss == 'not' || stoploss == ''? ""
                                                        :
                                                        <>
                                                        <option value="2">stoploss</option>
                                                        </>
                                                        }
                                                    </select>
                                                    </div>
                                                </div>
                                                    </>
                                                    :
                                                    ""
                                                }

                                               




                                                <div className="preview-boxs mt-3">

                                                        <button type="submit" onClick={(e) => GenerateMakeCall(e)} disabled={ForDisabledSubmit} className="btn btn-primary">
                                                            Gnenerate
                                                        </button>
                                                   
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <div className="col-lg-12 col-md-12" data-aos="fade-right">

                            <ul className="nav nav-tabs nav-tabs-solid d-flex justify-content-center">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="#solid-tab1"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-solid fa-landmark pe-2"></i>
                                        Below
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#solid-tab2"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-solid fa-envelope pe-2"></i>
                                        Above
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#solid-tab3"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-regular fa-image pe-2"></i>
                                        Range
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <div className="col-lg-12 col-md-12" data-aos="fade-left">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane show active" id="solid-tab1">

                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i>Below</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    {/* <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#company">
                                                        Edit Customer Information
                                                    </button> */}
                                                </div>
                                            </div>


                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th className="no-sort">Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane" id="solid-tab2">
                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-envelope pe-2"></i>Above</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#email">
                                                        Edit Email Information
                                                    </button>
                                                </div>
                                            </div>


                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th className="no-sort">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane" id="solid-tab3">
                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto">  <i className="fa-regular fa-image pe-2"></i>Range</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    {/* <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#back">
                                                        Update Images
                                                    </button> */}
                                                </div>
                                            </div>

                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th>Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Makecall
