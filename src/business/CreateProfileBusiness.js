import React, { useEffect, useState, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
} from "../redux/actions/profileBusiness";

const CreateProfileBusiness = ({
  createProfile,
  getCurrentProfile,
  profileBusiness: { profileBusiness },
  history,
}) => {
  // preload location fields and availability fields and service fields with empty strings
  const [formData, setFormData] = useState({
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    // twitter: "",
    // tiktok: "",
    // facebook: "",
    // linkedin: "",
    // youtube: "",
    // instagram: "",
    // snapchat: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    address,
    city,
    state,
    zip,
    // tiktok,
    // twitter,
    // facebook,
    // linkedin,
    // youtube,
    // instagram,
    // snapchat
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let tokenBusiness = localStorage.getItem("tokenBusiness");
  if (!tokenBusiness || localStorage.tokenBusiness === "undefined") {
    return <Redirect to="/login_business" />;
  }

  return (
    <Fragment>
      <div className="container text-center">
        <form className="form-signin" onSubmit={(e) => onSubmit(e)}>
          <img className="mb-4" src={""} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Location Information</h1>

          <input
            className="form-control"
            type="text"
            placeholder="company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="city"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="State"
            name="state"
            value={state}
            onChange={(e) => onChange(e)}
          />

          <input
            className="form-control"
            type="text"
            placeholder="zipcode"
            name="zip"
            value={zip}
            onChange={(e) => onChange(e)}
          />

          <input
            className="btn btn-lg btn-primary btn-block mt-5"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    </Fragment>
  );
};

CreateProfileBusiness.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profileBusiness: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profileBusiness: state.profileBusiness,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfileBusiness)
);
