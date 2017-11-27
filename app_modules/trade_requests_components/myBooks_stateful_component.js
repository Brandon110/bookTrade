import React from 'react';
import MyBooksPage from './myBooks.js';
import axios from 'axios';

module.exports = class MyBooksState extends React.Component {
        constructor(props) {
        super(props);

        this.state = {
            bookTitle: '',
            myBooks: [],
        }
    }

    componentDidMount() {
        this.handleMyBooksData();
    }
    
    
    handleChange(e) {
        this.setState({ bookTitle: e.target.value })
    }

    handleClick() {
        const data = {
            inputVal: this.state.bookTitle
        }

        let sendingData = axios.post('/add/book/' + data.inputVal, {
            data: {}
        }).then(response => {
            return response.statusText;
        }).catch(err => {
            return err;
        });

        sendingData.then(result => {
            this.clearForm();
            this.handleMyBooksData();
        });
    }

    clearForm() {
        this.setState({ bookTitle: '' })
    }
    
        handleMyBooksData() {
        axios.get('/api/my-books')
            .then(function(response) {
                this.setState({ myBooks: response.data })
            }.bind(this))
            .catch(err => {
                return err;
            });
    }
    
        handleRemoveBtn(e) {
        let remove_id = {
            _id: e.target.id
        }

        let sendingData = axios.post('/remove/book/' + remove_id._id, {
                data: {}
            })
            .then(response => {
                return response.statusText;
            })
            .catch(err => {
                return err;
            });

        sendingData.then(result => {
            this.handleMyBooksData();
        });
    }
    
    render() {
        return  <MyBooksPage
            input={this.state.bookTitle}
            handleChange={this.handleChange.bind(this)}
            handleClick={this.handleClick.bind(this)}
            data={this.state.myBooks}
            handleRemoveBtn={this.handleRemoveBtn.bind(this)}
            />
    }
}