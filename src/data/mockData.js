export const CATEGORIES = ['Electronics', 'Apparel', 'Home', 'Books', 'Beauty', 'Sports'];
export const ORDER_STATUSES = ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled'];
export const PAYMENT_STATES = ['Paid', 'Pending', 'Refunded'];
export const STOCK_FILTERS = ['All statuses', 'In Stock', 'Low Stock', 'Out of Stock'];
export const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'NOK (kr)', 'SEK (kr)'];
export const TIMEZONES = [
  '(GMT-08:00) Los Angeles',
  '(GMT-05:00) New York',
  '(GMT+00:00) London',
  '(GMT+01:00) Oslo',
  '(GMT+05:30) Mumbai',
];
export const COUNTRIES = ['United States', 'United Kingdom', 'Norway', 'Germany', 'India', 'Australia'];

export const weeklyRevenue = [
  { value: 182 },
  { value: 246 },
  { value: 214 },
  { value: 318 },
  { value: 272 },
  { value: 384 },
  { value: 348 },
  { value: 412 },
];

export const seedProducts = [
  { id: 'p1', name: 'Aurora Wireless Headphones', sku: 'AUR-WH-001', category: 'Electronics', price: 129, stock: 34, status: 'In Stock', description: 'Over-ear wireless headphones with matte graphite shells, 40-hour battery life and passive noise isolation.' },
  { id: 'p2', name: 'Nordic Linen Shirt', sku: 'NRD-LS-114', category: 'Apparel', price: 58.5, stock: 6, status: 'Low Stock', description: 'Breathable stonewashed linen shirt in pale ash. Relaxed fit with corozo buttons.' },
  { id: 'p3', name: 'Ceramic Pour-Over Kettle', sku: 'CRM-PK-207', category: 'Home', price: 44, stock: 4, status: 'Low Stock', description: 'Hand-glazed ceramic kettle with a precision spout for slow pour-over brewing.' },
  { id: 'p4', name: 'Field Notes — Blank', sku: 'FLD-BK-330', category: 'Books', price: 13, stock: 120, status: 'In Stock', description: 'Pocket-sized 48-page blank notebook with stitched spine and recycled cover stock.' },
  { id: 'p5', name: 'Cedar Face Balm', sku: 'CDR-FB-402', category: 'Beauty', price: 24, stock: 7, status: 'Low Stock', description: 'Lightweight daily moisturiser with cedarwood extract and a matte finish.' },
  { id: 'p6', name: 'Trail Runner Socks', sku: 'TRL-RS-518', category: 'Sports', price: 14.5, stock: 60, status: 'In Stock', description: 'Merino-blend crew socks with cushioned sole and arch support.' },
  { id: 'p7', name: 'Slate Mechanical Keyboard', sku: 'SLT-MK-609', category: 'Electronics', price: 89, stock: 25, status: 'In Stock', description: '75% hot-swappable mechanical keyboard with graphite keycaps and gasket mount.' },
  { id: 'p8', name: 'Wool Blend Overcoat', sku: 'WOL-OC-711', category: 'Apparel', price: 189, stock: 3, status: 'Low Stock', description: 'Tailored charcoal overcoat in a wool-cashmere blend with hidden placket.' },
  { id: 'p9', name: 'Volcanic Clay Mask', sku: 'VLC-CM-823', category: 'Beauty', price: 19, stock: 9, status: 'In Stock', description: 'Deep-cleansing kaolin and volcanic ash mask for weekly reset routines.' },
  { id: 'p10', name: 'Neoprene Yoga Mat', sku: 'NEO-YM-903', category: 'Sports', price: 39, stock: 2, status: 'Low Stock', description: '5mm non-slip mat with alignment lines and carry strap.' },
  { id: 'p11', name: 'Granite Desk Lamp', sku: 'GRN-DL-101', category: 'Home', price: 52, stock: 0, status: 'Out of Stock', description: 'Adjustable desk lamp weighted with a solid granite base.' },
  { id: 'p12', name: 'Ash Wood Notebook Stand', sku: 'ASH-NS-102', category: 'Home', price: 36, stock: 48, status: 'In Stock', description: 'Ventilated solid-ash laptop stand, folds flat for travel.' },
  { id: 'p13', name: 'Carbon Ballpoint Pen', sku: 'CRB-BP-103', category: 'Books', price: 9.5, stock: 200, status: 'In Stock', description: 'Machined carbon-fibre barrel pen with German-made refill.' },
  { id: 'p14', name: 'Graphite Running Jacket', sku: 'GRP-RJ-104', category: 'Sports', price: 74, stock: 0, status: 'Out of Stock', description: 'Wind-resistant packable running jacket with reflective seams.' },
  { id: 'p15', name: 'Mono Bluetooth Speaker', sku: 'MNO-BS-105', category: 'Electronics', price: 59, stock: 41, status: 'In Stock', description: 'Fabric-wrapped portable speaker with 18-hour playtime.' },
  { id: 'p16', name: 'Charcoal Denim Jacket', sku: 'CHR-DJ-106', category: 'Apparel', price: 98, stock: 18, status: 'In Stock', description: 'Rigid charcoal denim trucker jacket, garment-dyed and double-stitched.' },
  { id: 'p17', name: 'Onyx Coffee Grinder', sku: 'ONX-CG-107', category: 'Home', price: 68, stock: 22, status: 'In Stock', description: 'Hand grinder with 48mm steel burrs and 40 grind settings.' },
  { id: 'p18', name: 'Silver Fern Face Oil', sku: 'SLV-FO-108', category: 'Beauty', price: 32, stock: 55, status: 'In Stock', description: 'Fast-absorbing facial oil with fern extract and squalane.' },
  { id: 'p19', name: 'Basalt Water Bottle', sku: 'BSL-WB-109', category: 'Sports', price: 21, stock: 90, status: 'In Stock', description: 'Double-wall insulated 750ml bottle in matte basalt finish.' },
  { id: 'p20', name: 'Storm Gray Beanie', sku: 'STM-GB-110', category: 'Apparel', price: 18, stock: 0, status: 'Out of Stock', description: 'Ribbed merino beanie in storm gray, one size.' },
  { id: 'p21', name: 'Ink Hardcover Journal', sku: 'INK-HJ-111', category: 'Books', price: 26, stock: 75, status: 'In Stock', description: 'A5 hardcover journal with 192 pages of 100gsm dotted paper.' },
  { id: 'p22', name: 'Pebble Wireless Mouse', sku: 'PBB-WM-112', category: 'Electronics', price: 34, stock: 63, status: 'In Stock', description: 'Silent-click ergonomic mouse with USB-C charging.' },
];

