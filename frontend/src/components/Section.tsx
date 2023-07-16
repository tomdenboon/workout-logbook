import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface SectionProps {
  title: string;
  rightNode?: React.ReactNode;
  collapse?: boolean;
  children?: React.ReactNode;
}

function Section(props: SectionProps) {
  const { title, collapse, rightNode, children } = props;
  const [open, setOpen] = useState(true);

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} onClick={() => setOpen(!open)}>
          {collapse &&
            (open ? (
              <ExpandLess sx={{ color: 'text.secondary' }} />
            ) : (
              <ExpandMore sx={{ color: 'text.secondary' }} />
            ))}
          <Typography color="text.secondary">{title}</Typography>
        </Stack>
        {rightNode}
      </Stack>

      {collapse ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      ) : (
        children
      )}
    </Stack>
  );
}

export default Section;
