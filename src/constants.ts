export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24; // 24 hours
export const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 7; // 7 days
export const JWT_SECRET = process.env.JWT_SECRET;
