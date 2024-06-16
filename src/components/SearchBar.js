import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSearch}>
      <FormControl type="text" name="query" placeholder="Search" className="mr-sm-2" />
      <Button type="submit" variant="outline-success">Search</Button>
    </Form>
  );
}

export default SearchBar;
