import Modal from './Modal';
import useForm from '../hooks/useForm';
import { Field, Input, Label } from '@headlessui/react';
import Button from './Button';
import { IUseModal } from '../hooks/useModal';

function ModalForm<Form extends Record<string, string | number>>(
  props: {
    title: string;
    description: string;
    initialState: Form;
    renderOptions: {
      label: string;
      disabled?: boolean;
      key: keyof Form;
      options?: { value: Form[keyof Form]; label: string }[];
    }[];
    onSubmit: (form: Form) => void;
  } & IUseModal,
) {
  const {
    title,
    initialState,
    description,
    renderOptions,
    onSubmit,
    open,
    isOpen,
    close,
  } = props;
  const { data: formState, update, init } = useForm(initialState);

  const formClose = () => {
    close();
    init(initialState);
  };

  return (
    <Modal
      title={title}
      description={description}
      open={open}
      isOpen={isOpen}
      close={formClose}
    >
      {renderOptions.map(({ options, label, key, disabled }) => (
        <Field className="flex flex-col" key={label}>
          <Label>{label}</Label>
          <Input
            className="border p-1 rounded"
            key={String(key)}
            disabled={disabled}
            value={formState[key]}
            onChange={(e) => update(key, e.target.value as Form[keyof Form])}
          />
        </Field>
      ))}
      <Button
        onClick={() => {
          onSubmit(formState);
          formClose();
        }}
      >
        Submit
      </Button>
    </Modal>
  );
}

export default ModalForm;
