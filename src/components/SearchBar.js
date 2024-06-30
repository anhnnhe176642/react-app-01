import React from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col>
          <FormControl
            type="text"
            name="query"
            placeholder="Search"
            className="mr-sm-2"
          />
        </Col>
        <Col>
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
