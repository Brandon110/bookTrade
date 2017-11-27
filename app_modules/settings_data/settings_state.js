import React from 'react';
import axios from 'axios';
import SettingsPage from './settings.js';

module.exports = class Settings_state extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            state: '',
            currentPassword: '',
            newPassword: ''
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

    handleCurrentPassword(e) {
        this.setState({ currentPassword: e.target.value });
    }

    handleNewPassword(e) {
        this.setState({ newPassword: e.target.value });
    }

    handleChangePassword(e) {
        e.preventDefault();

        if (!this.state.currentPassword) return false;

        let res = '';

        let sendingData = axios.post('/change/password', {
                currPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            })
            .then(function(response) {
                res = response.data;
                return response.statusText;
            })
            .catch(err => {
                return err;
            })

        sendingData.then(result => {
            this.clearForm();
            this.hideAlerts();

            if (res === 'success') {
                document.getElementById('pass-success').style.display = 'block';
            }
            else if (res === 'incorrect password') {
                document.getElementById('pass-error').style.display = 'block';
            }
        });
    }

    clearForm() {
        this.setState({ currentPassword: '', newPassword: '' })
    }

    hideAlerts() {
        document.getElementById('pass-success').style.display = 'none';
        document.getElementById('pass-error').style.display = 'none';
    }

    render() {
        return <SettingsPage 
            handleUpdateSettings={this.handleUpdateSettings.bind(this)}
            handleCityChange={this.handleCityChange.bind(this)}
            city={this.state.city}
            handleStateChange={this.handleStateChange.bind(this)}
            state={this.state.state}
            handleChangePassword={this.handleChangePassword.bind(this)}
            handleCurrentPassword={this.handleCurrentPassword.bind(this)}
            currPassVal={this.state.currentPassword}
            handleNewPassword={this.handleNewPassword.bind(this)}
            newPassVal={this.state.newPassword}
            />
    }
}
