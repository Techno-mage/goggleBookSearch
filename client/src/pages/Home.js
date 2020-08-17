import React, {useState, useEffect} from 'react';
import {List} from "../components/List";
import Book from "../components/Book";
import Form from "../components/Form";
import API from "../utils/API";

export default function Home() {

  useEffect(() => {
    document.title = "Google Books Searcher"
  }, [])

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  

  const handleInputChange = event => {
    setSearch(event.target.value)
  };

  const handleFormSubmit = event =>{
    event.preventDefault();
    API.getBooks(search)
    .then( res => {
      console.log(res.data)
      if (res.data.length === 0) {
        throw new Error("No results found.");
      }
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      
      setResults(res.data)
      
      
    })
  }


  return (
    <div>
      <Form
        q={search}
        handleInputChange = {handleInputChange}
        handleFormSubmit = {handleFormSubmit}
      />
      {/* <List>
        {results.map(e =>{ return <Book
          title = {e.volumeInfo.title}
          subtitle = {e.volumeInfo.subtitle}
          authors = {e.volumeInfo.authors}
          link = {e.volumeInfo.infoLink}
          description = {e.volumeInfo.description}
          image = {e.volumeInfo.imageLinks.thumbnail}

          
          
          />
        })}
      </List> */}

      {console.log(results)}


     
    </div>
  )
}
