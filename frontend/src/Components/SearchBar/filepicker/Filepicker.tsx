import React, { useEffect, useReducer, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { icons } from "../../../utils/icons";
import IconButton from "../../iconButton/IconButton";
import "./Filepicker.scss";
import { postDocuments } from "../../../reducers/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../store";
import { rootState } from "../../../reducers";

const initialState = {
  author: "David Parras Martínez",
  creationDate: "01/01/2022",
  title: "InitialState",
};

export default function Filepicker() {
  const [openFileSelector, { filesContent }] = useFilePicker({
    multiple: true,
    readAs: "Text",
    accept: [".pdf"],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    filesContent.map((file) => {
      console.log("POSTING: " + file.name);
      dispatch(
        postDocuments({
          author: "David",
          creationDate: Date.now.toString(),
          title: file.name,
        })
      );
    });
  }, [filesContent]);

  return (
    <div className="icon-button" onClick={() => openFileSelector()}>
      <IconButton icon={icons.plus} />
    </div>
  );
}
