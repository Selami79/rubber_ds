import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface Hammadde {
  id: number;
  kod: string;
  ad: string;
  birim: string;
  miktar: number;
  kritik_miktar: number;
  birim_fiyat: number;
}

const Hammadde: React.FC = () => {
  const [hammaddeler, setHammaddeler] = useState<Hammadde[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHammadde, setSelectedHammadde] = useState<Hammadde | null>(null);
  const [formData, setFormData] = useState({
    kod: '',
    ad: '',
    birim: '',
    miktar: 0,
    kritik_miktar: 0,
    birim_fiyat: 0
  });

  const fetchHammaddeler = async () => {
    try {
      const response = await api.get('/hammadde');
      setHammaddeler(response.data);
      setError(null);
    } catch (err) {
      setError('Hammadde listesi yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHammaddeler();
  }, []);

  const handleOpenDialog = (hammadde?: Hammadde) => {
    if (hammadde) {
      setSelectedHammadde(hammadde);
      setFormData(hammadde);
    } else {
      setSelectedHammadde(null);
      setFormData({
        kod: '',
        ad: '',
        birim: '',
        miktar: 0,
        kritik_miktar: 0,
        birim_fiyat: 0
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHammadde(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedHammadde) {
        await api.put(`/hammadde/${selectedHammadde.id}`, formData);
      } else {
        await api.post('/hammadde', formData);
      }
      fetchHammaddeler();
      handleCloseDialog();
    } catch (err) {
      setError('İşlem sırasında bir hata oluştu.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu hammaddeyi silmek istediğinizden emin misiniz?')) {
      try {
        await api.delete(`/hammadde/${id}`);
        fetchHammaddeler();
      } catch (err) {
        setError('Silme işlemi sırasında bir hata oluştu.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Hammadde Yönetimi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Yeni Hammadde Ekle
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kod</TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Birim</TableCell>
              <TableCell>Miktar</TableCell>
              <TableCell>Kritik Miktar</TableCell>
              <TableCell>Birim Fiyat</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hammaddeler.map((hammadde) => (
              <TableRow key={hammadde.id}>
                <TableCell>{hammadde.kod}</TableCell>
                <TableCell>{hammadde.ad}</TableCell>
                <TableCell>{hammadde.birim}</TableCell>
                <TableCell>
                  {hammadde.miktar}
                  {hammadde.miktar <= hammadde.kritik_miktar && (
                    <Tooltip title="Kritik stok seviyesi!">
                      <WarningIcon color="warning" sx={{ ml: 1 }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{hammadde.kritik_miktar}</TableCell>
                <TableCell>{hammadde.birim_fiyat.toFixed(2)} ₺</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(hammadde)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(hammadde.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedHammadde ? 'Hammadde Düzenle' : 'Yeni Hammadde Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Kod"
              value={formData.kod}
              onChange={(e) => setFormData({ ...formData, kod: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ad"
              value={formData.ad}
              onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Birim"
              value={formData.birim}
              onChange={(e) => setFormData({ ...formData, birim: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              label="Miktar"
              value={formData.miktar}
              onChange={(e) => setFormData({ ...formData, miktar: Number(e.target.value) })}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              label="Kritik Miktar"
              value={formData.kritik_miktar}
              onChange={(e) => setFormData({ ...formData, kritik_miktar: Number(e.target.value) })}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              label="Birim Fiyat"
              value={formData.birim_fiyat}
              onChange={(e) => setFormData({ ...formData, birim_fiyat: Number(e.target.value) })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedHammadde ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Hammadde;
