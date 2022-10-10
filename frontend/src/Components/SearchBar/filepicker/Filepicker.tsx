import React, { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { icons } from "../../../utils/icons";
import IconButton from "../../iconButton/IconButton";
import "./Filepicker.scss";
import { postDocuments } from "../../../reducers/actions/documentActions";
import { useDispatch } from "react-redux";

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
