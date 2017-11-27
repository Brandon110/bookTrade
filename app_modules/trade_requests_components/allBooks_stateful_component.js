import React from 'react';
import AllBooksPage from './allBooks.js';
import axios from 'axios';

module.exports = class AllBooksState extends React.Component {
       constructor(props) {
        super(props);

        this.state = {
            allBooks: [],
            user: null,
            tradeRequestsSent: []
        }
    }
    
    componentDidMount() {
        this.handleAllBookData();
        this.handleSignedInUser();
    }
    
   handleSignedInUser() {
        axios.get('/user')
            .then(function(response) {
                this.setState({ user: response.data })
            }.bind(this))
            .catch(err => {
                return err;
            });
    }

   handleAllBookData() {
        axios.get('/api/all-data')
            .then(function(response) {
                this.setState({ allBooks: response.data })
            }.bind(this))
            .catch(err => {
                return err;
            });
    }
 
    handleSendTradeRequest(e) {
        const div = document.getElementById(e.target.id);
        let newTrade = '';
        
        let sendingData = axios.post('/trade/request/' + e.target.id + '/by/user/'+ e.target.name, {
                data: {}
            })
            .then(response => {
                newTrade = response.data.bookData.title;
                return response.statusText;
            })
            .catch(err => {
                return err;
            });

        sendingData.then(result => {
            this.handleAllBookData();
        });
    }
    
    render() {
        return <AllBooksPage
            handleSendTradeRequest={this.handleSendTradeRequest.bind(this)} 
            data={this.state.allBooks}
            user={this.state.user} 
            />
    }
}