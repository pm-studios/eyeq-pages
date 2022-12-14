import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom, delay } from "rxjs/operators";
import { ofType } from "redux-observable";
import queryString from 'query-string';

import { API_HOST, getAuthUserInfo, removeAuthUserInfo } from '../../GameAPI';

const GET_QUERY_RECOMMENDATION = "recommendation/GET_QUERY_RECOMMENDATION";
const GET_QUERY_RECOMMENDATION_SUCCESS = "recommendation/GET_QUERY_RECOMMENDATION_SUCCESS";
const GET_QUERY_RECOMMENDATION_FAILURE = "recommendation/GET_QUERY_RECOMMENDATION_FAILURE";

export const getQueryRecommendation = (query) => ({
    type: GET_QUERY_RECOMMENDATION,
    payload: {
        query
    }
});
  
export const getQueryRecommendationSuccess = ({ games, query }) => ({
    type: GET_QUERY_RECOMMENDATION_SUCCESS,
    payload: {
        games,
        query
    }
});
  
export const getQueryRecommendationFailure = error => ({
    type: GET_QUERY_RECOMMENDATION_FAILURE,
    payload: {
        error
    }
});

const getQueryRecommendationEpic = (action$, state$) => {
    return action$.pipe(
        ofType(GET_QUERY_RECOMMENDATION),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const { query } = action.payload.query;
            const userInfo = getAuthUserInfo();
            let header = { "Content-Type": "application/json" }
            if(userInfo) header = Object.assign(header, { Authorization: `token ${userInfo.token}` })
            return ajax
            .get(`${API_HOST}/games/?${queryString.stringify(query)}`, header)
            .pipe(
                map(response => {
                    const games = response.response;
                    return getQueryRecommendationSuccess({ games, query });
                }),
                catchError(error =>
                    of({
                        type: GET_QUERY_RECOMMENDATION_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const initialState = {
    games: [],
    error: {
        triggered: false,
        status: 200,
        message: ""
    },
    isLast: false,
    isLoading: false
};

export const recommendation = (state = initialState, action) => {
    if(action.payload) {
        if(action.payload.status === 401 && getAuthUserInfo())
            removeAuthUserInfo(); // ????????? ?????? ????????? ???????????? ??????????????? ??? ??????
    }

    switch (action.type) {
        case GET_QUERY_RECOMMENDATION:
            return {
                ...state,
                isLoading: true
            };
        case GET_QUERY_RECOMMENDATION_SUCCESS:
            return {
                ...state,
                games: action.payload.query.page > 1 ? state.games.concat(action.payload.games.results) : action.payload.games.results,
                isLoading: false
            };
        case GET_QUERY_RECOMMENDATION_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error while loading! Please Try Again!"
                }
            };
        default:
            return state;
    }
};

export const recommendationEpics = {
    getQueryRecommendationEpic,
};