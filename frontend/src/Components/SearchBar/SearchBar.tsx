import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useDispatch } from "react-redux";
import { searchDocument } from "../../reducers/actions/documentActions";
import "./Searchbar.scss";
import { useLocation } from "react-router-dom";

export default function Searchbar(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");

  const onChange = (event) => {
    setSearchText(event.target.value);
    dispatch(searchDocument(event.target.value, props?.page));
    props.getSearchText(event.target.value);
  };

  useEffect(() => {
    setSearchText("");
  }, [location]);

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
            value={searchText}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
}
