// Enhanced Scope Resolver for Vertical Manager Dashboard
// Resolves user's Segment and Verticals from hierarchy data

export interface HierarchyRow {
  manager_id: string;      // or staff_id
  mgr_role: string;        // e.g., "Vertical Manager"
  segment_desc: string;    // e.g., "Large Business"
  vertical_name: string;   // e.g., "Government & Financial Accounts"
}

export interface UserScope {
  role: string;
  managerId: string;
  segment: string;
  verticals: string[];     // All assigned verticals
  selection: 'all' | string[]; // Current selection: 'all' or specific verticals
  name?: string;           // User's display name (for view-as functionality)
}

// Senior Manager to GM mapping - represents which SMs report to which GMs
export interface SeniorManagerHierarchy {
  smId: string;
  smName: string;
  gmId: string;  // The GM this SM reports to
  segment: string;
}

const seniorManagerHierarchy: SeniorManagerHierarchy[] = [
  { smId: 'SM001', smName: 'Sami Talal Khaled', gmId: 'GM001', segment: 'Large Business' },
  { smId: 'SM002', smName: 'Laila Al-Farsi', gmId: 'GM001', segment: 'Key Account' },
  { smId: 'SM003', smName: 'Omar Al-Harthi', gmId: 'GM001', segment: 'Medium Business' },
  { smId: 'SM004', smName: 'Nadia Al-Wahaibi', gmId: 'GM001', segment: 'Small Business' },
  { smId: 'SM005', smName: 'Rashid Al-Balushi', gmId: 'GM001', segment: 'Enterprise' },
  { smId: 'SM006', smName: 'Khalid Al-Suleimani', gmId: 'GM001', segment: 'Large Business' },
  { smId: 'SM007', smName: 'Amina Al-Kharusi', gmId: 'GM001', segment: 'BMB' },
  { smId: 'SM008', smName: 'Hassan Al-Rawahi', gmId: 'GM001', segment: 'Dhofar' },
  { smId: 'SM009', smName: 'Mariam Al-Busaidi', gmId: 'GM001', segment: 'SME Business' },
  { smId: 'SM010', smName: 'Tariq Al-Zadjali', gmId: 'GM001', segment: 'Key Account' },
];

// Vertical Manager to Senior Manager mapping
export interface VMToSMMapping {
  vmId: string;
  smId: string;
}

const vmToSMMapping: VMToSMMapping[] = [
  { vmId: 'VM0001', smId: 'SM001' },  // Ahmed Al-Rashid reports to Sami Talal Khaled
  { vmId: 'VM0002', smId: 'SM002' },  // Fatima Al-Zahra reports to Laila Al-Farsi
  { vmId: 'VM0003', smId: 'SM003' },  // Mohamed Al-Balushi reports to Omar Al-Harthi
  { vmId: 'VM0004', smId: 'SM004' },  // Sarah Al-Kindi reports to Nadia Al-Wahaibi
  { vmId: 'VM0005', smId: 'SM005' },  // Michael Chen reports to Rashid Al-Balushi
  // Additional VMs for SM001 (Large Business)
  { vmId: 'VM0006', smId: 'SM001' },  // Tariq Al-Habsi
  { vmId: 'VM0007', smId: 'SM001' },  // Zainab Al-Lawati
  // Additional VMs for SM002 (Key Account)
  { vmId: 'VM0008', smId: 'SM002' },  // Rashid Al-Suleimani
  { vmId: 'VM0009', smId: 'SM002' },  // Mariam Al-Kharusi
  // Additional VMs for SM003 (Medium Business)
  { vmId: 'VM0010', smId: 'SM003' },  // Hamza Al-Rashdi
  { vmId: 'VM0011', smId: 'SM003' },  // Salma Al-Zadjali
  // Additional VMs for SM004 (Small Business)
  { vmId: 'VM0012', smId: 'SM004' },  // Ibrahim Al-Mamari
  { vmId: 'VM0013', smId: 'SM004' },  // Nadia Al-Shabibi
  // Additional VMs for SM005 (Enterprise)
  { vmId: 'VM0014', smId: 'SM005' },  // Khalid Al-Hinai
  { vmId: 'VM0015', smId: 'SM005' },  // Fatima Al-Busaidi
  // More VMs for SM006 (Large Business)
  { vmId: 'VM0016', smId: 'SM006' },  // Said Al-Kindi
  { vmId: 'VM0017', smId: 'SM006' },  // Aisha Al-Farsi
  { vmId: 'VM0018', smId: 'SM006' },  // Waleed Al-Mahdi
  // More VMs for SM007 (BMB)
  { vmId: 'VM0019', smId: 'SM007' },  // Hana Al-Shehi
  { vmId: 'VM0020', smId: 'SM007' },  // Juma Al-Qasmi
  { vmId: 'VM0021', smId: 'SM007' },  // Maitha Al-Balushi
  // More VMs for SM008 (Dhofar)
  { vmId: 'VM0022', smId: 'SM008' },  // Badr Al-Shahri
  { vmId: 'VM0023', smId: 'SM008' },  // Thuraya Al-Rawas
  // More VMs for SM009 (SME Business)
  { vmId: 'VM0024', smId: 'SM009' },  // Qais Al-Salmi
  { vmId: 'VM0025', smId: 'SM009' },  // Reem Al-Hadrami
  { vmId: 'VM0026', smId: 'SM009' },  // Yousef Al-Azri
  // More VMs for SM010 (Key Account)
  { vmId: 'VM0027', smId: 'SM010' },  // Latifa Al-Maamari
  { vmId: 'VM0028', smId: 'SM010' },  // Hamdan Al-Hinai
];

