export const cx = (...parts) => parts.filter(Boolean).join(' ');

export const r2 = (n) => Math.round(Number(n) * 100) / 100;

export const money = (n) =>
  '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const stockStatus = (stock) => (stock <= 0 ? 'Out of Stock' : stock <= 8 ? 'Low Stock' : 'In Stock');

export function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function nextOrderId(orders) {
  let max = 1040;
  orders.forEach((o) => {
    const n = parseInt(String(o.id).replace(/\D/g, ''), 10);
    if (!isNaN(n) && n > max) max = n;
  });
  return 'ORD-' + (max + 1);
}

/* Thumbnail chip colors — monochrome base */
export const CHIP = { bg: '#181818', stroke: '#333333', text: '#999999' };

export function productImage(name, size = 80, colors = CHIP) {
  const initials = String(name || '?')
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><rect width='${size}' height='${size}' rx='10' fill='${colors.bg}'/><rect x='0.5' y='0.5' width='${size - 1}' height='${size - 1}' rx='9.5' fill='none' stroke='${colors.stroke}'/><text x='50%' y='50%' dy='0.35em' text-anchor='middle' font-family='system-ui, sans-serif' font-size='${Math.round(size * 0.28)}' fill='${colors.text}'>${initials}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}