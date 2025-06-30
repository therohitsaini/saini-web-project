import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Fragment } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@iconify/react/dist/iconify.js';



function ServiceTable({ setServiceTableTrue, setServiceCustom }) {

    const [serviceSection, setServiceSection] = useState([])
    const [reFresh, setRefresh] = useState(false)

    console.log("serviceSection", serviceSection)

    const getServiceCardData = async (id) => {
        try {
            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-servcie-card/${id}`
                const fetchData = await fetch(url, {
                    method: "GET"
                })
                const responseJson = await fetchData.json()
                setServiceSection(responseJson?.data)
            } catch (error) {

                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getServiceCardData(id)
    }, [reFresh])

    const serviceSectionDeleteHandler = async (data = {}) => {

        const pageId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/delete-serive-item/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: pageId })
            });
            const response = await fetchData.json();
            if (fetchData.ok) {

                setRefresh(prev => !prev);
            }

        } catch (error) {
            console.error(error);

        }
    }

    const updateServiceHandler = async (data = {}) => {
        const parentId = localStorage.getItem("user-ID")
        const cardId = data.id
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-data/by-id/${parentId}/${cardId}`;
            const fetchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            });
            const response = await fetchData.json();
            // console.log("response", response)

            if (fetchData.ok) {

                const { iconeTop, serviceHeading, ServiceDescription, _id } = response.data;
                setServiceCustom((pre) => ({
                    ...pre,
                    _id,
                    iconeTop,
                    serviceHeading,
                    ServiceDescription,
                }));
                setServiceTableTrue("Edit");

            } else {
                alert("Somthing Went Wrong!")
            }

        } catch (error) {
            console.error(error);

        }
    }

    const columns = [
        //  { field: 'id', headerName: 'ID', width: 90 },
        // { field: 'bgimg', headerName: 'Backgorund Image', width: 230 },
        { field: 'title', headerName: 'Title', width: 320 },
        {
            field: 'subTitle',
            headerName: 'Sub Title',
            // type: 'number',
            width: 510
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 270,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton sx={{}}
                            onClick={() => updateServiceHandler(params.row)}
                        >
                            <Icon icon={"clarity:update-line"} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => serviceSectionDeleteHandler(params.row)}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]


    const row = serviceSection?.map((item_, index_) => ({
        id: item_._id,
        title: item_.serviceHeading,
        subTitle: item_.ServiceDescription


    }))


    const paginationModel = { page: 0, pageSize: 5 };



    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[90vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setServiceTableTrue("submitForm")}
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
                        rows={row}
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

export default ServiceTable