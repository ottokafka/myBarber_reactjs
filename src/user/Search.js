import React, { Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchCity } from "../redux/actions/profileUser";

// Create a global variable to hold businessID
window.businessID = "";

const Search = ({
  searchCity,
  history,
  searchReducer: { searchReducer, searched, cityResults, loading },
  authUser: { isAuthenticatedUser },
}) => {
  const onSubmitStockton = (e) => {
    e.preventDefault();
    searchCity({ city: "stockton" }, history);
  };

  const onSubmitSacramento = (e) => {
    e.preventDefault();
    searchCity({ city: "sacramento" }, history);
  };

  if (isAuthenticatedUser === false) {
    return <Redirect to="login_user"></Redirect>;
  }

  if (loading === true) {
    return (
      <Fragment>
        <div className="container text-center">
          <form className="form-signin" onSubmit={(e) => onSubmitSacramento(e)}>
            <img className="mb-4" src={""} alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">
              Search for a business
            </h1>

            <input
              className="btn btn-lg btn-primary btn-block mt-5"
              type="submit"
              name="city"
              value="sacramento"
            />
          </form>

          <form className="form-signin" onSubmit={(e) => onSubmitStockton(e)}>
            <input
              className="btn btn-lg btn-success btn-block mt-5"
              type="submit"
              name="city"
              value="stockton"
            />
          </form>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div>
          {cityResults.map((result) => {
            window.businessID = result.business;
            var theKeys = result.location;
            return (
              <div className="container">
                <div className="card-deck mb-3 text-center">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header">
                      <h4
                        key={result.company.toString()}
                        className="my-0 font-weight-normal"
                      >
                        {result.company}
                      </h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">
                        <small className="text-muted"></small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li key={theKeys.address.toString()}>
                          Address: {result.location.address}{" "}
                        </li>
                        <li key={theKeys.city.toString()}>
                          City: {result.location.city}
                        </li>
                        <li key={theKeys.state.toString()}>
                          State: {result.location.state}
                        </li>
                        <li key={theKeys.zip.toString()}>
                          Zip: {result.location.zip}
                        </li>
                      </ul>
                      <p className="text-muted">2 miles</p>
                      <Link
                        key={result.business.toString()}
                        to={`/show_availability/${result.business}`}
                        className="btn btn-primary"
                      >
                        More Info
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="container text-center">
            <form
              className="form-signin"
              onSubmit={(e) => onSubmitSacramento(e)}
            >
              <img className="mb-4" src={""} alt="" width="72" height="72" />
              <h1 className="h3 mb-3 font-weight-normal">
                Search for a business
              </h1>

              <input
                className="btn btn-lg btn-primary btn-block mt-5"
                type="submit"
                name="city"
                value="sacramento"
              />
            </form>

            <form className="form-signin" onSubmit={(e) => onSubmitStockton(e)}>
              <input
                className="btn btn-lg btn-success btn-block mt-5"
                type="submit"
                name="city"
                value="stockton"
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
};

Search.propTypes = {
  searchCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchReducer: state.searchReducer,
  cityResults: state.cityResults,
  authUser: state.authUser,
});

export default connect(mapStateToProps, {
  searchCity,
})(withRouter(Search));
