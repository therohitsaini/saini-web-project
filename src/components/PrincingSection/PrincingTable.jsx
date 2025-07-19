import { Button, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react'

function PrincingTable({ setPrincingMode, princingGetApiesData, setRefresh, setPrincingData, showSnackbar }) {


    const princingDeleteHandler = async (data = {}) => {

        const pageId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-princing/api-delete/`;
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

    const getUpdatePrincingHandler = async (data = {}) => {
        const userId = localStorage.getItem("user-ID")
        const docsId = data.id

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-princing/api-get-id/${userId}/${docsId}`
            const fatchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const jsonResponse = await fatchData.json()
            const { heading, listItem, button, price, _id } = jsonResponse.data
            if (fatchData.ok) {
                setPrincingData((pre) => ({
                    ...pre,
                    _id,
                    heading,
                    listItem,
                    button,
                    price

                }))
                setPrincingMode("UpdateForm")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const columns = [

        {
            field: 'title',
            headerName: 'Title',
            width: 370,
        },
        {
            field: 'listItem',
            headerName: 'List Item',
            width: 400,
            renderCell: (params) => (
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {params.row.listItem?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )
        }, {
            field: 'action',
            headerName: 'Action',
            width: 270,
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
                        onClick={() => getUpdatePrincingHandler(params.row)}
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
                        onClick={() => princingDeleteHandler(params.row)}
                    >
                        Delete

                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]

    const rows = princingGetApiesData && princingGetApiesData.map((item_) => ({
        id: item_._id,
        title: item_.heading,
        listItem: item_.listItem
    }))


    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-[80%] border border-red-500 h-[78vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setPrincingMode("SubmitForm")}
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

export default PrincingTable