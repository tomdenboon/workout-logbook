import React from 'react';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

export interface ActionDropdownProps {
  actions: Array<{ label: string; action: () => void; icon?: React.ReactNode }>;
}

function ActionDropdown(props: ActionDropdownProps) {
  const { actions } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createStopPropagationProps = (
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
  ) => ({
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onClick?.(event);
    },
    onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
      event.stopPropagation();
    },
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    },
  });

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        {...createStopPropagationProps((e) => setAnchorEl(e.currentTarget))}
        sx={{ height: 24, px: 1, py: 0, minWidth: 0, flexShrink: 0 }}
      >
        <MoreHoriz />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...createStopPropagationProps()}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {actions.map((option) => {
          const { icon } = option;
          return (
            <MenuItem
              dense
              key={option.label}
              {...createStopPropagationProps(() => {
                option.action();
                handleClose();
              })}
            >
              <Stack spacing={1} direction="row" alignItems="center">
                {icon}
                <Typography>{option.label}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default ActionDropdown;
