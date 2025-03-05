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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Iskarta, IskartaFormData } from '../../types';

const ISKARTA_NEDENLERI = [
  'Üretim Hatası',
  'Malzeme Hatası',
  'Operatör Hatası',
  'Makine Arızası',
  'Kalite Kontrol Reddi',
  'Diğer'
];

const ISKARTA_DURUMLARI = [
  'İnceleniyor',
  'Onaylandı',
  'Reddedildi',
  'Düzeltildi'
];

const IskartaPage: React.FC = () => {
  const { token } = useAuth();
  const [iskartalar, setIskartalar] = useState<Iskarta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIskarta, setSelectedIskarta] = useState<Iskarta | null>(null);
  const [formData, setFormData] = useState<IskartaFormData>({
    urun_id: 0,
    parti_no: '',
    makine_id: 0,
    miktar: 0,
    birim: 'kg',
    neden: '',
    durum: 'İnceleniyor',
    lokasyon: 'Ana Depo'
  });

  const fetchIskartalar = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/iskarta', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Iskarta kayıtları getirilemedi');
      const data = await response.json();
      setIskartalar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIskartalar();
  }, [token]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedIskarta(null);
    setFormData({
      urun_id: 0,
      parti_no: '',
      makine_id: 0,
      miktar: 0,
      birim: 'kg',
      neden: '',
      durum: 'İnceleniyor',
      lokasyon: 'Ana Depo'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/iskarta', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Iskarta kaydı oluşturulamadı');
      
      fetchIskartalar();
      handleDialogClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Iskarta Kayıtları</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Yeni Iskarta Kaydı
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parti No</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Miktar</TableCell>
              <TableCell>Neden</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Lokasyon</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {iskartalar.map((iskarta) => (
              <TableRow key={iskarta.id}>
                <TableCell>{iskarta.parti_no}</TableCell>
                <TableCell>{new Date(iskarta.tarih).toLocaleString('tr-TR')}</TableCell>
                <TableCell>{`${iskarta.miktar} ${iskarta.birim}`}</TableCell>
                <TableCell>{iskarta.neden}</TableCell>
                <TableCell>{iskarta.durum}</TableCell>
                <TableCell>{iskarta.lokasyon}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedIskarta(iskarta);
                    setFormData({
                      urun_id: iskarta.urun_id,
                      parti_no: iskarta.parti_no,
                      makine_id: iskarta.makine_id,
                      miktar: iskarta.miktar,
                      birim: iskarta.birim,
                      neden: iskarta.neden,
                      alt_neden: iskarta.alt_neden,
                      durum: iskarta.durum,
                      maliyet: iskarta.maliyet,
                      notlar: iskarta.notlar,
                      lokasyon: iskarta.lokasyon
                    });
                    setDialogOpen(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedIskarta ? 'Iskarta Kaydı Düzenle' : 'Yeni Iskarta Kaydı'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ürün ID"
                  type="number"
                  value={formData.urun_id}
                  onChange={(e) => setFormData({ ...formData, urun_id: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Parti No"
                  value={formData.parti_no}
                  onChange={(e) => setFormData({ ...formData, parti_no: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Makine ID"
                  type="number"
                  value={formData.makine_id}
                  onChange={(e) => setFormData({ ...formData, makine_id: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Miktar"
                  type="number"
                  value={formData.miktar}
                  onChange={(e) => setFormData({ ...formData, miktar: parseFloat(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birim"
                  value={formData.birim}
                  onChange={(e) => setFormData({ ...formData, birim: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Neden</InputLabel>
                  <Select
                    value={formData.neden}
                    onChange={(e) => setFormData({ ...formData, neden: e.target.value })}
                    label="Neden"
                  >
                    {ISKARTA_NEDENLERI.map((neden) => (
                      <MenuItem key={neden} value={neden}>{neden}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Alt Neden"
                  value={formData.alt_neden || ''}
                  onChange={(e) => setFormData({ ...formData, alt_neden: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Durum</InputLabel>
                  <Select
                    value={formData.durum}
                    onChange={(e) => setFormData({ ...formData, durum: e.target.value })}
                    label="Durum"
                  >
                    {ISKARTA_DURUMLARI.map((durum) => (
                      <MenuItem key={durum} value={durum}>{durum}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maliyet"
                  type="number"
                  value={formData.maliyet || ''}
                  onChange={(e) => setFormData({ ...formData, maliyet: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lokasyon"
                  value={formData.lokasyon}
                  onChange={(e) => setFormData({ ...formData, lokasyon: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notlar"
                  value={formData.notlar || ''}
                  onChange={(e) => setFormData({ ...formData, notlar: e.target.value })}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>İptal</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedIskarta ? 'Güncelle' : 'Kaydet'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default IskartaPage;
