import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsList from '../components/NewsList';
import SearchBar from '../components/SearchBar';

const FetchData = () => {
const [data, setData] = useState([]);
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();

const handleSubmit = async ( query, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}&page=${pageNum}`
      );
      const data = await response.json();
      setData(data.hits);
    } catch (err) {
        setError('Error fetching data.');
    } finally {
        setLoading(false);
    }
  };

  const fetchNews = async (query, pageNum) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}&page=${pageNum}`
      );
      const data = await response.json();
      setData(data.hits);
    } catch (err) {
        setError('Error fetching data.');
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(query, page);
  }, []);

  useEffect(() => {
    fetchNews(query, page);
  }, [page]);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && page > 0) {
      setPage(page - 1);
    } else if (direction === 'next') {
      setPage(page + 1);
    }
  };
  
  return (
    <div>
        <button onClick={() => navigate(-1)}>Go back</button>
        <h1>Hacker News Search</h1>
        <SearchBar onSearch={handleSubmit} page={page} setQuery={setQuery} query={query} />
        {loading ? <p>Loading...</p> : <NewsList articles={data} onPageChange={handlePageChange} />}
        {error && <p>{error}</p>}
    </div>
  )
}

export default FetchData