import React, { Component } from 'react';
import {graphql} from 'react-apollo';

import {getBookDetails} from '../query/queries';

class BookDetail extends Component {
    
    displayBookDetail(){
        const {book} = this.props.data; 
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Author Name:</strong> {book.author.name}</p>
                    <p><strong>All books by the Author:</strong></p>
                    <ul>
                        {
                            book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div>No Books Selected</div>
            )
        }
    }
    render() {
        return (
            <div id="bookdetails">
                {this.displayBookDetail()}
            </div>
        );
  }
}

export default graphql(getBookDetails,{
    options: (props) =>{
        return{
            variables:{
                id: props.bookId
            }
        }
    }
})(BookDetail)