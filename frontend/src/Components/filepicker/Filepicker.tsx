import React, { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
import "./Filepicker.scss";
import { uploadDocument } from "../../reducers/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../reducers";
import * as xlsx from "xlsx";

export default function Filepicker(props) {
  const {
    accept,
    multiple,
    updateProfilePicture,
    title,
    addRecipientsFromList,
  } = props;
  const [openFileSelector, { filesContent }] = useFilePicker({
    multiple: multiple,
    readAs: "DataURL",
    accept: [accept],
    maxFileSize: 16,
  });
  const dispatch = useDispatch();
  const user = useSelector((state: rootState) => state.auth?.user?.email);
  useEffect(() => {
    switch (accept) {
      case "image/*":
        if (filesContent[0]?.content) {
          updateProfilePicture(filesContent[0]?.content);
        }
        break;
      case ".xlsx":
        let data = filesContent[0]?.content;
        if (data) {
          data = data.replace(
            "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
            ""
          );
          const workbook = xlsx.read(data, { type: "base64" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          addRecipientsFromList(json);
        }
        break;
      default:
        filesContent.forEach((file) => {
          dispatch(
            uploadDocument({
              author: user,
              title: file.name,
              fileContent: file.content,
              recipients: [""],
              signed: false,
            })
          );
        });
        break;
    }
  }, [filesContent]);
  return (
    <>
      {title !== undefined ? (
        title !== "ADD FROM LIST" ? (
          <button
            className="filepicker-button"
            onClick={() => openFileSelector()}
          >
            {title}
          </button>
        ) : (
          <div className="recipient-button" onClick={() => openFileSelector()}>
            <i className={icons.spreadsheet} />
            <h1>ADD FROM LIST</h1>
          </div>
        )
      ) : (
        <div className="icon-button" onClick={() => openFileSelector()}>
          <IconButton icon={icons.camera} />
        </div>
      )}
    </>
  );
}
