import React from 'react';
import {
    Box,
    Button,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import {Record} from "../types/types.ts";

type TableProps = {
    records: Record[];
    totalPages: number;
    page: number;
    limit: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    handleDelete: (recordId: number) => void;
};

const RecordsTable: React.FC<TableProps> = ({
                                                handleDelete,
                                                limit,
                                                page,
                                                records,
                                                setLimit,
                                                setPage,
                                                totalPages,
                                            }) => {
    return (
        <Box mt={5}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Operation</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.operation}</TableCell>
                                <TableCell>{record.amount}</TableCell>
                                <TableCell>{record.result}</TableCell>
                                <TableCell>
                                    <Button color="secondary" onClick={() => handleDelete(record.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                />
                <TextField
                    label="Rows per page"
                    type="number"
                    variant="outlined"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    style={{width: '150px'}}
                />
            </Box>
        </Box>
    );
};

export default RecordsTable;