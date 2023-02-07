import { createContext, ReactNode, useState } from 'react';

interface ModalContextInterface {
  modalOpenList: string[];
  handleOpenModal: (modalType: string) => void;
  handleCloseModal: (modalType: string) => void;
}

const initialModalContext: ModalContextInterface = {
  modalOpenList: [],
  handleOpenModal: () => null,
  handleCloseModal: () => null,
};

export const ModalContext = createContext<ModalContextInterface>(initialModalContext);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalOpenList, setModalOpenList] = useState(initialModalContext.modalOpenList);

  const handleOpenModal = (modalType: string) => {
    setModalOpenList((prev) => [...prev, modalType]);
  };

  const handleCloseModal = (modalType: string) => {
    setModalOpenList((prev) => prev.filter((type) => type !== modalType));
  };
  return (
    <ModalContext.Provider value={{ modalOpenList, handleOpenModal, handleCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};
