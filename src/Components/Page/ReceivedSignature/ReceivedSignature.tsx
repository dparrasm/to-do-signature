import { withStyles } from "@material-ui/core";
import React, { Component } from "react";

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
  }
});

interface ReceivedSignatureProps {
  classes?: any;
}

class ReceivedSignature extends Component<ReceivedSignatureProps, any> {
  constructor(props: ReceivedSignatureProps) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className = "">
        <h2>Pending signatures</h2>
        <div className={classes.pedingSignatures}>
        
        </div>
        <h2>Signed documents</h2>
        <div className={classes.signedDocuments}>
        
        </div>
      </div>
    );
  }
}

export default styles(ReceivedSignature);
