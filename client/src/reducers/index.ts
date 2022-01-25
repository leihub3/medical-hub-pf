import { actionI } from "./interfaces";
import { ActionTypes } from "../actions/types";

const initialState: any = {
  user: {},
  userInfo: {},
  appointments: [],
  specialities: [],
};

export default function reducer(state = initialState, action: actionI) {
  switch (action.type) {
    case ActionTypes.logUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.logout:
      return {
        initialState,
      };
    case ActionTypes.getUserInfo:
      return {
        ...state,
        userInfo: action.payload,
      };
    case ActionTypes.getAppointments:
      return {
        ...state,
        appointments: action.payload,
      };
    case ActionTypes.getSpecialities:
      return {
        ...state,
        specialities: action.payload,
      };

    default:
      return state;
  }
}
