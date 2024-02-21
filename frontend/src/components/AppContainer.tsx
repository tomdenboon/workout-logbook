import { AppBar, Box, Container, Stack, SxProps, Theme, Toolbar, Typography } from '@mui/material';

interface AppContainerProps {
  header: {
    title: string;
    afterTitle?: React.ReactNode;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
  };
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  footer?: React.ReactNode;
}

function AppContainer(props: AppContainerProps) {
  const { children, header, sx, footer } = props;

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <AppBar position="static" sx={{ zIndex: 1 }}>
        <Toolbar variant="dense" sx={{ minHeight: 56 }}>
          <Stack sx={{ py: 1, width: '100%' }}>
            <Stack direction="row" alignItems="center">
              {header.leftButton}
              <Typography sx={{ ml: 1 }} fontSize={18} noWrap fontWeight="700">
                {header.title}
              </Typography>
              <Box sx={{ ml: 'auto' }}>{header?.rightButton}</Box>
            </Stack>
            {header.afterTitle}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 2, paddingX: 2, ...sx }}>
          {children}
        </Container>
      </Box>
      {footer}
    </Box>
  );
}

export default AppContainer;
