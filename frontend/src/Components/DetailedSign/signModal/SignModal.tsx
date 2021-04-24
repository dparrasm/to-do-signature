import React, { useState } from "react";
import {
  DialogContent,
  DialogContentText,
  TextField,
  Dialog,
  DialogTitle,
  Button,
} from "@material-ui/core";

import "./SignModal.scss";
import IconButton from "../../iconButton/IconButton";
import { icons } from "../../../utils/icons";

interface SignModalProps {
  shouldOpenModal: boolean;
  handleClose: () => any;
}

function SignModal(props: SignModalProps) {
  const defaultText = "Type your name here";

  const [value, setValue] = useState(defaultText);

  const [active, setActive] = useState(Array(6).fill(false));

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSquareClick = (id: number) => {
    const auxActive = Array(6).fill(false);
    auxActive[id] = true;
    setActive(auxActive);
  };

  return (
    <Dialog
      onClose={props.handleClose}
      open={props.shouldOpenModal}
      className="dialog"
      maxWidth={"lg"}
    >
      <DialogTitle>Set your signature</DialogTitle>
      <div className="close-button" onClick={props.handleClose}>
        <IconButton icon={icons.closeIcon} />
      </div>
      <DialogContent>
        <DialogContentText className="dialog-content">
          <TextField
            id="outlined-basic"
            placeholder="Type your name here"
            variant="outlined"
            className="dialog-input"
            onChange={handleChange}
          />
          <div className="container">
            <div
              className={active[0] ? "square font-1 active" : "square font-1"}
              onClick={(e) => onSquareClick(0)}
            >
              {value ? value : defaultText}
            </div>
            <div
              className={active[1] ? "square font-2 active" : "square font-2"}
              onClick={(e) => onSquareClick(1)}
            >
              {value ? value : defaultText}
            </div>
            <div
              className={active[2] ? "square font-3 active" : "square font-3"}
              onClick={(e) => onSquareClick(2)}
            >
              {value ? value : defaultText}
            </div>
          </div>
          <div className="container">
            <div
              className={active[3] ? "square font-4 active" : "square font-4"}
              onClick={(e) => onSquareClick(3)}
            >
              {value ? value : defaultText}
            </div>
            <div
              className={active[4] ? "square font-5 active" : "square font-5"}
              onClick={(e) => onSquareClick(4)}
            >
              {value ? value : defaultText}
            </div>
            <div
              className={active[5] ? "square font-6 active" : "square font-6"}
              onClick={(e) => onSquareClick(5)}
            >
              {value ? value : defaultText}
            </div>
          </div>
          <div className="container"></div>
        </DialogContentText>
      </DialogContent>
      <div className="footer">
        <div className="margin-right-10">
          <Button variant="contained" onClick={props.handleClose}>
            Cancel
          </Button>
        </div>

        <Button
          variant="contained"
          color="secondary"
          onClick={props.handleClose}
        >
          Sign
        </Button>
      </div>
    </Dialog>
  );
}

export default SignModal;
