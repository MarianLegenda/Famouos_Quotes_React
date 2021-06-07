import React, { useState, useEffect } from "react";
import "./App.css";
import Quotes from "./quotes";
import { Button, Cards } from "@material-ui/core";

function App() {
  const [quotes, setQuotes] = useState([]);
  // const [loading, isLoading] = useState(false);

  const getQuotes = async () => {
    // isLoading(true);
    try {
      function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let randomValue = random(0, 1643);
      console.log(randomValue);

      const results = await fetch("https://type.fit/api/quotes");
      const data = await results.json();

      const filteredList = data.filter((_, index) => {
        return index === randomValue;
      });
      setQuotes(filteredList);
      console.log(filteredList);
      // isLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const getQuotes = async () => {
  //   await fetch("https://type.fit/api/quotes")
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       setQuotes(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleClickBtn = () => {
    getQuotes();
  };

  return (
    <div className="App">
      {quotes.map((quote) => (
        <Quotes text={quote.text} author={quote.author} />
      ))}

      <Button variant="contained" color="primary" onClick={handleClickBtn}>
        Get The Quote
      </Button>
    </div>
  );
}

export default App;
