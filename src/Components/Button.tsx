import withStyles from '@material-ui/core/styles/withStyles';
import * as React from "react";

export interface ButtonProps {
  classes?: any;
  icon?: string;
}

const styles = withStyles(theme =>({
    img: {
        width:'20px',
        marginLeft:'10px',
        marginRight: '10px',
    }
}));

class Button extends React.Component<ButtonProps, any> {
  constructor(props: ButtonProps){
    super(props);
}


render() {
  const { classes, icon } = this.props;
  return (
  <div onClick={()=>alert('Hello world!')}>
    <img className={classes.img} src={icon}/>
  </div>);
}

}

export default (styles)(Button);