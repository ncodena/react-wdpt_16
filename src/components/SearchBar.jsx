
const SearchBar = ({ onSearch, page, setQuery, query }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, page)
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;