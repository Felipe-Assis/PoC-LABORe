import React from 'react';
import { Form } from 'react-bootstrap';

const TableFilter = ({ filterValue, onFilterChange }) => {
    return (
        <Form.Group  controlId="tableFilter" className="tableFilter mb-0">
            <Form.Control
                type="text"
                placeholder="Digite para filtrar..."
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
            />
        </Form.Group>
    );
};

export default TableFilter;
