import React, { useState, useEffect } from "react";
import "./App.css";
import Quote from "./quote";
import { Button, NativeSelect, FormControl } from "@material-ui/core";

function App() {
  const URL = "https://type.fit/api/quotes";
  const [quote, setQuote] = useState(null);
  const [authorNames, setAuthorNames] = useState([]);
  const [authorSelected, setAuthorSelected] = useState("");
  const [defaultQoutesArray, setDefaultQuotesArray] = useState([]);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getQuote = () => {
    try {
      let randomValue = random(0, defaultQoutesArray.length);
      console.log(randomValue);

      const singleQuote = defaultQoutesArray[randomValue];

      setQuote(singleQuote);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorQuote = (newAuthor) => {
    try {
      const filteredArray = defaultQoutesArray.filter((quote) => {
        return quote.author === newAuthor;
      });
      setQuote(filteredArray[random(0, filteredArray.length)]);
      console.log(filteredArray);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const results = await fetch(URL);
    const data = await results.json();
    setDefaultQuotesArray(data);

    const filtredAuthor = data
      .map((value) => {
        return value.author;
      })
      .filter((authorName) => {
        return authorName !== null;
      });

    setAuthorNames(filtredAuthor);
  };

  const handleClickBtn = () => {
    getQuote();
  };

  const handleAuthorChange = (e) => {
    setAuthorSelected(e.target.value);
    getAuthorQuote(e.target.value);
  };

  useEffect(() => {
    fetchData();
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
