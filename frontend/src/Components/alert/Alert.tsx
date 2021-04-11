import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MAlert from "@material-ui/lab/Alert";

const Alert = ({ alerts, className }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={className}>
        <MAlert variant="outlined" severity={alert.severity}>
          {alert.msg}
        </MAlert>
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
