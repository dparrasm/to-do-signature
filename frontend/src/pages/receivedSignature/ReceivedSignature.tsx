import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import DetailedSign from "../../components/detailedSign/DetailedSign";

const styles = withStyles({
  container: {
    height: "100%",
    width: "100%"
  },
  pedingSignatures: {
    borderRadius: "15px",
    backgroundColor: "white"
  },
  signedDocuments: {
    borderRadius: "15px",
    backgroundColor: "white"
  },
  h2: {
    fontSize: "17px",
    marginLeft: "20px"
  },
  info: {
    display: "flex",
    flexDirection: "row"
  }
});

interface ReceivedSignatureProps {
  classes?: any;
}

class ReceivedSignature extends Component<ReceivedSignatureProps, any> {

  render() {
    const { classes } = this.props;
    return (
      <div className = {classes.container}>
        <div className={classes.info}>
        <h2 className={classes.h2}>Documents to sign</h2>
        <h2 className={classes.h2}>1 - 50</h2>
        </div>  
          <DetailedSign></DetailedSign>
      </div>
    );
  }
}

export default styles(ReceivedSignature);
