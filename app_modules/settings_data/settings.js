import React from 'react';

module.exports  = class SettingsPage extends React.Component {
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
            <form method='post' action='/change/password'>
             <div className='form-group row'>
             <label className='col-2 col-form-label' htmlFor='current_password'>Current Password</label>
             <div className='col-10'>
             <input className='form-control' type='password' name='current_password' placeholder='current password' />
             </div>
             </div>
             
             <div className='form-group row'>
             <label className='col-2 col-form-label' htmlFor='new_password'>New Password</label>
             <div className='col-10'>
             <input className='form-control' type='password' name='new_password' placeholder='new password' />
             </div>
             </div>
             <button type='submit' className='btn btn-primary'>Change Password</button>
            </form>
            </div>
            </div>
        )
    }
}