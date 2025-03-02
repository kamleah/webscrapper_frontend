import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    userURLS: [{ product_name: '', product_url: '' }],
    tabAccess: [
        {
            index: 0,
            access: true
        },
        {
            index: 1,
            access: false
        },
        {
            index: 2,
            access: false
        }
    ],
    tabProcessStarted: false,
    scrappedData: [],
    languages: [
        { id: 'spanish', label: 'Spanish' },
        { id: 'japanese', label: 'Japanese' },
        { id: 'french', label: 'French' },
        { id: 'german', label: 'German' },
    ],
    selectedLanguages: [],
    transformedContent: [],
    transformedContentResult: [],
    transformedContentId: undefined,
    scrapId: undefined,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload;
        },
        setUsedURLS: (state, action) => {
            state.userURLS = action.payload;
        },
        removeUsedURLS: (state, action) => {
            state.userURLS = [{ product_name: '', product_url: '' }];
        },
        setProcessToggle: (state, action) => {
            state.tabProcessStarted = action.payload;
        },
        setTabAccess: (state, action) => {
            const { index, access } = action.payload;
            state.tabAccess = state.tabAccess.map(tab =>
                tab.index === index ? { ...tab, access } : tab
            );
        },
        setScrappedData: (state, action) => {
            state.scrappedData = action.payload
        },
        setScrappedId: (state, action) => {
            state.scrapId = action.payload
        },
        toggleLanguage: (state, action) => {
            const languageId = action.payload;
            if (state.selectedLanguages.includes(languageId)) {
                state.selectedLanguages = state.selectedLanguages.filter(id => id !== languageId);
            } else {
                state.selectedLanguages.push(languageId);
            }
        },
        setTransformedContent: (state, action) => {
            state.transformedContent = action.payload;
        },
        setTransformedContentResult: (state, action) => {
            state.transformedContentResult = action.payload.result;
            state.transformedContentId = action.payload.id;
        },

        resetProcess: () => initialState,
    },
});

export const { setHistory, setUsedURLS, removeUsedURLS, setProcessToggle, setTabAccess, setScrappedData,setScrappedId, toggleLanguage, setTransformedContent, setTransformedContentResult, resetProcess } = historySlice.actions;
export default historySlice.reducer;
