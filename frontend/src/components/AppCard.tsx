import { ButtonBase, Paper, Stack, Typography } from '@mui/material';

interface AppCardProps {
  header: string;
  subheader?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
}

function AppCard(props: AppCardProps) {
  const { header, actions, children, subheader, onClick } = props;

  const content = (
    <Paper variant="outlined" sx={{ p: 1, height: '100%', width: '100%' }}>
      <Stack
        sx={{ pb: children ? 1 : 0 }}
        gap={1}
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

  if (onClick) {
    return (
      <ButtonBase onClick={onClick} sx={{ textAlign: 'left', width: '100%', height: '100%' }}>
        {content}
      </ButtonBase>
    );
  }

  return content;
}

export default AppCard;
