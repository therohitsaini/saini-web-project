import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';

// Navigation config
const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Skeleton loader
const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

// Replace useDemoRouter with real router hooks
function useReactRouterAdapter() {
  const location = useLocation();
  const navigate = useNavigate();

  return React.useMemo(() => ({
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path) => navigate(path),
  }), [location, navigate]);
}

// Placeholder content
function DashboardContent() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={5} />
      <Grid item xs={12}><Skeleton height={14} /></Grid>
      <Grid item xs={12}><Skeleton height={14} /></Grid>
      <Grid item xs={4}><Skeleton height={100} /></Grid>
      <Grid item xs={8}><Skeleton height={100} /></Grid>
      <Grid item xs={12}><Skeleton height={150} /></Grid>
      <Grid item xs={12}><Skeleton height={14} /></Grid>
      <Grid item xs={3}><Skeleton height={100} /></Grid>
      <Grid item xs={3}><Skeleton height={100} /></Grid>
      <Grid item xs={3}><Skeleton height={100} /></Grid>
      <Grid item xs={3}><Skeleton height={100} /></Grid>
    </Grid>
  );
}

// Top-level layout with routing
function DashboardLayoutWithRoutes() {
  const router = useReactRouterAdapter();

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="/dashboard" element={<DashboardContent />} />

          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

// App entry
export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayoutWithRoutes />
    </BrowserRouter>
  );
}
