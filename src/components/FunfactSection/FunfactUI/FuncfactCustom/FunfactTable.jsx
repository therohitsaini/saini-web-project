import { Button, Divider, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceData } from '../../../../Store/ServiceSectionRedux/ApisSeriveCollaction';
import { Icon } from '@iconify/react/dist/iconify.js';
import DeleteIcon from '@mui/icons-material/Delete';


function FunfactTable() {

    const [funfactMode, setFunfactMode] = useState("Tabel")
    const [funfactForm, setFunfactForm] = useState(
        { projectCount: "", aboutProject: "" }
    )
    const [funfactData, setFunfactData] = useState([])
    const [funfactRefresh, setFunfactRefesh] = useState()

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getServiceData())
    // }, [dispatch])

    // const funfactData_ = useSelector((state) => state.getSerivceSectionReducer_.funfactSection?.FunfactBox || [])

    const funfactonChangeHandler = (event) => {
        const { name, value } = event.target

        setFunfactForm((pre) => ({
            ...pre,
            [name]: value
        }))

    }


    const funFactHandler = async () => {
        const id = localStorage.getItem("user-ID")
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-section/${id}`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funfactForm)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
                setFunfactForm({ projectCount: "", aboutProject: "" })
                setFunfactRefesh(prev => !prev);
            }
        } catch (error) {
            console.log("Internal Error", error)
        }

    }

    const getFunfactDataBy_ = async () => {
        const id = localStorage.getItem("user-ID")
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-get/${id}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            if (fetchData.ok) {
                setFunfactData(responseJson.data)
            }
        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getFunfactDataBy_()
    }, [funfactRefresh])

    const handleActionClickDelete = async (data = {}) => {
        const pageId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-delete/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: pageId })
            });
            const response = await fetchData.json();
            if (fetchData.ok) {

                setFunfactRefesh(prev => !prev);
            }

        } catch (error) {
            console.error(error);

        }
    }

    const handleActionClick = async (data = {}) => {
        console.log(data)
        setFunfactForm((pre) => ({
            ...pre,
            userDocId: data.id,
            projectCount: data.funfact,
            aboutProject: data.paragraph
        }));
        setFunfactMode("Edit");
    };

    const funFactHandlerUpdate = async () => {
        const userId = localStorage.getItem("user-ID")
        const userDocID = funfactForm.userDocId
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-funfact/update/funfact/${userId}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funfactForm)

            });
            const result = await response.json();

            if (response.ok) {
                alert("Successfully updated!");
                console.log("Updated Data:", result);
            } else {
                console.error("Update failed:", result);
                alert("Update failed. Check console for details.");
            }
        } catch (error) {

        }
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        { field: 'funfact', headerName: 'Funfact Count', width: 330 },
        { field: 'paragraph', headerName: 'Paragraph', width: 320 },

        {
            field: 'action',
            headerName: 'Action',
            width: 220,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton sx={{}} onClick={() => handleActionClick(params.row)}>

                            <Icon icon={"clarity:update-line"} />
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
    const rows = Array.isArray(funfactData)
        ? funfactData.map((item_) => ({
            id: item_._id,
            funfact: item_.projectCount,
            paragraph: item_.aboutProject,
        }))
        : [];

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[85vh] flex flex-col justify-center items-center  gap-5'>

                {
                    funfactMode === "FunfactForm" || funfactMode === "Edit" ?
                        (
                            <div className='funfact-mian'>
                                <Button
                                    onClick={() => setFunfactMode("Tabel")}
                                    sx={{
                                        px: 4,
                                        display: "flex",
                                        gap: 1
                                    }}
                                    variant='outlined'
                                >
                                    <KeyboardBackspaceIcon />
                                    Back
                                </Button>
                                <form className='form-main flex flex-col gap-4 w-[500px] border border-slate-600 rounded-md p-5'>
                                    <Typography sx={{
                                        fontSize: 20,

                                    }}>Funfact Section Form</Typography>
                                    <Divider />
                                    <TextField
                                        type='number'
                                        name='projectCount'
                                        value={funfactForm.projectCount}
                                        size='small'
                                        label="Totel Project"
                                        onChange={funfactonChangeHandler}
                                    >
                                    </TextField>

                                    <TextField
                                        name='aboutProject'
                                        value={funfactForm.aboutProject}
                                        size='small'
                                        label="About Prorect"
                                        onChange={funfactonChangeHandler}
                                    >
                                    </TextField>
                                    {
                                        funfactMode === "Edit" ?
                                            (
                                                < Button
                                                    variant='contained'
                                                    onClick={funFactHandlerUpdate}
                                                    sx={{
                                                        textTransform: "none",
                                                        fontVariant: "all-small-caps"
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            )
                                            :

                                            (
                                                < Button
                                                    variant='contained'
                                                    onClick={funFactHandler}
                                                    sx={{
                                                        textTransform: "none",
                                                        fontVariant: "all-small-caps"
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            )
                                    }
                                </form>
                            </div>
                        )

                        :
                        (
                            <div>
                                <div>
                                    <Button
                                        onClick={() => setFunfactMode("FunfactForm")}
                                        sx={{
                                            px: 10,
                                            my: 2,
                                            textTransform: "none",
                                            fontVariant: "all-small-caps"
                                        }} variant="outlined">
                                        +Add More
                                    </Button>
                                </div>

                                <div className='flex  '>
                                    <Paper sx={{ height: 400, display: "flex", justifyContent: "center", }}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{ pagination: { paginationModel } }}
                                            pageSizeOptions={[5, 10]}
                                            checkboxSelection
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
                            </div>
                        )

                }
            </div>
        </Fragment >
    )
}

export default FunfactTable