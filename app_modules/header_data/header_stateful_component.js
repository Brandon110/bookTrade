import React from 'react';
import Header from './header.js';
import axios from 'axios';

module.exports = class HeaderState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.handlesSignedInUser();
    }

    handlesSignedInUser() {
        axios.get('/user')
            .then(function(response) {
                this.setState({ user: response.data })
            }.bind(this))
            .catch(err => {
                return err;
            });
    }

    render() {
        return <Header user={this.state.user} />
    }
}
