import React from 'react';
 
module.exports = class LoginForm extends React.Component {
    render() {
        return (
            <div className='text-center container'>
            <h3>Login to BookTrade</h3>
            <form  onSubmit={(e) => this.props.handleLogin(e)}>
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='email'>Email </label>
            <div className='col-10'>
            <div id='invalid-user' className='alert alert-danger'>
            <span>Incorrect spelling of email or user does not exist.</span>
            </div>
            <input onChange={(e) => this.props.handleEmailChange(e)} className='form-control' type='text' name='email' placeholder='email' value={this.props.emailVal} />
            </div>
            </div>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='password'>Password </label>
            <div className='col-10'>
            <div id='pass-error' className='alert alert-danger'>
            <span>Incorrect Password</span>
            </div>
            <input onChange={(e) => this.props.handlePasswordChange(e)} className='form-control' type='password' name='password' placeholder='password' value={this.props.passVal} />
            </div>
            </div>
            
            <div>
            <button className='btn btn-primary'>Login</button>
            </div>
            </form>
            </div>
        )
    }
}
