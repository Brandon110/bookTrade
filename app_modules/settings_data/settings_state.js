import React from 'react';
import axios from 'axios';
import SettingsPage from './settings.js';

module.exports = class Settings_state extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            state: ''
        }
    }

    componentDidMount() {
        this.handleAccountSettings();
    }

    handleCityChange(e) {
        this.setState({ city: e.target.value })
    }

    handleStateChange(e) {
        this.setState({ state: e.target.value })
    }

    handleUpdateSettings(e) {
        e.preventDefault();

        let data = {
            city: this.state.city,
            state: this.state.state
        }

        let sendingData = axios.post('/update/settings', {
                city: data.city,
                state: data.state
            })
            .then(response => {
                return response.statusText;
            })
            .catch(err => {
                return err;
            });

        sendingData.then(result => {
            return result;
        });
    }

    handleAccountSettings() {
        axios.get('/user/settings')
            .then(function(response) {
                this.setState({ city: response.data.accountSettings.city, state: response.data.accountSettings.state })
            }.bind(this))
            .catch(err => {
                return err;
            })
    }

    render() {
        return <SettingsPage 
            handleUpdateSettings={this.handleUpdateSettings.bind(this)}
            handleCityChange={this.handleCityChange.bind(this)}
            city={this.state.city}
            handleStateChange={this.handleStateChange.bind(this)}
            state={this.state.state}
            />
    }
}
