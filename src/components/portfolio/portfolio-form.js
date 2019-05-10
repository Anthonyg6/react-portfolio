import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "name": "",
            "description": "",
            "url": "",
            "position":"",
            "category": "Social Media",
            "thumb_image": "",
            "banner_image": "",
            "logo": ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
        
    };

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({thumb_image: file}) 
        }
    };

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({banner_image: file})
        }
    };

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({logo: file})
        }
    };

    componentConfig() {
        return {
            iconFiletypes:[".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    };

    djsConfig() {
        return {
            addRemoveLinks:true,
            maxFiles: 1
        }
    };



    buildForm() {
        let formData = new FormData()

        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);

        if(this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }
        if(this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
        if(this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo);
        }
        return formData;
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit(event) {
        axios.post("https://anthonygallegos.devcamp.space/portfolio/portfolio_items",this.buildForm(), {withCredentials: true})
            .then(response => {
                this.props.handleSuccessfulFormSubmission(response.data.portfolio_item)

                this.setState({
                    "name": "",
                    "description": "",
                    "url": "",
                    "position":"",
                    "category": "Social Media",
                    "thumb_image": "",
                    "banner_image": "",
                    "logo": ""
                });
                // we are using a forEach function to simply just itterate over each item and to do so all the refs are wrapped up in an array. This gives the ability to dynamically clear each ref of its data together instead of breaking up each into its own set of code
                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles();
                });
            }).catch(error => {
                console.log("Error with handleSubmit function", error)
            })
        event.preventDefault();
    };

  render() {
    return (
      <div>
        <h1>Portfolio form</h1>
        <form onSubmit={this.handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Portfolio Item Name"
                    value={this.state.name}
                    onChange = {this.handleChange}
                />
                <input
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={this.state.url}
                    onChange = {this.handleChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={this.state.position}
                    onChange = {this.handleChange}
                />
                <select
                    name="category"
                    value={this.state.category}
                    onChange = {this.handleChange}
                >
                    <option value="Social Media">Social Media</option>
                    <option value="Search Engine">Search Engine</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Game">Game</option>
                </select>
            </div>
            <div>
                <textarea
                    type="text"
                    name="description"
                    placeholder="description"
                    value={this.state.description}
                    onChange = {this.handleChange}
                />
            </div>
            <div className="image-uploader">
                <DropzoneComponent
                    ref={this.thumbRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleThumbDrop()}
                />
                <DropzoneComponent
                    ref={this.bannerRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleBannerDrop()}
                />
                <DropzoneComponent
                    ref={this.logoRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleLogoDrop()}
                />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
      </div>
    );
  }
}