import React, { Component } from "react";
import DynamicForm, { formFields } from "../Components/DynamicForm";

const createSignature: formFields[] = [
  { id: "123asd", label: "Hello world", type: "text", placeholder: "Compadre" },
  { id: "123asf", label: "Hello sun", type: "text", placeholder: "bro" }
];

interface CreateSignatureProps {
  classes?: any;
}

class CreateSignature extends Component<CreateSignatureProps, any> {
  constructor(props: CreateSignatureProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Create signature</h2>
        <DynamicForm fields={createSignature} />
      </div>
    );
  }
}

export default CreateSignature;
