import { Button, IconButton, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment } from 'react'

function TeamTable({ teamCardDataApies, showSnackbar, setTeamMode, setTeamMemberForm }) {



    const deleteTeamCardHandler = async (data = {}) => {

        const userId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}api-team/api-delete-team-card/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: userId })
            });
            const response = await fetchData.json();

            if (fetchData.ok) {
                alert(response.message || 'Team member deleted successfully');
                // Refresh the data by calling the parent's refresh function
                // You might need to pass a refresh function from parent component
            }

        } catch (error) {
            console.error(error);
        }

    }

    const TeamMemberUpdateHandler = async (data = {}) => {
        const { allData } = data
        console.log(allData._id)
        setTeamMemberForm((pre) => ({
            ...pre,
            docsId: allData?._id,
            image: allData?.image,
            name: allData?.name,
            role: allData?.role,
            item_Icone: allData?.item_Icone,
            urls: allData?.urls,
        }))
        console.log(allData)
        setTeamMode("UpdateTeamForm")
    }

    const paginationModel = { page: 0, pageSize: 10 };
    const columns = [
        {
            field: 'image',
            headerName: 'Team Member Image',
            width: 250,
            renderCell: (params) => {
                const imgPath = params.formattedValue;
                const baseURL = import.meta.env.VITE_BACK_END_URL?.replace(/\/$/, '');
                const fullURL = imgPath?.startsWith("http") ? imgPath : `${baseURL}${imgPath}`;
                
                console.log('Image debug:', { imgPath, baseURL, fullURL });

                return (
                    <div style={{ 
                        width: "100px", 
                        height: "60px", 
                        borderRadius: "4px", 
                        padding: "2px",
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        {imgPath ? (
                            <img
                                src={fullURL}
                                alt="Team Member"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                }}
                                onError={(e) => {
                                    console.error('Image failed to load:', fullURL);
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = 'No Image';
                                }}
                                onLoad={() => {
                                    console.log('Image loaded successfully:', fullURL);
                                }}
                            />
                        ) : (
                            'No Image'
                        )}
                    </div>
                );
            }
        },
        {
            field: 'name',
            headerName: 'Team Member Name',
            width: 290,
        },
        {
            field: 'Role',
            headerName: 'Team Member Role',
            width: 290,
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 220,
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
                                background: 'linear-gradient(45deg, #0be574 30%, #10d856 90%)',
                            },
                        }}
                        onClick={() => TeamMemberUpdateHandler(params.row)}>
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
                                background: 'linear-gradient(45deg, #f22b3f 30%,#f22b3f 90%)',
                            },
                        }}
                        onClick={() => deleteTeamCardHandler(params.row)}>
                        Delete
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]

    const rows = teamCardDataApies && teamCardDataApies?.map((item_) => ({

        id: item_?._id,
        image: item_?.image,
        name: item_?.name,
        Role: item_?.role,
        allData: item_


    }))


    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[90vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setTeamMode("SubmitTeamForm")}
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

export default TeamTable