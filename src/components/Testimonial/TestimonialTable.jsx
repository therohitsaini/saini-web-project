import { Button, IconButton, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Fragment } from 'react'

function TestimonialTable({ testimonialApiesData, setTestimonialMode, setTestimonialForm }) {

    const testmonialUpdateHandle = async (data = {}) => {
        const id = localStorage.getItem("user-ID")
        const docsId = data.id
        console.log("docsId", docsId)
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/testimonial/api-get-data/by-doc-id/${id}/${docsId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            const JsonData = await response.json();
            console.log("JsonData", JsonData)
            if (response.ok) {
                const { heading, userName, paragraph, occupationRole, userProfile, _id } = JsonData.data
                setTestimonialForm((pre) => ({
                    ...pre,
                    userDocID: _id,
                    heading,
                    userName,
                    paragraph,
                    occupationRole,
                    userProfile

                }))
                setTestimonialMode("UpdateForm")
            }
            else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }


    }

    const columns = [
        {
            field: 'userProfile',
            headerName: 'Profile Picture',
            width: 290,
            renderCell: (params) => {
                const imgPath = params.formattedValue;
                const baseURL = import.meta.env.VITE_BACK_END_URL?.replace(/\/$/, '');
                const fullURL = imgPath?.startsWith("http") ? imgPath : `${baseURL}${imgPath}`;

                return (
                    <img

                        src={fullURL}
                        alt="bg"
                        style={{
                            width: "100px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            padding: "2px",
                        }}

                    />
                );
            }
        },
        {
            field: 'userName',
            headerName: 'Name',
            width: 290,
        },
        {
            field: 'title',
            headerName: 'Title',

            width: 290,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 220,
            renderCell: (params) => (
                <div className='flex gap-1 items-center'>
                    <IconButton
                        sx={{
                            background: "green",
                            color: '#fff',
                            height: "27px",
                            width: "40px",
                            textTransform: 'none',
                            paddingX: 5,
                            fontSize: 10,
                            borderRadius: 2,
                            boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #0be574 30%, #10d856 90%)',
                            },
                        }}
                        onClick={() => testmonialUpdateHandle(params.row)}>
                        Edit
                    </IconButton>

                    <IconButton
                        sx={{
                            background: "red",
                            color: '#fff',
                            height: "27px",
                            width: "40px",
                            textTransform: 'none',
                            paddingX: 5,
                            fontSize: 10,
                            borderRadius: 2,
                            boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #f22b3f 30%,#f22b3f 90%)',
                            },
                        }}
                        onClick={() => handleActionClickDeletePort(params.row)}>
                        Delete
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]

    const rows = testimonialApiesData && testimonialApiesData.map((item_) => ({

        id: item_._id,
        userProfile: item_.userProfile,
        userName: item_.userName,
        title: item_.heading

    }))

    const paginationModel = { page: 0, pageSize: 10 };
    return (
        <Fragment>
            <div className='w-full  h-[97%] flex flex-col justify-center gap-8 '>
                <div className='flex justify-between items-center   rounded-md  '>
                    <Button sx={{
                        px: 8
                    }}
                        onClick={() => setTestimonialMode("SubmitForm")}
                        variant="outlined">
                        +Add More
                    </Button>

                </div>
                <Paper sx={{ height: 400, display: "flex", justifyContent: "center" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        // getRowClassName={(params) =>
                        //     params.id === deletingId ? 'row-deleting' : ''
                        // }
                        sx={{
                            '& .MuiDataGrid-columnHeader': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer, .MuiDataGrid-cell': {
                                display: 'flex',
                                justifyContent: "center"
                            },
                        }}
                    />
                </Paper>
            </div>
        </Fragment>
    )
}

export default TestimonialTable