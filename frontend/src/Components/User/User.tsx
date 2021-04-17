import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import cover from "../../assets/cover.jpeg";

const styles = {
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "none",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: "100%",
    height: "60px",
    borderStyle: "solid",
    borderColor: "#e0e0de",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    borderBottomStyle: "none" as "none",
    borderWidth: "1px",
  },
  image: {
    backgroundColor: "#c6dafc",
    height: "65px",
    width: "65px",
    borderRadius: "50%",
    marginTop: "-40px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as "relative",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  description: {
    height: "250px",
    borderStyle: "solid",
    borderColor: "#e0e0de",
    borderWidth: "1px",
    width: "100%",
    backgroundColor: "#fff",
    borderBottomRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    marginTop: "-30px",
    paddingTop: "40px",
    textAlign: "center" as "center",
  },
  tasks: {
    height: "75%",
    textAlign: "left" as "left",
    marginTop: "15px",
  },
  link: {
    bottom: "1px",
    color: "blue",
    fontSize: "small",
  },
  number: {
    color: "#0077B5",
    fontSize: "13px",
  },
  activity: {
    display: "inline-flex",
    width: "100%",
    marginBottom: "10px",
  },
  info: {
    paddingLeft: "10px",
    color: "grey",
    fontSize: "13px",
    width: "80%",
  },
  button: {
    background: "none !important" as "none !important",
    border: "none" as "none",
    padding: "0 !important",
    fontFamily: "arial, sans-serif",
    color: "#069",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

interface UserProps {
  classes?: any;
  pickForm: any;
}

class User extends Component<UserProps, any> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <img alt="cover" className={classes.cover} src={cover} />
          <Avatar className={classes.image} src="./avatar.jpg" />
          <div className={classes.description}>
            Monsieur Dupont
            <div className={classes.tasks}>
              <div className={classes.activity}>
                <div className={classes.info}>Pending signatures</div>
                <div className={classes.number}>6</div>
              </div>
              <div className={classes.activity}>
                <div className={classes.info}>Received signatures</div>
                <div className={classes.number}>1</div>
              </div>
            </div>
            <div>
              <button
                className={classes.button}
                onClick={() => this.props.pickForm("/user")}
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(User);
