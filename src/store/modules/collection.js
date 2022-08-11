import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom, delay } from "rxjs/operators";
import { ofType } from "redux-observable";
import queryString from 'query-string';

import { API_HOST, getAuthUserInfo, removeAuthUserInfo } from '../../GameAPI';

const GET_QUERY_COLLECTION = "collections/GET_QUERY_COLLECTION";
const GET_QUERY_COLLECTION_SUCCESS = "collections/GET_QUERY_COLLECTION_SUCCESS";
const GET_QUERY_COLLECTION_FAILURE = "collections/GET_QUERY_COLLECTION_FAILURE";

const CHANGE_SORT_COLLECTION = "collections/CHANGE_SORT_COLLECTION";

export const getQueryCollection = (query) => ({
    type: GET_QUERY_COLLECTION,
    payload: {
        query
    }
});
  
export const getQueryCollectionSuccess = ({ ratings, query }) => ({
    type: GET_QUERY_COLLECTION_SUCCESS,
    payload: {
        ratings,
        query
    }
});
  
export const getQueryCollectionFailure = error => ({
    type: GET_QUERY_COLLECTION_FAILURE,
    payload: {
        error
    }
});

export const changeSortCollection = sort => ({
    type: CHANGE_SORT_COLLECTION,
    payload: {
        sort
    }
});

const getQueryCollectionEpic = (action$, state$) => {
    return action$.pipe(
        ofType(GET_QUERY_COLLECTION),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const { query } = action.payload.query;
            const userInfo = getAuthUserInfo();
            let header = { "Content-Type": "application/json" }
            if(userInfo) header = Object.assign(header, { Authorization: `token ${userInfo.token}` })
            return ajax
            .get(`${API_HOST}/ratings/game/?${queryString.stringify(query)}`, header)
            .pipe(
                map(response => {
                    const ratings = response.response;
                    return getQueryCollectionSuccess({ ratings, query });
                }),
                catchError(error =>
                    of({
                        type: GET_QUERY_COLLECTION_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const initialState = {
    sort: 0,
    ratings: [],
    error: {
        triggered: false,
        status: 200,
        message: ""
    },
    isLast: false,
    isLoading: false
};

export const collection = (state = initialState, action) => {
    if(action.payload) {
        if(action.payload.status === 401 && getAuthUserInfo())
            removeAuthUserInfo(); // 장시간 지난 상태로 경과되어 인증에러가 난 경우
    }

    switch (action.type) {
        case GET_QUERY_COLLECTION:
            return {
                ...state,
                isLoading: true
            };
        case GET_QUERY_COLLECTION_SUCCESS:
            return {
                ...state,
                ratings: action.payload.query.page > 1 ? state.ratings.concat(action.payload.ratings.results) : action.payload.ratings.results,
                isLoading: false
            };
        case GET_QUERY_COLLECTION_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error while loading! Please Try Again!"
                }
            };
        case CHANGE_SORT_COLLECTION:
            return {
                ...state,
                sort: action.payload.sort
            };
        default:
            return state;
    }
};

export const collectionEpics = {
    getQueryCollectionEpic
};