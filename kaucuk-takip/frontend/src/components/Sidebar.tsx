import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ErrorIcon from '@mui/icons-material/Error';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';

const drawerWidth = 260;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  justifyContent: 'center',
  backgroundColor: '#5c6bc0',
  color: 'white',
  minHeight: 64,
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Ana Sayfa', icon: <DashboardIcon />, path: '/' },
  { text: 'Hammadde Yönetimi', icon: <InventoryIcon />, path: '/hammadde' },
  { text: 'Reçete Yönetimi', icon: <ReceiptIcon />, path: '/recete' },
  { text: 'Kalite Kontrol', icon: <AssignmentIcon />, path: '/kalite-kontrol' },
  { text: 'İskarta Takibi', icon: <ErrorIcon />, path: '/iskarta' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          backgroundColor: '#fafafa',
          color: '#424242',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        },
      }}
    >
      <DrawerHeader>
        <Typography variant="h6" sx={{ 
          fontWeight: 700,
          fontSize: '1.2rem',
          letterSpacing: '0.5px',
        }}>
          KAUÇUK TAKİP
        </Typography>
      </DrawerHeader>
      
      <Box sx={{ 
        overflow: 'auto',
        height: 'calc(100% - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pb: 2,
      }}>
        <List sx={{ pt: 2, px: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mb: 1,
                borderRadius: 1,
                color: location.pathname === item.path ? '#5c6bc0' : '#616161',
                backgroundColor: location.pathname === item.path ? 'rgba(92, 107, 192, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.04)',
                  color: '#5c6bc0',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(92, 107, 192, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(92, 107, 192, 0.12)',
                  },
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? '#5c6bc0' : '#757575',
                minWidth: 36,
                '& svg': {
                  fontSize: '1.2rem',
                },
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </List>
        
        <Box sx={{ px: 2 }}>
          <Divider sx={{ bgcolor: 'rgba(0,0,0,0.06)', mb: 2 }} />
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              color: '#616161',
              '&:hover': {
                backgroundColor: 'rgba(92, 107, 192, 0.04)',
                color: '#5c6bc0',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ListItemIcon sx={{ 
              color: '#757575',
              minWidth: 36,
              '& svg': {
                fontSize: '1.2rem',
              },
            }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Çıkış Yap"
              primaryTypographyProps={{
                fontSize: '0.875rem',
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 