import React from 'react';
import { Link } from 'react-router-dom'

export default function(props) {
        // Data that is needed
        // - background image: thumb_image_url
        // - logo
        // - description: description
        // - id: id
        const {id, description, thumb_image_url, logo} = props.item
    return (
        <div>
            <div>{description}</div>
            <Link to={`/portfolio/${id}`}>Link</Link>
        </div>
    )
};