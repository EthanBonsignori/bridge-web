import Router from 'next/router';
import { fromJS } from 'immutable';
import { actionTypes as userActionTypes } from '../actions/userActions';
import { actionTypes as apiActionTypes } from '../actions/apiActions';

const initialState = fromJS({
  id: '',
  displayName: '',
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case apiActionTypes.REQUEST_FINISHED:
    switch (action.requestType) {
    case userActionTypes.USER_LOGIN:
      state.merge({
        id: action?.data?.id,
        displayName: action?.data?.displayName,
      });
      return Router.push('/dashboard');
    case userActionTypes.USER_LOGOUT:
      Router.push('/');
      return state;
    case userActionTypes.USER_REGISTER:
      // TODO: email confirm page
      return Router.push('/verifyEmail');
    case userActionTypes.USER_AUTHENTICATE:
      return state.merge({
        id: action?.data?.id,
        displayName: action?.data?.displayName,
      });
    default:
      return state;
    }
  default:
    return state;
  }
};

export default userReducer;
