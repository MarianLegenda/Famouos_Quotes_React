import React from "react";

const Quotes = ({ author, quotes, text }) => {
  return (
    <div>
      {quotes ? null : (
        <h1>
          {text}
          <p> {author} </p>
        </h1>
      )}
    </div>
  );
};

export default Quotes;
