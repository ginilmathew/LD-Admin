import React, { useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Hidden,
  Drawer
} from '@mui/material';
import LoginLogo from '../login/LoginLogo';
import { menues } from './menus';
import { COLOURS } from '../../assets/COLORS';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleIconButtonClick = () => {
    setIsDrawerOpen(true);
  };
  const handleIconButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = useCallback((path) => {
    navigate(path.path);
    setAnchorEl(null);
  }, [navigate]);

  const NavigateToProfile = useCallback(() => {
    navigate('/profile');
    setAnchorEl(null);
  }, [navigate]);

  const Logout = useCallback(() => {
    navigate('/login', { replace: true });
    setAnchorEl(null);
  }, [navigate]);

  return (
    <Box sx={{ height: 80, width: '100%', background: COLOURS.primary,position:'fixed',zIndex:100 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 5, height: '100%' }}>
        {/* Left side (20%) */}
        <Grid item xs={2}>
          <Box width={200}>
            <LoginLogo width={60} height={60} />
          </Box>
        </Grid>
        {/* Center (60%) */}
        <Grid item xs={8}>
          <Box display="flex" justifyContent="space-between">
            <Hidden mdDown>
              {menues.map((item) => (
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <Typography
                    key={item.title}
                    sx={{
                      cursor: 'pointer',
                      color: item.path === pathname ? COLOURS.secondary : COLOURS.menuText,
                      letterSpacing: 0.72,
                      fontSize: 20,
                      fontFamily: 'Outfit-Medium',
                      '&:hover': {
                        color: COLOURS.secondary,
                      }
                    }}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      width: item.title.length * 1 + 25,
                      borderBottom: item.path === pathname ? `2px solid ${COLOURS.secondary}` : 'none',
                      color: item.path === pathname ? COLOURS.secondary : COLOURS.menuText,
                    }}
                  ></Box>
                </Box>
              ))}
            </Hidden>
          </Box>
        </Grid>
        {/* Right side (20%) */}
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <Hidden mdDown>
              <Tooltip title="Click here">
                <IconButton onClick={handleIconButton} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
            </Hidden>
            <Hidden mdUp>
              <IconButton onClick={handleIconButtonClick} sx={{ p: 0 }}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              getContentAnchorEl={null}
              sx={{ borderRadius: 10 }}
            >
              <MenuItem sx={{ background: COLOURS.menuItemBox }}>
                <Box display={'flex'} justifyContent={'space-between'} gap={5} alignItems={'center'} width={150}>
                  <Typography sx={{ fontSize: 12, letterSpacing: 0.79, color: COLOURS.menuText, fontFamily: 'Outfit-Light' }}>{'Admin'}</Typography>
                  <Typography sx={{ fontSize: 16, color: COLOURS.textColor, fontFamily: 'Outfit-Medium' }}>{'Ginil'}</Typography>
                </Box>
              </MenuItem>
              <MenuItem sx={{ background: COLOURS.menuItemBox, fontSize: 16, fontFamily: 'Outfit-Medium', letterSpacing: 0.79 }} onClick={NavigateToProfile}>
                {'Profile'}
              </MenuItem>
              <MenuItem sx={{ background: COLOURS.menuItemBox, fontSize: 16, fontFamily: 'Outfit-Medium', letterSpacing: 0.79 }}>
                <Box sx={{ borderBottom: '1px solid #ccc', px: 2, width: '100%' }} />
              </MenuItem>
              <MenuItem sx={{ color: COLOURS.secondary, fontSize: 16, fontFamily: 'Outfit-Medium', letterSpacing: 0.79, background: COLOURS.menuItemBox }} onClick={Logout}>
                {'Logout'}
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>
      {/* Drawer for medium screens */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 240 } }}
      >
        {/* Drawer content */}
        {/* You can put any content you want to display in the drawer */}
      </Drawer>
    </Box>
  );
};

export default Header;
