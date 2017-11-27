import React from 'react';

module.exports = class SettingsPage extends React.Component {
    render() {
        return (
            <div className='container'>
            <h1>Account settings</h1>
            
            <div className='updateAccountData'>
            <h3>Update Country or State</h3>
            <form onSubmit={(e) => this.props.handleUpdateSettings(e)}>
             <div className='form-group row'>
             <label className='col-2 col-form-label' htmlFor='city'>City</label>
             <div className='col-10'>
             <input onChange={(e) => this.props.handleCityChange(e)} className='form-control' type='text' name='city' placeholder='city' value={this.props.city} /> 
             </div>
             </div>
             
             <div className='form-group row'>
             <label className='col-2 col-form-label' htmlFor='state'>State</label>
             <div className='col-10'>
             <input onChange={(e) => this.props.handleStateChange(e)} className='form-control' type='text' name='state' placeholder='state' value={this.props.state} />
             </div>
             </div>
             <button type='submit' className='btn btn-primary'>Update</button>
            </form>
            </div>
            
            <div className='updateAccountData'>
            <h3>Change Password</h3>
            <form onSubmit={(e) => this.props.handleChangePassword(e)}>
               <div id='pass-success' className='alert alert-success'>
            <span>Succesfully Changed Password!</span>
            </div>
             <div className='form-group row'>
             <label className='col-2 col-form-label' htmlFor='current_password'>Current Password</label>
             <div className='col-10'>
            <div id='pass-error' className='alert alert-danger'>
            <span>Incorrect password.</span>
            </div>
             <input onChange={(e) => this.props.handleCurrentPassword(e)} className='form-control' type='password' placeholder='current password' value={this.props.currPassVal} required/>
             </div>
             </div>
             
             <div className='form-group row'>
             <label className='col-2 col-form-label' htmlFor='new_password'>New Password</label>
             <div className='col-10'>
             <input onChange={(e) => this.props.handleNewPassword(e)} className='form-control' type='password' placeholder='new password' value={this.props.newPassVal} />
             </div>
             </div>
             <button type='submit' className='btn btn-primary'>Change Password</button>
            </form>
            </div>
            </div>
        )
    }
}
