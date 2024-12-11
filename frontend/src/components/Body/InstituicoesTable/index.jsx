import React, {useEffect, useState} from 'react';
import { useTable, useSortBy  } from 'react-table';
import './index.css';
import {Button} from "react-bootstrap";
import {useInstitutionStore} from "../../../store/instituicoesStore.js";
import EditModal from "./EditModal/index.jsx";
import DeleteModal from "./DeleteModal/index.jsx"

const InstituicoesTable = () => {
    const { institutions, fetchInstitutions, deleteInstitution } = useInstitutionStore();
    const [editData, setEditData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);


    useEffect(() => {
        fetchInstitutions();
    }, [fetchInstitutions]);

    const columns = React.useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'UF', accessor: 'uf' },
            { Header: 'Qtd Alunos', accessor: 'qtdAlunos' },
            {
                Header: '',
                id: 'edit',
                Cell: ({ row }) => (
                    <Button
                        variant="outlined"
                        className="btn-warning"
                        onClick={() => handleEdit(row.original)}
                    >
                        <i className="bi bi-pencil me-2"></i>Editar
                    </Button>
                ),
                disableSortBy: true
            },
            {
                Header: '',
                id: 'delete',
                Cell: ({ row }) => (
                    <Button
                        variant="contained"
                        className="btn-danger"
                        onClick={() => handleDelete(row.original)}
                    >
                        <i className="bi bi-trash me-2"></i>Deletar
                    </Button>
                ),
                disableSortBy: true
            },
        ],
        []
    );

    const handleEdit = (data) => setEditData(data);
    const handleDelete = (data) => setDeleteData(data);

    const confirmDelete = async () => {
        await deleteInstitution(deleteData._id);
        setDeleteData(null);
    };


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: institutions }, useSortBy);

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
            {editData && (
                <EditModal
                    rowData={editData}
                    show={!!editData}
                    handleClose={() => setEditData(null)}
                />
            )}
            {deleteData && (
                <DeleteModal
                    rowData={deleteData}
                    show={!!deleteData}
                    handleClose={() => setDeleteData(null)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default InstituicoesTable;