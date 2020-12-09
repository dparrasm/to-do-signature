import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";

export interface ButtonProps {
  classes?: any;
  icon?: string;
  text?: string;
}

const styles = withStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
  font: {
    fontSize: "10px",
    paddingTop: "6px",
    fontFamily: "Roboto"
  }
}));

class Button extends React.Component<ButtonProps, any> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { classes, icon, text } = this.props;
    return (
      // <div className={classes.container} onClick={()=>alert('Hello world!')}>
      <div className={classes.container}>
        <i className={icon}></i>
        <span className={classes.font}>{text}</span>
      </div>
    );
  }
}

export default styles(Button);
