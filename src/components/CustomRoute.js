
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate , Route } from "react-router-dom";

const CustomRoute = props => {
  const [returnedRoute, setReturnedRoute] = useState("");
  useEffect(() => {
    switch (props.condition) {
      case "teacher":
        return setReturnedRoute(
          props.user.role === "teacher" ? (
            <Route {...props} />
          ) : (
            <Navigate to="/index" />
          )
        );
      case "student":
        return setReturnedRoute(
          props.user.role === "student" ? (
            <Route {...props} />
          ) : (
            <Navigate to="/index" />
          )
        );
      case "signedIn":
        return setReturnedRoute(
          props.user.isSignedIn ? <Route {...props} /> : <Navigate to="/index" />
        );
      default:
        return setReturnedRoute(<Route {...props} />);
    }
  }, [props.user]);
  return <>{returnedRoute}</>;
};

const mapStateToProps = state => ({
  user: state.userReducer
});
export default connect(
  mapStateToProps,
  null
)(CustomRoute);
