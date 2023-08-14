import { ArrowBack, ArrowDownward } from '@mui/icons-material';
import { Slide, Dialog, IconButton } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AppContainer from 'components/AppContainer';
import { forwardRef } from 'react';

const LeftTransitionComponent = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="left" ref={ref} {...props} />
);

const UpTransitionComponent = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export default function FullScreenModal(props: {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  header: {
    title: string;
    rightButton?: React.ReactNode;
  };
  slideLeft?: boolean;
}) {
  const { isOpen, close, children, header, slideLeft } = props;

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={close}
      TransitionComponent={slideLeft ? LeftTransitionComponent : UpTransitionComponent}
    >
      <AppContainer
        header={{
          leftButton: (
            <IconButton color="inherit" onClick={close}>
              {slideLeft ? <ArrowBack /> : <ArrowDownward />}
            </IconButton>
          ),
          ...header,
        }}
      >
        {children}
      </AppContainer>
    </Dialog>
  );
}
