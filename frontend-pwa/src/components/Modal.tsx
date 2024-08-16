import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Button from './Button';
import { IUseModal } from '../hooks/useModal';

interface ModalProps extends IUseModal {
  title: string;
  description: string;
  children: React.ReactNode;
}

function Modal({
  title,
  description,
  children,
  isOpen,
  open,
  close,
}: ModalProps) {
  return (
    <>
      <Button variant="text" onClick={() => open()}>
        Open Modal
      </Button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex justify-center items-center ">
          <DialogPanel className="flex gap-2 flex-col bg-white w-80 p-2">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description>{description}</Description>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;
