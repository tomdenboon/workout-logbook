import { Container, SxProps, Theme } from '@mui/material';

interface AppGridContainerProps {
  header: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function AppGridContainer(props: AppGridContainerProps) {
  const { children, header, sx } = props;
  return (
    <>
      {header}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 16, ...sx }}>
        {children}
      </Container>
    </>
  );
}

export default AppGridContainer;