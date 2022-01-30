import React, { Fragment, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkTimeSlots } from "../redux/actions/profileUser";
import { createAppointment } from "../redux/actions/createAppointmentAction";

const CheckAvailability = ({
  checkTimeSlots,
  createAppointment,
  timeSlotReducer: { timeSlots, loading, booked_appointment },
}) => {
  useEffect(() => {
    // Here we add the global variable businessID to the function
    checkTimeSlots(window.businessID);
  }, [createAppointment, checkTimeSlots, window.businessID]);

  let tokenUser = localStorage.tokenUser;
  if (!tokenUser || tokenUser === "undefined") {
    return <Redirect to="/login_user" />;
  }

  if (loading === true) {
    return <h1>Loading Please wait</h1>;
  } else {
    return (
      <Fragment>
        <div>
          {timeSlots.timeSlots.from.map((result) => {
            return (
              <button
                className="btn btn-light"
                onClick={() => {
                  // console.log(result);
                  createAppointment(result, window.businessID);
                }}
              >
                {result}
              </button>
            );
          })}
        </div>
      </Fragment>
    );
  }
};

CheckAvailability.propTypes = {
  checkTimeSlots: PropTypes.func.isRequired,
  createAppointment: PropTypes.func.isRequired,
};

// on load and display error is something is undefined because api data has not yet been fetched. map it to mapState to props
const mapStateToProps = (state) => ({
  timeSlotReducer: state.timeSlotReducer,
  timeSlots: state.timeSlots,
});

export default connect(mapStateToProps, {
  checkTimeSlots,
  createAppointment,
})(withRouter(CheckAvailability));
