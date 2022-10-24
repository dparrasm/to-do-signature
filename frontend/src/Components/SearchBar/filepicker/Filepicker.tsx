import React, { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { icons } from "../../../utils/icons";
import IconButton from "../../iconButton/IconButton";
import "./Filepicker.scss";
import { postDocuments } from "../../../reducers/actions/documentActions";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../reducers/actions/authActions";

export default function Filepicker(props) {
  const [openFileSelector, { filesContent }] = useFilePicker({
    multiple: props.multiple,
    readAs: "DataURL",
    accept: [props.accept],
    maxFileSize: 16,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    switch (props.accept) {
      case "image/*":
        dispatch(updateUser(filesContent[0]?.content));
        break;
      default:
        filesContent.map((file) => {
          dispatch(
            postDocuments({
              author: "David",
              creationDate: Date.now.toString(),
              title: file.name,
            })
          );
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);
  return (
    <>
      {props.title === "START" ? (
        <button
          className="filepicker-button"
          onClick={() => openFileSelector()}
        >
          {props.title}
        </button>
      ) : (
        <div className="icon-button" onClick={() => openFileSelector()}>
          <IconButton icon={icons.camera} />
        </div>
      )}
    </>
  );
}
