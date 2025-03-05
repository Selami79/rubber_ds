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
  Chip,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { KaliteTest, KaliteTestFormData } from '../../types';

const KaliteKontrol: React.FC = () => {
  const { token } = useAuth();
  const [testler, setTestler] = useState<KaliteTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<KaliteTest | null>(null);
  const [formData, setFormData] = useState<KaliteTestFormData>({
    urun_id: 0,
    parti_no: '',
    olcumler: [],
    notlar: ''
  });

  const fetchTestler = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/kalite-test', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Kalite testleri getirilemedi');
      const data = await response.json();
      setTestler(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestler();
  }, [token]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedTest(null);
    setFormData({
      urun_id: 0,
      parti_no: '',
      olcumler: [],
      notlar: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/kalite-test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Kalite testi oluşturulamadı');
      
      fetchTestler();
      handleDialogClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  const handleOlcumEkle = () => {
    setFormData({
      ...formData,
      olcumler: [
        ...formData.olcumler,
        {
          olcum_tipi: '',
          olcum_degeri: 0,
          birim: '',
          min_deger: 0,
          max_deger: 0
        }
      ]
    });
  };

  const handleOlcumChange = (index: number, field: string, value: string | number) => {
    const yeniOlcumler = [...formData.olcumler];
    yeniOlcumler[index] = {
      ...yeniOlcumler[index],
      [field]: value
    };
    setFormData({
      ...formData,
      olcumler: yeniOlcumler
    });
  };

  const getSonucRenk = (sonuc: string) => {
    switch (sonuc) {
      case 'Uygun':
        return 'success';
      case 'Şartlı':
        return 'warning';
      case 'Uygun Değil':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Kalite Kontrol Testleri</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Yeni Test
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parti No</TableCell>
              <TableCell>Test Tarihi</TableCell>
              <TableCell>Sonuç</TableCell>
              <TableCell>Onay Durumu</TableCell>
              <TableCell>Ölçüm Sayısı</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testler.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.parti_no}</TableCell>
                <TableCell>{new Date(test.test_tarihi).toLocaleString('tr-TR')}</TableCell>
                <TableCell>
                  <Chip
                    label={test.sonuc}
                    color={getSonucRenk(test.sonuc)}
                    icon={
                      test.sonuc === 'Uygun' ? <CheckCircleIcon /> :
                      test.sonuc === 'Uygun Değil' ? <CancelIcon /> :
                      <WarningIcon />
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={test.onay_durumu}
                    color={
                      test.onay_durumu === 'Onaylandı' ? 'success' :
                      test.onay_durumu === 'Reddedildi' ? 'error' :
                      'warning'
                    }
                  />
                </TableCell>
                <TableCell>{test.olcumler.length}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedTest(test);
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
          {selectedTest ? 'Test Düzenle' : 'Yeni Kalite Kontrol Testi'}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notlar"
                  value={formData.notlar}
                  onChange={(e) => setFormData({ ...formData, notlar: e.target.value })}
                  multiline
                  rows={3}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Ölçümler</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleOlcumEkle}
                  >
                    Ölçüm Ekle
                  </Button>
                </Box>
                
                {formData.olcumler.map((olcum, index) => (
                  <Box key={index} mb={2} p={2} border="1px solid #ddd" borderRadius={1}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Ölçüm Tipi"
                          value={olcum.olcum_tipi}
                          onChange={(e) => handleOlcumChange(index, 'olcum_tipi', e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Birim"
                          value={olcum.birim}
                          onChange={(e) => handleOlcumChange(index, 'birim', e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Ölçüm Değeri"
                          type="number"
                          value={olcum.olcum_degeri}
                          onChange={(e) => handleOlcumChange(index, 'olcum_degeri', parseFloat(e.target.value))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Min Değer"
                          type="number"
                          value={olcum.min_deger}
                          onChange={(e) => handleOlcumChange(index, 'min_deger', parseFloat(e.target.value))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Max Değer"
                          type="number"
                          value={olcum.max_deger}
                          onChange={(e) => handleOlcumChange(index, 'max_deger', parseFloat(e.target.value))}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>İptal</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedTest ? 'Güncelle' : 'Kaydet'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default KaliteKontrol;
