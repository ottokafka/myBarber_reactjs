import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  SEARCH_ZIP,
  SEARCH_CITY,
  SEARCH_ERROR,
  SEARCH_BUSINESS_INFO_BY_ID,
  START_LOADING,
  FINISH_LOADING,
  CHECK_TIME_SLOTS,
} from "../types";

// loading page function
export const startLoading = () => async (dispatch) => {
  dispatch({
    type: START_LOADING,
    payload: "Page loading",
  });
};

// loading page function
export const finishLoading = () => async (dispatch) => {
  dispatch({
    type: FINISH_LOADING,
    payload: "Page finish loading",
  });
};

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  const tokenUser = localStorage.tokenUser;
  //   console.log(tokenUser);

  const config = {
    headers: {
      "Content-Type": "application/json",
      tokenUser: tokenUser,
    },
  };
  try {
    const res = await axios.get("/api/profile/me", config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
  //   payload: { msg: err.response.statusText, status: err.response.status }
};

// Get business by id this is for user to see
export const getBusinessById = (businessId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/businessinfo/business/${businessId}`);

    dispatch({
      type: SEARCH_BUSINESS_INFO_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: err,
    });
  }
};

// Get available hours from business in 30 min intervals by Business ID
export const checkTimeSlots = (businessId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/checkAvailability/${businessId}`);

    dispatch({
      type: CHECK_TIME_SLOTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: err,
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const tokenUser = localStorage.tokenUser;
    const config = {
      headers: {
        "Content-Type": "application/json",
        tokenUser: tokenUser,
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard_user");
    }
  } catch (err) {
    console.log(err);

    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

// Search by zip code
export const searchZip = (formData, history) => async (dispatch) => {
  try {
    const tokenUser = localStorage.tokenUser;
    const config = {
      headers: {
        "Content-Type": "application/json",
        tokenUser: tokenUser,
      },
    };

    const res = await axios.post("/api/businessinfo/zip", formData, config);
    console.log(res.data);

    dispatch({
      type: SEARCH_ZIP,
      payload: res.data,
    });

    dispatch(setAlert("Found business", "success"));

    // history.push("/dashboard_business");
  } catch (err) {
    console.log(err);

    dispatch({
      type: SEARCH_ERROR,
      payload: err,
    });
  }
};

// Search by city
export const searchCity = (formData, history) => async (dispatch) => {
  try {
    const tokenUser = localStorage.tokenUser;
    const config = {
      headers: {
        "Content-Type": "application/json",
        tokenUser: tokenUser,
      },
    };

    const res = await axios.post("/api/businessinfo/city", formData, config);
    // console.log(res.data);

    dispatch({
      type: SEARCH_CITY,
      payload: res.data,
    });

    dispatch(setAlert("Found business", "success"));

    // history.push("/dashboard_business");
  } catch (err) {
    console.log(err);

    dispatch({
      type: SEARCH_ERROR,
      payload: err,
    });
  }
};

// Add Services
export const addServices = (formData, history) => async (dispatch) => {
  try {
    const tokenUser = localStorage.tokenUser;
    const config = {
      headers: {
        "Content-Type": "application/json",
        tokenUser: tokenUser,
      },
    };

    const res = await axios.put("/api/services", formData, config);
    console.log(res.data);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Services Added", "success"));

    history.push("/dashboard_business");
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
