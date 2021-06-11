import React, { useState, useEffect } from "react";
import "./App.css";
import Quote from "./quote";
import { Button, NativeSelect, FormControl } from "@material-ui/core";

function App() {
  const URL = "https://type.fit/api/quotes";
  const [quote, setQuote] = useState(null);
  const [authorNames, setAuthorNames] = useState([]);
  const [authorSelected, setAuthorSelected] = useState("");

  const getQuote = async () => {
    try {
      function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      const results = await fetch(URL);
      const data = await results.json();
      let randomValue = random(0, data.length);
      console.log(randomValue);

      const singleQuote = data[randomValue];

      setQuote(singleQuote);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthors = async () => {
    const results = await fetch(URL);
    const data = await results.json();

    const filtredAuthor = data
      .map((value) => {
        return value.author;
      })
      .filter((authorName) => {
        return authorName !== null;
      });
    console.log(filtredAuthor);
    setAuthorNames(filtredAuthor);
  };

  const handleClickBtn = () => {
    getQuote();
  };

  const handleAuthorChange = (e) => {
    setAuthorSelected(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div className="App">
      {quote && <Quote text={quote.text} author={quote.author} />}
      <Button variant="contained" color="primary" onClick={handleClickBtn}>
        Get Random Quote
      </Button>
      <FormControl>
        <NativeSelect value={authorSelected} onChange={handleAuthorChange}>
          <option value="">Pick Your Author</option>
          {authorNames.map((authorName, i) => (
            <option key={i} value={authorName}>
              {authorName}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default App;
