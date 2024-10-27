import React, {useEffect, useState} from 'react';
import {Box, Container, MenuItem, Select, TextField,} from '@mui/material';
import {Record} from "../types/types.ts";
import {deleteUserRecord, fetchUserRecords} from '../api/recordsApi';
import {useModal} from "../hooks/useModal.tsx";
import OperationModal from '../components/OperationModal.tsx';
import {AVAILABLE_OPERATIONS} from "../constants/operations.ts";
import RecordsTable from "../components/RecordsTable.tsx";
import Header from "../components/Header.tsx";


const Dashboard: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOperation, setSelectedOperation] = useState<string>('');
    const {modalIsVisible, closeModal, showModal} = useModal();

    const hideModal = () => {
        setSelectedOperation("");
        closeModal();
    }

    const fetchRecords = async () => {
        try {
            const response = await fetchUserRecords(page, limit, searchQuery);
            setRecords(response.records);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteUserRecord(id)
            refetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const refetchRecords = () => {
        setSearchQuery('');
        setPage(1);
        fetchRecords();
    };

    useEffect(() => {
        // Debounce search half second
        const timerId = setTimeout(() => {
            fetchRecords();
        }, 500);

        // Clear the timeout if the effect is re-called before the timer completes
        return () => clearTimeout(timerId);
    }, [page, limit, searchQuery]);

    return (
        <Container maxWidth="lg">
            <Header/>
            <Box mt={5}>
                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{flex: 1}}
                    />
                    <Select
                        value={selectedOperation}
                        onChange={(e) => {
                            setSelectedOperation(e.target.value as string);
                            showModal();
                        }}
                        displayEmpty
                        style={{minWidth: '200px'}}
                    >
                        <MenuItem value="" disabled>
                            Select Operation
                        </MenuItem>
                        {AVAILABLE_OPERATIONS.map((operation) => (
                            <MenuItem key={operation} value={operation}>
                                {operation.charAt(0).toUpperCase() + operation.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <RecordsTable records={records} totalPages={totalPages} page={page} limit={limit}
                              handleDelete={handleDelete} setLimit={setLimit} setPage={setPage}/>


                <OperationModal modal={{modalIsVisible, closeModal: hideModal, showModal}}
                                reFetchRecords={refetchRecords}
                                selectedOperation={selectedOperation}/>

            </Box>
        </Container>
    );
};

export default Dashboard;