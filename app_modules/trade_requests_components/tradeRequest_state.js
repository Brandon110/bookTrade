import React from 'react';
import TradeRequest from './tradeRequest.js';
import axios from 'axios';

module.exports = class Trade_state extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tradeRequestsSent: [],
            unapprovedIncomingTradeRequests: [],
            approvedIncomingTradeRequests: [],
            approvedSentTrades: []
        }
    }
    
    componentDidMount() {
        this.handleTradeRequestsSent();
        this.handleUnapprovedIncomingTradeRequest();
        this.handleApprovedSentTrades();
        this.handleApprovedIncomingTradeRequests();
        
    }
    
    handleTradeRequestsSent() {
        axios.get('/current/unapproved-sent/requests')
        .then(function(response) {
            this.setState({ tradeRequestsSent: response.data });
        }.bind(this))
        .catch(err => {
           return err;
        });
    }
    
    handleUnapprovedIncomingTradeRequest() {
        axios.get('/current/unapproved/trades')
        .then(function(response){
            this.setState({ unapprovedIncomingTradeRequests: response.data });
        }.bind(this))
        .catch(err => {
            return err;
        });
    }
    
  handleAcceptTradeRequests(e) {
         let sendingData = axios.post('/accept/trade/requests', {
            id: e.target.id
        })
        .then(response => {
            return response.statusText;
        })
        .catch(err => {
           return err; 
        });
        
        sendingData.then(result => {
            this.handleApprovedIncomingTradeRequests();
            this.handleUnapprovedIncomingTradeRequest();
        });
    }
    
    handleApprovedIncomingTradeRequests() {
             axios.get('/current/approved-incoming/trades')
        .then(function(response){
            this.setState({ approvedIncomingTradeRequests: response.data });
        }.bind(this))
        .catch(err => {
            return err;
        });
    }
    
    handleApprovedSentTrades() {
      axios.get('/current/approved-sent/trades')
        .then(function(response){
            this.setState({ approvedSentTrades: response.data });
        }.bind(this))
        .catch(err => {
            return err;
        });
    }
    
     handleCancelTradeRequest(e) {
     let sendingData =  axios.post('/cancel/trade/request/' + e.target.id, {
            data: {}
        })
        .then(function(response){
            return response.statusText;
        })
        .catch(err => {
            return err;
        });
        
        sendingData.then(result => {
            this.handleTradeRequestsSent();
            this.handleUnapprovedIncomingTradeRequest();
            this.handleApprovedIncomingTradeRequests();
            this.handleApprovedSentTrades();
            
        });
    }
    
    render() {
      return <TradeRequest
      tradeRequestsSent={this.state.tradeRequestsSent}
      handleTradeRequestsSent={this.handleTradeRequestsSent.bind(this)}
      unapprovedTradeRequests={this.state.unapprovedIncomingTradeRequests}
      handleUnapprovedIncomingTradeRequest={this.handleUnapprovedIncomingTradeRequest.bind(this)}
      handleAcceptTradeRequests={this.handleAcceptTradeRequests.bind(this)}
      approvedIncomingTradeRequests={this.state.approvedIncomingTradeRequests}
      approvedSentTrades={this.state.approvedSentTrades}
      handleApprovedSentTrades={this.handleApprovedSentTrades.bind(this)}
      handleCancelTradeRequest={this.handleCancelTradeRequest.bind(this)}
      />
    }
}