export interface User {
    id: number;
    kullanici_adi: string;
    ad_soyad: string;
    rol: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface Hammadde {
  id: number;
  kod: string;
  ad: string;
  birim: string;
  miktar: number;
  kritik_miktar: number;
  birim_fiyat: number;
  depo_lokasyonu?: string;
  created_at: string;
  updated_at: string;
}

export interface ReceteDetay {
  hammadde_id: number;
  hammadde: Hammadde;
  oran: number;
  miktar: number;
  siralama: number;
}

export interface Recete {
  id: number;
  kod: string;
  ad: string;
  aciklama?: string;
  toplam_miktar: number;
  talimatlar?: string;
  recete_detaylari: ReceteDetay[];
  created_at: string;
  updated_at: string;
}

export interface ReceteFormData {
  kod: string;
  ad: string;
  aciklama: string;
  toplam_miktar: number;
  talimatlar: string;
  detaylar: ReceteDetay[];
}

export interface KaliteTest {
  id: number;
  urun_id: number;
  parti_no: string;
  test_tarihi: string;
  test_eden_id: number;
  sonuc: "Uygun" | "Şartlı" | "Uygun Değil";
  onay_durumu: "Beklemede" | "Onaylandı" | "Reddedildi";
  onaylayan_id?: number;
  onay_tarihi?: string;
  notlar?: string;
  olcumler: KaliteOlcum[];
}

export interface KaliteOlcum {
  id: number;
  test_id: number;
  olcum_tipi: string;
  olcum_degeri: number;
  birim: string;
  min_deger: number;
  max_deger: number;
  sonuc: "Uygun" | "Uygun Değil";
}

export interface Iskarta {
  id: number;
  urun_id: number;
  parti_no: string;
  makine_id: number;
  miktar: number;
  birim: string;
  neden: string;
  alt_neden?: string;
  durum: string;
  maliyet?: number;
  notlar?: string;
  lokasyon: string;
  operator_id: number;
  tarih: string;
  operator?: User;
}

export interface IskartaFormData {
  urun_id: number;
  parti_no: string;
  makine_id: number;
  miktar: number;
  birim: string;
  neden: string;
  alt_neden?: string;
  durum: string;
  maliyet?: number;
  notlar?: string;
  lokasyon: string;
}

export interface KaliteTestFormData {
  urun_id: number;
  parti_no: string;
  olcumler: {
    olcum_tipi: string;
    olcum_degeri: number;
    birim: string;
    min_deger: number;
    max_deger: number;
  }[];
  notlar?: string;
}
