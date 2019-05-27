import React, { Component } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement(".app-wrapper");
//this is the process on how to clear the error message that would affect a user if they were using a screen reader because when the modal was open with out this the screen reader would attempt to look at the data behind the open modal. .setAppElement(el) expects an element as its argument, which is the class of what wraps up the whole project. Which could be found in the index.html page

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%",
        width: "800px"
      },
      overlay: {
        backgroundColor: "rgba(1,1,1,0.65)"
      }
    };
  }
  render() {
    return (
      <div>
        <ReactModal
          style={this.customStyles}
          onRequestClose={() => {
            this.props.handleModalClose();
          }}
          isOpen={this.props.modalIsOpen}
        >
          <h1>I am in a modal!!</h1>
        </ReactModal>
      </div>
    );
  }
}
