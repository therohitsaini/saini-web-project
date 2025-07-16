import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderData } from '../../../Store/ApisStore/ApisCollection';
import { useEffect, useState } from 'react';

export default function HeroTable({ setIsTableTrue, userId, setHeroFormData }) {
    const [reFresh, setRefresh] = useState(false);
    const [heroID, setHeroID] = useState();
    const dispatch = useDispatch();
    const HeroSection_ = useSelector((state) => state.getHeaderDataReducer_.headerData?.HeroSection);

    useEffect(() => {
        const userID = localStorage.getItem("user-ID");
        setHeroID(userID);
    }, []);

    useEffect(() => {
        const userID = localStorage.getItem("user-ID");
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
                body: JSON.stringify({ data: data.id, pageId: heroID }),
            });

            if (fetchData.ok) {
                setRefresh(prev => !prev);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const heroUpdatehandle = (data = {}) => {
        const original = data.originalData || {};
        console.log("original", original)

        setHeroFormData((pre) => ({
            ...pre,
            userDocID: original._id,
            heroImgUrl: original.heroImgUrl,
            heroSlideSubTitle: original.heroSlideSubTitle,
            heroSlideTitle: original.heroSlideTitle,
            heroButton_One: original.heroButton_One,
            heroButton_Two: original.heroButton_Two,
            heroPlay_Button: original.heroPlay_Button
        }));

        setIsTableTrue("Edit");
    };

    const columns = [
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
                            padding: "2px",
                        }}
                    />
                );
            }
        },
        {
            field: 'subTitle',
            headerName: 'Sub Title',
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
                <div className='flex gap-1 items-center'>
                    <IconButton
                        sx={{
                            background: 'linear-gradient(45deg, #43a047 30%, #29ce31 90%)',
                            color: '#fff',
                            height: '27px',
                            width: '70px',
                            paddingX: 2,
                            fontSize: 10,
                            borderRadius: 2,
                            transition: 'background 0.3s ease',
                            boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                            },
                        }}
                        onClick={() => heroUpdatehandle(params.row)}
                    >
                        Edit
                    </IconButton>

                    <IconButton
                        sx={{
                            background: "red",
                            color: '#fff',
                            height: "27px",
                            width: "40px",
                            fontSize: 10,
                            borderRadius: 2,
                            boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #f40404 30%, #fb0404 90%)',
                            },
                        }}
                        onClick={() => handleActionClickDelete(params.row)}
                    >
                        Delete
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    const rows = HeroSection_?.map((item_) => ({
        id: item_._id,
        bgimg: item_.heroImgUrl,
        subTitle: item_.heroSlideSubTitle,
        title: item_.heroSlideTitle,
        originalData: item_, 
    }));

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
                    }}
                    variant="outlined"
                >
                    + Add More
                </Button>
            </div>

            {HeroSection_ && HeroSection_.length > 0 ? (
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
                                display: 'flex',
                                justifyContent: "center"
                            },
                        }}
                    />
                </Paper>
            ) : (
                <div className='h-[400px] flex justify-center items-center'>
                    <h1>No Record Found</h1>
                </div>
            )}
        </div>
    );
}
