import React from 'react';
import TradeRequest from './tradeRequest_state.js';

module.exports = class AllBooksPage extends React.Component {
    render() {
        const books = this.props.data;
        const user = this.props.user;

        return (
        <div className='container'>
         <TradeRequest />
         <h1>All Books:</h1>
         <p>Click the &#128214; symbol to request a trade</p>
            <div className='grid'>
           {
           books.map((result, index) => {
           return (
           <div className='grid-item' key={index}>
           {
          user && user.email !== result.bookData.owner && result.bookData.requested_to_trade === false ? 
               <div  className='tradeBtn'>
                <button onClick={(e) => this.props.handleSendTradeRequest(e)} id={result._id} name={result.bookData.owner} className='tradeSymbol' type='button'>&#128214;</button>
                </div>
               : ''
           }
            <img src={result.bookData.thumbnail} alt={result.bookData.title} />
            </div>
             )
           })
           }
           </div>
           </div>
        )
    }
}
