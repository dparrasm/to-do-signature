import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
const styles = withStyles((theme) => ({
  container: {
    backgroundColor: "white",
    borderColor: "#e0e0de",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "15px",
    width: "100%",
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  form: {
    display: "flex",
    width: "100%",
  },
  search: {
    display: "flex",
    width: "90%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "25px 15px 15px 25px",
    marginLeft: "15px",
    marginRight: "5px",
    borderColor: "#e0e0de",
  },
  searchIcon: {
    color: "#717171",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
  },
  inputRoot: {
    color: "inherit",
    marginLeft: "10px",
    width: "93%",
  },
  inputInput: {
    width: "100%",
  },
  button: {
    backgroundColor: "#166fe5",
    width: "50%",
    boxShadow: "none",
    height: "10%",
  },
  buttonIcon: {
    backgroundColor: "#1877f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    width: "40px",
    minWidth: "40px",
    borderRadius: "25px",
    color: "white",
    fontSize: "14px",
    marginLeft: "20px",
    cursor: "pointer",
  },
}));
export interface SearchBarProps {
  classes?: any;
}
class searchBar extends Component<SearchBarProps, any> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form className={classes.form}>
          <div className={classes.buttonIcon}>
            <IconButton icon={icons.plus} />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default styles(searchBar);
