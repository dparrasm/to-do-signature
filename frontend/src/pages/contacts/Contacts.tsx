import React, { Component } from "react";
import IconButton from "../../components/iconButton/IconButton";
import { icons } from "../../utils/icons";

interface CreateSignatureProps {
  classes?: any;
}

class Contacts extends Component<CreateSignatureProps, any> {
  render() {
    return (
      <div>
        <h2>Create signature bb</h2>
        <IconButton icon={icons.tools} />
      </div>
    );
  }
}

export default Contacts;
