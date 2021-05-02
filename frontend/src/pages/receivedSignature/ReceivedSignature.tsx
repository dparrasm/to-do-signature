import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import DetailedSign from "../../components/detailedSign/DetailedSign";
import { setPath } from "../../reducers/actions/routerActions";

const styles = withStyles({
  container: {
    height: "100%",
    width: "100%",
  },
  pedingSignatures: {
    borderRadius: "15px",
    backgroundColor: "white",
  },
  signedDocuments: {
    borderRadius: "15px",
    backgroundColor: "white",
  },
  h2: {
    fontSize: "17px",
    marginLeft: "20px",
  },
  info: {
    display: "flex",
    flexDirection: "row",
  },
});

interface ReceivedSignatureProps {
  classes?: any;
}

class ReceivedSignature extends Component<
  ReceivedSignatureProps & ConnectedProps<typeof connector>,
  any
> {
  handleSign = () => {
    //TODO
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.info}>
          <h2 className={classes.h2}>Documents to sign</h2>
          <h2 className={classes.h2}>1 - 50</h2>
        </div>
        <DetailedSign handleSign={this.handleSign}></DetailedSign>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  path: state.path,
});
const connector = connect(mapStateToProps, { setPath });
export default connector(styles(ReceivedSignature));
