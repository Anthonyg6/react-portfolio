import React from "react";
import contact from "../../../static/assets/images/contactPageImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function() {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column"
        style={{
          background: "url(" + contact + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column">
        <div className="contact-bullet-points">
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="phone" />
            </div>

            <div className="text">8012308545</div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="paper-plane" />
            </div>

            <div className="text">anthonygallegos6@gmail.com</div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-pin" />
            </div>

            <div className="text">Salt Lake City, UT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
