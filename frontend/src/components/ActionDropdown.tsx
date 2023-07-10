import React from 'react';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

interface ActionDropdownProps {
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
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
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
