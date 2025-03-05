import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  Chip,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
        Genel Durum
      </Typography>

      <Grid container spacing={3}>
        {/* Hammadde Durumu */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ bgcolor: 'primary.light', p: 1, borderRadius: 2, mr: 2 }}>
                    <InventoryIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    Hammadde
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>4</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="success.main">
                  2 yeni eklendi
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reçete Sayısı */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ bgcolor: 'secondary.light', p: 1, borderRadius: 2, mr: 2 }}>
                    <ReceiptIcon sx={{ color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    Reçete
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>2</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="success.main">
                  1 yeni eklendi
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Kalite Kontrol */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ bgcolor: 'success.light', p: 1, borderRadius: 2, mr: 2 }}>
                    <AssignmentIcon sx={{ color: 'success.main' }} />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    Kalite
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>%98</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="success.main">
                  Başarılı
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* İskarta Oranı */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ bgcolor: 'error.light', p: 1, borderRadius: 2, mr: 2 }}>
                    <ErrorOutlineIcon sx={{ color: 'error.main' }} />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    İskarta
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>%2.5</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingDownIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="success.main">
                  Azalma var
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Kritik Stok Durumu */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Kritik Stok Durumu</Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Test Hammadde (H001)</Typography>
                  <Chip label="Kritik" color="error" size="small" />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={30} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'error.light',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'error.main',
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  150 kg / 500 kg
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Çinko Oksit (H004)</Typography>
                  <Chip label="Uyarı" color="warning" size="small" />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={45} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'warning.light',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'warning.main',
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  200 kg / 400 kg
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Son Reçeteler */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Son Reçeteler</Typography>
              
              <Box sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={500}>Standart Kauçuk Karışımı</Typography>
                  <Chip label="R001" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  1000 kg • 3 hammadde
                </Typography>
              </Box>

              <Box sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={500}>Yüksek Dayanımlı Karışım</Typography>
                  <Chip label="R002" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  800 kg • 3 hammadde
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
