import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { getInfoData } from '../../../Store/infoApiesStore/infoApiRedux';
import { useDispatch, useSelector } from 'react-redux';




const InFoTable = ({ setInFoIsTrue, setInFoService, refresh, setRefresh }) => {
    const [inFoData, setInFoData] = useState([])

    const dispatch = useDispatch()

    const getInfoData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/info/get/info/${id}`
            const fatchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const jsonResponse = await fatchData.json()
            if (fatchData.ok) {
                setInFoData(jsonResponse.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const inFoRedux = useSelector((state) => state.getInFoDataReducer_)


    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getInfoData(id)
    }, [refresh])


    const inFoDeleteHandler = async (data = {}) => {
        const pageId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/info/delete-info/`;
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

    const updateInfoHandler = (data = {}) => {
        const original = data.originalData || {};
        setInFoService((pre) => ({
            ...pre,
            userDocId: original.id,
            inFoHeading: original.inFoHeading,
            inFoDescription: original.inFoDescription,
            inFoIcone: original.inFoIcone

        }))
        setInFoIsTrue("Edit")

    }

    const columns = [
        {
            field: 'subTitle',
            headerName: 'Sub Title',
            type: 'number',
            width: 370,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 370,
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
                        onClick={() => updateInfoHandler(params.row)}
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
                        onClick={() => inFoDeleteHandler(params.row)}
                    >
                        Delete
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]
    const rows = inFoData?.map((item_) => ({
        id: item_._id,
        title: item_.inFoHeading,
        subTitle: item_.inFoDescription,
        originalData: {
            ...item_,
            id: item_._id 
        },

    }))
    
    console.log('InFoTable rows:', rows)
    console.log('InFoTable inFoData:', inFoData)
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[78vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setInFoIsTrue("Save")}
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

export default InFoTable