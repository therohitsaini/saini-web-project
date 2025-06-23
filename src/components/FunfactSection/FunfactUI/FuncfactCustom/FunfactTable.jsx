import { Button, Divider, Paper, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceData } from '../../../../Store/ServiceSectionRedux/ApisSeriveCollaction';

function FunfactTable() {

    const [funfactIsTrue, setFunfactIsTrue] = useState(true)
    const [funfactForm, setFunfactForm] = useState(
        { projectCount: "", aboutProject: "" }
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServiceData())
    }, [dispatch])

    const funfactData_ = useSelector((state) => state.getSerivceSectionReducer_.funfactSection?.FunfactBox || [])

    const funfactonChangeHandler = (event) => {
        const { name, value } = event.target

        setFunfactForm((pre) => ({
            ...pre,
            [name]: value
        }))

    }
    console.log("funfactData__________Data", funfactData_)

    const funFactHandler = async () => {

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/funfact-section/683e90debc43f5b825e98d4a`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funfactForm)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
            }
        } catch (error) {
            console.log("Internal Error", error)
        }

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'funfact', headerName: 'Funfact Count', width: 230 },
        { field: 'paragraph', headerName: 'Paragraph', width: 220 },

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
    // const rows = funfactData?.map((item_) => ({
    //     id: item_._id,
    //     funfact: item_.projectCount,
    //     paragraph: item_.aboutProject,


    // }))

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[85vh] flex flex-col justify-center items-center  gap-5'>

                {
                    funfactIsTrue ?
                        <div>
                            <div>
                                <Button
                                    // onClick={() => setIsTableTrue(true)}
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
                                        // rows={rows}
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
                        :
                        <div >
                            <Button
                                sx={{
                                    px: 4,
                                    display: "flex",
                                    gap: 1
                                }}
                                variant='outlined'
                            >
                                <KeyboardBackspaceIcon />
                                clikc me
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
                                <Button
                                    variant='contained'
                                    onClick={funFactHandler}
                                    sx={{
                                        textTransform: "none",
                                        fontVariant: "all-small-caps"
                                    }}
                                >Save Changes</Button>
                            </form>
                        </div>
                }
            </div>
        </Fragment>
    )
}

export default FunfactTable