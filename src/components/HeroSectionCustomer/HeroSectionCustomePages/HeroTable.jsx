import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderData } from '../../../Store/ApisStore/ApisCollection';
import { useEffect } from 'react';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';




export default function HeroTable({ setIsTableTrue }) {

    const dispatch = useDispatch()
    const HeroSection_ = useSelector((state) => state.getHeaderDataReducer_.headerData?.HeroSection);

    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);

    console.log("HeroSection__", HeroSection_)


    const handleActionClickDelete = async (data = {}) => {
        // alert(JSON.stringify(data.id))


        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/delete-dyanamic-data/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data, pageId: "683e90debc43f5b825e98d4a" })
            });
            const response = await fetchData.json();
            // console.log(response);
            alert(JSON.stringify(response))
            // setRefreshFlag(prev => !prev);
        } catch (error) {
            console.error(error);
        }
    };

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
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 220,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton onClick={() => handleActionClick(params.row)}>
                            <EditSquareIcon />
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

    // const handleActionClickDelete = (data = {}) => {
    //     alert(JSON.stringify(data.id))
    // }


    const rows = HeroSection_ && HeroSection_?.map((item_) => ({
        id: item_._id,
        bgimg: item_.heroImgUrl,
        playButton: item_.heroPlay_Button,
        subTitle: item_.heroSlideSubTitle,
        title: item_.heroSlideTitle

    }))

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <div className='hero-tabel-main w-full h-[90vh] flex flex-col justify-center gap-5'>

            <div>
                <Button
                    onClick={() => setIsTableTrue(true)}
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
    );
}





