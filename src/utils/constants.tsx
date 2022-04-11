import React from 'react';
import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector';
import { ConnectionRejectedError } from 'use-wallet';
import { TSticky, THightlightColor, NavigationLinkProps } from '../interfaces';

import JobHolderAvatar1 from '../assets/images/jobholder-avatar_1.svg';
import JobHolderAvatar2 from '../assets/images/jobholder-avatar_2.svg';

import NavHomeIcon from '../components/SVGIcons/NavHomeIcon';
import NavAdminsIcon from '../components/SVGIcons/NavAdminsIcon';
import NavInvoicesIcon from '../components/SVGIcons/NavInvoicesIcon';
import NavProfileIcon from '../components/SVGIcons/NavProfileIcon';

export const stickyOptions: TSticky[] = [
  {
    duration: '',
    price: 0,
    value: '0',
  },
  {
    duration: '24 hours',
    price: 99,
    value: '1',
  },
  {
    duration: '7 days',
    price: 149,
    views: 6,
    value: '7',
  },
  {
    duration: '14 days',
    price: 199,
    views: 12,
    value: '14',
  },
  {
    duration: '30 days',
    price: 249,
    views: 24,
    value: '30',
  },
];

export const hightlightColorOptions: THightlightColor[] = [
  {
    color: '',
    text: '',
    price: 0,
  },
  {
    color: 'standard',
    text: 'Standard color',
    price: 99,
    views: 2,
  },
  {
    color: 'custom',
    text: 'Custom color',
    price: 199,
    views: 4,
  },
];

export const priorityStick: Record<string, number> = {
  '': 0,
  '24 hours': 1,
  '7 days': 2,
  '14 days': 3,
  '30 days': 4,
};

export const newsletterPrice = 89;
export const JOB_PAGE_SIZE = 40;

export const ETH_MAINNET_CHAIN_ID = 1;
export const ETH_TESTNET_CHAIN_ID = 4;

export const walletConnect = {
  walletconnect: { rpcUrl: process.env.REACT_APP_INFURA_URL || '' },
  bsc: {
    web3ReactConnector() {
      return new BscConnector({ supportedChainIds: [56, 97] });
    },
    handleActivationError(err: any) {
      if (err instanceof UserRejectedRequestError) {
        return new ConnectionRejectedError();
      }
    },
  },
};

export const chainId = 1;

export const DEFAULT_HIGHLIGHT_COLOR = 'rgb(0, 255, 56)';

export enum WORKING_HOURS_MAPPING {
  'full' = 'Full Time',
  'part' = 'Part Time',
  'contract' = 'Contract',
  'internship' = 'Internship',
}

// export const JobHolderDummyData = [
//   {
//     title: 'The best Web3 recruiting Platform',
//     description:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident',
//     holder: {
//       avatar: JobHolderAvatar1,
//       name: 'Sophia Moore',
//       role: 'CEO at Palmswap',
//     },
//   },
//   {
//     title: 'Getting good applicants. Nice!',
//     description:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident',
//     holder: {
//       avatar: JobHolderAvatar2,
//       name: 'Adam Smith',
//       role: 'CMO at Uniswap',
//     },
//   },
//   {
//     title: 'The best Web3 recruiting Platform',
//     description:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident',
//     holder: {
//       avatar: JobHolderAvatar1,
//       name: 'Sophia Moore',
//       role: 'CEO at Palmswap',
//     },
//   },
//   {
//     title: 'Getting good applicants. Nice!',
//     description:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident',
//     holder: {
//       avatar: JobHolderAvatar2,
//       name: 'Adam Smith',
//       role: 'CMO at Uniswap',
//     },
//   },
// ];

export type TNewsLetterDuration = 'daily' | 'weekly' | 'monthly';

export const NavigationLinks: NavigationLinkProps[] = [
  {
    hasChild: false,
    key: 'dashboard',
    title: 'Dashboard',
    link: '/dashboard',
    icon: <NavHomeIcon />,
  },
  {
    hasChild: false,
    key: 'manage_jobs',
    title: 'Manage Jobs',
    link: '/manage-jobs',
    icon: <NavAdminsIcon />,
  },
  {
    hasChild: false,
    key: 'history',
    title: 'History',
    link: '/history',
    icon: <NavProfileIcon />,
  },
  {
    hasChild: false,
    key: 'invoices',
    title: 'Invoices',
    link: '/invoices',
    icon: <NavInvoicesIcon />,
  },
];

export const privateUrls = [
  '/dashboard',
  '/history',
  '/manage-jobs',
  '/invoices',
];

export const MonthlyUnitList = [
  { value: '0', text: 'Jan' },
  { value: '1', text: 'Feb' },
  { value: '2', text: 'Mar' },
  { value: '3', text: 'Apr' },
  { value: '4', text: 'May' },
  { value: '5', text: 'Jun' },
  { value: '6', text: 'Jul' },
  { value: '7', text: 'Aug' },
  { value: '8', text: 'Sep' },
  { value: '9', text: 'Oct' },
  { value: '10', text: 'Nov' },
  { value: '11', text: 'Dec' },
];

export const WeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
