import React, {useState, useEffect} from 'react';
import {List} from "../components/List";
import Book from "../components/Book";
import Form from "../components/Form";
import API from "../utils/API";


export default function Saved() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    document.title = "Saved books"
    getSaved();
    


  }, [])

  const getSaved = () => {
    API.getSavedBooks()
    .then(res => {
      console.log(res.data)
      setResults(res.data)
    })
  }

  const removeBook = (id) =>{
    console.log(id)
    API.deleteBook(id)
    .then(()=> getSaved())
  }


  return (
    <div>
      <List>
        {results.map(e =>{ return <Book
          key={e._id}
          title = {e.title}
          subtitle = {e.subtitle}
          authors = {e.authors}
          link = {e.infoLink}
          description = {e.description}
          image = {e.image}
          Button = {() => ( <button
            onClick = {() =>removeBook(e._id)}>remove</button>)}

          
          
          />
        })}
      </List>
    </div>
  )
}
