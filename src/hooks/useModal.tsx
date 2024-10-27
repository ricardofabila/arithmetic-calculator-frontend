import {useCallback, useState} from "react";

export  type useModalReturnType = {
    modalIsVisible: boolean;
    showModal: () => void;
    closeModal: () => void;
};

type useModalProps = {
    defaultVisible?: boolean;
};

export const useModal = ({defaultVisible = false,}: useModalProps = {}): useModalReturnType => {
    const [modalIsVisible, setModalIsVisible] = useState(defaultVisible);

    const showModal = useCallback(() => setModalIsVisible(true), [modalIsVisible]);
    const closeModal = useCallback(() => setModalIsVisible(false), [modalIsVisible]);

    return {
        modalIsVisible,
        showModal,
        closeModal,
    };
};