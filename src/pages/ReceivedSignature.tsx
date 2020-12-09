import React, { Component } from "react";
import DynamicForm, { formFields } from "../Components/DynamicForm";

const createSignature: formFields[] = [
  { id: "123asd", label: "Hello world", type: "text", placeholder: "Compadre" },
  { id: "123asf", label: "Hello sun", type: "password", placeholder: "bro" }
];

interface CreateSignatureProps {
  classes?: any;
}

class ReceivedSignature extends Component<CreateSignatureProps, any> {
  constructor(props: CreateSignatureProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Que si funciona</h2>
        <DynamicForm fields={createSignature} />
      </div>
    );
  }
}

export default ReceivedSignature;
