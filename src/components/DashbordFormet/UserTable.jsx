import React from 'react';
import {
    DataGrid,
} from '@mui/x-data-grid';
import {
    Paper, Button, IconButton, Tooltip, Backdrop, CircularProgress
} from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect, Fragment } from 'react';
import RoleUpdateModal from '../../ModalComponent/RoleUpdateModal';
import { useDemoRouter } from '../MuiFunction/MuiFunction';
import { green } from '@mui/material/colors';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserTable() {

    const [userLoginInformation, setUserLoginInformation] = useState([]);
    const [open, setOpen] = useState(false);
    const [autoComplete, setAutoComplete] = useState("");
    const [dataByRole, setDataByRole] = useState([]);
    const [id_, setId_] = useState(null);
    const [arrIds, setArrIds] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [isTrue, setIsTrue] = useState(false)
    const [checkStatus, setCheckStatus] = useState()
    const [status, setStatus] = useState(true)
    const [isTure_, setIsTrue_] = useState(false)
    const [isUpdateOnComponent, setIsUpdateOnComponent] = useState(true)

    // console.log("arrIds", arrIds)

    const router = useDemoRouter("/dashboard");



    const goToAddUser = () => {
        router.navigate("/user/adduser");
    };


    const handleActionClick = (data = {}) => {
        setOpen(true);
        setIsUpdateOnComponent(false)
        setId_(data?.id || "");

    };


    const handleActionClickDelete = async (data = {}) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/user-delete/${data.id}`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            const response = await fetchData.json();
            console.log(response);
            setRefreshFlag(prev => !prev);
        } catch (error) {
            console.error(error);
        }
    };


    const handleDelete = async () => {
        if (arrIds.length === 0) {
            alert('Please select at least one user to delete.');
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${arrIds.length} user`);
        if (!confirmDelete) return;

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/delete-all-user/`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'include',
                    ids: Array.from(arrIds),
                }),

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete users.');
            }

            alert(`Deleted ${result.deletedCount} user(s) successfully.`);
            setRefreshFlag(prev => !prev);
        } catch (error) {
            console.error('Error deleting users:', error);
            alert('Error deleting users. Please try again.');
        }
    };


    const getUserInformation = async () => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/users`;
            const fetchUser = await fetch(url, { method: "GET" });
            const response = await fetchUser.json();
            setUserLoginInformation(response.data || []);
        } catch (error) {
            console.error("Server Error ...!", error);
        }
    };

    useEffect(() => {
        getUserInformation();
    }, [refreshFlag, isTrue]);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 190 },
        { field: 'firstName', headerName: 'Full Name', width: 170 },
        { field: 'Username', headerName: 'Username', width: 200 },
        { field: 'emailID', headerName: 'User Mail ID', width: 250 },
        { field: 'permission', headerName: 'Permissions', width: 160 },


        {
            field: 'status',
            headerName: 'Status',
            width: 160,
            renderCell: (params) => {
                const isActive = params.row.status === true;
                // console.log("isActive", isActive)

                return (
                    <div className='flex gap-1 justify-center items-center'>
                        <Button
                            onClick={() =>
                                isActive
                                    ? hanlderActiveToggle(params.row.id)
                                    : hanlderDeActiveToggle(params.row.id)
                            }
                            variant='contained'
                            color={isActive ? 'success' : 'error'}
                            sx={{
                                fontFamily: 'revert-layer',
                                height: '30px',
                                color: 'white',
                                fontSize: 10,
                            }}
                        >
                            {isActive ? 'Active' : 'Deactive'}
                        </Button>
                    </div>
                );
            },
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton onClick={() => handleActionClick(params.row)}>
                            <EditSquareIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleActionClickDelete(params.row)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ];


    const hanlderActiveToggle = async (id) => {
        // setCheckStatus(false)
        // const confirmDelete = window.confirm("You Want to Active this User");
        // if (!confirmDelete) return;
        // setCheckStatus(JSON.stringify(userLoginInformation.userStatus))
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/change-satuts/${id}`
            const updateStatus = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: false })
            })
            const response = await updateStatus.json()
            console.log(response)
            setRefreshFlag(prev => !prev);
        } catch (error) {
            console.log(error)
        }
    }

    const hanlderDeActiveToggle = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/change-satuts/${id}`
            const updateStatus = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: true })
            })
            const response = await updateStatus.json()
            console.log(response)
            setRefreshFlag(prev => !prev);
        } catch (error) {
            console.log(error)
        }
    }



    const rows = userLoginInformation.map((item) => ({
        id: item._id,
        firstName: item.fullname,
        Username: item.username,
        emailID: item.email,
        permission: item.permission,
        status: item.userStatus
    }));

  

    return (
        <Fragment>
            {isUpdateOnComponent ?
                <div>
                    <div className='flex flex-col w-full gap-4'>
                        <div className='flex justify-between'>
                            <Button variant="contained" onClick={goToAddUser}>Add New User</Button>
                            <Button variant="outlined" color="error" onClick={handleDelete} disabled={arrIds.length === 0}>Delete Selected</Button>
                        </div>



                        <Paper sx={{
                            height: 600,
                            width: "100%",
                            '& .MuiDataGrid-main': {
                                backgroundColor: "black",
                                color: 'white',
                            },
                            "& .MuiToolbar-root": {
                                backgroundColor: 'black',
                                color: "cyan"
                            }
                        }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                checkboxSelection
                                pageSizeOptions={[10, 20]}
                                // onRowSelectionModelChange={(ids) => setArrIds(ids)}
                                onRowSelectionModelChange={(newSelection) => {
                                    setArrIds(newSelection.ids);
                                }}
                                sx={{
                                    '& .MuiDataGrid-columnHeader': {
                                        color: 'white',
                                    },
                                    '& .MuiDataGrid-columnHeaderTitleContainer, .MuiDataGrid-cell': {
                                        display: 'flex', justifyContent: "center"
                                    },
                                }}
                            />
                        </Paper>
                    </div>

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={!userLoginInformation}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
                : <div className='update-component   bg-[#121212] flex flex-col justify-center  '>
                    <span onClick={() => setIsUpdateOnComponent(true)} className='flex items-center gap-1 my-10 hover:bg-slate-300/20 rounded-md px-2 py-1 w-20 cursor-pointer duration-700'> <ArrowBackIcon /> Back</span>

                    <RoleUpdateModal

                        setAutoComplete={setAutoComplete}
                        autoComplete={autoComplete}
                        id={id_}
                        userLoginInformation={userLoginInformation}
                        dataByRole={dataByRole}
                        setDataByRole={setDataByRole}
                        setRefreshFlag={setRefreshFlag}
                        setIsTrue={setIsTrue}
                        isTrue={isTrue}
                        // setImagePicker={setImagePicker}
                        // imagePicker={imagePicker}
                        // userProfilePictureHandler={userProfilePictureHandler}

                    />
                </div>
            }
        </Fragment>
    );
}

export default UserTable;
