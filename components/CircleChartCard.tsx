import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Sector, Cell } from 'recharts';

interface CircleChartCardProps {
  title: string;
  data: any[];
  colors: string[];
}

const CircleChartCard = ({ title, data, colors }: CircleChartCardProps) => {
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_: any, index: number) => {
    setState({
      activeIndex: index,
    });
  };

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
      <Box display='flex' alignItems='center' justifyContent='center'>
        {/* <ResponsiveContainer> */}
        <PieChart width={800} height={400}>
          <Pie
            activeIndex={state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={110}
            outerRadius={120}
            paddingAngle={2}
            fill='#8884d8'
            dataKey='value'
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
        {/* </ResponsiveContainer> */}
      </Box>
      <Divider />
      <List dense sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {data.map((item, index) => {
          return (
            <ListItem key={index}>
              <ListItemIcon>
                <CircleIcon sx={{ color: colors[index % colors.length] }} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  margin: '0px',
                  fontWeight: 600,
                  lineHeight: 1.57143,
                  fontSize: '0.875rem',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g fontFamily={['Public Sans', 'sans-serif'].join(',')}>
      <text fontSize='0.875rem' x={cx} y={cy - 16} dy={8} textAnchor='middle' fill='#637381'>
        {payload.name}
      </text>
      <text
        fontSize='1.5rem'
        fontWeight='700'
        x={cx}
        y={cy + 12}
        dy={8}
        textAnchor='middle'
        fill='#333'
      >
        {value.toLocaleString()}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={6} textAnchor={textAnchor} fill='#333'>{`${
        payload.name
      } ${value.toLocaleString()}`}</text>
      {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
    </g>
  );
};

export default CircleChartCard;
