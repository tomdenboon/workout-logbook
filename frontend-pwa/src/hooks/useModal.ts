import { useState } from 'react';

export interface IUseModal {
  close: () => void;
  open: () => void;
  isOpen: boolean;
}

const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  return { open: () => setOpen(true), close: () => setOpen(false), isOpen };
};

export default useModal;
