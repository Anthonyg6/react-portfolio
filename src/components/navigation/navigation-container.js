import React, { Component } from 'react';

export default class NavigationContainer extends Component {
    constructor(){
        super()
    }

    render() {
        return (
            <div>
                <button>About</button>
                <button>Home</button>
                <button>Contact</button>
                <button>Blog</button>
                { true ? <button>Add Blog</button> : null }
            </div>
        )
    }
}