import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import pdfIcon from "../../assets/pdfIcon.png";
import { Link } from "react-router-dom";
import store from "../../store";
import { deleteDocument } from "../../reducers/actions/documentActions";
import "./DetailedSign.scss";

interface DetailedSignProps {
  handleSign?: any;
  title: String;
  date: String;
  id: String;
}

export default class DetailedSign extends Component<DetailedSignProps, any> {
  handleSign = (): any => {
    this.props.handleSign();
  };

  deleteFile(id) {
    store.dispatch(deleteDocument(id));
  }

  render() {
    const { id } = this.props;
    return (
      <>
        <div className="sign-container">
          <form className="form">
            <div className="info">
              <img alt="document" className="document" src={pdfIcon} />
              <div className="documentInfo">
                <div>
                  <h1 className="title">{this.props.title}</h1>
                  <h2 className="date">{this.props.date}</h2>
                </div>
                <div>
                  <Avatar className="signatures-avatar">D</Avatar>
                </div>
              </div>
            </div>
            <div className="options">
              <Link to="/sign">
                <Button
                  color="primary"
                  onClick={this.handleSign}
                  className="sign-button"
                >
                  Sign
                </Button>
              </Link>
              <Button color="primary" className="sign-button">
                Send
              </Button>
              <Button color="primary" className="sign-button">
                Download
              </Button>
              <Button
                color="secondary"
                className="sign-button"
                onClick={() => this.deleteFile(id)}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
