import React, {  useState } from "react";

const URL = "https://type.fit/api/quotes";
const [quote, setQuote] = useState(null);
const [authorNames, setAuthorNames] = useState([]);

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
    // const filteredList = data.filter((_, index) => {
    //   return index === randomValue;
    // });
    setQuote(singleQuote);
  } catch (error) {
    console.log(error);
  }
};

export default getQuote;

const getAuthors = async () => {
  const results = await fetch(URL);
  const data = await results.json();

  const filtredAuthor = data.filter((value) => {
    return value.author;
  });
  console.log(filtredAuthor);
  setAuthorNames(filtredAuthor);
};


export default getAuthors