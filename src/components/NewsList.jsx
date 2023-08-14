import React from 'react';
import SingleNews from './SingleNews';

const NewsList = ({ articles, onPageChange }) => {
  return (
    <div>
      {articles.map((article) => (
        <SingleNews article={article}/>
      ))}
      <div>
        <button onClick={() => onPageChange('prev')}>Previous Page</button>
        <button onClick={() => onPageChange('next')}>Next Page</button>
      </div>
    </div>
  );
};

export default NewsList;