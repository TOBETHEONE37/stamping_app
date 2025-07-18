export interface JwtPayload {
  storeId: number;
  storeNm: string;
  businessNumber: string;
  iat?: number;
  exp?: number;
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const base64Payload = token.split('.')[1];

    const binary = atob(base64Payload);
    const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)));

    const decodedPayload = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(decodedPayload) as JwtPayload;
  } catch (err) {
    console.error("JWT decode 실패:", err);
    return null;
  }
}

export function getDecodedAccessToken(): JwtPayload | null {
  const token = getAccessToken();
  if (!token) return null;
  return decodeToken(token);
}

export function getStoreInfoFromToken(): { storeId: number; storeNm: string } | null {
  const decoded = getDecodedAccessToken();
  if (!decoded) return null;
  return {
    storeId: decoded.storeId,
    storeNm: decoded.storeNm,
  };
}