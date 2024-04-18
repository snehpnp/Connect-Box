import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_OPTION_SYMBOLS, GET_OPTION_ALL_ROUND_TOKEN, GET_SYMBOL_EXPRIY, GET_COMPANY_INFOS, GET_ALL_STRETGY_NAME_FOR_CLIENT } from "../../../Services/Subadmin/OptionChain.service";

export const Get_Option_Symbols = createAsyncThunk("get/option_symbols",
    async (data) => {
        try {
            const res = await GET_OPTION_SYMBOLS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_Option_All_Round_token = createAsyncThunk("get/all_round_token",
    async (data, token) => {
        try {
            const res = await GET_OPTION_ALL_ROUND_TOKEN(data, token);
            return await res;
        } catch (err) {
            throw err;
        }
    });

export const Get_Symbol_Expiry = createAsyncThunk("get/option_symbol_expiry",
    async (data) => {
        try {
            const res = await GET_SYMBOL_EXPRIY(data);
            return await res;
        }
        catch (err) {
            throw err
        }

    })

export const Get_Company_Infos = createAsyncThunk('company/get',
    async (data) => {
        try {
            const res = await GET_COMPANY_INFOS(data);
            return await res;
        }
        catch (err) {
            throw err
        }
    })

export const Get_All_Strategy_for_Client = createAsyncThunk('sub/strategy/getall',
    async (data) => {
        try {
            const res = await GET_ALL_STRETGY_NAME_FOR_CLIENT(data);
            return await res

        }
        catch (err) {
            throw err
        }

    })



const OptionChainSlice = createSlice({
    name: "OptionChainSlice",
    initialState: {
        isLoading: false,
        isError: false,
        get_option_symbols: null,
        get_option_all_token: null,
        get_symbol_expiry: null,
        get_company_infos: null,
        get_all_stretgy_name: null,



    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(Get_Option_Symbols.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Get_Option_Symbols.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_option_symbols = action.payload;
            })
            .addCase(Get_Option_Symbols.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(Get_Option_All_Round_token.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_option_all_token = action.payload;
            })
            .addCase(Get_Symbol_Expiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_symbol_expiry = action.payload;
            })
            .addCase(Get_Company_Infos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_company_infos = action.payload;
            })
            .addCase(Get_All_Strategy_for_Client.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_all_services_client = action.payload;
            })

    },
});

export default OptionChainSlice;
