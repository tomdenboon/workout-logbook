import { AppBar, Box, Container, SxProps, Theme, Toolbar, Typography } from '@mui/material';

interface AppContainerProps {
  header: {
    title: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
  };
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function AppContainer(props: AppContainerProps) {
  const { children, header, sx } = props;

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Box sx={{ position: 'absolute', left: 8 }}>{header.leftButton}</Box>
          <Typography
            noWrap
            sx={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)' }}
            fontWeight="700"
          >
            {header.title}
          </Typography>
          <Box sx={{ position: 'absolute', right: 8 }}>{header?.rightButton}</Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ paddingY: 8, paddingX: 2, ...sx }}>
        {children}
      </Container>
    </>
  );
}

export default AppContainer;
