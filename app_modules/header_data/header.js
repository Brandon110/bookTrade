import React from 'react';
import { NavLink, Link } from 'react-router-dom';

module.exports = class Header extends React.Component {

    handleDropDownMenu() {
        const dropDown = document.getElementById('dropDown');

        dropDown.style.display === 'none' ? dropDown.style.display = 'block' : dropDown.style.display = 'none';
    }

    render() {
        const user = this.props.user;

        return (

            <header>
     {
     user ?
      <nav>
      <div className='headerBtns'>
      <NavLink to='/' exact activeClassName='active'>Home</NavLink>
      
      <div className='logoutBtn'>
      <div className='settingsBtn'>
      <NavLink to='/settings' activeClassName='active'><b>&#9881;</b></NavLink>
      </div>
      
      
      <a href='/logout/user'>Logout</a>
      </div>
      
      <div className='allBooksBtn'>
      <NavLink to='/allBooks' activeClassName='active'>All Books</NavLink>
      </div>
      
      <div className='myBooksBtn'>
      <NavLink to='/myBooks' activeClassName='active'>My Books</NavLink>
      </div>
    </div>
    
    <div className='dropDown'>
    <button className='dropDownBtn' onClick={this.handleDropDownMenu.bind(this)} type='button'>&#9776;</button>
    <ul className='dropDownContent' id='dropDown' style={{display: 'none'}}>
    <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
    <li><NavLink to='/allBooks' activeClassName='active'>All Books</NavLink></li>
    <li><NavLink to='/myBooks' activeClassName='active'>My Books</NavLink></li>
    <li><a href='/logout/user'>Logout</a></li>
    <li><NavLink to='/settings' activeClassName='active'>Settings</NavLink></li>
    </ul>
    </div>
      </nav> 
      :
      <nav>
      <div className='headerBtns'>
      <NavLink to='/' exact activeClassName='active'>Home</NavLink>
      
      <div className='loginBtn'>
      <NavLink to='/login' activeClassName='active'>Login</NavLink>
      </div>
      
      <div className='registerBtn'>
      <NavLink to='/register' activeClassName='active'>Register</NavLink>
      </div>
      </div>
      
    <div className='dropDown'>
    <button className='dropDownBtn' onClick={this.handleDropDownMenu.bind(this)} type='button'>&#9776;</button>
    <ul className='dropDownContent' id='dropDown' style={{display: 'none'}}>
    <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
    <li><NavLink to='/login' activeClassName='active'>Login</NavLink></li>
    <li><NavLink to='/register' activeClassName='active'>Register</NavLink></li>
    </ul>
    </div>
      </nav>
     }
     </header>
        )
    }
}
