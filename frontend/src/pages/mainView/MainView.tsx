import React, { useEffect, useState } from "react";
import CreateSignature from "../createSignature/CreateSignature";
import { connect, ConnectedProps } from "react-redux";
//TODO ver por qué no se puede actualizar el state al hacer refresh
import { setPath } from "../../reducers/actions/routerActions";

interface MainViewProps {
  classes?: any;
  path?: string;
}
function MainView(props: MainViewProps & ConnectedProps<typeof connector>) {
  // useEffect(() => {
  //   debugger;
  //   setPath(document.location.pathname);
  // }, []);

  switch (props.path != null ? props.path : document.location.pathname) {
    case "/":
      return (
        <div>
          <h1>Home</h1>
          <CreateSignature />
        </div>
      );
    case "/signed":
      return (
        <div>
          <h1>Signed</h1>
          <CreateSignature />
        </div>
      );
    case "/documents":
      return (
        <div>
          <h1>Documents</h1>
          <CreateSignature />
        </div>
      );
    case "/send":
      return (
        <div>
          <h1>Send</h1>
          <CreateSignature />
        </div>
      );
    case "/received":
      return <h1>Ballena</h1>;
    case "/contacts":
      return (
        <div>
          <h1>Contacts</h1>
          <CreateSignature />
        </div>
      );
    case "/user":
      return (
        <div>
          <h1>User</h1>
          <CreateSignature />
        </div>
      );
    default:
      return <h1>Ruta no definida</h1>;
  }
}

const mapStateToProps = (state) => ({
  path: state.router.path,
});
const connector = connect(mapStateToProps, {});
export default connector(MainView);
