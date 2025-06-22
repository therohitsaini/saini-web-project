import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';




const InFoTable = ({ setInFoIsTrue, inFoDataRedux }) => {



    const columns = [
        //  { field: 'id', headerName: 'ID', width: 90 },
        { field: 'bgimg', headerName: 'Backgorund Image', width: 230 },
        { field: 'playButton', headerName: 'Play Button', width: 220 },
        {
            field: 'subTitle',
            headerName: 'Sub Title',
            type: 'number',
            width: 230,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 220,
        }, {
            field: 'action',
            headerName: 'Action',
            width: 220,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton sx={{}} 
                        // onClick={() => handleActionClick(params.row)}
                        >

                            <Icon icon={"clarity:update-line"} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                        //  onClick={() => handleActionClickDelete(params.row)}
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
    const rows = inFoDataRedux && inFoDataRedux?.map((item_) => ({
        id: item_._id,
        bgimg: item_.inFoHeading,
        playButton: item_.inFoDescription,
        subTitle: item_.inFoIcone,


    }))
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[90vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setInFoIsTrue(false)}
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