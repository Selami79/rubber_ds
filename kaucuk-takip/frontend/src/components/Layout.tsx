import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Container, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: '#ffffff',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
  },
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#ffffff' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: open ? `${drawerWidth}px` : 0 },
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 64 },
          px: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: '#424242',
              display: { sm: 'none' },
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Avatar 
            sx={{ 
              bgcolor: '#5c6bc0',
              width: 36,
              height: 36,
              fontSize: '0.9rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#3f51b5',
              },
            }}
          >
            A
          </Avatar>
        </Toolbar>
      </AppBar>

      <Sidebar open={open} onClose={handleDrawerToggle} />

      <Main open={open}>
        <Toolbar sx={{ minHeight: { xs: 64, sm: 64 } }} />
        <Container 
          maxWidth={false}
          sx={{ 
            p: { xs: 2, sm: 3 },
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          {children}
        </Container>
      </Main>
    </Box>
  );
};

export default Layout; 