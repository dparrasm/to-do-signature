import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import IconButton from "../../components/iconButton/IconButton";
import { icons } from "../../utils/icons";
interface CreateSignatureProps {
  classes?: any;
}
const styles = withStyles({
  icon: {
    fontSize: "150px",
    color: "lightsteelblue",
  },
  text: {
    fontSize: "large",
    color: "black",
  },
});

class CreateSignature extends Component<CreateSignatureProps, any> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.icon}>
        <IconButton icon={icons.tools} />
        <h5 className={classes.text}>This site is temporary unavailable ;)</h5>
      </div>
    );
  }
}

export default styles(CreateSignature);
