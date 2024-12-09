import React from 'react';
import { useTable, useSortBy  } from 'react-table';
import './index.css';
import {Button} from "react-bootstrap";

const InstituicoesTable = () => {
    const data = React.useMemo(
        () => [
            { nome: 'Instituição A', uf: 'SP', qtdAlunos: 1200 },
            { nome: 'Instituição B', uf: 'RJ', qtdAlunos: 800 },
            { nome: 'Instituição C', uf: 'MG', qtdAlunos: 950 },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'UF', accessor: 'uf' },
            { Header: 'Qtd Alunos', accessor: 'qtdAlunos' },
            {
                Header: 'Edit',
                id: 'edit',
                Cell: ({ row }) => (
                    <Button
                        variant="outlined"
                        className="btn-warning"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="bi bi-pencil me-2"></i>Edit
                    </Button>
                ),
                disableSortBy: true
            },
            {
                Header: 'Delete',
                id: 'delete',
                Cell: ({ row }) => (
                    <Button
                        variant="contained"
                        className="btn-danger"
                        onClick={() => handleDelete(row)}
                    >
                        <i className="bi bi-trash me-2"></i>Delete
                    </Button>
                ),
                disableSortBy: true
            },
        ],
        []
    );

    const handleEdit = (rowData) => {

    }

    const handleDelete = (rowData) => {

    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <div className="table-container">
            <table {...getTableProps()} style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                    key={column.id}
                                    style={{cursor: column.canSort ? 'pointer' : 'default'}}
                                >
                                    {column.render('Header')}

                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <i className="bi bi-caret-down-fill"></i>
                                        ) : (
                                            <i className="bi bi-caret-up-fill"></i>
                                        )
                                    ) : (
                                        column.disableSortBy ? '' : <i className="bi bi-chevron-expand"></i>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} key={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default InstituicoesTable;