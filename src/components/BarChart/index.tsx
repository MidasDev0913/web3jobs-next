import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, Stack } from '@mui/material';
import { BarChartData } from '../../interfaces';
import { CustomToolTip } from './index.styles';
import loadingAnimatinoData from '../../assets/lotties/loading.json';
const LottieAnimation = React.lazy(() => import('../../components/Animation'));

type ComponentProps = {
  loading?: boolean;
  isEmpty?: boolean;
  data: BarChartData[];
};

export const AppBarChart = ({ loading, isEmpty, data }: ComponentProps) => {
  const RenderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomToolTip>
          <Stack py={1}>
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600}>Views: </Typography>
              <Typography ml={1}>{payload[0].value}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600}>Applications: </Typography>
              <Typography ml={1}>{payload[1].value}</Typography>
            </Box>
          </Stack>
        </CustomToolTip>
      );
    }

    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={532} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 'auto']} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: '#1A1B1F',
              border: 'none',
            }}
            cursor={{ fill: 'transparent' }}
            content={<RenderTooltip />}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Bar dataKey="view" fill="#B50000" />
          <Bar dataKey="apply" fill="#DBDBDB" />
        </BarChart>
      </ResponsiveContainer>
      {loading && (
        <Box
          position="absolute"
          top="45%"
          left="55%"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <LottieAnimation
            width="121"
            height="102"
            url={loadingAnimatinoData}
            loop={true}
          />
        </Box>
      )}
      {isEmpty && !loading && (
        <Typography
          position="absolute"
          top="20%"
          left="55%"
          width="100%"
          mt={8}
          fontWeight={500}
          color="#A3A1A1"
          textAlign="center"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          NO DATA AVAILABLE
        </Typography>
      )}
    </>
  );
};
