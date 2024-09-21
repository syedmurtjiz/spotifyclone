import { reducerCases } from "../utils/Constants";

export const initialState = {
    token: null,
    playlists: [], 
    userInfo: null, 
    selectedPlaylistID: "75C9uOd3r9vXfj7LPHDkQd",
    selectedPlaylist: null,
    selectedPlaying: null, // Added this for the current playing state
};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case reducerCases.SET_PLAYLISTS:
            return {
                ...state,
                playlists: action.playlists,
            };
        case reducerCases.SET_USER:
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case reducerCases.SET_PLAYLIST:
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            };
            case reducerCases.SET_PLAYING:
                return {
                  ...state,
                  currentPlaying: action.currentPlaying,
                };
        default:
            return state;
    }
};

export default reducer;
