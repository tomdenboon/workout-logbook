import { Box, SxProps, Theme } from '@mui/material';

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
      <Box maxWidth="lg" sx={{ paddingY: 8, paddingX: 2, ...sx }}>
        {children}
      </Box>
    </>
  );
}

export default AppContainer;
