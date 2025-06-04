import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, colors, Table } from '@mui/material';
import { blue, cyan, red } from '@mui/material/colors';
import { useState } from 'react';
import { useEffect } from 'react';
import RolePermissionModal from '../../ModalComponent/RolePermissionModal';
import MuiAppBar from './MuiAppBar';



function RolePermission() {

    const [userLoginInformation, setUserLoginInformation] = useState([])
    const [getPermissions, setGetPermissions] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    // const handleOpen = () => setOpen(true);


    useEffect(() => {
        const getUserInformation = async () => {

            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}all/users`
                const fetchUser = await fetch(url, {
                    method: "GET",
                });
                const response = await fetchUser.json()
                setUserLoginInformation(response.data)

            } catch (error) {
                console.log("Server Error ...!", error)
            }
        }

        getUserInformation()

    }, [])

    useEffect(() => {
        const getRolePermission = async () => {
            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}admin/get-role-permission`
                const fetch_Data = await fetch(url, {
                    method: "GET"
                })
                const response = await fetch_Data.json()
                // console.log(response)
                setGetPermissions(response.find_Data || []);


            } catch (error) {
                console.log(error)
            }
        }
        getRolePermission()
    }, [])

    console.log("getPermissions", JSON.stringify(getPermissions))
    // console.log("userLoginInformation", userLoginInformation)
    const columns = [
        { field: 'id', headerName: 'ID', width: 550 },
        { field: 'roleID', headerName: 'Role ID', width: 550 },
        { field: 'permission', headerName: ' Permission', width: 550 },

    ];

    const rows = getPermissions ?? getPermissions.map((item) => {
        return (
            { roleID: item.role , permission : item.permission}
        )

    })
    // const rows = getPermissions ?? getPermissions.map((data) => ({
    //     id: data._id,
    //     roleID: data.role
    // }))
    // const rows = getPermissions ??  getPermissions.map((data) => ({
    //     id: data._id,        // <-- DataGrid requires `id`
    //     roleID: data.role,
    //     // add other fields here if needed
    // })) ?? [];

    // const rows = Array.isArray(getPermissions)
    //     ? getPermissions
    //         .filter((item) => item && item._id) // filter bad data
    //         .map((data) => ({
    //             id: data._id,       // MUST exist
    //             roleID: data.role,  // other fields you want
    //         }))
    //     : [];

    const paginationModel = { page: 0, pageSize: 6 };



    return (
        <div className=' w-full '>
            {/* <MuiAppBar /> */}
            <RolePermissionModal open={open} setOpen={setOpen} />

            <div className=' '>
                <div className='mt-5  w-full '>
                    <Button onClick={() => handleOpen()} sx={{ bgcolor: 'cyan', fontFamily: "sans-serif" }} variant='contained'>Add Role Permission</Button>

                </div>
                <div className='main-role-table  flex justify-center items-center flex-col w-full h-[500px]'>

                    <Paper sx={{
                        // border : "2px solid green",
                        // p:2,
                        display: "flex", justifyContent: "center",

                        height: 400, width: "100%", overflow: 'hidden',
                        // p: 2,
                        '& .MuiDataGrid-main': {
                            backgroundColor: "black",
                            color: 'white',
                        },
                        "& .MuiToolbar-root": {
                            backgroundColor: 'black',
                            color: "cyan"
                        },

                    }}>


                        <DataGrid
                            columns={columns}
                            rows={rows}
                            //  getRowId={(row) => rows._id}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[10, 20]}
                            checkboxSelection

                            sx={{
                                '& .MuiDataGrid-topContainer': {
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    color: 'white',
                                    // backgroundColor: ' #0a0505',
                                    border: 'none',
                                    // opacity: 0.5,
                                    fontWeight: 'bold',
                                },
                                "& .MuiDataGrid-row--borderBottom .MuiDataGrid-filler": {
                                    // backgroundColor: 'black !important',
                                },
                                '& .MuiDataGrid-columnHeaderTitleContainer,.MuiDataGrid-cell': {
                                    display: 'flex', justifyContent: "center"
                                },

                                '& .MuiDataGrid-cell:hover': {
                                    '&:hover': {
                                        // backgroundColor: 'red',
                                    },
                                    "& .MuiDataGrid-row--borderBottom": {
                                        borderBottom: ""
                                    },
                                    '& .MuiDataGrid-virtualScrollerRenderZone': {
                                        backgroundColor: '#911b1b', // Change to your desired color
                                    },
                                    "& .MuiDataGrid-row--borderBottom .MuiDataGrid-filler:hover": {
                                        backgroundColor: 'red !important',
                                    },
                                    "& .MuiTouchRipple-root": {
                                        // DataGrid-t-Color-border-base: rgba(224, 224, 224, 1)
                                        color: "red"
                                    },
                                    "& .MuiContainer-root": {
                                        padding: 0,
                                        margin: 0
                                    },
                                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                                        width: 300
                                    }


                                }

                            }}
                        />
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default RolePermission;