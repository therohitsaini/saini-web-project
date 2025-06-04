import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Fragment } from 'react';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import { useSelector } from 'react-redux';
import { red } from '@mui/material/colors';
import { ListItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// import { ProfileSection } from './MuiFunction';x

function ProfileSection() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [headerUsername, setHeaderUsername] = useState()
    const [headerDetails, setHeaderDetails] = useState()
    const naviagte = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const userDetails = useSelector((state) => state.fullName.data)
    // console.log("userDetails", userDetails)

    useEffect(() => {

        const dataUsername = localStorage.getItem("header-email")
        const dataEmail = localStorage.getItem("header-username")
        setHeaderUsername(dataUsername)
        setHeaderDetails(dataEmail)

    }, [])

    console.log(headerDetails)
    const userDetails = useSelector((state) => state.user_info)
    // console.log("userDetails", userDetails)

    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>

                <Tooltip title="Account settings ">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, border: "2px solid cyan", }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >

                        <Avatar sx={{ height: 28, width: 28 }} alt="Remy Sharp" src={userDetails.info} />
                    </IconButton>
                </Tooltip>
                {/* <Typography>Rohit</Typography> */}
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "& .MuiList-root": {
                            },
                            bgcolor: "",
                            opacity: 0.10,

                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                // bgcolor:'white'
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose} sx={{
                    height: 48, width: 48,

                }}>
                    <Avatar sx={{ height: 48, width: 48 }} alt="Remy Sharp" src={userDetails.info} />
                    <div className='font-semibold text-[13px] text-slate-500'>
                        <p>{headerUsername}</p>
                        <p>{headerDetails}</p>


                    </div>
                </MenuItem>

                <Divider />

                <div className='w-full '>
                    <Link to={"/"}>
                        <MenuItem onClick={handleClose} sx={{
                            width: "250px", bgcolor: "#e63434",

                        }}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>

                            Logout

                        </MenuItem>
                    </Link>
                </div>
            </Menu>
        </Fragment>
    );
}

export default ProfileSection;
