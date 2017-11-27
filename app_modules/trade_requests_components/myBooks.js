import React from 'react';
import TradeRequest from './tradeRequest_state.js';

module.exports = class MyBooksPage extends React.Component {
    render() {
        const myBooks = this.props.data;
 
        return (
            <div className='container myBooksPage'>
            <TradeRequest /> 
            <div className='form-group'>
            <label className='col-12 col-form-label' htmlFor='add_book'>Add Book</label>
            <div className='col-12 addBookContainer'>
            <input className='inputBookTitle' onChange={(e) => this.props.handleChange(e)} type='text' name='add_book' placeholder="Add book by title" value={this.props.input} />
            <button onClick={() => this.props.handleClick()} type='button' className='btn btn-primary addBookBtn'>Add</button>
            </div>
            </div>
            
            <div className='myBooks'>
            <h1>My books:</h1>
            <div className='grid'>
            {
            myBooks.length > 0 ?
            myBooks.map((result, index) => {
             return (
             <div className='grid-item' key={index}>
             
             <div className='rmvBtn'>
             <button onClick={(e) => this.props.handleRemoveBtn(e)} id={result._id} type='button' className='cancelBtn'>&#10006;</button>
             </div>
             
              <img src={result.bookData.thumbnail} alt={result.bookData.title}/>       
             </div> 
              )
            }) : false
            }
            </div>
            </div>
            </div>
        )
    }
}