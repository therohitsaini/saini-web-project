import { Button, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { Fragment } from 'react'

function CustomTable({ setFeatureMode, featureListItem, showSnackbar, setFeatureListForm }) {


    const deleteFeatureListItemHandler = async (data = {}) => {
        const pageId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-delete/feature/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: pageId })
            });
            const response = await fetchData.json();

            if (fetchData.ok) {
                showSnackbar(response.message)
                setRefresh(prev => !prev);
            }

        } catch (error) {
            console.error(error);

        }
    }


    const updateFeatureListItemHandler = async (data = {}) => {
        const docs = data.allData
        console.log("id", docs)
        setFeatureListForm((pre) => ({
            ...pre,
            userDocID: docs._id,
            listTitle: docs.listTitle,
            backGroundImage: docs.backGroundImage,
            listIconeLeft: docs.listIconeLeft,
            listIconeRight: docs.listIconeRight

        }))
        setFeatureMode("UpdateForm")

    }
    const columns = [

        {
            field: 'bgImage',
            headerName: 'Background Image',
            width: 370,
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
                            // border: "1px solid #ddd",
                            padding: "2px",
                        }}
                    // onError={(e) => {
                    //     e.target.onerror = null;
                    //     e.target.src = "https://via.placeholder.com/100x60?text=Image+Not+Found";
                    // }}
                    />
                );
            }
        }, {
            field: 'title',
            headerName: 'Title',
            width: 370,
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 370,
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
                                background: 'linear-gradient(45deg, #0ddc3a 30%, #34e977 90%)',
                            },
                        }}
                        onClick={() => updateFeatureListItemHandler(params.row)}
                    >
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
                                background: 'linear-gradient(45deg, #de0f0f 30%, #f00e11 90%)',
                            },
                        }}
                        onClick={() => deleteFeatureListItemHandler(params.row)}
                    >
                        Delete
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]

    const rows = featureListItem?.map((item_) => ({
        id: item_._id,
        bgImage: item_.backGroundImage,
        title: item_.listTitle,
        allData: item_


    }))

    const paginationModel = { page: 0, pageSize: 30 };

    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[78vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setFeatureMode("SubmitForm")}
                        sx={{
                            px: 10,
                            textTransform: "none",
                            fontVariant: "all-small-caps"
                        }} variant="outlined">
                        +Add More
                    </Button>
                </div>


                <Paper sx={{ height: 400, width: '100%' }}>
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
        </Fragment>
    )
}

export default CustomTable