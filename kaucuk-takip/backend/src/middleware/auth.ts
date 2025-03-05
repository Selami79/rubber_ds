import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user?: any;
}

export const auth = (requiredRoles: string[]) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) throw new Error();

            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            if (!requiredRoles.includes((decoded as any).rol)) {
                throw new Error('Yetkisiz erişim');
            }
            
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Lütfen giriş yapın' });
        }
    };
};
