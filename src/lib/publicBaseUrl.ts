
const PUBLIC_BASE_URL_KEY = 'gallery_public_base_url';

export const getPublicBaseUrl = (): string => {
  const stored = localStorage.getItem(PUBLIC_BASE_URL_KEY);
  if (stored) {
    return stored;
  }
  
  // Default to the user's domain
  return 'https://chea-taic.be';
};

export const setPublicBaseUrl = (url: string): void => {
  // Normalize URL - remove trailing slash
  const normalizedUrl = url.replace(/\/$/, '');
  localStorage.setItem(PUBLIC_BASE_URL_KEY, normalizedUrl);
};

export const isLovableOrLocalhost = (url: string): boolean => {
  return url.includes('lovable') || url.includes('localhost');
};
