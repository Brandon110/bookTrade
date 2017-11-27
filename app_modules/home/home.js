import React from 'react';

module.exports = class HomePage extends React.Component {
    render() {
        return (
        <div>
        <div className='headingContainer'>
        <h1 className="title">BookTrade</h1>
        <h4>Trade and manage books</h4>
        <i className='fa fa-bookmark-o'></i>
        </div>
        
        <div className='container'>
        <h1>Features:</h1>
        <div className='row'>
        <div className='col-md-4'>
        <p><b>View all books users added</b></p>
        </div>
        <div className='col-md-4'>
        <p><b>Add and manage books</b></p>
        </div>
        <div className='col-md-4'>
        <p><b>Request to trade books with users</b></p>
        </div>
        <div className='col-md-4'>
        <p><b>Easily manage books and trade requests from dashboard</b></p>
        </div>
        </div>
        </div>
        </div>
        )
    }
}