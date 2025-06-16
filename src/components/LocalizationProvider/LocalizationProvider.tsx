'use client';

import { ReactNode } from 'react';

import { LocalizationProvider as LocalizationProviderMui } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { DEFAULT_TIMEZONE } from '@utils/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(DEFAULT_TIMEZONE);

type LocalizationProviderProps = {
  children: ReactNode;
};

const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  return (
    <LocalizationProviderMui dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProviderMui>
  );
};

export default LocalizationProvider;
