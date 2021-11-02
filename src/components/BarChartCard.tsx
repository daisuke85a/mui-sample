import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar } from 'recharts';

interface BarChartCardProps {
  title: string;
  color: string;
  data: any[];
  mainData: string;
  trend: number;
}

const BarChartCard = ({ title, color, data, trend, mainData }: BarChartCardProps) => {
  const isTrendUp = (trend: number) => {
    if (trend >= 0) return true;
    return false;
  };

  return (
    <Card>
      <Box padding={2} flexGrow={1}>
        <Typography
          variant='h6'
          sx={{
            margin: '0px',
            fontWeight: 600,
            lineHeight: 1.57143,
            fontSize: '0.875rem',
          }}
        >
          {title}
        </Typography>
        <Stack direction='row' spacing={2} mt={2} mb={1}>
          <Box
            sx={{
              width: '24px',
              height: '24px',
              display: 'flex',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              color: (theme) =>
                isTrendUp(trend) ? theme.palette.success.main : theme.palette.error.main,
              backgroundColor: (theme) =>
                isTrendUp(trend)
                  ? `${theme.palette.success.main}16`
                  : `${theme.palette.error.main}16`,
            }}
          >
            {isTrendUp(trend) && <TrendingUpIcon fontSize='small' />}
            {!isTrendUp(trend) && <TrendingDownIcon fontSize='small' />}
          </Box>
          <Typography variant='subtitle2'>
            {isTrendUp(trend) && '+'}
            {trend}%
          </Typography>
        </Stack>
        <Typography
          variant='h3'
          sx={{ fontSize: '1.875rem', margin: '0px', fontWeight: '700', lineHeight: 1.5 }}
        >
          {mainData}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <BarChart width={60} height={40} data={data}>
          <Bar dataKey='uv' fill={color} />
        </BarChart>
      </Box>
    </Card>
  );
};

export default BarChartCard;
