import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom, delay } from "rxjs/operators";
import { ofType } from "redux-observable";
import queryString from 'query-string';

import { API_HOST, getAuthUserInfo, removeAuthUserInfo } from '../../GameAPI';

const INITIALIZE_UPDATE = "games/INITIALIZE_UPDATE";

const GET_DETAIL_GAME = "games/GET_DETAIL_GAME";
const GET_DETAIL_GAME_SUCCESS = "games/GET_DETAIL_GAME_SUCCESS";
const GET_DETAIL_GAME_FAILURE = "games/GET_DETAIL_GAME_FAILURE";

const GET_QUERY_GAMES = "games/GET_QUERY_GAMES";
const GET_QUERY_GAMES_SUCCESS = "games/GET_QUERY_GAMES_SUCCESS";
const GET_QUERY_GAMES_FAILURE = "games/GET_QUERY_GAMES_FAILURE";

const CREATE_RATING = "games/CREATE_RATING";
const CREATE_RATING_SUCCESS = "games/CREATE_RATING_SUCCESS";
const CREATE_RATING_FAILURE = "games/CREATE_RATING_FAILURE";

const UPDATE_RATING = "games/UPDATE_RATING";
const UPDATE_RATING_SUCCESS = "games/UPDATE_RATING_SUCCESS";
const UPDATE_RATING_FAILURE = "games/UPDATE_RATING_FAILURE";

const CREATE_REVIEW = "games/CREATE_REVIEW";
const CREATE_REVIEW_SUCCESS = "games/CREATE_REVIEW_SUCCESS";
const CREATE_REVIEW_FAILURE = "games/CREATE_REVIEW_FAILURE";

const UPDATE_REVIEW = "games/UPDATE_REVIEW";
const UPDATE_REVIEW_SUCCESS = "games/UPDATE_REVIEW_SUCCESS";
const UPDATE_REVIEW_FAILURE = "games/UPDATE_REVIEW_FAILURE";

const CHANGE_SORT_GAMES = "games/CHANGE_SORT_GAMES";

export const initializeUpdate = () => ({
    type: INITIALIZE_UPDATE
  });
  
export const getDetailGame = slug => ({
    type: GET_DETAIL_GAME,
    payload: {
        slug
    }
});

export const getDetailGameSuccess = ({game}) => ({
    type: GET_DETAIL_GAME_SUCCESS,
    payload: {
        game
    }
});

export const getDetailGameFailure = error => ({
    type: GET_DETAIL_GAME_FAILURE,
    payload: {
        error
    }
});

export const getQueryGames = (query) => ({
    type: GET_QUERY_GAMES,
    payload: {
        query
    }
});
  
export const getQueryGamesSuccess = ({ games, query }) => ({
    type: GET_QUERY_GAMES_SUCCESS,
    payload: {
        games,
        query
    }
});
  
export const getQueryGamesFailure = error => ({
    type: GET_QUERY_GAMES_FAILURE,
    payload: {
        error
    }
});

export const createRating = ({slug, value}) => ({
    type: CREATE_RATING,
    payload: {
        slug,
        value
    }
});

export const createRatingSuccess = ({slug, id, value}) => ({
    type: CREATE_RATING_SUCCESS,
    payload: {
        slug,
        id,
        value
    }
});

export const createRatingFailure = error => ({
    type: CREATE_RATING_FAILURE,
    payload: {
        error
    }
});

export const updateRating = ({slug, id, value}) => ({
    type: UPDATE_RATING,
    payload: {
        slug,
        id,
        value
    }
});

export const updateRatingSuccess = ({slug, id, value}) => ({
    type: UPDATE_RATING_SUCCESS,
    payload: {
        slug,
        id,
        value
    }
});

export const updateRatingFailure = error => ({
    type: UPDATE_RATING_FAILURE,
    payload: {
        error
    }
});

export const createReview = ({slug, content}) => ({
    type: CREATE_REVIEW,
    payload: {
        slug,
        content
    }
});

export const createReviewSuccess = ({slug, id, content}) => ({
    type: CREATE_REVIEW_SUCCESS,
    payload: {
        slug,
        id,
        content
    }
});

