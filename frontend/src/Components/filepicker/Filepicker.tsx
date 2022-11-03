import React, { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
import "./Filepicker.scss";
import { uploadDocument } from "../../reducers/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../reducers/actions/authActions";
import { rootState } from "../../reducers";

export default function Filepicker(props) {
  const [openFileSelector, { filesContent }] = useFilePicker({
    multiple: props.multiple,
    readAs: "DataURL",
    accept: [props.accept],
    maxFileSize: 16,
  });
  const dispatch = useDispatch();
  const user = useSelector((state: rootState) => state.auth?.user?.email);

  useEffect(() => {
    switch (props.accept) {
      case "image/*":
        if (filesContent[0]?.content) {
          let user = props.user;
          user = { ...user, avatar: filesContent[0]?.content };
          dispatch(updateUser(user));
        }
        break;
      default:
        filesContent.map((file) => {
          dispatch(
            uploadDocument({
              author: user,
              title: file.name,
              fileContent: file.content,
              receivers: [""],
              signedBy: [""],
              signed: false,
            })
          );
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);
  return (
    <>
      {props.title !== undefined ? (
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
