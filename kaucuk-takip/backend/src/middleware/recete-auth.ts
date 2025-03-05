import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const receteAuth = async (req: any, res: Response, next: NextFunction) => {
    try {
        // Kullanıcı bilgilerini auth middleware'den alıyoruz
        const kullanici = req.user;
        const recete_id = parseInt(req.params.id || req.body.recete_id);
        const islem_tipi = req.method === 'GET' ? 'görüntüleme' : 
                          req.method === 'PUT' ? 'düzenleme' : 
                          req.method === 'DELETE' ? 'silme' : 'diğer';

        // Erişimi logla
        await prisma.receteErisimLog.create({
            data: {
                kullanici_id: kullanici.id,
                recete_id,
                islem_tipi,
                ip_adresi: req.ip,
                aciklama: `${kullanici.rol} rolündeki kullanıcı tarafından ${islem_tipi} işlemi yapıldı`
            }
        });

        // Admin her şeyi yapabilir
        if (kullanici.rol === 'admin') {
            return next();
        }

        // Operatör sadece görüntüleyebilir
        if (kullanici.rol === 'operator' && islem_tipi === 'görüntüleme') {
            return next();
        }

        // Yetkisiz erişim
        res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
        
    } catch (error) {
        res.status(500).json({ error: 'Reçete erişim kontrolü sırasında hata oluştu' });
    }
};
