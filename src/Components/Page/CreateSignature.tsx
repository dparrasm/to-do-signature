import React, { Component } from "react";
import DynamicForm, { formFields } from "../DynamicForm";

const createSignature: formFields[] = [
  { id: "123asd", label: "Title", type: "text", placeholder: "" },
  { id: "123asf", label: "To", type: "text", placeholder: "" }
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
