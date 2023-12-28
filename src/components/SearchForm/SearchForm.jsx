import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchForm = ({ submit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
    submit(searchQuery);
  };

  const handleChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    !searchQuery && setSearchQuery(searchParams.get('search'));
  }, [searchParams, searchQuery]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Title</label>
        <input
          name="search"
          type="text"
          id="exampleInputSearch"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
