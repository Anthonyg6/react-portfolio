import React from "react";

const BlogFeatureImage = props => {
  if (!props.img) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={props.img} />
    </div>
  );
};
export default BlogFeatureImage;
