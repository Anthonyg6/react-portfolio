import React from "react";
import seflie from "../../../static/assets/images/about-me-selfie.jpg";
import { Link } from "react-router-dom";

export default function() {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column"
        style={{
          background: "url(" + seflie + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column">
        Hello my name is Anthony! I am currently a Distribution Manager at a
        reputable 3PL fulfillment warehouse based in Salt Lake City. I am
        looking to dive deeper into the Tech World and advance my skill set in
        full stack development! I have always had a curiosity on how things we
        use every day on our phones/laptops work and that's what has led me to
        finally pivot and get out of my comfort zone and dive into the
        web/software development world. I look forward too speaking with you!
        <Link className="link-to-contact" to="/contact">
          Click me
        </Link>
      </div>
    </div>
  );
}
