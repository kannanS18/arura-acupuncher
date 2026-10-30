/**
 * Utility to reliably resolve public static assets across both local dev (/) 
 * and GitHub Pages subpath (/arura-acupuncher/).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}
