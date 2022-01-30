import {
  CHECK_TIME_SLOTS,
  START_LOADING,
  FINISH_LOADING,
  CREATE_APPOINTMENT,
  MY_APPOINTMENT,
} from "../types";

const initialState = {
  myAppointment: {},
  loading: true,
};

// build a timeout logic that automatically give loading the value of true after 2 seconds
// create a action called load page that goes to null to true

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case CHECK_TIME_SLOTS:
      return {
        ...state,
        timeSlots: payload,
        loading: false,
      };
    case CREATE_APPOINTMENT:
      return {
        ...state,
        booked_appointment: payload,
        loading: false,
      };
    case MY_APPOINTMENT:
      return {
        ...state,
        myAppointment: payload,
        loading: false,
      };

    default:
      return state;
  }
}
