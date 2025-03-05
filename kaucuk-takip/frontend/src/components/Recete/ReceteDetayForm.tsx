import React from 'react';
import {
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
  TextField,
  Autocomplete,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { Hammadde, ReceteDetay } from '../../types';

interface Props {
  detaylar: ReceteDetay[];
  hammaddeler: Hammadde[];
  toplam_miktar: number;
  onChange: (detaylar: ReceteDetay[]) => void;
}

const ReceteDetayForm: React.FC<Props> = ({
  detaylar,
  hammaddeler,
  toplam_miktar,
  onChange
}) => {
  const handleHammaddeChange = (index: number, hammadde: Hammadde | null) => {
    if (!hammadde) return;

    const yeniDetaylar = [...detaylar];
    yeniDetaylar[index] = {
      ...yeniDetaylar[index],
      hammadde_id: hammadde.id,
      hammadde
    };
    onChange(yeniDetaylar);
  };

  const handleOranChange = (index: number, oran: number) => {
    const yeniDetaylar = [...detaylar];
    yeniDetaylar[index] = {
      ...yeniDetaylar[index],
      oran,
      miktar: (toplam_miktar * oran) / 100
    };
    onChange(yeniDetaylar);
  };

  const handleSiralamaChange = (index: number, siralama: number) => {
    const yeniDetaylar = [...detaylar];
    yeniDetaylar[index] = {
      ...yeniDetaylar[index],
      siralama
    };
    onChange(yeniDetaylar);
  };

  const handleDetayEkle = () => {
    const yeniDetay: ReceteDetay = {
      hammadde_id: 0,
      hammadde: {
        id: 0,
        kod: '',
        ad: '',
        birim: '',
        miktar: 0,
        kritik_miktar: 0,
        birim_fiyat: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      oran: 0,
      miktar: 0,
      siralama: detaylar.length + 1
    };
    onChange([...detaylar, yeniDetay]);
  };

  const handleDetaySil = (index: number) => {
    const yeniDetaylar = detaylar.filter((_, i) => i !== index);
    // Sıralama numaralarını güncelle
    yeniDetaylar.forEach((detay, i) => {
      detay.siralama = i + 1;
    });
    onChange(yeniDetaylar);
  };

  const toplamOran = detaylar.reduce((sum, detay) => sum + detay.oran, 0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          Toplam Oran: %{toplamOran.toFixed(2)}
          {toplamOran !== 100 && (
            <span style={{ color: 'red', marginLeft: '10px' }}>
              (Toplam oran %100 olmalıdır)
            </span>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleDetayEkle}
        >
          Hammadde Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sıra</TableCell>
              <TableCell>Hammadde</TableCell>
              <TableCell>Oran (%)</TableCell>
              <TableCell>Miktar</TableCell>
              <TableCell>Birim</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detaylar.map((detay, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    type="number"
                    value={detay.siralama}
                    onChange={(e) => handleSiralamaChange(index, parseInt(e.target.value))}
                    size="small"
                    style={{ width: 70 }}
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    value={detay.hammadde}
                    onChange={(_, newValue) => handleHammaddeChange(index, newValue)}
                    options={hammaddeler}
                    getOptionLabel={(option) => `${option.kod} - ${option.ad}`}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                    style={{ width: 300 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={detay.oran}
                    onChange={(e) => handleOranChange(index, parseFloat(e.target.value))}
                    size="small"
                    style={{ width: 100 }}
                  />
                </TableCell>
                <TableCell>
                  {((toplam_miktar * detay.oran) / 100).toFixed(2)}
                </TableCell>
                <TableCell>{detay.hammadde.birim}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDetaySil(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReceteDetayForm; 