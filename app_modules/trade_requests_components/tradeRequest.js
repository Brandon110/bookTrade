import React from 'react';

module.exports = class Trade extends React.Component {
    toggleYourCurrentRequest() {
        const yourTradeRequestInfo = document.getElementById('my-trade-request-info');
       
        this.props.handleApprovedSentTrades();
        this.props.handleTradeRequestsSent();

        yourTradeRequestInfo.style.display === 'none' ?
            yourTradeRequestInfo.style.display = 'block' :
            yourTradeRequestInfo.style.display = 'none';
    }

    toggleMyCurrentRequest() {
        const myTradeRequest = document.getElementById('trade-request-for-you');
        
        this.props.handleUnapprovedIncomingTradeRequest();

        myTradeRequest.style.display === 'none' ?
            myTradeRequest.style.display = 'block' :
            myTradeRequest.style.display = 'none';
    }

    render() {
        const tradeRequestsSent = this.props.tradeRequestsSent;
        const unapprovedTradeRequests = this.props.unapprovedTradeRequests;
        const approvedIncomingTradeRequests = this.props.approvedIncomingTradeRequests;
        const approvedSentTrades = this.props.approvedSentTrades;

        return (
            <div>
            <div className='tradeButtons'>
            <button onClick={this.toggleYourCurrentRequest.bind(this)} className='btn btn-success' type='button'>Your Current Trade Request ({tradeRequestsSent.length} outstanding)</button>
            <div id='my-trade-request-info' style={{display: 'none'}}>
            <div className='your-request'>
            {
            tradeRequestsSent.length > 0 ? 
            <h5>Trade request sent:</h5>
            : false
            }
            <div className='unapprovedSentRequests'>
           {
            tradeRequestsSent.map((result, index) => {
                 return (
                  <div key={index} className='outterWrapper'>
                  <span>{result.tradeRequest.title}</span>
                  <button onClick={(e) => this.props.handleCancelTradeRequest(e)} id={result._id} type='button' className='cancelBtn'> &#10799; </button>
                  </div>  
                 )
             })
            }
            </div>
            </div>
            <div className='approved-request'>
            {
            approvedSentTrades.length > 0 ?
            <h5>Your approved sent trade requests:</h5>
            : false
            }
            <div className='approvedSentRequests'>
            {
            approvedSentTrades.map((result, index) => {
                 return (
                  <div key={index} className='outterWrapper'>
                   <span>{result.tradeRequest.title}</span>
                   <button id={result._id} onClick={(e) => this.props.handleCancelTradeRequest(e)} type='button' className='cancelBtn'>&#10799;</button>
                  </div>  
                 )
             })
            }
            </div>
            </div>
            </div>
            </div>

            <div className = 'tradeButtons'>
            <button onClick={this.toggleMyCurrentRequest.bind(this)} type='button' className='btn btn-info'>Trade request for you ({unapprovedTradeRequests.length} unapproved)</button> 
            <div id = 'trade-request-for-you'
            style = { { display: 'none' } } >
            <div className='unapproved'>
            {
            unapprovedTradeRequests.length > 0 ?
            <h5>unapproved incoming request:</h5>
            : false
            }
            <div>
            {
            unapprovedTradeRequests.map((result, index) => {
                 return (
                  <div key={index} className='outterWrapper'>
                  <span>{result.tradeRequest.title}</span>
                  <button onClick={(e) => this.props.handleAcceptTradeRequests(e)} type='button' id={result._id}  className='acceptBtn'>&#x2713;</button>
                  <button id={result._id} onClick={(e) => this.props.handleCancelTradeRequest(e)}type='button' className='cancelBtn'>&#10799;</button>
                  </div>  
                 )
             })
            }
            </div>
            </div>
            
            <div className='approved-request'>
            {
            approvedIncomingTradeRequests.length > 0 ?
            <h5>approved incoming request</h5>
            : false
            }
            <div id='approved-request'>
            {
            approvedIncomingTradeRequests.map((result, index) => {
                 return (
                  <div key={index} className='outterWrapper'>
                  <span>{result.tradeRequest.title}</span>
                  <button id={result._id} onClick={(e) => this.props.handleCancelTradeRequest(e)} type='button'  className='cancelBtn'> &#10799;</button>
                  </div>  
                 )
             })
            }
            </div>
            </div> 
            </div> 
            </div> 
            </div>
        )
    }
}