import React, { Component } from "react";
import axios from "axios";
import RichTextEditors from "../forms/rich-text-editors";
import DropzoneComponent from "react-dropzone-component";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      blog_status: "",
      content: "",
      featured_image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(
      this
    );
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImage = this.handleFeaturedImage.bind(this);

    this.featuredImageRef = React.createRef();
  }

  componentWillMount() {
    this.setState({
      id: this.props.blog.id,
      title: this.props.blog.title,
      blog_status: this.props.blog.blog_status
    });
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleFeaturedImage() {
    return {
      addedfile: file => this.setState({ featured_image: file })
    };
  }

  handleRichTextEditorChange(content) {
    this.setState({ content });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    if (this.state.featured_image) {
      formData.append(
        "portfolio_blog[featured_image]",
        this.state.featured_image
      );
    }

    return formData;
  }

  handleFormSubmit(event) {
    axios
      .post(
        "https://anthonygallegos.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        if (this.state.featured_image) {
          this.featuredImageRef.current.dropzone.removeAllFiles();
        }

        this.setState({
          title: "",
          blog_status: "",
          content: "",
          featured_image: ""
        });

        this.props.handleSuccessfulFormSubmit(response.data.portfolio_blog);
      })
      .catch(error => {
        console.log("handleFormSubmit", error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="blog_status"
            placeholder="Blog Status"
            value={this.state.blog_status}
            onChange={this.handleChange}
          />
        </div>

        <div className="one-column">
          <RichTextEditors
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={
              this.props.editMode && this.props.blog.content
                ? this.props.blog.content
                : null
            }
          />
        </div>

        <div className="image-uploader one-column">
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFeaturedImage()}
          >
            <div className="dz-message">Featured Image</div>
          </DropzoneComponent>
        </div>

        <button className="btn">Save</button>
      </form>
    );
  }
}
