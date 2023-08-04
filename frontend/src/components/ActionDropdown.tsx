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
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={handleClick}
        sx={{ height: 24, px: 1, py: 0, minWidth: 0 }}
      >
        <MoreHoriz />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {actions.map((option) => {
          const { icon } = option;
          return (
            <MenuItem
              dense
              key={option.label}
              onClick={() => {
                option.action();
                handleClose();
              }}
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
