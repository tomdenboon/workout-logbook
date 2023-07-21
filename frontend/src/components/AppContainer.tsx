import { Container, SxProps, Theme } from '@mui/material';

interface AppContainerProps {
  header: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function AppContainer(props: AppContainerProps) {
  const { children, header, sx } = props;
  return (
    <>
      {header}
      <Container maxWidth="lg" sx={{ paddingY: 8, ...sx }}>
        {children}
      </Container>
    </>
  );
}

export default AppContainer;
