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
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DraftsIcon from '@mui/icons-material/Drafts';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { orange, indigo, green } from '@mui/material/colors';
import { useReducer, useState } from 'react';
import { BarChart, Bar } from 'recharts';

// declare module '@mui/material/styles' {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

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
              <Card>Card2</Card>
            </Grid>
            <Grid item xs={4}>
              <Card>Card3</Card>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={2} margin={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
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

function BasicList() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label='main mailbox folders'>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='inbox' />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </ThemeProvider>
  );
}

interface BarChartCardProps {
  title: string;
  color: string;
  data: any[];
  mainData: string;
  trend: number;
}

const BarChartCard = ({ title, color, data, trend, mainData }: BarChartCardProps) => {
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
              color,
              backgroundColor: `${color}16`,
            }}
          >
            <TrendingUpIcon fontSize='small' />
          </Box>
          <Typography variant='subtitle2'>+{trend}%</Typography>
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
