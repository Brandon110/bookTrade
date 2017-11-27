import React from 'react';
 
module.exports = class RegisterForm extends React.Component {
    render() {
        return (
            <div className='text-center container'>
            <h3>Register account with BookTrade</h3>
            <form className='form-group' onSubmit={(e) => this.props.handleRegister(e)}>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='name'>Name</label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleNameChange(e)} className='form-control' type='text' name='name' placeholder="what's your name" value={this.props.nameVal} required/>
            </div>
            </div>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='email'>Email</label>
            <div className='col-10'>
            <div className='alert alert-danger' id='user-exists'>
            <span>Email Already in use</span>
            </div>
            <div className='alert alert-danger' id='email-error'>
            <span>Invalid email address</span>
            </div>
            <input onChange={(e) => this.props.handleEmailChange(e)} className='form-control' type='text' name='email' placeholder='fill in your email' value={this.props.emailVal} required/>
            </div>
            </div>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='password'>Password</label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handlePasswordChange(e)} className='form-control' type='password' name='password' placeholder='choose password' value={this.props.passVal} required/>
            </div>
            </div>
            
            <div>
            <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
            </form>
            </div>
        )
    }
}