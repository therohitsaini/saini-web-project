import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Person4Icon from '@mui/icons-material/Person4';
import { Avatar, Button, createTheme, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ProfileSection from '../DashbordFormet/ProfileSecton';
import Settings from '@mui/icons-material/Settings';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import LockResetIcon from '@mui/icons-material/LockReset';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Groups3Icon from '@mui/icons-material/Groups3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { changePathAction } from '../../Store/UserDetailsHeader/action';
import FeedIcon from '@mui/icons-material/Feed';
import WorkspacesOutlineIcon from '@mui/icons-material/WorkspacesOutline';

// import { ThemeSwitcher } from '@toolpad/core/DashboardLayout';



export const NAVIGATION = (isAdmin) => {

    return [

        { kind: 'header', title: 'Main items' },
        { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
        { segment: 'permissions', title: 'Permissions', icon: <WorkspacesOutlineIcon /> },

        {
            segment: 'user',
            title: 'User',
            icon: <Groups3Icon />,
            children: [
                // ...(isAdmin === 'Super_admin' ? [
                { segment: 'adduser', title: 'Add user', icon: <GroupAddIcon /> },
                { segment: 'allusers', title: 'All Users', icon: <Person4Icon /> }
                // ] : []),
            ],
        },
        // { segment: 'admin', title: 'Admin', icon: <Person4Icon /> },


        // { segment: 'Role/Permission', title: 'Role/Permission', icon: <Person4Icon /> },

        { kind: 'divider' },
        { kind: 'header', title: 'Account Details' },
        {
            segment: 'account',
            title: 'Account',
            icon: <AccountCircleIcon />,
            children: [
                { segment: 'profile', title: 'Profile', icon: < PersonOutlineSharpIcon /> },
                { segment: 'resetPassword', title: 'Reset Password', icon: <LockResetIcon fontSize="small" /> },
            ],
        },
        { kind: 'divider' },
        { kind: 'header', title: 'Web Site Settings' },
        { segment: 'header', title: 'Header Section', icon: <FeedIcon /> },

        // { kind: 'divider' },
        // { kind: 'header', title: 'Hero Section Setting' },
        { segment: 'herosection', title: 'Hero Section', icon: <FeedIcon /> },

    ]
};


export const CustomAppTitle = () => {
    return (
        <Stack sx={{}} direction="end" alignItems="center" spacing={2}>
            <Typography variant='h6'>Corpex.in</Typography>
        </Stack>
    );
}






export const useDemoRouter = (initialPath) => {
    const dispatch = useDispatch()
    const pathname = useSelector(state => state.user_info.pathname) ?? initialPath;

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => dispatch(changePathAction(String(path))),
        };
    }, [pathname]);

    return router;
}


export const demoTheme = createTheme({     // theme com------>
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


export const ToolbarActionsSearch = () => {   // search componets
    return (
        <Stack direction="row" sx={{ display: 'flex', alignItems: "center", gap: 2 }} >

            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                // label="Search"
                placeholder='Search Somthing....'
                variant="outlined"
                size="small"
                // sx={{fontSize:10}}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon />
                            </IconButton>
                        ),
                        sx: { pr: 0.5 },
                    },
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
            />
            {/* <ThemeSwitcher /> */}
            <Stack>
                <Button
                    sx={{ textTransform: 'none', }}
                    variant="outlined" href="/home">
                    Visit Website
                </Button>
            </Stack>
            <ProfileSection />

        </Stack >
    );
}

