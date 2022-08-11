import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

import { API_HOST, getAuthUserInfo, removeAuthUserInfo } from '../../GameAPI';

const INITIALIZE_INPUT = "auth/INITIALIZE_INPUT";

const CHANGE_INPUT = "auth/CHANGE_INPUT";

const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

const INITIALIZE_ERROR = "auth/INITIALIZE_ERROR";

const CHECK_USER = "auth/CHECK_USER";
const CHECK_USER_SUCCESS = "auth/CHECK_USER_SUCCESS";
const CHECK_USER_FAILURE = "auth/CHECK_USER_FAILURE";

const SET_USER_TEMP = "auth/SET_USER_TEMP";

const LOGOUT = "auth/LOGOUT";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

const NEED_LOGIN = "auth/NEED_LOGIN";

export const initializeInput = () => ({
  type: INITIALIZE_INPUT
});

export const changeInput = ({ name, value }) => ({
  type: CHANGE_INPUT,
  payload: {
    name,
    value
  }
});

export const register = () => ({
  type: REGISTER
});
  
export const registerSuccess = ({ user, token }) => ({
  type: REGISTER_SUCCESS,
  payload: {
    user,
    token
  }
});

export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: {
    error
  }
});

export const login = () => ({
  type: LOGIN
});

export const loginSuccess = ({ user, token }) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
    token
  }
});
  
export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

export const initializeError = () => ({
  type: INITIALIZE_ERROR
});

export const checkUser = () => ({
  type: CHECK_USER
});

export const checkUserSuccess = () => ({
  type: CHECK_USER_SUCCESS
});

export const checkUserFailure = error => ({
  type: CHECK_USER_FAILURE,
  payload: {
    error
  }
});

export const setUserTemp = (userInfo) => ({
  type: SET_USER_TEMP,
  payload: {
    userInfo
  }
});

export const logout = () => ({
  type: LOGOUT
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: {
    error
  }
});

export const needLogin = (needed) => ({
  type: NEED_LOGIN,
  payload: {
    needed
  }
});


const registerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(REGISTER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { username, first_name, password, code } = state.auth.form;
      return ajax.post(`${API_HOST}/users/register/`, { username, first_name, password, code }).pipe(
        map(response => {
          const { user, token } = response.response;
          return registerSuccess({ user, token });
        }),
        catchError(error =>
          of({
            type: REGISTER_FAILURE,
            payload: error,
            error: true
          })
        )
      );
    })
  );
};

const loginEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGIN),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { username, password } = state.auth.form;
      return ajax.post(`${API_HOST}/users/login/`, { username, password }).pipe(
        map(response => {
          const { user, token } = response.response;
          return loginSuccess({ user, token });
        }),
        catchError(error =>
          of({
            type: LOGIN_FAILURE,
            payload: error,
            error: true
          })
        )
      );
    })
  );
};

const checkUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(CHECK_USER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = getAuthUserInfo();
      const token = userInfo ? userInfo.token : null;
      return ajax
        .get(`${API_HOST}/users/users/`, {
          "Content-Type": "application/json",
          Authorization: `token ${token}`
        })
        .pipe(
          map(response => {
            return checkUserSuccess();
          }),
          catchError(error =>
            of({
              type: CHECK_USER_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

const logoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGOUT),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = getAuthUserInfo();
      const token = userInfo ? userInfo.token : null;
      return ajax
        .post(
          `${API_HOST}/auth/logout/`,
          {},
          {
            "Content-Type": "application/json",
            Authorization: `token ${token}`
          }
        )
        .pipe(
          map(response => {
            removeAuthUserInfo();
            return logoutSuccess();
          }),
          catchError(error => {
            of({
              type: LOGOUT_FAILURE,
              payload: error,
              error: true
            });
          })
        );
    })
  );
};

const initialState = {
  form: {
    username: "",
    first_name: "",
    password: "",
    code: ""
  },
  error: {
    triggered: false,
    status: 200,
    message: ""
  },
  logged: false,
  needed: false,
  userInfo: {
    id: null,
    username: "",
    first_name: "",
    avatar: "",
    token: null
  }
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_INPUT:
      return {
        ...state,
        form: {
          username: "",
          password: "",
          first_name: "",
          code: ""
        }
      };
    case CHANGE_INPUT:
      let newForm = state.form;
      newForm[action.payload.name] = action.payload.value;
      return {
        ...state,
        form: newForm
      };
    case INITIALIZE_ERROR:
      return {
        ...state,
        error: {
          triggered: false,
          message: ""
        }
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          first_name: action.payload.user.first_name,
          avatar: action.payload.user.avatar,
          token: action.payload.token
        }
      };
    case REGISTER_FAILURE:
      switch (action.payload.status) {
        case 400:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "Wrong Email or Password"
            }
          };
        case 406:
          let fieldName = '';
          if(action.payload.response.hasOwnProperty('username')) fieldName = "Email";
          else if(action.payload.response.hasOwnProperty('first_name')) fieldName = "Nickname";
          else if(action.payload.response.hasOwnProperty('password')) fieldName = "Password";
          else if(action.payload.response.hasOwnProperty('code')) fieldName = "Code";

          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: `Invalid ${fieldName}`
            }
          };
        case 409:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "This Email has already registered"
            }
          };
        case 412:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "Wrong Code"
            }
          };
        case 500:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "Please Try Again"
            }
          };
        default:
          return {
            ...state
          };
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          first_name: action.payload.user.first_name,
          avatar: action.payload.user.avatar,
          token: action.payload.token
        }
      };
    case LOGIN_FAILURE:
      console.log(action.payload)
      switch (action.payload.status) {
        case 400:
          let fieldName = '';
          if(action.payload.response.hasOwnProperty('username')) fieldName = fieldName + "Email ";
          if(action.payload.response.hasOwnProperty('password')) fieldName = fieldName + "Password ";

          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: `Invalid ${fieldName}`
            }
          };
        case 409:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "Here is no Email"
            }
          };
        case 412:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "Wrong Password"
            }
          };
        case 500:
          return {
            ...state,
            error: {
              triggered: true,
              status: action.payload.status,
              message: "Please Try Again"
            }
          };
        default:
          return {
            ...state
          };
      }
      case CHECK_USER_SUCCESS:
      return {
        ...state
      };
    case CHECK_USER_FAILURE:
      removeAuthUserInfo();
      return {
        ...state,
        logged: false,
        userInfo: {
          id: null,
          username: "",
          first_name: "",
          avatar: "",
          token: null
        }
      };
    case SET_USER_TEMP:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.userInfo.id,
          username: action.payload.userInfo.username,
          first_name: action.payload.userInfo.first_name,
          avatar: action.payload.userInfo.avatar,
          token: action.payload.userInfo.token
        }
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logged: false,
        userInfo: {
          id: null,
          message: "",
          token: null
        }
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          status: action.payload.status,
          message: "LOGOUT ERROR, PLEASE TRY AGAIN"
        }
      };
    case NEED_LOGIN:
      return {
        ...state,
        needed: action.payload.needed
      };

    default:
      return state;
  }
};

export const authEpics = {
  registerEpic,
  loginEpic,
  checkUserEpic,
  logoutEpic
};