export const seedCustomers = [
  { id: 'c1', name: 'Ines Delgado', email: 'ines.delgado@example.com', phone: '+1 555 0141', address: '14 Birchwood Lane, Portland, OR 97205', status: 'Active', joined: '2025-03-14' },
  { id: 'c2', name: 'Amella Sørensen', email: 'amella.sorensen@example.com', phone: '+45 55 22 87 09', address: 'Sortedam Dossering 7, 2200 Copenhagen', status: 'Active', joined: '2025-05-02' },
  { id: 'c3', name: 'Yara Haddad', email: 'yara.haddad@example.com', phone: '+961 3 442 118', address: 'Mar Mikhael Street 22, Beirut', status: 'Active', joined: '2025-06-19' },
  { id: 'c4', name: 'Ravi Menon', email: 'ravi.menon@example.com', phone: '+91 98 4501 2233', address: '8 Lakeview Road, Bengaluru 560001', status: 'Active', joined: '2025-01-27' },
  { id: 'c5', name: 'Priya Shah', email: 'priya.shah@example.com', phone: '+44 7700 900451', address: '31 Grays Inn Road, London WC1X 8PQ', status: 'Active', joined: '2025-08-08' },
  { id: 'c6', name: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 555 0177', address: '902 Fulton Street, Brooklyn, NY 11238', status: 'Active', joined: '2025-02-11' },
  { id: 'c7', name: 'Sana Malik', email: 'sana.malik@example.com', phone: '+92 300 1122334', address: '12 Khayaban-e-Iqbal, Lahore 54000', status: 'Active', joined: '2025-09-30' },
  { id: 'c8', name: 'Tomás Ferreira', email: 'tomas.ferreira@example.com', phone: '+351 91 220 3341', address: 'Rua das Flores 84, 4050-262 Porto', status: 'Inactive', joined: '2024-11-05' },
  { id: 'c9', name: 'Lena Fischer', email: 'lena.fischer@example.com', phone: '+49 151 2345678', address: 'Torstraße 140, 10119 Berlin', status: 'Active', joined: '2025-10-16' },
  { id: 'c10', name: 'Dmitri Volkov', email: 'dmitri.volkov@example.com', phone: '+1 555 0139', address: '77 Harbour View Drive, Halifax, NS', status: 'Inactive', joined: '2024-12-22' },
];

export const seedOrders = [
  { id: 'ORD-1041', customer: 'Ines Delgado', email: 'ines.delgado@example.com', phone: '+1 555 0141', address: { street: '14 Birchwood Lane', city: 'Portland', state: 'OR', zip: '97205', country: 'United States' }, date: '2026-01-12', items: [{ name: 'Aurora Wireless Headphones', sku: 'AUR-WH-001', qty: 1, price: 129 }], subtotal: 129, discount: 0, shipping: 6, tax: 10.32, total: 145.32, payment: 'Paid', status: 'Delivered' },
  { id: 'ORD-1042', customer: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 555 0177', address: { street: '902 Fulton Street', city: 'Brooklyn', state: 'NY', zip: '11238', country: 'United States' }, date: '2026-01-14', items: [{ name: 'Nordic Linen Shirt', sku: 'NRD-LS-114', qty: 2, price: 58.5 }], subtotal: 117, discount: 0, shipping: 6, tax: 9.36, total: 132.36, payment: 'Paid', status: 'Delivered' },
  { id: 'ORD-1043', customer: 'Priya Shah', email: 'priya.shah@example.com', phone: '+44 7700 900451', address: { street: '31 Grays Inn Road', city: 'London', state: '', zip: 'WC1X 8PQ', country: 'United Kingdom' }, date: '2026-01-15', items: [{ name: 'Ceramic Pour-Over Kettle', sku: 'CRM-PK-207', qty: 1, price: 44 }, { name: 'Field Notes — Blank', sku: 'FLD-BK-330', qty: 1, price: 13 }], subtotal: 57, discount: 0, shipping: 0, tax: 3.48, total: 60.48, payment: 'Paid', status: 'Delivered' },
  { id: 'ORD-1044', customer: 'Yara Haddad', email: 'yara.haddad@example.com', phone: '+961 3 442 118', address: { street: 'Mar Mikhael Street 22', city: 'Beirut', state: '', zip: '2050', country: 'Lebanon' }, date: '2026-01-18', items: [{ name: 'Slate Mechanical Keyboard', sku: 'SLT-MK-609', qty: 1, price: 89 }, { name: 'Mono Bluetooth Speaker', sku: 'MNO-BS-105', qty: 1, price: 59 }], subtotal: 148, discount: 0, shipping: 6, tax: 11.84, total: 165.84, payment: 'Paid', status: 'Shipped' },
  { id: 'ORD-1045', customer: 'Ravi Menon', email: 'ravi.menon@example.com', phone: '+91 98 4501 2233', address: { street: '8 Lakeview Road', city: 'Bengaluru', state: 'KA', zip: '560001', country: 'India' }, date: '2026-01-19', items: [{ name: 'Onyx Coffee Grinder', sku: 'ONX-CG-107', qty: 1, price: 68 }, { name: 'Basalt Water Bottle', sku: 'BSL-WB-109', qty: 1, price: 21 }], subtotal: 89, discount: 0, shipping: 6, tax: 7.12, total: 102.12, payment: 'Paid', status: 'Pending' },
  { id: 'ORD-1046', customer: 'Amella Sørensen', email: 'amella.sorensen@example.com', phone: '+45 55 22 87 09', address: { street: 'Sortedam Dossering 7', city: 'Copenhagen', state: '', zip: '2200', country: 'Denmark' }, date: '2026-01-21', items: [{ name: 'Mono Bluetooth Speaker', sku: 'MNO-BS-105', qty: 1, price: 59 }, { name: 'Ceramic Pour-Over Kettle', sku: 'CRM-PK-207', qty: 1, price: 44 }, { name: 'Onyx Coffee Grinder', sku: 'ONX-CG-107', qty: 1, price: 68 }, { name: 'Basalt Water Bottle', sku: 'BSL-WB-109', qty: 1, price: 21 }, { name: 'Field Notes — Blank', sku: 'FLD-BK-330', qty: 1, price: 13 }], subtotal: 205, discount: 0, shipping: 0, tax: 16.4, total: 221.4, payment: 'Paid', status: 'Processing' },
  { id: 'ORD-1047', customer: 'Priya Shah', email: 'priya.shah@example.com', phone: '+44 7700 900451', address: { street: '31 Grays Inn Road', city: 'London', state: '', zip: 'WC1X 8PQ', country: 'United Kingdom' }, date: '2026-01-22', items: [{ name: 'Graphite Running Jacket', sku: 'GRP-RJ-104', qty: 1, price: 74 }, { name: 'Carbon Ballpoint Pen', sku: 'CRB-BP-103', qty: 1, price: 9.5 }], subtotal: 83.5, discount: 0, shipping: 0, tax: 2.42, total: 85.92, payment: 'Paid', status: 'Delivered' },
  { id: 'ORD-1048', customer: 'Ines Delgado', email: 'ines.delgado@example.com', phone: '+1 555 0141', address: { street: '14 Birchwood Lane', city: 'Portland', state: 'OR', zip: '97205', country: 'United States' }, date: '2026-01-24', items: [{ name: 'Nordic Linen Shirt', sku: 'NRD-LS-114', qty: 1, price: 58.5 }, { name: 'Neoprene Yoga Mat', sku: 'NEO-YM-903', qty: 1, price: 39 }], subtotal: 97.5, discount: 0, shipping: 6, tax: 6.72, total: 110.22, payment: 'Paid', status: 'Shipped' },
  { id: 'ORD-1049', customer: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 555 0177', address: { street: '902 Fulton Street', city: 'Brooklyn', state: 'NY', zip: '11238', country: 'United States' }, date: '2026-01-26', items: [{ name: 'Aurora Wireless Headphones', sku: 'AUR-WH-001', qty: 1, price: 129 }, { name: 'Trail Runner Socks', sku: 'TRL-RS-518', qty: 1, price: 14.5 }, { name: 'Ink Hardcover Journal', sku: 'INK-HJ-111', qty: 1, price: 26 }], subtotal: 169.5, discount: 0, shipping: 0, tax: 1.14, total: 170.64, payment: 'Paid', status: 'Processing' },
  { id: 'ORD-1050', customer: 'Yara Haddad', email: 'yara.haddad@example.com', phone: '+961 3 442 118', address: { street: 'Mar Mikhael Street 22', city: 'Beirut', state: '', zip: '2050', country: 'Lebanon' }, date: '2026-01-27', items: [{ name: 'Cedar Face Balm', sku: 'CDR-FB-402', qty: 1, price: 24 }, { name: 'Volcanic Clay Mask', sku: 'VLC-CM-823', qty: 1, price: 19 }, { name: 'Basalt Water Bottle', sku: 'BSL-WB-109', qty: 1, price: 21 }], subtotal: 64, discount: 0, shipping: 6, tax: 2.96, total: 72.96, payment: 'Paid', status: 'Pending' },
  { id: 'ORD-1051', customer: 'Amella Sørensen', email: 'amella.sorensen@example.com', phone: '+45 55 22 87 09', address: { street: 'Sortedam Dossering 7', city: 'Copenhagen', state: '', zip: '2200', country: 'Denmark' }, date: '2026-01-29', items: [{ name: 'Wool Blend Overcoat', sku: 'WOL-OC-711', qty: 1, price: 189 }, { name: 'Ink Hardcover Journal', sku: 'INK-HJ-111', qty: 1, price: 26 }], subtotal: 215, discount: 0, shipping: 0, tax: 3.12, total: 218.12, payment: 'Paid', status: 'Shipped' },
  { id: 'ORD-1052', customer: 'Ravi Menon', email: 'ravi.menon@example.com', phone: '+91 98 4501 2233', address: { street: '8 Lakeview Road', city: 'Bengaluru', state: 'KA', zip: '560001', country: 'India' }, date: '2026-01-31', items: [{ name: 'Wool Blend Overcoat', sku: 'WOL-OC-711', qty: 1, price: 189 }, { name: 'Aurora Wireless Headphones', sku: 'AUR-WH-001', qty: 1, price: 129 }, { name: 'Field Notes — Blank', sku: 'FLD-BK-330', qty: 1, price: 13 }, { name: 'Trail Runner Socks', sku: 'TRL-RS-518', qty: 1, price: 14.5 }], subtotal: 345.5, discount: 0, shipping: 0, tax: 6.12, total: 351.62, payment: 'Paid', status: 'Pending' },
  { id: 'ORD-1053', customer: 'Sana Malik', email: 'sana.malik@example.com', phone: '+92 300 1122334', address: { street: '12 Khayaban-e-Iqbal', city: 'Lahore', state: '', zip: '54000', country: 'Pakistan' }, date: '2026-02-02', items: [{ name: 'Storm Gray Beanie', sku: 'STM-GB-110', qty: 2, price: 18 }], subtotal: 36, discount: 0, shipping: 6, tax: 2.88, total: 44.88, payment: 'Pending', status: 'Pending' },
  { id: 'ORD-1054', customer: 'Tomás Ferreira', email: 'tomas.ferreira@example.com', phone: '+351 91 220 3341', address: { street: 'Rua das Flores 84', city: 'Porto', state: '', zip: '4050-262', country: 'Portugal' }, date: '2026-02-03', items: [{ name: 'Pebble Wireless Mouse', sku: 'PBB-WM-112', qty: 1, price: 34 }, { name: 'Trail Runner Socks', sku: 'TRL-RS-518', qty: 1, price: 14.5 }], subtotal: 48.5, discount: 0, shipping: 0, tax: 3.88, total: 52.38, payment: 'Refunded', status: 'Cancelled' },
  { id: 'ORD-1055', customer: 'Lena Fischer', email: 'lena.fischer@example.com', phone: '+49 151 2345678', address: { street: 'Torstraße 140', city: 'Berlin', state: '', zip: '10119', country: 'Germany' }, date: '2026-02-04', items: [{ name: 'Charcoal Denim Jacket', sku: 'CHR-DJ-106', qty: 1, price: 98 }], subtotal: 98, discount: 0, shipping: 6, tax: 7.84, total: 111.84, payment: 'Pending', status: 'Pending' },
];