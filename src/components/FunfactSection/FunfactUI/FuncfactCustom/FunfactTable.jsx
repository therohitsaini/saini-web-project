import { Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Fragment } from 'react'

function FunfactTable() {


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
    // const rows = HeroSection_ && HeroSection_?.map((item_) => ({
    //     id: item_._id,
    //     bgimg: item_.heroImgUrl,
    //     playButton: item_.heroPlay_Button,
    //     subTitle: item_.heroSlideSubTitle,
    //     title: item_.heroSlideTitle

    // }))

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[90vh] flex flex-col justify-center  gap-5'>

                <div>
                    <Button
                        // onClick={() => setIsTableTrue(true)}
                        sx={{
                            px: 10,
                            textTransform: "none",
                            fontVariant: "all-small-caps"
                        }} variant="outlined">
                        +Add More
                    </Button>
                </div>

                <div className='flex justify-center '>
                    <Paper sx={{ height: 400, display: "flex", justifyContent: "center",  }}>
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
        </Fragment>
    )
}

export default FunfactTable