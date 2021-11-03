import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartCardProps {
  title: string;
  data: any[];
}

const LineChartCard = ({ title, data }: LineChartCardProps) => {
  return (
    <Card sx={{ display: 'block' }}>
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
      </Box>
      <Box padding={2} flexGrow={1}>
        <LineChart
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3' vertical={false} />
          <XAxis
            dataKey='name'
            axisLine={{
              stroke: 'transparent',
              strokeDasharray: '0',
              strokeLinecap: 'butt',
            }}
            tickLine={false}
            tickSize={18}
            tick={{ fill: '#919eab', fontWeight: 400, fontSize: '11px' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickSize={12}
            tick={{ fill: '#919eab', fontWeight: 400, fontSize: '11px' }}
          />
          <Tooltip />
          <Legend
            verticalAlign='top'
            align='right'
            iconType='circle'
            iconSize={12}
            height={40}
            fontFamily={['Public Sans', 'sans-serif'].join(',')}
            formatter={(value: string, entry: any) => {
              const { color } = entry;

              return (
                <Box
                  component='span'
                  sx={{
                    color: 'rgb(33, 43, 54)',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: ['Public Sans', 'sans-serif'].join(','),
                  }}
                >
                  {value}
                </Box>
              );
            }}
          />
          <Line
            type='monotone'
            dataKey='Asia'
            dot={false}
            activeDot={{ r: 5 }}
            stroke='rgba(0,171,85,1)'
            fill='none'
            fillOpacity={1}
            strokeLinecap='round'
            strokeWidth={3}
            strokeDasharray={0}
          />
          <Line
            type='monotone'
            dataKey='America'
            dot={false}
            activeDot={{ r: 5 }}
            stroke='rgba(255,231,0,1)'
            fill='none'
            fillOpacity={1}
            strokeLinecap='round'
            strokeWidth={3}
            strokeDasharray={0}
          />
        </LineChart>
      </Box>
    </Card>
  );
};

export default LineChartCard;
