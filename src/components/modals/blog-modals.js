import React, { Component } from "react";
import ReactModal from "react-modal";

export default class BlogModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ReactModal isOpen={this.props.modalIsOpen}>
          <h1>I am in a modal!!</h1>
        </ReactModal>
      </div>
    );
  }
}
