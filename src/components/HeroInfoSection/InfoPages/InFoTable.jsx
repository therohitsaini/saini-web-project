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
import { showErrorToast, showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import { ToastContainer } from 'react-toastify';

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

    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getInfoData(id)
    }, [refresh])

    const inFoDeleteHandler = async (data = {}) => {
        console.log('inFoDeleteHandler data:', data);
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
                // console.log('Delete successful:', response);
                showSuccessToast(response.message || "Deleted Data Successfully")
                setRefresh(prev => !prev);
            } else {
                console.log('Delete failed:', response);
                showErrorToast(response.message || "Deleted Data Failed")
            }

        } catch (error) {
            console.error(error);

        }
    }

    const updateInfoHandler = (data = {}) => {
        console.log('updateInfoHandler data:', data);
        const original = data.originalData || {};
        console.log('original data:', original);
        setInFoService((pre) => ({
            ...pre,
            userDocId: original._id,
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
            width: 370,
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <div style={{ color: 'white', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 370,
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <div style={{ color: 'white', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {params.value}
                </div>
            ),
        },
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     width: 270,
        //     renderCell: (params) => (
        //         <div style={{ 
        //             display: 'flex', 
        //             gap: '8px', 
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //             width: '100%',
        //             height: '100%',
        //         }}>
        //             <IconButton
        //                 sx={{
        //                     background: "green",
        //                     color: '#fff',
        //                     height: "27px",
        //                     width: "40px",
        //                     textTransform: 'none',
        //                     paddingX: 5,
        //                     fontSize: 10,
        //                     borderRadius: 2,
        //                     boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
        //                     '&:hover': {
        //                         background: 'linear-gradient(45deg, #0ddc3a 30%, #34e977 90%)',
        //                     },
        //                 }}
        //                 onClick={(e) => {
        //                     // e.stopPropagation();
        //                     updateInfoHandler(params.row);
        //                 }}
        //             >
        //                 Edit
        //             </IconButton>

        //             <IconButton
        //                 sx={{
        //                     background: "red",
        //                     color: '#fff',
        //                     height: "27px",
        //                     width: "40px",
        //                     textTransform: 'none',
        //                     paddingX: 5,
        //                     fontSize: 10,
        //                     borderRadius: 2,
        //                     boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
        //                     '&:hover': {
        //                         background: 'linear-gradient(45deg, #de0f0f 30%, #f00e11 90%)',
        //                     },
        //                 }}
        //                 onClick={(e) => {
        //                     // e.stopPropagation();
        //                     inFoDeleteHandler(params.row);
        //                 }}
        //             >
        //                 Delete
        //             </IconButton>
        //         </div>
        //     ),
        //     sortable: false,
        //     filterable: false,
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            minWidth: 200,
            flex: 0,
            renderCell: (params) => (
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: "2px slolid green" }}>
                    <div className='flex gap-1 items-center  mt-3'>
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
                                    background: 'linear-gradient(45deg, #089f4a 30%, #0fc874 90%)',
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
                                    background: 'linear-gradient(45deg, #e81010 30%, #eb1216 90%)',
                                },
                            }}
                            onClick={() => inFoDeleteHandler(params.row)}
                        >
                            Delete
                        </IconButton>
                    </div>
                </div>
            ),
            sortable: false,
            filterable: false,
            resizable: false,
        },
    ]

    const rows = inFoData?.map((item_) => ({
        id: item_._id,
        title: item_.inFoHeading,
        subTitle: item_.inFoDescription,
        originalData:
            item_,


    }))

    console.log('InFoTable rows:', rows)
    console.log('InFoTable inFoData:', inFoData)

    return (
        <Fragment>
            <ToastContainer />
            <div className='hero-tabel-main  w-[1100px] flex flex-col justify-center gap-5'>

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

                <Paper sx={{ height: 400, width: '100%', minWidth: '100%' }}>
                    <DataGrid
                        rows={rows || []}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            columns: {
                                columnVisibilityModel: {
                                    action: true,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        columnVisibilityModel={{ action: true }}
                        disableColumnMenu={false}
                        disableColumnFilter={false}
                        disableColumnSelector={false}
                        sx={{
                            width: '100%',
                            '& .MuiDataGrid-root': {
                                border: 'none',
                                width: '100%',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#1976d2',
                                color: 'white',
                                borderBottom: '2px solid #fff',
                            },
                            '& .MuiDataGrid-columnHeader': {
                                color: 'white',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: 'white',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #333',
                                color: 'white',
                            },
                            '& .MuiDataGrid-row': {
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                },
                            },
                            '& .MuiDataGrid-row.Mui-selected': {
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            },
                            '& .MuiDataGrid-row.Mui-selected:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#1976d2',
                                color: 'white',
                            },
                            '& .MuiDataGrid-footerContainer .MuiTablePagination-root': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-footerContainer .MuiTablePagination-select': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-footerContainer .MuiTablePagination-selectIcon': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-footerContainer .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-footerContainer .MuiTablePagination-actions button': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-virtualScroller': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiDataGrid-virtualScrollerContent': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiDataGrid-virtualScrollerRenderZone': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiToolbar-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: '100%',
                                height: '100%',

                            }

                        }}
                    />
                </Paper>

            </div>
        </Fragment>
    )
}

export default InFoTable