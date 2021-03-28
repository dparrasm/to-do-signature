import { Button, TextField } from "@material-ui/core";
import IconButton from "../../Button";
import { Dialog } from "@material-ui/core";
import React from "react";
import './Signup.scss';
import { icons } from "../../Header/icons";


interface SignupProps {
    shouldOpenModal: boolean;
    handleClose: () => any;
}

export default function Signup(props: SignupProps) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    //const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        props.shouldOpenModal ? setOpen(true) : setOpen(false);
    })

    const body = (
        <div className="user-container">
            <div className="title">
            <div className="logo">firm@</div>
            <div className="close-button" onClick={props.handleClose}>
                <IconButton icon={icons.closeIcon}/>
            
            </div>
            </div>
            <div className="message">Regístrate para jugar con tus firmitas</div>
            <div className="username">
                <TextField
                    className="field"
                    type="text"
                    placeholder="Name"
                    variant="outlined"
                    size="small"
                />
                <div className="separator"/>
                <TextField
                    className="field"
                    type="text"
                    placeholder="Surname"
                    variant="outlined"
                    size="small"
                />
            </div>
            <TextField
                className="field"
                type="text"
                placeholder="Email"
                variant="outlined"
                size="small"
            />
            <TextField
                className="field"
                type="password"
                placeholder="password"
                variant="outlined"
                size="small"
            />
            <Button
                className="button"
                variant="contained"
                color="primary"
            >
                Sign up
        </Button>
        </div>
    )
    return (
        <Dialog
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Dialog>
    )
}