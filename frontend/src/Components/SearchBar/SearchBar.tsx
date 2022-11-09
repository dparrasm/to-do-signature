import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useDispatch } from "react-redux";
import { searchDocument } from "../../reducers/actions/documentActions";

import "./Searchbar.scss";

export default function Searchbar() {
  const dispatch = useDispatch();
  const onChange = (event) => {
    dispatch(searchDocument(event.target.value));
    console.log(event.target.value);
  };
  return (
    <div className="container">
      <form className="form">
        <div className="search">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: "inputRoot",
              input: "inputInput",
            }}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
}
