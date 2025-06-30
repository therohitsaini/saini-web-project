import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderData } from '../../../Store/ApisStore/ApisCollection';
import { useEffect } from 'react';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import UpdateIcon from '@mui/icons-material/Update';




export default function HeroTable({ setIsTableTrue, userId, setHeroFormData }) {
    const [reFresh, setRefresh] = useState(false)
    const [heroID, setHeroID] = useState()
    const dispatch = useDispatch()
    const HeroSection_ = useSelector((state) => state.getHeaderDataReducer_.headerData?.HeroSection);

    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        setHeroID(userID)
    }, [])
    console.log("HeroSection_", HeroSection_)
    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        dispatch(getHeaderData(userID));
    }, [dispatch, reFresh]);


    const handleActionClickDelete = async (data = {}) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/delete-dyanamic-data/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: heroID })
            });
            const response = await fetchData.json();
            
            if (fetchData.ok) {
                setRefresh(prev => !prev);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const heroUpdatehandle = (data = {}) => {
        setHeroFormData((pre) => ({
            ...pre,
            userDocID: data.id,
            heroImgUrl: data.bgimg,
            heroSlideSubTitle: data.subTitle,
            heroSlideTitle: data.title,
            heroButton_One: data.heroButton_One,
            heroButton_Two: ""
        }));
        alert(JSON.stringify(data))
        setIsTableTrue("Edit");
    };

    const columns = [
        //  { field: 'id', headerName: 'ID', width: 290 },
        {
            field: 'bgimg',
            headerName: 'Slider Image',
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
                            // border: "1px solid #ddd",
                            padding: "2px",
                        }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100x60?text=Image+Not+Found";
                        }}
                    />
                );
            }

        },

        // { field: 'playButton', headerName: 'Play Button', width: 220 },
        {
            field: 'subTitle',
            headerName: 'Sub Title',
            type: 'number',
            width: 290,
        },

        {
            field: 'title',
            headerName: 'Title',
            width: 320,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 220,
            renderCell: (params) => (
                <div className='flex gap-1'>
                    <Tooltip title="Update">
                        <IconButton sx={{}} onClick={() => heroUpdatehandle(params.row)}>
                            <UpdateIcon />
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
                    onClick={() => setIsTableTrue("AddNewData")}
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
    );
}





