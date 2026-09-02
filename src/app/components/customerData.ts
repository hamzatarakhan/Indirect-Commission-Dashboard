// Customer data for CustomerRevenueMatrix component

export interface Customer {
  id: string;
  name: string;
  mobile: number;
  fixed: number;
  ict: number;
  sms: number;
  trend: number;
  segment: string;
  vertical: string;
  company: string;
  targetMultiplier: number;
  declineDate?: string;
  declineService?: 'Mobile' | 'Fixed' | 'ICT' | 'SMS';
}

export const topCustomers: Customer[] = [
  // Key Energy Accounts (5 companies)
  { id: 'C-10001', name: 'Ahmed Al-Balushi', mobile: 2100000, fixed: 2800000, ict: 3200000, sms: 1500000, trend: 12.5, segment: 'Large Business', vertical: 'Key Energy Accounts', company: 'Oman Oil Company SAOG', targetMultiplier: 1.18 },
  { id: 'C-10002', name: 'Salim Al-Rashdi', mobile: 1800000, fixed: 2400000, ict: 2900000, sms: 1200000, trend: 10.3, segment: 'Large Business', vertical: 'Key Energy Accounts', company: 'Petroleum Development Oman LLC', targetMultiplier: 1.16 },
  { id: 'C-10003', name: 'Yousuf Al-Kindi', mobile: 1500000, fixed: 2100000, ict: 2500000, sms: 900000, trend: 9.1, segment: 'Large Business', vertical: 'Key Energy Accounts', company: 'Oman Gas Company SAOC', targetMultiplier: 1.15 },
  { id: 'C-10004', name: 'Khalifa Al-Harthy', mobile: 1200000, fixed: 1800000, ict: 2200000, sms: 600000, trend: 8.7, segment: 'Large Business', vertical: 'Key Energy Accounts', company: 'Oman Refinery Company SAOC', targetMultiplier: 1.14 },
  { id: 'C-10005', name: 'Hassan Al-Wahaibi', mobile: 1100000, fixed: 1600000, ict: 2000000, sms: 500000, trend: 7.5, segment: 'Large Business', vertical: 'Key Energy Accounts', company: 'Oman Electricity Transmission Company SAOC', targetMultiplier: 1.13 },

  // Key Government Accounts (4 companies)
  { id: 'C-10006', name: 'Fatima Al-Hinai', mobile: 1900000, fixed: 2700000, ict: 3100000, sms: 1400000, trend: 11.2, segment: 'Key Account', vertical: 'Key Government Accounts', company: 'Ministry of Finance', targetMultiplier: 1.17 },
  { id: 'C-10007', name: 'Laila Al-Mahrouqi', mobile: 1600000, fixed: 2300000, ict: 2700000, sms: 1100000, trend: 9.8, segment: 'Key Account', vertical: 'Key Government Accounts', company: 'Royal Court Affairs', targetMultiplier: 1.15 },
  { id: 'C-10008', name: 'Saeed Al-Ghassani', mobile: 1400000, fixed: 2000000, ict: 2400000, sms: 800000, trend: 8.4, segment: 'Key Account', vertical: 'Key Government Accounts', company: 'Oman Investment Authority', targetMultiplier: 1.14 },
  { id: 'C-10009', name: 'Noor Al-Battashi', mobile: 1200000, fixed: 1700000, ict: 2100000, sms: 600000, trend: 7.2, segment: 'Key Account', vertical: 'Key Government Accounts', company: 'Ministry of Interior', targetMultiplier: 1.12 },

  // Key Financial Accounts (4 companies)
  { id: 'C-10010', name: 'Mohammed Al-Lawati', mobile: 1700000, fixed: 2500000, ict: 2800000, sms: 1300000, trend: 13.1, segment: 'Large Business', vertical: 'Key Financial Accounts', company: 'Bank Muscat SAOG', targetMultiplier: 1.19 },
  { id: 'C-10011', name: 'Abdullah Al-Habsi', mobile: 1500000, fixed: 2200000, ict: 2600000, sms: 1000000, trend: 11.2, segment: 'Key Account', vertical: 'Key Financial Accounts', company: 'Central Bank of Oman', targetMultiplier: 1.17 },
  { id: 'C-10012', name: 'Tariq Al-Amri', mobile: 1300000, fixed: 1900000, ict: 2300000, sms: 700000, trend: 9.8, segment: 'Large Business', vertical: 'Key Financial Accounts', company: 'National Bank of Oman SAOG', targetMultiplier: 1.15 },
  { id: 'C-10013', name: 'Huda Al-Hosni', mobile: 1100000, fixed: 1600000, ict: 2000000, sms: 500000, trend: 8.1, segment: 'Large Business', vertical: 'Key Financial Accounts', company: 'Muscat Securities Market SAOC', targetMultiplier: 1.13 },

  // Healthcare Education & Hospitality Accounts (3 companies)
  { id: 'C-10014', name: 'Aisha Al-Farsi', mobile: 1400000, fixed: 1900000, ict: 2200000, sms: 800000, trend: 8.5, segment: 'Large Business', vertical: 'Healthcare Education & Hospitality Accounts', company: 'Ministry of Health', targetMultiplier: 1.14 },
  { id: 'C-10015', name: 'Ibrahim Al-Yahmadi', mobile: 1200000, fixed: 1700000, ict: 2000000, sms: 600000, trend: 7.1, segment: 'Large Business', vertical: 'Healthcare Education & Hospitality Accounts', company: 'Sultan Qaboos University', targetMultiplier: 1.12 },
  { id: 'C-10016', name: 'Mariam Al-Siyabi', mobile: 1000000, fixed: 1500000, ict: 1800000, sms: 500000, trend: 6.2, segment: 'Large Business', vertical: 'Healthcare Education & Hospitality Accounts', company: 'Ministry of Education', targetMultiplier: 1.11 },

  // Manufacturing & Infrastructure Accounts (4 companies)
  { id: 'C-10017', name: 'Khalid Al-Busaidi', mobile: 1600000, fixed: 2100000, ict: 2500000, sms: 1200000, trend: 10.8, segment: 'Large Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Oman Telecommunications Company SAOG', targetMultiplier: 1.16 },
  { id: 'C-10018', name: 'Sara Al-Harthy', mobile: 1300000, fixed: 1800000, ict: 2200000, sms: 900000, trend: 8.5, segment: 'Large Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Port of Sohar SAOC', targetMultiplier: 1.14 },
  { id: 'C-10019', name: 'Jamal Al-Azri', mobile: 1100000, fixed: 1600000, ict: 1900000, sms: 700000, trend: 7.5, segment: 'Large Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Salalah Port Services Company SAOG', targetMultiplier: 1.12 },
  { id: 'C-10020', name: 'Zainab Al-Maamari', mobile: 900000, fixed: 1400000, ict: 1700000, sms: 500000, trend: 6.2, segment: 'Large Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Oman Cement Company SAOG', targetMultiplier: 1.11 },

  // Services (3 companies)
  { id: 'C-10021', name: 'Muna Al-Rawahi', mobile: 1200000, fixed: 1600000, ict: 1900000, sms: 800000, trend: 8.2, segment: 'Large Business', vertical: 'Services', company: 'Oman Air SAOC', targetMultiplier: 1.13 },
  { id: 'C-10022', name: 'Fatma Al-Jabri', mobile: 1000000, fixed: 1400000, ict: 1700000, sms: 600000, trend: 7.1, segment: 'Large Business', vertical: 'Services', company: 'Oman Airports Management Company SAOC', targetMultiplier: 1.12 },
  { id: 'C-10023', name: 'Shamsa Al-Harthi', mobile: 800000, fixed: 1200000, ict: 1500000, sms: 500000, trend: 5.9, segment: 'Medium Services', vertical: 'Services', company: 'National Hospitality Institute', targetMultiplier: 1.10 },

  // Retail & Technology Accounts (2 companies)
  { id: 'C-10024', name: 'Rashid Al-Sabti', mobile: 900000, fixed: 1400000, ict: 1800000, sms: 700000, trend: 7.3, segment: 'Large Business', vertical: 'Retail & Technology Accounts', company: 'Al Maha Technology Group SAOC', targetMultiplier: 1.12 },
  { id: 'C-10025', name: 'Omar Al-Shukaily', mobile: 1000000, fixed: 1500000, ict: 1900000, sms: 800000, trend: 6.8, segment: 'Key Account', vertical: 'Retail & Technology Accounts', company: 'Oman Digital Solutions SAOG', targetMultiplier: 1.11 },
];

