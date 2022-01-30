import axios from "axios";
import { AUTH_ERROR, CREATE_APPOINTMENT, MY_APPOINTMENT } from "../types";

// Book Appointment time and date to db
export const createAppointment = (from, businessID) => async (dispatch) => {
  let tokenUser = localStorage.tokenUser;
  const config = {
    headers: {
      "Content-Type": "application/json",
      tokenUser: tokenUser,
    },
  };

  const body = JSON.stringify({ from, business: businessID });

  try {
    const res = await axios.put("/api/appointments", body, config);
    // console.log(res);

    dispatch({
      type: CREATE_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Check appointment action
export const checkAppointment = () => async (dispatch) => {
  let tokenUser = localStorage.tokenUser;
  const config = {
    headers: {
      "Content-Type": "application/json",
      tokenUser: tokenUser,
    },
  };

  try {
    const res = await axios.get("/api/appointments", config);
    // console.log(res);

    dispatch({
      type: MY_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
