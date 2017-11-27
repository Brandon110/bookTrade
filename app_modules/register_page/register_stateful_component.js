import React from 'react';
import RegisterPage from './register.js';
import axios from 'axios';

module.exports = class RegisterState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            name: ''
        }
    }

    handleEmailChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleRegister(e) {
        e.preventDefault();

        let res = '';

        let sendingData = axios.post('/register/user', {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                res = response.data;
                return response.statusText;
            })
            .catch(err => {
                return err;
            });

        sendingData.then(result => {
            this.hideErrors();

            if (res === 'success') {
                this.clearForm();
                window.location.replace('/');
            }
            else if (res === 'invalid email') {
                document.getElementById('email-error').style.display = 'block';
            }
            else if (res === 'user exists') {
                document.getElementById('user-exists').style.display = 'block';
            }
        });
    }

    clearForm() {
        this.setState({ name: '', username: '', password: '' });
    }

    hideErrors() {
        document.getElementById('email-error').style.display = 'none';
        document.getElementById('user-exists').style.display = 'none';
    }

    render() {
        return <RegisterPage 
        handleRegister={this.handleRegister.bind(this)}
        handleNameChange={this.handleNameChange.bind(this)}
        nameVal={this.state.name}
        handleEmailChange={this.handleEmailChange.bind(this)}
        emailVal={this.state.username}
        handlePasswordChange={this.handlePasswordChange.bind(this)}
        passVal={this.state.password}
        />
    }
}