export const bottomCustomers: Customer[] = [
  // Key Energy Accounts (3 companies)
  { id: 'C-20001', name: 'Khalfan Al-Mughairy', mobile: 95000, fixed: 110000, ict: 125000, sms: 60000, trend: -6.5, segment: 'Medium Business', vertical: 'Key Energy Accounts', company: 'Al Batinah Energy Services LLC', targetMultiplier: 1.15, declineDate: 'Oct 2024', declineService: 'Mobile' },
  { id: 'C-20002', name: 'Hamed Al-Baluchi', mobile: 88000, fixed: 102000, ict: 118000, sms: 50000, trend: -5.8, segment: 'Medium Business', vertical: 'Key Energy Accounts', company: 'Sharqiyah Power Solutions LLC', targetMultiplier: 1.14, declineDate: 'Nov 2024', declineService: 'Fixed' },
  { id: 'C-20003', name: 'Zahra Al-Harthi', mobile: 92000, fixed: 98000, ict: 112000, sms: 60000, trend: -7.1, segment: 'Medium Business', vertical: 'Key Energy Accounts', company: 'Dhofar Utilities Company LLC', targetMultiplier: 1.16, declineDate: 'Dec 2024', declineService: 'ICT' },

  // Key Government Accounts (3 companies)
  { id: 'C-20004', name: 'Abdullah Al-Hinai', mobile: 98000, fixed: 115000, ict: 108000, sms: 50000, trend: -5.5, segment: 'Medium Business', vertical: 'Key Government Accounts', company: 'Muscat Governorate Services', targetMultiplier: 1.14, declineDate: 'Oct 2024', declineService: 'ICT' },
  { id: 'C-20005', name: 'Fatma Al-Siyabi', mobile: 90000, fixed: 105000, ict: 102000, sms: 40000, trend: -4.8, segment: 'Medium Business', vertical: 'Key Government Accounts', company: 'Dhofar Municipality Services', targetMultiplier: 1.13, declineDate: 'Nov 2024', declineService: 'Mobile' },
  { id: 'C-20006', name: 'Salem Al-Mashani', mobile: 82000, fixed: 98000, ict: 95000, sms: 50000, trend: -6.3, segment: 'Medium Business', vertical: 'Key Government Accounts', company: 'Public Authority Services LLC', targetMultiplier: 1.15, declineDate: 'Dec 2024', declineService: 'Fixed' },

  // Key Financial Accounts (3 companies)
  { id: 'C-20007', name: 'Rashid Al-Wahaibi', mobile: 105000, fixed: 120000, ict: 115000, sms: 60000, trend: -7.8, segment: 'Medium Business', vertical: 'Key Financial Accounts', company: 'Al Wadi Finance Company LLC', targetMultiplier: 1.17, declineDate: 'Oct 2024', declineService: 'Mobile' },
  { id: 'C-20008', name: 'Layla Al-Jabri', mobile: 95000, fixed: 110000, ict: 108000, sms: 50000, trend: -6.9, segment: 'Medium Business', vertical: 'Key Financial Accounts', company: 'Coastal Investment Services LLC', targetMultiplier: 1.16, declineDate: 'Nov 2024', declineService: 'Fixed' },
  { id: 'C-20009', name: 'Tariq Al-Azri', mobile: 92000, fixed: 105000, ict: 98000, sms: 50000, trend: -5.7, segment: 'Medium Business', vertical: 'Key Financial Accounts', company: 'Oman Leasing Company LLC', targetMultiplier: 1.14, declineDate: 'Dec 2024', declineService: 'ICT' },

  // Healthcare Education & Hospitality Accounts (3 companies)
  { id: 'C-20010', name: 'Huda Al-Shibli', mobile: 72000, fixed: 85000, ict: 92000, sms: 40000, trend: -8.1, segment: 'Medium Business', vertical: 'Healthcare Education & Hospitality Accounts', company: 'Al Nahda Private Hospital LLC', targetMultiplier: 1.17, declineDate: 'Oct 2024', declineService: 'Mobile' },
  { id: 'C-20011', name: 'Yousuf Al-Amri', mobile: 68000, fixed: 78000, ict: 85000, sms: 40000, trend: -7.3, segment: 'Medium Business', vertical: 'Healthcare Education & Hospitality Accounts', company: 'International School of Muscat', targetMultiplier: 1.16, declineDate: 'Nov 2024', declineService: 'Fixed' },
  { id: 'C-20012', name: 'Sara Al-Habsi', mobile: 65000, fixed: 75000, ict: 80000, sms: 40000, trend: -6.5, segment: 'Medium Business', vertical: 'Healthcare Education & Hospitality Accounts', company: 'Muscat Private College', targetMultiplier: 1.15, declineDate: 'Dec 2024', declineService: 'ICT' },

  // Manufacturing & Infrastructure Accounts (3 companies)
  { id: 'C-20013', name: 'Khalid Al-Rashdi', mobile: 98000, fixed: 112000, ict: 105000, sms: 50000, trend: -6.8, segment: 'Medium Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Oman Steel Company LLC', targetMultiplier: 1.16, declineDate: 'Oct 2024', declineService: 'ICT' },
  { id: 'C-20014', name: 'Asma Al-Mukhaini', mobile: 90000, fixed: 105000, ict: 98000, sms: 40000, trend: -5.9, segment: 'Medium Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Al Batinah Construction LLC', targetMultiplier: 1.14, declineDate: 'Nov 2024', declineService: 'Mobile' },
  { id: 'C-20015', name: 'Majid Al-Harthy', mobile: 85000, fixed: 95000, ict: 102000, sms: 50000, trend: -7.2, segment: 'Medium Business', vertical: 'Manufacturing & Infrastructure Accounts', company: 'Sohar Aluminum Company LLC', targetMultiplier: 1.16, declineDate: 'Dec 2024', declineService: 'Fixed' },

  // Services (3 companies)
  { id: 'C-20016', name: 'Fatima Al-Zadjali', mobile: 75000, fixed: 82000, ict: 88000, sms: 40000, trend: -6.3, segment: 'Medium Business', vertical: 'Services', company: 'Oman Travel Services LLC', targetMultiplier: 1.15, declineDate: 'Oct 2024', declineService: 'Fixed' },
  { id: 'C-20017', name: 'Omar Al-Harrasi', mobile: 68000, fixed: 78000, ict: 85000, sms: 40000, trend: -5.7, segment: 'Medium Business', vertical: 'Services', company: 'Al Falaj Business Solutions LLC', targetMultiplier: 1.14, declineDate: 'Nov 2024', declineService: 'ICT' },
  { id: 'C-20018', name: 'Jamila Al-Kharusi', mobile: 72000, fixed: 75000, ict: 80000, sms: 40000, trend: -7.4, segment: 'Medium Business', vertical: 'Services', company: 'Muscat Consulting Group LLC', targetMultiplier: 1.16, declineDate: 'Dec 2024', declineService: 'Mobile' },

  // Retail & Technology Accounts (3 companies)
  { id: 'C-20019', name: 'Ali Al-Zadjali', mobile: 45000, fixed: 32000, ict: 28000, sms: 20000, trend: -16.2, segment: 'Micro-Retail', vertical: 'Retail & Technology Accounts', company: 'Al Madina Trading LLC', targetMultiplier: 1.22, declineDate: 'Oct 2024', declineService: 'Mobile' },
  { id: 'C-20020', name: 'Salma Al-Rashdi', mobile: 38000, fixed: 35000, ict: 30000, sms: 18000, trend: -14.5, segment: 'Micro-Retail', vertical: 'Retail & Technology Accounts', company: 'Muttrah Trading LLC', targetMultiplier: 1.20, declineDate: 'Nov 2024', declineService: 'Mobile' },
  { id: 'C-20021', name: 'Khamis Al-Lawati', mobile: 40000, fixed: 38000, ict: 32000, sms: 20000, trend: -12.8, segment: 'Micro-Retail', vertical: 'Retail & Technology Accounts', company: 'Ruwi Market Company LLC', targetMultiplier: 1.19, declineDate: 'Dec 2024', declineService: 'Fixed' },

  // Technology (2 companies)
  { id: 'C-20022', name: 'Suad Al-Riyami', mobile: 48000, fixed: 55000, ict: 45000, sms: 25000, trend: -9.5, segment: 'Medium Business', vertical: 'Technology', company: 'Tech Solutions LLC', targetMultiplier: 1.19, declineDate: 'Nov 2024', declineService: 'Fixed' },
  { id: 'C-20023', name: 'Basma Al-Shibli', mobile: 75000, fixed: 52000, ict: 48000, sms: 24000, trend: -8.1, segment: 'Medium Business', vertical: 'Technology', company: 'Smart Systems LLC', targetMultiplier: 1.16, declineDate: 'Dec 2024', declineService: 'ICT' },

  // Hospitality (1 company)
  { id: 'C-20024', name: 'Badr Al-Wahaibi', mobile: 105000, fixed: 72000, ict: 78000, sms: 40000, trend: -7.2, segment: 'Medium Business', vertical: 'Hospitality', company: 'Golden Sands Hotel LLC', targetMultiplier: 1.16, declineDate: 'Nov 2024', declineService: 'Mobile' },

  // Retail & Commerce (1 company)
  { id: 'C-20025', name: 'Majid Al-Balushi', mobile: 115000, fixed: 65000, ict: 68000, sms: 40000, trend: -6.1, segment: 'BMB', vertical: 'Retail & Commerce', company: 'City Retail Holdings LLC', targetMultiplier: 1.15, declineDate: 'Oct 2024', declineService: 'ICT' },
];