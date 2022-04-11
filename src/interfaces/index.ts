import { ReactElement, ReactNode, HTMLAttributes } from 'react';

// App state
export type TCommonState = {
  tags: Array<string>;
  filterSettings: Record<string, any>;
  suggestions: Array<string>;
};

export type TJobState = {
  jobs: TJob[];
  loading: boolean;
  selectedJob: TJob;
  jobData: {
    totalJobsCount: number;
    totalProjectCount: number;
    filterJobsCount: number;
    averagePrice: number;
    lastId: string;
  };
  hasMore: boolean;
  fetchLoading: boolean;
  jobCountOfCities: TJobCountyOfCity[];
};

export type TOrganizationState = {
  organizations: TOrganization[];
  companies: TCompany[];
};

export type TAuthState = {
  loading: boolean;
  isLoggedIn: boolean;
  userInfo: TUserInfo;
  viewedJobs: string[];
};

// common
export type TOption = {
  value: string;
  text: ReactElement | string;
};

export type TJobCountyOfCity = {
  placeId: string;
  city: string;
  country: string;
  id: string;
  jobCount: number;
};

export type TOrganization = {
  name: string;
  id: string;
  jobs?: TJob[];
  owner: string;
  jobCount: number;
};

export type TCompany = {
  name: string;
  id: string;
  jobs?: TJob[];
  jobCount: number;
  coupons: number;
  descriptions: string[];
};

export type TSticky = {
  duration: string;
  price: number;
  views?: number;
  value: string;
};

export type THightlightColor = {
  color: string;
  price: number;
  text: string;
  views?: number;
};

export type TLocation = {
  placeId: string;
  city: string;
  country: string;
};

export type TJob = {
  id?: string;
  organization: string;
  company_name?: string;
  title?: string;
  position: TPosition;
  location: TLocation;
  isRemote: boolean;
  description: string;
  short_description: string;
  tags?: Array<string>;
  salary?: {
    min: number;
    max: number;
  };
  companyTwitter?: string;
  applyBy: 'email' | 'website';
  applyByUrl: string;
  invoiceAddress: string;
  logo?: any;
  sticky: string;
  stickInfo: {
    active: boolean;
    period: number;
  };
  highlightColor: string;
  highlightCustomColor?: string;
  newsletterBoost?: boolean;
  useCoupon?: boolean;
  likes?: string[];
  status: JobFilterType;
  created_at: string;
  posted_at: string;
  views?: number;
  applies?: number;
  edited?: number;
  offlineByAdmin?: boolean;
  price?: number
};

export type TUserInfo = {
  address: string;
  type: number;
};

export type TPosition = 'full' | 'part' | 'contract' | 'internship';

export enum PositionMap {
  full = 'Full Time',
  part = 'Part Time',
  contract = 'Contract',
  internship = 'Internship',
}

export type NavigationLinkProps = {
  hasChild?: boolean;
  key: string;
  title: string;
  link?: string;
  icon?: ReactNode;
  isAdminRequire?: boolean;
  isStagingOnly?: boolean;
};

export type NavLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  target?: string;
  id?: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
};

export interface BarChartData {
  name: string;
  view: string;
  apply: string;
}

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  visible?: boolean;
  clickable?: boolean;
  format?: (value: any) => any;
}

export interface PostedJobTableData {
  id: string;
  name: any;
  date: any;
  applies: number;
  views: number;
}

export interface ManageJobTableData {
  id: string;
  name: any;
  price: string;
  date: any;
  action: string;
}

export interface InvoiceTableData {
  id: string;
  name: any;
  price: string;
  date: any;
  action: string;
}

export type JobFilterType = 'active' | 'inactive' | 'pending' | 'bin' | 'draft';

export type TInvoice = {
  job: TJob;
  created_at: number;
  id: string;
  link: string;
};

export type THistory = {
  id: string;
  old: string;
  new: string;
  editor: string;
  jobId: string;
  updated_at: number;
  job?: TJob;
};
