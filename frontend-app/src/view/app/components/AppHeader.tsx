import { AppBar, Toolbar, Typography } from '@mui/material';

interface HeaderProps {
  title: string;
  LeftTitleButton?: React.ReactNode;
  RightButton?: React.ReactNode;
}
function AppHeader(props: HeaderProps) {
  const { title, LeftTitleButton, RightButton } = props;

  return (
    <AppBar>
      <Toolbar variant="dense">
        {LeftTitleButton}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {RightButton}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
