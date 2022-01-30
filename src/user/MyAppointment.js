import React, { Fragment, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkAppointment } from "../redux/actions/createAppointmentAction";

const MyAppointment = ({
  checkAppointment,
  timeSlotReducer: { myAppointment, loading },
}) => {
  useEffect(() => {
    checkAppointment();
  }, [checkAppointment]);

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
          <div className="container">
            <div className="card-deck mb-3 text-center">
              {/* single card below */}
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Appointment Time</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    <small className="text-muted"></small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Date: {myAppointment.date} </li>
                    <li>Time: {myAppointment.time} </li>
                  </ul>

                  <p>
                    <small className="text-muted">Availability</small>
                  </p>
                  <ul className="list-unstyled mt-3 mb-4"></ul>
                  <Link to="/dashboard_user" className="btn btn-primary">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

MyAppointment.propTypes = {
  checkAppointment: PropTypes.func.isRequired,
};

// on load and display error is something is undefined because api data has not yet been fetched. map it to mapState to props
const mapStateToProps = (state) => ({
  timeSlotReducer: state.timeSlotReducer,
});

export default connect(mapStateToProps, {
  checkAppointment,
})(withRouter(MyAppointment));
