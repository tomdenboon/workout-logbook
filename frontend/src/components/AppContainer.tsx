import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Stack,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';

interface AppContainerProps {
  header: {
    title: string;
    afterTitle?: React.ReactNode;
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
      <CssBaseline />
      <AppBar>
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
      <Container maxWidth="lg" sx={{ paddingTop: 9, paddingBottom: 16, paddingX: 2, ...sx }}>
        {children}
      </Container>
    </>
  );
}

export default AppContainer;
