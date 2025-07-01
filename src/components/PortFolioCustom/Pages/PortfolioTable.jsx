import { Button, IconButton, Paper, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Fragment } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useState } from 'react';



function PortfolioTable({ portFolioData, setPortMode, setPortRefresh, setPortFormData }) {
    const [portfolioTableData, setPortFolioTableData] = useState([])


    // console.log("portFolioData___________", portFolioData)


    const handleActionClickDeletePort = async (data = {}) => {
        const userId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}api-portfolio/delete-portfolio/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: userId })
            });
            const response = await fetchData.json();

            if (fetchData.ok) {
                setPortRefresh(prev => !prev);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const portUpdatehandle = async (data = {}) => {
        setPortFormData((pre) => ({
            ...pre,
            userDocID: data.id,
            userImage: data.profile,
            title: data.title,
            subTitle: data.subTitle,
            categories: data.categories

        }))
        setPortMode("UpdateForm")

    }





    const columns = [
        {
            field: 'profile',
            headerName: 'Profile',
            width: 190,
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
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 290,
        },
        {
            field: 'subTitle',
            headerName: 'Sub Title',
            width: 290,
        },
        {
            field: 'categories',
            headerName: 'Categories',
            width: 290,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 220,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton sx={{}} onClick={() => portUpdatehandle(params.row)}>
                            <UpdateIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleActionClickDeletePort(params.row)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]


    const rows = portFolioData && portFolioData?.map((item_) => ({
        id: item_?._id,
        profile: item_?.userImage,
        title: item_?.title,
        subTitle: item_?.subTitle,
        categories: item_.categories

    }))
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[90vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setPortMode("PortForm")}
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
                            // fontVariant: "all-small-caps"
                        }}
                    />

                </Paper>
            </div>
        </Fragment>
    )
}

export default PortfolioTable