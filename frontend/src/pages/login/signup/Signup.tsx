import { Button, TextField } from "@material-ui/core";
import IconButton from "../../../components/iconButton/IconButton";
import { Dialog } from "@material-ui/core";
import React from "react";
import './Signup.scss';
import { icons } from "../../../utils/icons";
import { UserModel } from "../../../components/user/UserModel";



interface SignupProps {
    shouldOpenModal: boolean;
    handleClose: () => any;
}

export default function Signup(props: SignupProps) {
    const [user,setUser] = React.useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) =>{
        console.log(e, " is my value")
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }
    const onUserSignup = (event) => {
        event.preventDefault();
        fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((res) => {
            if (res.status === 200) {
              alert("User created, routing to login page");
            } else {
              alert(
                `This email is already registered: ${user.email}`
              );
            }
            props.handleClose();
          })
          .catch((err) => {
            console.error(err.errmsg);
            alert("Error registering new user please try again.");
          });
      };
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
                    name = "name"
                    className="field"
                    type="text"
                    placeholder="Name"
                    variant="outlined"
                    size="small"
                    onChange={handleInputChange}
                 />
                <div className="separator"/>
                <TextField
                    name = "surname"
                    className="field"
                    type="text"
                    placeholder="Surname"
                    variant="outlined"
                    size="small"
                    onChange={handleInputChange}
                />
            </div>
            <TextField
                name="email"
                className="field"
                type="text"
                placeholder="Email"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
            />
            <TextField
                name="password"
                className="field"
                type="password"
                placeholder="password"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
            />
            <Button
                className="button"
                variant="contained"
                color="primary"
                onClick={onUserSignup}
            >
                Sign up
        </Button>
        </div>
    )
    return (
        <Dialog
            open={props.shouldOpenModal}
        >
            {body}
        </Dialog>
    )
}