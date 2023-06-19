import { Stack, Typography } from '@mui/material';

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <Stack>
      <Typography color="text.secondary" variant="caption">
        {title.toLocaleUpperCase()}
      </Typography>
      {children}
    </Stack>
  );
}

export default Section;
