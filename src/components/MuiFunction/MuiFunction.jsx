import DashboardIcon from '@mui/icons-material/Dashboard';
import Person4Icon from '@mui/icons-material/Person4';
import { Avatar, Button, createTheme, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ProfileSection from '../DashbordFormet/ProfileSecton';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import LockResetIcon from '@mui/icons-material/LockReset';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Groups3Icon from '@mui/icons-material/Groups3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { changePathAction } from '../../Store/UserDetailsHeader/action';
import FeedIcon from '@mui/icons-material/Feed';
// import WorkspacesOutlineIcon from '@mui/icons-material/WorkspacesOutline';
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AdjustIcon from '@mui/icons-material/Adjust';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import SellIcon from '@mui/icons-material/Sell';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { MdFeaturedPlayList } from "react-icons/md";
import ListIcon from '@mui/icons-material/List';
import { MdManageAccounts } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { BiHeading } from "react-icons/bi";
import { BsCardHeading } from "react-icons/bs";
import { ImBlog } from "react-icons/im";
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { GoStop } from "react-icons/go";



export const NAVIGATION = (isAdmin) => {

    return [

        { kind: 'header', title: 'Main items' },
        { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
        // { segment: 'permissions', title: 'Permissions', icon: <WorkspacesOutlineIcon /> },

        {
            segment: 'user',
            title: 'User',
            icon: <Groups3Icon />,
            children: [
                // ...(isAdmin === 'Super_admin' ? [
                // { segment: 'adduser', title: 'Add user', icon: <GroupAddIcon /> },
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
            icon: <MdManageAccounts size={25} color='gray' />,
            children: [
                { segment: 'profile', title: 'Profile', icon: < PersonOutlineSharpIcon /> },
                { segment: 'resetPassword', title: 'Reset Password', icon: <LockResetIcon fontSize="small" /> },
            ],
        },
        { kind: 'divider' },
        { kind: 'header', title: 'Web Site Settings' },
        { segment: 'headings', title: 'Headings', icon: <BiHeading /> },
        { segment: 'header', title: 'Header Section', icon: <FeedIcon color='gray' /> },
        { segment: 'herosection', title: 'Hero Section', icon: <AdjustIcon color='gray' /> },
        { segment: 'info', title: 'Info Section', icon: <InfoOutlinedIcon /> },
        { segment: 'service', title: 'Service Section', icon: <AutorenewIcon color='red' /> },
        { segment: 'funfact', title: 'Funfact Section', icon: <CurrencyFrancIcon /> },
        { segment: 'portfolio', title: 'Portfolio Section', icon: <BusinessCenterIcon /> },
        { segment: 'princing', title: 'Princing Section', icon: <SellIcon /> },
        { segment: 'testimonial', title: 'Testimonial Section', icon: < SellIcon /> },
        {
            segment: 'feature',
            title: 'Feature Section',
            icon: <MdFeaturedPlayList color='gray' />,
            children: [
                { segment: 'feartureheading', title: 'Section Heading', icon: < BiHeading /> },
                { segment: 'listItem', title: 'Feature List Item', icon: <ListIcon fontSize="small" /> },
            ],
        },
        {
            segment: 'teamsection',
            title: 'Team Section',
            icon: <RiTeamLine color='gray' />,
            children: [
                { segment: 'team', title: 'Team Heading', icon: < BiHeading /> },
                { segment: 'teamCard', title: 'Team Member Card', icon: <BsCardHeading fontSize="small" /> },
            ],
        },
        {
            segment: 'blogsection',
            title: 'Blog Section',
            icon: <ImBlog color='gray' />,
            children: [
                { segment: 'blogheadline', title: 'Blog Heading', icon: < BiHeading /> },
                { segment: 'blogCard', title: 'Blogs Cards', icon: <BsCardHeading fontSize="small" /> },
            ],
        },
        {
            segment: 'footersection',
            title: 'Footer section',
            icon: <HiAdjustmentsHorizontal color='gray' />,
            children: [
                { segment: 'sponsors', title: 'Sponsors', icon: < BiHeading /> },
                { segment: 'footerbg', title: 'Footer Background', icon: <BsCardHeading fontSize="small" /> },
                { segment: 'footertop', title: 'Footer Top Bar', icon: <BsCardHeading fontSize="small" /> },
                { segment: 'footermaincenter', title: 'Footer Visit ', icon: <BsCardHeading fontSize="small" /> },
                { segment: 'footercopyright', title: 'Footer Copy Right', icon: <BsCardHeading fontSize="small" /> },

            ],
        },
        { kind: 'divider' },
        { kind: 'header', title: 'Pages Settings' },
        { segment: 'breadcrumbsection', title: 'Bread Crumb Section', icon: <GoStop fontSize="small" /> },
        { segment: 'aboutsection', title: 'About Section', icon: <GoStop fontSize="small" /> },



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
    const url = "http://localhost:5173/home" || "https://your-default-site.com";


    return (
        <Stack direction="row" sx={{ display: 'flex', alignItems: "center", gap: 2, }} >

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
                    onClick={() => window.open(url, '_blank')}
                    sx={{ textTransform: 'none' }}
                    variant="outlined"
                >
                    Visit Website
                </Button>
            </Stack>
            <ProfileSection />

        </Stack >
    );
}

