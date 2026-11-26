// All site copy lives here so it can be edited without touching components.
export const company = {
  name: 'MASS Payroll Solutions',
  whatsapp: '919840992989',
  telegram: 'https://t.me/MASSPayroll',
  phones: [
    { label: '98409 92989', tel: '+919840992989' },
    { label: '73973 93319', tel: '+917397393319' },
  ],
  email: 'masspayroll@outlook.com',
  address: '49, 9th Cross Street, Subhashree Nagar, Mugalivakkam, Chennai 600125',
  brochure: './brochure.pdf',
}

export const netPayBars = [42, 55, 48, 63, 58, 71, 66, 78, 74, 86, 82, 94]

export const remittances = [
  ['PF', 'Challan paid & ECR filed'],
  ['ESI', 'Contribution remitted'],
  ['PT', 'Professional tax paid'],
  ['TDS', 'Deducted & deposited'],
]

export const stats = [
  { label: 'Experience', value: '20+', caption: 'Years of payroll expertise' },
  { label: 'Volume', value: '6L+', caption: 'Payroll transactions a year' },
  { label: 'Accuracy', value: '100%', caption: 'Statutory remittance accuracy', dark: true },
]

export const payslip = {
  id: 'EMP-0142',
  rows: [
    ['Basic', '₹32,000'],
    ['HRA', '₹12,800'],
    ['Special allowance', '₹6,400'],
    ['PF', '−₹3,000', true],
    ['Professional tax', '−₹209', true],
  ],
  net: '₹47,991',
}

export const included = [
  ['End-to-end payroll', 'Salary computation, payslips and bank transfer files.'],
  ['PF / ESI / PT / TDS remittances', 'Calculated, paid and filed with 100% accuracy.'],
  ['Compliance updates', 'Timely updates on acts and rule changes.'],
  ['Secure cloud records', 'Employee records on a safe, trusted cloud platform.'],
  ['24/7 employee access', 'Information available anytime, anywhere.'],
  ['Lower overhead', 'No payroll software or extra hires needed.'],
]

export const benefits = [
  'Increased efficiency & productivity',
  'Cost effective, lower infrastructure cost',
  'Minimised risk of penalties',
  'Easy employee database management',
]

// Top clients as of Oct '26 (from Muthuganesh's email, 26 Nov 2026). Logos live in public/clients/.
export const clients = [
  { name: 'Cheers Retail Pvt Ltd', business: 'Chain of restaurants', employees: 34, logo: './clients/cheers.png' },
  { name: 'Day 2 Day Services', business: 'Security manpower services', employees: 585, logo: './clients/d2d.png' },
  { name: 'GSK Manpower Consultancy Pvt Ltd', business: 'HMV driver manpower services', employees: 85, logo: './clients/gsk.png' },
  { name: 'Kafee World Beverages Pvt Ltd', business: 'Food services (beverages & bites)', employees: 51, logo: './clients/kafee-world.png' },
  { name: 'Levelup Facility Management Services', business: 'Facility management services', employees: 116, logo: './clients/levelup.png' },
  { name: 'Progressive Industries', business: 'Manufacturing (precision parts)', employees: 38, logo: './clients/progressive.png' },
  { name: 'SI Care Pvt Ltd', business: 'Property value management', employees: 26, logo: './clients/si-care.png' },
]
