import { Paper, Stack, Typography } from '@mui/material';

interface AppCardProps {
  header: string;
  subheader?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function AppCard(props: AppCardProps) {
  const { header, actions, children, subheader } = props;

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Stack
        sx={{ pb: children ? 1 : 0 }}
        direction="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Stack>
          <Typography fontWeight="700">{header}</Typography>
          <Typography color="text.secondary">{subheader}</Typography>
        </Stack>
        {actions}
      </Stack>
      {children}
    </Paper>
  );
}

export default AppCard;
