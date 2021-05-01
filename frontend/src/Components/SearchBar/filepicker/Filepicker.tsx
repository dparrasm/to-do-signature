import React from "react";
import { useFilePicker } from "use-file-picker";
import { icons } from "../../../utils/icons";
import IconButton from "../../iconButton/IconButton";
import "./Filepicker.scss";

function Filepicker() {
  const [filesContent, errors, openFileSelector, loading] = useFilePicker({
    multiple: true,
    // accept: '.ics,.pdf',
    accept: [".json", ".pdf"],
  });

  if (errors.length > 0) return <p>Error!</p>;

  if (loading) {
    return <div>File updated</div>;
  }

  return (
    <div className="icon-button" onClick={() => openFileSelector()}>
      <IconButton icon={icons.plus} />
    </div>
  );
}

export default Filepicker;
