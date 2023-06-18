import React, { createContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
export const RepoContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return {...state, isLoading: action.payload};
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case 'SET_SEARCH_QUERY':
            return {...state, searchQuery: action.payload};
        case 'SET_REPOS':
            return { ...state, repos: action.payload.items, totalRepos: action.payload.total_count };
        case 'SET_BOOKMARKS':
            return { ...state, bookmarks: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export const RepoProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
    const initialState = { repos: [], bookmarks, totalRepos: 0, currentPage: 1 };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        setBookmarks(state.bookmarks);
    }, [state.bookmarks, setBookmarks]);

    return (
        <RepoContext.Provider value={{ state, dispatch }}>
            {children}
        </RepoContext.Provider>
    );
};
