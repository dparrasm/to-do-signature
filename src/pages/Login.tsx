import { Link, Route } from "react-router-dom";
import React, { Component } from "react";
import DynamicForm, { formFields } from "../Components/DynamicForm";

const loginForm: formFields[] = [
  {
    id: "123asd",
    label: "User name",
    type: "text",
    placeholder: "User name..",
    helperText: "true"
  },
  { id: "123asf", label: "Password", type: "password", placeholder: "Password" }
];

interface LoginProps {
  classes?: any;
  onUserLogIn?: any;
}

class Login extends Component<LoginProps, any> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      message: "Loading..."
    };
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch("/api/home", {
      method: "get",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then((res) => res.text())
      .then((res) => this.setState({ message: res }));
  }
  //GET message from server using fetch api

  render() {
    return (
      <div>
        <h2>Login Page</h2>
        {this.state.message}
        <DynamicForm
          fields={loginForm}
          onSubmitClick={this.props.onUserLogIn}
          onSubmitText="Login"
        />
      </div>
    );
  }
}

export default Login;