// KAM to VM mapping - represents which KAMs report to which VMs
export interface KAMHierarchy {
  kamId: string;
  kamName: string;
  vmId: string;  // The VM this KAM reports to
  segment: string;
  vertical: string;
}

const kamHierarchy: KAMHierarchy[] = [
  // KAMs reporting to VM0001 (Ahmed Al-Rashid - Large Business)
  { kamId: 'KAM001', kamName: 'Ahmed Al-Rashid', vmId: 'VM0001', segment: 'Large Business', vertical: 'Government & Financial Accounts' },
  { kamId: 'KAM002', kamName: 'Fatima Al-Zahra', vmId: 'VM0001', segment: 'Large Business', vertical: 'Healthcare' },
  { kamId: 'KAM003', kamName: 'Mohamed Al-Balushi', vmId: 'VM0001', segment: 'Large Business', vertical: 'Education & Hospitality Accounts' },
  { kamId: 'KAM004', kamName: 'Sarah Al-Kindi', vmId: 'VM0001', segment: 'Large Business', vertical: 'Retail & Technology Accounts' },
  
  // KAMs reporting to VM0002 (Fatima Al-Zahra - Key Account)
  { kamId: 'KAM005', kamName: 'Michael Chen', vmId: 'VM0002', segment: 'Key Account', vertical: 'Government' },
  { kamId: 'KAM006', kamName: 'Layla Al-Zahra', vmId: 'VM0002', segment: 'Key Account', vertical: 'Government' },
  
  // KAMs reporting to VM0003 (Mohamed Al-Balushi - Medium Business)
  { kamId: 'KAM007', kamName: 'Omar Al-Rashid', vmId: 'VM0003', segment: 'Medium Business', vertical: 'Healthcare' },
  { kamId: 'KAM008', kamName: 'Aisha Al-Balushi', vmId: 'VM0003', segment: 'Medium Business', vertical: 'Healthcare' },
  
  // KAMs reporting to VM0004 (Sarah Al-Kindi - Small Business)
  { kamId: 'KAM009', kamName: 'Hassan Al-Kindi', vmId: 'VM0004', segment: 'Small Business', vertical: 'Retail' },
  { kamId: 'KAM010', kamName: 'Maryam Al-Said', vmId: 'VM0004', segment: 'Small Business', vertical: 'Retail' },
  
  // KAMs reporting to VM0005 (Michael Chen - Enterprise)
  { kamId: 'KAM011', kamName: 'Khalid Al-Zahra', vmId: 'VM0005', segment: 'Enterprise', vertical: 'Oil & Gas' },
  { kamId: 'KAM012', kamName: 'Noor Al-Balushi', vmId: 'VM0005', segment: 'Enterprise', vertical: 'Oil & Gas' },
  
  // Additional KAMs for VM0006 (Tariq Al-Habsi - Large Business)
  { kamId: 'KAM013', kamName: 'Abdullah Al-Ghailani', vmId: 'VM0006', segment: 'Large Business', vertical: 'Government & Financial Accounts' },
  { kamId: 'KAM014', kamName: 'Sumaya Al-Riyami', vmId: 'VM0006', segment: 'Large Business', vertical: 'Manufacturing & Infrastructure Accounts' },
  
  // Additional KAMs for VM0007 (Zainab Al-Lawati - Large Business)
  { kamId: 'KAM015', kamName: 'Youssef Al-Maskari', vmId: 'VM0007', segment: 'Large Business', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM016', kamName: 'Huda Al-Qasmi', vmId: 'VM0007', segment: 'Large Business', vertical: 'Healthcare' },
  
  // Additional KAMs for VM0008 (Rashid Al-Suleimani - Key Account)
  { kamId: 'KAM017', kamName: 'Saeed Al-Busaidi', vmId: 'VM0008', segment: 'Key Account', vertical: 'Government' },
  { kamId: 'KAM018', kamName: 'Amina Al-Harthi', vmId: 'VM0008', segment: 'Key Account', vertical: 'Government' },
  
  // Additional KAMs for VM0009 (Mariam Al-Kharusi - Key Account)
  { kamId: 'KAM019', kamName: 'Ali Al-Mawali', vmId: 'VM0009', segment: 'Key Account', vertical: 'Government' },
  
  // Additional KAMs for VM0010 (Hamza Al-Rashdi - Medium Business)
  { kamId: 'KAM020', kamName: 'Leila Al-Hinai', vmId: 'VM0010', segment: 'Medium Business', vertical: 'Retail' },
  
  // Additional KAMs for VM0011 (Salma Al-Zadjali - Medium Business)
  { kamId: 'KAM021', kamName: 'Tariq Al-Wahaibi', vmId: 'VM0011', segment: 'Medium Business', vertical: 'Healthcare' },
  { kamId: 'KAM022', kamName: 'Nadia Al-Lawati', vmId: 'VM0011', segment: 'Medium Business', vertical: 'Retail' },
  
  // Additional KAMs for VM0009 (Mariam Al-Kharusi - Key Account)
  { kamId: 'KAM023', kamName: 'Fatima Al-Kalbani', vmId: 'VM0009', segment: 'Key Account', vertical: 'Government' },
  
  // Additional KAMs for VM0010 (Hamza Al-Rashdi - Medium Business)
  { kamId: 'KAM024', kamName: 'Mohammed Al-Farsi', vmId: 'VM0010', segment: 'Medium Business', vertical: 'Retail' },
  
  // KAMs for VM0012 (Ibrahim Al-Mamari - Small Business)
  { kamId: 'KAM025', kamName: 'Salem Al-Rawahi', vmId: 'VM0012', segment: 'Small Business', vertical: 'Retail' },
  { kamId: 'KAM026', kamName: 'Amal Al-Shidhani', vmId: 'VM0012', segment: 'Small Business', vertical: 'Retail' },
  
  // KAMs for VM0013 (Nadia Al-Shabibi - Small Business)
  { kamId: 'KAM027', kamName: 'Hamad Al-Toubi', vmId: 'VM0013', segment: 'Small Business', vertical: 'Hospitality' },
  { kamId: 'KAM028', kamName: 'Shaikha Al-Ajmi', vmId: 'VM0013', segment: 'Small Business', vertical: 'Hospitality' },
  
  // KAMs for VM0014 (Khalid Al-Hinai - Enterprise)
  { kamId: 'KAM029', kamName: 'Rashid Al-Amri', vmId: 'VM0014', segment: 'Enterprise', vertical: 'Oil & Gas' },
  { kamId: 'KAM030', kamName: 'Layla Al-Siyabi', vmId: 'VM0014', segment: 'Enterprise', vertical: 'Oil & Gas' },
  
  // KAMs for VM0015 (Fatima Al-Busaidi - Enterprise)
  { kamId: 'KAM031', kamName: 'Ahmed Al-Busaidi', vmId: 'VM0015', segment: 'Enterprise', vertical: 'Telecommunications' },
  { kamId: 'KAM032', kamName: 'Muna Al-Balushi', vmId: 'VM0015', segment: 'Enterprise', vertical: 'Telecommunications' },
  
  // KAMs for VM0016 (Said Al-Kindi - Large Business)
  { kamId: 'KAM033', kamName: 'Mansoor Al-Kalbani', vmId: 'VM0016', segment: 'Large Business', vertical: 'Government & Financial Accounts' },
  { kamId: 'KAM034', kamName: 'Zahra Al-Hinai', vmId: 'VM0016', segment: 'Large Business', vertical: 'Healthcare' },
  { kamId: 'KAM035', kamName: 'Badr Al-Salmani', vmId: 'VM0016', segment: 'Large Business', vertical: 'Retail & Technology Accounts' },
  
  // KAMs for VM0017 (Aisha Al-Farsi - Large Business)
  { kamId: 'KAM036', kamName: 'Khalfan Al-Rashdi', vmId: 'VM0017', segment: 'Large Business', vertical: 'Healthcare' },
  { kamId: 'KAM037', kamName: 'Maysa Al-Harthy', vmId: 'VM0017', segment: 'Large Business', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM038', kamName: 'Hilal Al-Abri', vmId: 'VM0017', segment: 'Large Business', vertical: 'Healthcare' },
  
  // KAMs for VM0018 (Waleed Al-Mahdi - Large Business)
  { kamId: 'KAM039', kamName: 'Asma Al-Wahaibi', vmId: 'VM0018', segment: 'Large Business', vertical: 'Healthcare' },
  { kamId: 'KAM040', kamName: 'Sulaiman Al-Ajmi', vmId: 'VM0018', segment: 'Large Business', vertical: 'Retail & Technology Accounts' },
  
  // KAMs for VM0019 (Hana Al-Shehi - BMB)
  { kamId: 'KAM041', kamName: 'Nasser Al-Ghafri', vmId: 'VM0019', segment: 'BMB', vertical: 'Healthcare' },
  { kamId: 'KAM042', kamName: 'Salha Al-Zadjali', vmId: 'VM0019', segment: 'BMB', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM043', kamName: 'Hamood Al-Kharousi', vmId: 'VM0019', segment: 'BMB', vertical: 'Healthcare' },
  
  // KAMs for VM0020 (Juma Al-Qasmi - BMB)
  { kamId: 'KAM044', kamName: 'Ruqaya Al-Shehi', vmId: 'VM0020', segment: 'BMB', vertical: 'Healthcare' },
  { kamId: 'KAM045', kamName: 'Talal Al-Mawali', vmId: 'VM0020', segment: 'BMB', vertical: 'Retail & Technology Accounts' },
  
  // KAMs for VM0021 (Maitha Al-Balushi - BMB)
  { kamId: 'KAM046', kamName: 'Jamal Al-Sinani', vmId: 'VM0021', segment: 'BMB', vertical: 'Healthcare' },
  { kamId: 'KAM047', kamName: 'Maryam Al-Mahrouqi', vmId: 'VM0021', segment: 'BMB', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM048', kamName: 'Abdullah Al-Shamsi', vmId: 'VM0021', segment: 'BMB', vertical: 'Healthcare' },
  
  // KAMs for VM0022 (Badr Al-Shahri - Dhofar)
  { kamId: 'KAM049', kamName: 'Said Al-Kathiri', vmId: 'VM0022', segment: 'Dhofar', vertical: 'Healthcare' },
  { kamId: 'KAM050', kamName: 'Amira Al-Baiti', vmId: 'VM0022', segment: 'Dhofar', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM051', kamName: 'Ali Al-Shahri', vmId: 'VM0022', segment: 'Dhofar', vertical: 'Healthcare' },
  
  // KAMs for VM0023 (Thuraya Al-Rawas - Dhofar)
  { kamId: 'KAM052', kamName: 'Fatma Al-Mahri', vmId: 'VM0023', segment: 'Dhofar', vertical: 'Healthcare' },
  { kamId: 'KAM053', kamName: 'Khalid Al-Amri', vmId: 'VM0023', segment: 'Dhofar', vertical: 'Retail & Technology Accounts' },
  
  // KAMs for VM0024 (Qais Al-Salmi - SME Business)
  { kamId: 'KAM054', kamName: 'Noor Al-Qasabi', vmId: 'VM0024', segment: 'SME Business', vertical: 'Healthcare' },
  { kamId: 'KAM055', kamName: 'Mohammed Al-Habsi', vmId: 'VM0024', segment: 'SME Business', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM056', kamName: 'Sara Al-Salmi', vmId: 'VM0024', segment: 'SME Business', vertical: 'Healthcare' },
  
  // KAMs for VM0025 (Reem Al-Hadrami - SME Business)
  { kamId: 'KAM057', kamName: 'Ahmed Al-Badi', vmId: 'VM0025', segment: 'SME Business', vertical: 'Healthcare' },
  { kamId: 'KAM058', kamName: 'Laila Al-Mukhaini', vmId: 'VM0025', segment: 'SME Business', vertical: 'Retail & Technology Accounts' },
  { kamId: 'KAM059', kamName: 'Rashid Al-Dhahli', vmId: 'VM0025', segment: 'SME Business', vertical: 'Healthcare' },
  
  // KAMs for VM0026 (Yousef Al-Azri - SME Business)
  { kamId: 'KAM060', kamName: 'Moza Al-Busaidi', vmId: 'VM0026', segment: 'SME Business', vertical: 'Healthcare' },
  { kamId: 'KAM061', kamName: 'Hamad Al-Rawahi', vmId: 'VM0026', segment: 'SME Business', vertical: 'Retail & Technology Accounts' },
  
  // KAMs for VM0027 (Latifa Al-Maamari - Key Account)
  { kamId: 'KAM062', kamName: 'Salem Al-Fahdi', vmId: 'VM0027', segment: 'Key Account', vertical: 'Government' },
  { kamId: 'KAM063', kamName: 'Alia Al-Zadjali', vmId: 'VM0027', segment: 'Key Account', vertical: 'Healthcare' },
  { kamId: 'KAM064', kamName: 'Yousuf Al-Maamari', vmId: 'VM0027', segment: 'Key Account', vertical: 'Government' },
  
  // KAMs for VM0028 (Hamdan Al-Hinai - Key Account)
  { kamId: 'KAM065', kamName: 'Marwa Al-Riyami', vmId: 'VM0028', segment: 'Key Account', vertical: 'Government' },
  { kamId: 'KAM066', kamName: 'Tariq Al-Saadi', vmId: 'VM0028', segment: 'Key Account', vertical: 'Healthcare' },
  { kamId: 'KAM067', kamName: 'Fatima Al-Shibani', vmId: 'VM0028', segment: 'Key Account', vertical: 'Government' },
  { kamId: 'KAM068', kamName: 'Omar Al-Hinai', vmId: 'VM0028', segment: 'Key Account', vertical: 'Healthcare' },
];

// Mock hierarchy data - in production, this would be loaded from the CSV file
const hierarchyData: HierarchyRow[] = [
  // General Manager - manages all segments
  {
    manager_id: 'GM001',
    mgr_role: 'General Manager',
    segment_desc: 'All Segments',
    vertical_name: 'All Verticals'
  },
  // Senior Manager SM001 - manages Large Business with all its verticals
  {
    manager_id: 'SM001',
    mgr_role: 'Senior Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Government & Financial Accounts'
  },
  {
    manager_id: 'SM001',
    mgr_role: 'Senior Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'SM001',
    mgr_role: 'Senior Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Education & Hospitality Accounts'
  },
  {
    manager_id: 'SM001',
    mgr_role: 'Senior Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'SM001',
    mgr_role: 'Senior Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Manufacturing & Infrastructure Accounts'
  },
  // Senior Manager SM002 - manages Key Account
  {
    manager_id: 'SM002',
    mgr_role: 'Senior Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Government'
  },
  // Senior Manager SM003 - manages Medium Business
  {
    manager_id: 'SM003',
    mgr_role: 'Senior Manager',
    segment_desc: 'Medium Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'SM003',
    mgr_role: 'Senior Manager',
    segment_desc: 'Medium Business',
    vertical_name: 'Retail'
  },
  // Senior Manager SM004 - manages Small Business
  {
    manager_id: 'SM004',
    mgr_role: 'Senior Manager',
    segment_desc: 'Small Business',
    vertical_name: 'Retail'
  },
  {
    manager_id: 'SM004',
    mgr_role: 'Senior Manager',
    segment_desc: 'Small Business',
    vertical_name: 'Hospitality'
  },
  // Senior Manager SM005 - manages Enterprise
  {
    manager_id: 'SM005',
    mgr_role: 'Senior Manager',
    segment_desc: 'Enterprise',
    vertical_name: 'Oil & Gas'
  },
  {
    manager_id: 'SM005',
    mgr_role: 'Senior Manager',
    segment_desc: 'Enterprise',
    vertical_name: 'Telecommunications'
  },
  // Vertical Managers under the Senior Managers
  {
    manager_id: 'VM0001',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Government & Financial Accounts'
  },
  {
    manager_id: 'VM0001',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0001',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Education & Hospitality Accounts'
  },
  {
    manager_id: 'VM0001',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0001',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Manufacturing & Infrastructure Accounts'
  },
  {
    manager_id: 'VM0002',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Government'
  },
  {
    manager_id: 'VM0003',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Medium Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0004',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Small Business',
    vertical_name: 'Retail'
  },
  {
    manager_id: 'VM0005',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Enterprise',
    vertical_name: 'Oil & Gas'
  },
  // Additional VMs - VM0006
  {
    manager_id: 'VM0006',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Government & Financial Accounts'
  },
  {
    manager_id: 'VM0006',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Manufacturing & Infrastructure Accounts'
  },
  // VM0007
  {
    manager_id: 'VM0007',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0007',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Healthcare'
  },
  // VM0008
  {
    manager_id: 'VM0008',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Government'
  },
  // VM0009
  {
    manager_id: 'VM0009',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Government'
  },
  // VM0010
  {
    manager_id: 'VM0010',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Medium Business',
    vertical_name: 'Retail'
  },
  // VM0011
  {
    manager_id: 'VM0011',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Medium Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0011',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Medium Business',
    vertical_name: 'Retail'
  },
  // VM0012
  {
    manager_id: 'VM0012',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Small Business',
    vertical_name: 'Retail'
  },
  // VM0013
  {
    manager_id: 'VM0013',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Small Business',
    vertical_name: 'Hospitality'
  },
  // VM0014
  {
    manager_id: 'VM0014',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Enterprise',
    vertical_name: 'Oil & Gas'
  },
  // VM0015
  {
    manager_id: 'VM0015',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Enterprise',
    vertical_name: 'Telecommunications'
  },
  // More VMs for SM006 (Large Business)
  {
    manager_id: 'VM0016',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Government & Financial Accounts'
  },
  {
    manager_id: 'VM0016',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0016',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0017',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0017',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0018',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0018',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Large Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  // More VMs for SM007 (BMB)
  {
    manager_id: 'VM0019',
    mgr_role: 'Vertical Manager',
    segment_desc: 'BMB',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0019',
    mgr_role: 'Vertical Manager',
    segment_desc: 'BMB',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0020',
    mgr_role: 'Vertical Manager',
    segment_desc: 'BMB',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0020',
    mgr_role: 'Vertical Manager',
    segment_desc: 'BMB',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0021',
    mgr_role: 'Vertical Manager',
    segment_desc: 'BMB',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0021',
    mgr_role: 'Vertical Manager',
    segment_desc: 'BMB',
    vertical_name: 'Retail & Technology Accounts'
  },
  // More VMs for SM008 (Dhofar)
  {
    manager_id: 'VM0022',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Dhofar',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0022',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Dhofar',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0023',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Dhofar',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0023',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Dhofar',
    vertical_name: 'Retail & Technology Accounts'
  },
  // More VMs for SM009 (SME Business)
  {
    manager_id: 'VM0024',
    mgr_role: 'Vertical Manager',
    segment_desc: 'SME Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0024',
    mgr_role: 'Vertical Manager',
    segment_desc: 'SME Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0025',
    mgr_role: 'Vertical Manager',
    segment_desc: 'SME Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0025',
    mgr_role: 'Vertical Manager',
    segment_desc: 'SME Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  {
    manager_id: 'VM0026',
    mgr_role: 'Vertical Manager',
    segment_desc: 'SME Business',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0026',
    mgr_role: 'Vertical Manager',
    segment_desc: 'SME Business',
    vertical_name: 'Retail & Technology Accounts'
  },
  // More VMs for SM010 (Key Account)
  {
    manager_id: 'VM0027',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Government'
  },
  {
    manager_id: 'VM0027',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Healthcare'
  },
  {
    manager_id: 'VM0028',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Government'
  },
  {
    manager_id: 'VM0028',
    mgr_role: 'Vertical Manager',
    segment_desc: 'Key Account',
    vertical_name: 'Healthcare'
  }
];

/**
 * Resolves the user's full scope from hierarchy data
 * @param managerId - User's manager/staff ID (e.g., VM0001)
 * @param role - User's role (e.g., "Vertical Manager")
 * @returns UserScope object with segment, assigned verticals, and current selection
 */
export function resolveUserScope(
  managerId: string,
  role: string = 'Vertical Manager'
): UserScope | null {
  // Find all rows for this manager
  const userRows = hierarchyData.filter(
    (row) => row.manager_id === managerId && row.mgr_role === role
  );

  if (userRows.length === 0) {
    console.warn(`No hierarchy data found for ${managerId} (${role})`);
    return null;
  }

  // Extract segment (should be unique)
  const segments = [...new Set(userRows.map(r => r.segment_desc))];
  if (segments.length > 1) {
    console.warn(`Multiple segments found for ${managerId}. Using first: ${segments[0]}`);
  }
  const segment = segments[0];

  // Extract all unique verticals
  const verticals = [...new Set(userRows.map(r => r.vertical_name))].sort();

  return {
    role,
    managerId,
    segment,
    verticals,
    selection: 'all' // Default to all assigned verticals
  };
}

/**
 * Validates if a vertical is assigned to the user
 * @param scope - User's scope
 * @param vertical - Vertical name to check
 * @returns true if the vertical is assigned
 */
export function isVerticalAssigned(scope: UserScope, vertical: string): boolean {
  return scope.verticals.includes(vertical);
}

/**
 * Filters out invalid verticals from a selection
 * @param scope - User's scope
 * @param requestedVerticals - Array of vertical names
 * @returns Filtered array containing only valid verticals
 */
export function filterValidVerticals(
  scope: UserScope,
  requestedVerticals: string[]
): string[] {
  return requestedVerticals.filter(v => isVerticalAssigned(scope, v));
}

/**
 * Gets the active verticals based on current selection
 * @param scope - User's scope
 * @returns Array of active vertical names
 */
export function getActiveVerticals(scope: UserScope): string[] {
  if (scope.selection === 'all') {
    return scope.verticals;
  }
  return Array.isArray(scope.selection) ? scope.selection : scope.verticals;
}

/**
 * Creates a formatted scope summary for display
 * @param scope - User's scope
 * @returns Formatted string like "Large Business • 5 verticals selected"
 */
export function getScopeSummary(scope: UserScope): string {
  const activeVerticals = getActiveVerticals(scope);
  const verticalCount = activeVerticals.length;
  
  if (scope.selection === 'all') {
    return `${scope.segment} • All ${verticalCount} vertical${verticalCount !== 1 ? 's' : ''}`;
  }
  
  return `${scope.segment} • ${verticalCount} vertical${verticalCount !== 1 ? 's' : ''} selected`;
}

/**
 * Formats vertical chips for header display
 * @param scope - User's scope
 * @param maxVisible - Maximum number of chips to show before "+N more"
 * @returns Object with visible verticals and overflow count
 */
export function formatVerticalChips(
  scope: UserScope,
  maxVisible: number = 2
): { visible: string[]; overflow: number } {
  const activeVerticals = getActiveVerticals(scope);
  
  if (activeVerticals.length <= maxVisible) {
    return { visible: activeVerticals, overflow: 0 };
  }
  
  return {
    visible: activeVerticals.slice(0, maxVisible),
    overflow: activeVerticals.length - maxVisible
  };
}

/**
 * Interface for Vertical Manager data
 */
export interface VerticalManagerData {
  managerId: string;
  name: string;
  segment: string;
  verticals: string[];
  avatar: string;
}

/**
 * Interface for Senior Manager data
 */
export interface SeniorManagerData {
  managerId: string;
  name: string;
  segment: string;
  avatar: string;
}

/**
 * Gets all Senior Managers (for General Manager to view)
 * @returns Array of SeniorManagerData
 */
export function getAllSeniorManagers(): SeniorManagerData[] {
  return seniorManagerHierarchy.map(sm => ({
    managerId: sm.smId,
    name: sm.smName,
    segment: sm.segment,
    avatar: sm.smName.charAt(0).toUpperCase()
  }));
}

/**
 * Gets all Vertical Managers reporting to a specific Senior Manager
 * @param smId - Senior Manager ID (e.g., 'SM001')
 * @returns Array of VerticalManagerData
 */
export function getVMsBySeniorManager(smId: string): VerticalManagerData[] {
  // Get VM IDs that report to this SM
  const vmIds = vmToSMMapping
    .filter(mapping => mapping.smId === smId)
    .map(mapping => mapping.vmId);
  
  // Get VM data for those IDs
  const allVMs = getAllVerticalManagers();
  return allVMs.filter(vm => vmIds.includes(vm.managerId));
}

/**
 * Gets all Vertical Managers (for Senior Manager to view)
 * @returns Array of VerticalManagerData
 */
export function getAllVerticalManagers(): VerticalManagerData[] {
  // Get unique VM IDs
  const vmIds = [...new Set(
    hierarchyData
      .filter(row => row.mgr_role === 'Vertical Manager')
      .map(row => row.manager_id)
  )];

  // Map to VM data
  return vmIds.map(vmId => {
    const vmRows = hierarchyData.filter(row => row.manager_id === vmId);
    const segment = vmRows[0]?.segment_desc || '';
    const verticals = [...new Set(vmRows.map(r => r.vertical_name))].sort();
    
    // Generate name from ID
    const names: { [key: string]: string } = {
      'VM0001': 'Ahmed Al-Rashid',
      'VM0002': 'Fatima Al-Zahra',
      'VM0003': 'Mohamed Al-Balushi',
      'VM0004': 'Sarah Al-Kindi',
      'VM0005': 'Michael Chen',
      'VM0006': 'Tariq Al-Habsi',
      'VM0007': 'Zainab Al-Lawati',
      'VM0008': 'Rashid Al-Suleimani',
      'VM0009': 'Mariam Al-Kharusi',
      'VM0010': 'Hamza Al-Rashdi',
      'VM0011': 'Salma Al-Zadjali',
      'VM0012': 'Ibrahim Al-Mamari',
      'VM0013': 'Nadia Al-Shabibi',
      'VM0014': 'Khalid Al-Hinai',
      'VM0015': 'Fatima Al-Busaidi',
      'VM0016': 'Said Al-Kindi',
      'VM0017': 'Aisha Al-Farsi',
      'VM0018': 'Waleed Al-Mahdi',
      'VM0019': 'Hana Al-Shehi',
      'VM0020': 'Juma Al-Qasmi',
      'VM0021': 'Maitha Al-Balushi',
      'VM0022': 'Badr Al-Shahri',
      'VM0023': 'Thuraya Al-Rawas',
      'VM0024': 'Qais Al-Salmi',
      'VM0025': 'Reem Al-Hadrami',
      'VM0026': 'Yousef Al-Azri',
      'VM0027': 'Latifa Al-Maamari',
      'VM0028': 'Hamdan Al-Hinai'
    };
    
    return {
      managerId: vmId,
      name: names[vmId] || vmId,
      segment,
      verticals,
      avatar: (names[vmId] || vmId).charAt(0).toUpperCase()
    };
  });
}

/**
 * Interface for KAM data displayed in leaderboard
 */
export interface KAMData {
  id: string;
  name: string;
  avatar: string;
  role: string;
  segment: string;
  vertical: string;
}

/**
 * Gets all KAMs reporting to a specific Vertical Manager
 * @param vmId - Vertical Manager ID (e.g., 'VM0001')
 * @returns Array of KAM data
 */
export function getKAMsByVerticalManager(vmId: string): KAMData[] {
  const kams = kamHierarchy.filter(kam => kam.vmId === vmId);
  
  return kams.map(kam => ({
    id: kam.kamId,
    name: kam.kamName,
    avatar: kam.kamName.charAt(0).toUpperCase(),
    role: 'Key Account Manager',
    segment: kam.segment,
    vertical: kam.vertical
  }));
}

/**
 * Gets all KAMs across all Vertical Managers
 * @returns Array of KAM data
 */
export function getAllKAMs(): KAMData[] {
  return kamHierarchy.map(kam => ({
    id: kam.kamId,
    name: kam.kamName,
    avatar: kam.kamName.charAt(0).toUpperCase(),
    role: 'Key Account Manager',
    segment: kam.segment,
    vertical: kam.vertical
  }));
}

/**
 * Gets all KAMs reporting to a specific Senior Manager (across all their VMs)
 * @param smId - Senior Manager ID (e.g., 'SM001')
 * @returns Array of KAM data
 */
export function getKAMsBySeniorManager(smId: string): KAMData[] {
  // Get VM IDs that report to this SM
  const vmIds = vmToSMMapping
    .filter(mapping => mapping.smId === smId)
    .map(mapping => mapping.vmId);
  
  // Get KAMs for all those VMs
  const kams = kamHierarchy.filter(kam => vmIds.includes(kam.vmId));
  
  return kams.map(kam => ({
    id: kam.kamId,
    name: kam.kamName,
    avatar: kam.kamName.charAt(0).toUpperCase(),
    role: 'Key Account Manager',
    segment: kam.segment,
    vertical: kam.vertical
  }));
}