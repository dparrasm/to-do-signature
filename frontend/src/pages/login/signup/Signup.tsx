import { Button, TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React from "react";
import "./Signup.scss";
import { icons } from "../../../utils/icons";
import { connect, ConnectedProps } from "react-redux";
import IconButton from "../../../components/iconButton/IconButton";
import { register } from "../../../reducers/actions/authActions";

interface SignupProps {
  shouldOpenModal: boolean;
  handleClose: () => any;
  register:  any;
}

function Signup(props: SignupProps & ConnectedProps<typeof connector>) {
  
  const [user, setUser] = React.useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const { name, surname, email, password } = user;

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onUserSignup = async (event) => {
    event.preventDefault();
    props.register({ name, surname, email, password });
    props.handleClose();
  };

  const body = (
    <div className="user-container">
      <div className="title">
        <div className="firma-title modal">firm@</div>
        <div className="close-button" onClick={props.handleClose}>
          <IconButton icon={icons.closeIcon} />
        </div>
      </div>
      <div className="message">Regístrate para jugar con tus firmitas</div>
      <div className="username">
        <TextField
          name="name"
          className="field"
          type="text"
          placeholder="Name"
          variant="outlined"
          size="small"
          onChange={handleInputChange}
        />
        <div className="separator" />
        <TextField
          name="surname"
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
  );
  return <Dialog open={props.shouldOpenModal}>{body}</Dialog>;
}

const connector = connect(null, { register });
export default connector(Signup);
