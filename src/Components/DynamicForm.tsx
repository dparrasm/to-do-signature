import {
  Button,
  FormHelperText,
  InputLabel,
  TextField,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";

const styles = {
  formContainer: {
    width: "100%",
    height: "100%"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  list: {
    listStyleType: "none",
    width: "80%",
    paddingRight: "32px",
    backgroundColor: "white",
    paddingBottom: "50px",
    borderStyle: 'solid',
    borderColor: '#e0e0de',
    borderWidth: '1px',
    borderRadius: '5%'
  },
  field: {
    marginTop: "35px"
  },
  textField: {
    width: "100%"
  },
  buttonRow: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  }
};

export type formFields = {
  id: string,
  label: string,
  type: string,
  placeholder: string,
  helperText?: string
};
export type fields = { [id: string]: string };
interface FormProps {
  classes?: any;
  fields: formFields[];
  formWidth?: string;
  onSubmitClick?: any;
  onSubmitText?: any;
}
interface FormState {
  fields: fields[];
}

class DynamicForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
  }

  render() {
    const { fields, classes } = this.props;
    return (
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <ul className={classes.list}>
            {fields.map((row: formFields) => {
              return (
                <li key={row.id} className={classes.field}>
                  <InputLabel>{row.label}</InputLabel>
                  <TextField
                    className={classes.textField}
                    type={row.type}
                    placeholder={row.placeholder}
                    variant="outlined"
                    size="small"
                  />
                  {row.helperText ? (
                    <FormHelperText id="my-helper-text">
                      We'll never share your email.
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
            <li className={classes.buttonRow}>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  this.props?.onSubmitClick || console.log("Submit clicked!")
                }
              >
                {this.props?.onSubmitText || "SUBMIT"}
              </Button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(DynamicForm);
