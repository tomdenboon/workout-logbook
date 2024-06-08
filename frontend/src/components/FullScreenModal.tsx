import { ArrowBack, ArrowDownward } from '@mui/icons-material';
import { Slide, Dialog, IconButton, SxProps, Theme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import AppContainer from 'src/components/AppContainer';

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
  open: boolean;
  onClose: () => void;
  onTransitionExited?: () => void;
  children: React.ReactNode;
  header: {
    title: string;
    afterTitle?: React.ReactNode;
    rightButton?: React.ReactNode;
  };
  footer?: React.ReactNode;
  slideUp?: boolean;
  sx?: SxProps<Theme>;
}) {
  const { open, onClose, onTransitionExited, children, footer, header, slideUp, sx } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      hideBackdrop
      onTransitionExited={onTransitionExited}
      TransitionComponent={slideUp ? UpTransitionComponent : LeftTransitionComponent}
    >
      <AppContainer
        header={{
          leftButton: (
            <IconButton color="inherit" onClick={onClose}>
              {slideUp ? <ArrowDownward /> : <ArrowBack />}
            </IconButton>
          ),
          ...header,
        }}
        footer={footer}
        sx={sx}
      >
        {children}
      </AppContainer>
    </Dialog>
  );
}
