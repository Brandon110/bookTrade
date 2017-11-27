import React from 'react';
import LoginPage from './login.js'
import axios from 'axios';

module.exports = class LoginState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleEmailChange(e) {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleLogin(e) {
        e.preventDefault();

        let res = '';

        let sendingData = axios.post('/login/user', {
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
            else if (res === 'incorrect password') {
                this.clearPass();
                document.getElementById('pass-error').style.display = 'block';
            }
            else if (res === 'invalid user') {
                this.clearForm();
                document.getElementById('invalid-user').style.display = 'block';
            }
        });
    }

    clearForm() {
        this.setState({ username: '', password: '' });
    }
    
    clearPass() {
        this.setState({ password: '' })
    }

    hideErrors() {
        document.getElementById('pass-error').style.display = 'none';
        document.getElementById('invalid-user').style.display = 'none';
    }

    render() {
        return <LoginPage
      handleLogin={this.handleLogin.bind(this)}
      handleEmailChange={this.handleEmailChange.bind(this)} 
      emailVal={this.state.username}
      handlePasswordChange={this.handlePasswordChange.bind(this)}
      passVal={this.state.password}
      />
    }
}
