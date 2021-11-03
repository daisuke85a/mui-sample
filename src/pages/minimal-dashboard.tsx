import {
  ListItemButton,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  createTheme,
  ThemeProvider,
  Divider,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Snackbar,
  Alert,
  Stack,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import { useReducer, useState } from 'react';
import CircleChartCard from 'components/CircleChartCard';
import BarChartCard from 'components/BarChartCard';
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

const theme = createTheme({
  typography: {
    fontFamily: ['"Public Sans"', 'sans-serif'].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
  // palette: {
  //   primary: {
  //     main: orange[500],
  //   },
  // },
  //   background: {
  //     paper: orange[100],
  //   },
});
export default function MinimalDashboard() {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const [drawer, toggleDrawer] = useReducer((drawer) => !drawer, false);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const list = () => {
    return (
      <Box sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
        <List component='nav' aria-label='main mailbox folders'>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Inbox' secondary='インボックス' />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary='Drafts' secondary='ドラフト' />
          </ListItemButton>
        </List>
        <Divider />
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position='static' elevation={0} sx={{ bgcolor: 'background.paper' }}>
          <Toolbar sx={{ color: 'text.primary' }}>
            <IconButton
              onClick={() => toggleDrawer()}
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor='left'
          open={drawer}
          onClose={() => {
            toggleDrawer();
          }}
        >
          {list()}
        </Drawer>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: green['A100'],
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography
                    variant='h4'
                    gutterBottom
                    fontSize={'1.5rem'}
                    fontWeight='700'
                    lineHeight='1.5'
                  >
                    Welcome back,
                    <br /> Minimal UI Clone
                  </Typography>
                  <Typography variant='body2'>
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there
                    isn&apos;t anything
                  </Typography>
                  <Button>Go Now</Button>
                </CardContent>
                <Box p={3} width={360}>
                  <Box
                    width={'100%'}
                    component='img'
                    src='/undraw_programmer_re_owql.svg'
                    alt='An SVG of an eye'
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Stack spacing={2} margin={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <BarChartCard
                title='Total Active Users'
                color={theme.palette.success.main}
                data={activeUserData}
                mainData={'18,765'}
                trend={2.6}
              />
            </Grid>
            <Grid item xs={4}>
              <BarChartCard
                title='Total Installed'
                color={theme.palette.primary.main}
                data={activeUserData}
                mainData={'4,876'}
                trend={0.2}
              />
            </Grid>
            <Grid item xs={4}>
              <BarChartCard
                title='Total Downloads'
                color={theme.palette.secondary.main}
                data={activeUserData}
                mainData={'678'}
                trend={-0.1}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <CircleChartCard
                title='Current Download'
                data={CURRENT_DOWNLOAD_DATA}
                colors={circleChartCardColors}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
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
                    Area Installed
                  </Typography>
                </Box>
                <Box padding={2} flexGrow={1}>
                  <LineChart
                    width={1000}
                    height={400}
                    data={AREA_INSTALLED_DATA}
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
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={2} margin={2}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button variant='outlined' onClick={handleClick}>
                Open success snackbar
              </Button>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

const renderYTick = (props) => {
  console.log(props);
  return <g fontFamily={['Public Sans', 'sans-serif'].join(',')}></g>;
};

const activeUserData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CURRENT_DOWNLOAD_DATA = [
  { name: 'Mac', value: 12244 },
  { name: 'Window', value: 53345 },
  { name: 'iOS', value: 44313 },
  { name: 'Android', value: 78343 },
];

const circleChartCardColors = [green[50], green[300], green[600], green[900]];

const AREA_INSTALLED_DATA = [
  {
    name: 'Jan',
    Asia: 10,
    America: 10,
  },
  {
    name: 'Feb',
    Asia: 41,
    America: 34,
  },
  {
    name: 'Mar',
    Asia: 35,
    America: 13,
  },
  {
    name: 'Apr',
    Asia: 51,
    America: 56,
  },
  {
    name: 'May',
    Asia: 49,
    America: 77,
  },
  {
    name: 'Jun',
    Asia: 62,
    America: 88,
  },
  {
    name: 'Jul',
    Asia: 69,
    America: 99,
  },
  {
    name: 'Aug',
    Asia: 91,
    America: 77,
  },
  {
    name: 'Sep',
    Asia: 148,
    America: 45,
  },
];
