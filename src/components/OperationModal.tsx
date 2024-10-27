import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import {performUserOperation} from '../api/recordsApi';
import {useModalReturnType} from "../hooks/useModal.tsx";

type OperationModalProps = {
    selectedOperation: string;
    reFetchRecords: CallableFunction;
    modal: useModalReturnType;
};

const OperationModal: React.FC<OperationModalProps> = ({modal, reFetchRecords, selectedOperation}) => {
    const {closeModal, modalIsVisible} = modal;
    const [operationData, setOperationData] = useState<{
        number1: number;
        number2?: number;
        length?: number
    }>({number1: 0});


    const handleAddOperation = async () => {
        try {
            const data = {
                operation: selectedOperation,
                ...operationData,
            };
            await performUserOperation(data);
            reFetchRecords()
            closeModal();
        } catch (error) {
            console.error('Error adding operation:', error);
        }
    };

    // TODO: check for validity for submit button

    return (
        <Dialog open={modalIsVisible} onClose={closeModal}>
            <DialogTitle>Add New Operation</DialogTitle>
            <DialogContent>
                {selectedOperation !== 'random_string' && (
                    <TextField
                        label="Number 1"
                        type="number"
                        fullWidth
                        value={operationData.number1}
                        onChange={(e) => setOperationData({...operationData, number1: Number(e.target.value)})}
                        margin="normal"
                    />
                )}
                {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'multiplication' || selectedOperation === 'division') && (
                    <TextField
                        label="Number 2"
                        type="number"
                        fullWidth
                        value={operationData.number2 || ''}
                        onChange={(e) => setOperationData({...operationData, number2: Number(e.target.value)})}
                        margin="normal"
                    />
                )}
                {selectedOperation === 'random_string' && (
                    <TextField
                        label="Length"
                        type="number"
                        fullWidth
                        value={operationData.length || 10}
                        onChange={(e) => setOperationData({...operationData, length: Number(e.target.value)})}
                        margin="normal"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={handleAddOperation} color="primary" variant="contained">
                    Perform Operation
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OperationModal;