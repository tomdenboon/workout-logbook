import { useState } from 'react';

export interface IUseModal {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  return { open, close, isOpen };
};

export default useModal;
