import React from 'react';
import ReactDOM from 'react-dom';
import MyBooks from './app_modules/trade_requests_components/myBooks_stateful_component';
import HomePage from './app_modules/home/home';
import LoginForm from './app_modules/login_page/login_stateful_component';
import RegisterPage from './app_modules/register_page/register_stateful_component';
import Settings from './app_modules/settings_data/settings_state';
import Header from './app_modules/header_data/header_stateful_component';
import AllBooks from './app_modules/trade_requests_components/allBooks_stateful_component';
import Footer from './app_modules/footer/footer'
import { BrowserRouter, Switch, Route, Link, hashHistory } from 'react-router-dom';
 
ReactDOM.render((
  <BrowserRouter history={hashHistory}>
  <div>
  <Header />
   <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/login" component={LoginForm}/>
    <Route path="/register" component={RegisterPage}/>
    <Route path="/settings" component={Settings}/>
    <Route path="/myBooks" component={MyBooks}/>
    <Route path="/allBooks" component={AllBooks}/>
    </Switch>
    <Footer />
    </div>
  </BrowserRouter>),
    document.getElementById('app'));
