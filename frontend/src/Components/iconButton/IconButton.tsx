import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";

export interface IconButtonProps {
  classes?: any;
  icon?: string;
  text?: string;
  onClick?: () => void;

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
    fontFamily: "Roboto"
  }
}));

class IconButton extends React.Component<IconButtonProps, any> {
  constructor(props: IconButtonProps) {
    super(props);
  }
  render() {
    const { classes, icon, text } = this.props;
    return (
      <div className={classes.container}>
        <i className={icon}></i>
        <span className={classes.font}>{text}</span>
      </div>
    );
  }
}

export default styles(IconButton);
