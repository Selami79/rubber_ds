import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ReceteDetayForm from '../../components/Recete/ReceteDetayForm';
import { Hammadde, Recete, ReceteFormData } from '../../types';

const RecetePage: React.FC = () => {
  const { token } = useAuth();
  const [receteler, setReceteler] = useState<Recete[]>([]);
  const [hammaddeler, setHammaddeler] = useState<Hammadde[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecete, setSelectedRecete] = useState<Recete | null>(null);
  const [formData, setFormData] = useState<ReceteFormData>({
    kod: '',
    ad: '',
    aciklama: '',
    toplam_miktar: 0,
    talimatlar: '',
    detaylar: []
  });

  // Reçeteleri getir
  const fetchReceteler = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/recete', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Reçeteler getirilemedi');
      const data = await response.json();
      setReceteler(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Hammaddeleri getir
  const fetchHammaddeler = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/hammadde', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Hammaddeler getirilemedi');
      const data = await response.json();
      setHammaddeler(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  useEffect(() => {
    fetchReceteler();
    fetchHammaddeler();
  }, [token]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRecete(null);
    setFormData({
      kod: '',
      ad: '',
      aciklama: '',
      toplam_miktar: 0,
      talimatlar: '',
      detaylar: []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = selectedRecete
        ? `http://localhost:3001/api/recete/${selectedRecete.id}`
        : 'http://localhost:3001/api/recete';
      
      const response = await fetch(url, {
        method: selectedRecete ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('İşlem başarısız');
      
      fetchReceteler();
      handleDialogClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu reçeteyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/recete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Reçete silinemedi');
      
      fetchReceteler();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Reçeteler</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Yeni Reçete
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kod</TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Toplam Miktar</TableCell>
              <TableCell>Hammadde Sayısı</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receteler.map((recete) => (
              <TableRow key={recete.id}>
                <TableCell>{recete.kod}</TableCell>
                <TableCell>{recete.ad}</TableCell>
                <TableCell>{recete.toplam_miktar}</TableCell>
                <TableCell>{recete.recete_detaylari?.length || 0}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedRecete(recete);
                    setFormData({
                      kod: recete.kod,
                      ad: recete.ad,
                      aciklama: recete.aciklama || '',
                      toplam_miktar: recete.toplam_miktar,
                      talimatlar: recete.talimatlar || '',
                      detaylar: recete.recete_detaylari || []
                    });
                    setDialogOpen(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDelete(recete.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRecete ? 'Reçete Düzenle' : 'Yeni Reçete'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box display="grid" gap={2}>
              <TextField
                label="Kod"
                value={formData.kod}
                onChange={(e) => setFormData({ ...formData, kod: e.target.value })}
                required
              />
              <TextField
                label="Ad"
                value={formData.ad}
                onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                required
              />
              <TextField
                label="Açıklama"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                multiline
                rows={2}
              />
              <TextField
                label="Toplam Miktar"
                type="number"
                value={formData.toplam_miktar}
                onChange={(e) => setFormData({ ...formData, toplam_miktar: parseFloat(e.target.value) })}
                required
              />
              <TextField
                label="Hazırlama Talimatları"
                value={formData.talimatlar}
                onChange={(e) => setFormData({ ...formData, talimatlar: e.target.value })}
                multiline
                rows={3}
              />
              
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>Hammaddeler</Typography>
                <ReceteDetayForm
                  detaylar={formData.detaylar}
                  hammaddeler={hammaddeler}
                  toplam_miktar={formData.toplam_miktar}
                  onChange={(detaylar) => setFormData({ ...formData, detaylar })}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>İptal</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedRecete ? 'Güncelle' : 'Kaydet'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default RecetePage;
