import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './index.css';
import { Button, Pagination } from "react-bootstrap";
import { useInstitutionStore } from "../../../store/instituicoesStore.js";
import EditModal from "./EditModal/index.jsx";
import DeleteModal from "./DeleteModal/index.jsx";

const ITEMS_PER_PAGE = 5; // Number of rows per page
const MAX_PAGE_DISPLAY = 3; // Maximum number of pages to display at a time

const InstituicoesTable = ({filterValue}) => {
    const {
        institutions,
        fetchInstitutions,
        deleteInstitution,
        selectedIds,
        setSelectedIds,
    } = useInstitutionStore();

    const [editData, setEditData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchInstitutions();
    }, []);

    // Filtrar dados com base no valor do filtro


    const filteredInstitutions = React.useMemo(() => {
        const lowerCaseFilter = (filterValue || '').toLowerCase();
        const regex = new RegExp(lowerCaseFilter, 'i');
        return institutions.filter(
            (inst) =>
                regex.test(inst?.nome || '') ||
                regex.test(inst?.uf || '') ||
                (!isNaN(inst?.qtdAlunos) && regex.test(inst?.qtdAlunos.toString()))
        );
    }, [institutions, filterValue]);


    const columns = React.useMemo(
        () => [
            {
                Header: '',
                id: 'select',
                Cell: ({ row }) => (
                    <input
                        className="btn-bulk-delete"
                        type="checkbox"
                        checked={selectedIds?.includes(row.original._id)}
                        onChange={(e) => handleSelectRow(row.original._id, e.target.checked)}
                    />
                ),
                disableSortBy: true,
            },
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
                disableSortBy: true,
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
                disableSortBy: true,
            },
        ],
        [selectedIds]
    );

    const handleSelectRow = (id, checked) => {
        const updatedSelection = checked
            ? [...selectedIds, id]
            : selectedIds.filter((selectedId) => selectedId !== id);

        setSelectedIds(updatedSelection);
    };

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
    } = useTable({ columns, data: filteredInstitutions }, useSortBy);

    // Pagination logic
    const totalPages = Math.ceil(filteredInstitutions.length / ITEMS_PER_PAGE);

    const paginatedRows = React.useMemo(() => {
        return rows.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [rows, currentPage]);


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_DISPLAY / 2));
        const endPage = Math.min(totalPages, startPage + MAX_PAGE_DISPLAY - 1);

        // Always show the first page
        if (startPage > 1) {
            items.push(
                <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                    {1}
                </Pagination.Item>
            );
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }
        }

        // Add pages in range
        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        // Always show the last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }
            items.push(
                <Pagination.Item
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <div className="table-container">
            <table {...getTableProps()} style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                key={column.id}
                                style={{ cursor: column.canSort ? 'pointer' : 'default' }}
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
                {paginatedRows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination className="table-navigation justify-content-center mt-3">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>

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
