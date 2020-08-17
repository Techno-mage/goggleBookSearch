import React, {useState, useEffect} from 'react';
import {List} from "../components/List";
import Book from "../components/Book";
import Form from "../components/Form";
import API from "../utils/API";


export default function Saved() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    document.title = "Saved books"

    API.getSavedBooks()
    .then(res => {
      console.log(res.data)
    })


  }, [])


  return (
    <div>
      
    </div>
  )
}