export const createReviewFailure = error => ({
    type: CREATE_REVIEW_FAILURE,
    payload: {
        error
    }
});

export const updateReview = ({slug, id, content}) => ({
    type: UPDATE_REVIEW,
    payload: {
        slug,
        id,
        content
    }
});

export const updateReviewSuccess = ({slug, id, content}) => ({
    type: UPDATE_REVIEW_SUCCESS,
    payload: {
        slug,
        id,
        content
    }
});

export const updateReviewFailure = error => ({
    type: UPDATE_REVIEW_FAILURE,
    payload: {
        error
    }
});

export const changeSortGames = sort => ({
    type: CHANGE_SORT_GAMES,
    payload: {
        sort
    }
});

const getDetailGameEpic = (action$, state$) => {
    return action$.pipe(
        ofType(GET_DETAIL_GAME),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const slug = action.payload.slug;
            let userInfo = getAuthUserInfo();
            let header = { "Content-Type": "application/json" }
            if(userInfo) header = Object.assign(header, { Authorization: `token ${userInfo.token}` })
            return ajax
            .get(`${API_HOST}/games/${slug}/`, header)
            .pipe(
                map(response => {
                    const game = response.response;
                    return getDetailGameSuccess({ game });
                }),
                catchError(error =>
                    of({
                        type: GET_DETAIL_GAME_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const getQueryGamesEpic = (action$, state$) => {
    return action$.pipe(
        ofType(GET_QUERY_GAMES),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const { query } = action.payload.query;
            let userInfo = getAuthUserInfo();
            let header = { "Content-Type": "application/json" }
            if(userInfo) header = Object.assign(header, { Authorization: `token ${userInfo.token}` })
            return ajax
            .get(`${API_HOST}/games/?${queryString.stringify(query)}`, header)
            .pipe(
                map(response => {
                    const games = response.response;
                    return getQueryGamesSuccess({ games, query });
                }),
                catchError(error =>
                    of({
                        type: GET_QUERY_GAMES_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const createRatingEpic = (action$, state$) => {
    return action$.pipe(
        ofType(CREATE_RATING),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const slug = action.payload.slug
            let userInfo = getAuthUserInfo();
            let token = userInfo ? userInfo.token : null;
            return ajax
            .post(
            `${API_HOST}/ratings/create/?type=game&slug=${slug}`,
              { value: action.payload.value },
              {
                "Content-Type": "application/json",
                Authorization: `token ${token}`
              }
            )
            .pipe(
                map(response => {
                    const { id, value } = response.response;
                    return createRatingSuccess({ slug, id, value });
                }),
                catchError(error =>
                    of({
                        type: CREATE_RATING_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const updateRatingEpic = (action$, state$) => {
    return action$.pipe(
        ofType(UPDATE_RATING),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            let slug = action.payload.slug
            let userInfo = getAuthUserInfo();
            let token = userInfo ? userInfo.token : null;
            return ajax
            .put(
            `${API_HOST}/ratings/${action.payload.id}/`,
              { value: action.payload.value },
              {
                "Content-Type": "application/json",
                Authorization: `token ${token}`
              }
            )
            .pipe(
                map(response => {
                    const { id, value } = response.response;
                    return updateRatingSuccess({ slug, id, value });
                }),
                catchError(error =>
                    of({
                        type: UPDATE_RATING_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const createReviewEpic = (action$, state$) => {
    return action$.pipe(
        ofType(CREATE_REVIEW),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            let slug = action.payload.slug
            let userInfo = getAuthUserInfo();
            let token = userInfo ? userInfo.token : null;
            return ajax
            .post(
            `${API_HOST}/reviews/create/?type=game&slug=${slug}`,
              { content: action.payload.content },
              {
                "Content-Type": "application/json",
                Authorization: `token ${token}`
              }
            )
            .pipe(
                map(response => {
                    const { id, content } = response.response;
                    return createReviewSuccess({ slug, id, content });
                }),
                catchError(error =>
                    of({
                        type: CREATE_REVIEW_FAILURE,
                        payload: error,
                        error: true
                    })
                )
            );
        })
    );
};

const updateReviewEpic = (action$, state$) => {
    return action$.pipe(
        ofType(UPDATE_REVIEW),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            let slug = action.payload.slug
            let userInfo = getAuthUserInfo();
            let token = userInfo ? userInfo.token : null;
            return ajax
            .put(
            `${API_HOST}/reviews/${action.payload.id}/`,
              { content: action.payload.content },
              {
                "Content-Type": "application/json",
                Authorization: `token ${token}`
              }
            )
            .pipe(
                map(response => {
                    const { id, content } = response.response;
                    return updateReviewSuccess({ slug, id, content });
                }),
                catchError(error =>
                    of({
                        type: UPDATE_REVIEW_FAILURE,
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
    games: [],
    game: {},
    error: {
        triggered: false,
        status: 200,
        message: ""
    },
    isLast: false,
    isLoading: false,
    isUpdate: false
};

export const games = (state = initialState, action) => {
    let games = state.games;
    let game = state.game;
    let index = 0;

    if(action.payload) {
        if(action.payload.status === 401 && getAuthUserInfo())
            removeAuthUserInfo(); // 장시간 지난 상태로 경과되어 인증에러가 난 경우
    }

    switch (action.type) {
        case INITIALIZE_UPDATE:
            return {
                ...state,
                isUpdate: false
            };
        case GET_DETAIL_GAME_SUCCESS:
            return {
                ...state,
                game: action.payload.game
            };
        case GET_DETAIL_GAME_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error! Please Try Again!"
                }
            };
        case GET_QUERY_GAMES:
            return {
                ...state,
                isLoading: true
            };
        case GET_QUERY_GAMES_SUCCESS:
            return {
                ...state,
                games: action.payload.query.page > 1 ? state.games.concat(action.payload.games.results) : action.payload.games.results,
                isLoading: false
            };
        case GET_QUERY_GAMES_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error while loading! Please Try Again!"
                }
            };
        case CREATE_RATING_SUCCESS:
            index = games.findIndex((game, i) => {
                return game.slug === action.payload.slug;
            });
            games[parseInt(index, 10)].my_rating = {
                "id": action.payload.id, "value": action.payload.value
            };
            return {
                ...state,
                games
            }
        case CREATE_RATING_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error! Please Try Rate!"
                }
            }
        case UPDATE_RATING_SUCCESS:
            index = games.findIndex((game, i) => {
                return game.slug === action.payload.slug;
            });
            games[parseInt(index, 10)].my_rating = {
                "id": action.payload.id, "value": action.payload.value
            };
            return {
                ...state,
                games
            }
        case UPDATE_RATING_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error! Please Try Rate!"
                }
            }
        case CREATE_REVIEW_SUCCESS:
            index = games.findIndex((game, i) => {
                return game.slug === action.payload.slug;
            });
            if(games[parseInt(index, 10)]) {
                games[parseInt(index, 10)].my_review = {
                    "id": action.payload.id, "content": action.payload.content
                }
            }
            if(game) {
                game.my_review = {
                    "id": action.payload.id, "content": action.payload.content
                }
            }
            return {
                ...state,
                games,
                game,
                isUpdate: true
            }
        case CREATE_REVIEW_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error! Please Try Review!"
                }
            }
        case UPDATE_REVIEW_SUCCESS:
            index = games.findIndex((game, i) => {
                return game.slug === action.payload.slug;
            });
            if(games[parseInt(index, 10)]) {
                games[parseInt(index, 10)].my_review = {
                    "id": action.payload.id, "content": action.payload.content
                }
            }
            if(game) {
                game.my_review = {
                    "id": action.payload.id, "content": action.payload.content
                }
            }
            return {
                ...state,
                games,
                game,
                isUpdate: true
            }
        case UPDATE_REVIEW_FAILURE:
            return {
                ...state,
                error: {
                    triggered: true,
                    status: action.payload.status,
                    message: "Error! Please Try Review!"
                }
            }
        case CHANGE_SORT_GAMES:
            return {
                ...state,
                sort: action.payload.sort
            };
        default:
            return state;
    }
};

export const gamesEpics = {
    getDetailGameEpic,
    getQueryGamesEpic,
    createRatingEpic,
    updateRatingEpic,
    createReviewEpic,
    updateReviewEpic,
};