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
  const [message, setMessage] = useState("");
  

  const handleInputChange = event => {
    setSearch(event.target.value)
  };

  const handleSaveBook = id => {
    //event.preventDefault();
    const entry = results.find(b => b.id === id)

    console.log(entry);

    API.saveBook({
      googleId: entry.id,
      title: entry.volumeInfo.title,
      subtitle: entry.volumeInfo.subtitle,
      link: entry.volumeInfo.infoLink,
      authors: entry.volumeInfo.authors,
      description: entry.volumeInfo.description,
      image: entry.volumeInfo.imageLinks.thumbnail
    }).then(() => getBooks());
    
  }

  const getBooks = () =>{
    console.log(search)
    API.getBooks(search)
    .then( res => {
      console.log(res.data)
      if (res.data.length === 0) {
        setMessage("no results found")
      }
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      
      setResults(res.data)
      
      
    })
  }

  const handleFormSubmit = event =>{
    event.preventDefault();
    getBooks()
  }


  return (
    <div>
      <Form
        q={search}
        handleInputChange = {handleInputChange}
        handleFormSubmit = {handleFormSubmit}
      />
      <List>
        {results.map(e =>{ return <Book
          key={e.id}
          title = {e.volumeInfo.title}
          subtitle = {e.volumeInfo.subtitle}
          authors = {e.volumeInfo.authors}
          link = {e.volumeInfo.infoLink}
          description = {e.volumeInfo.description}
          image = {e.volumeInfo.imageLinks.thumbnail}
          Button = {() => ( <button
            onClick = {() =>handleSaveBook(e.id)}>save</button>)}

          
          
          />
        })}
      </List>

      {console.log(results)}


     
    </div>
  )
}
