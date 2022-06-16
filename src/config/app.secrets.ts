import { appConf } from './config';

export function getAuthJWTSecret() {
    return appConf.AUTH_JWT_SECRET || 'Sha#Jal@Gazi%987';
}
