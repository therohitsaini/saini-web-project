import { Button, CircularProgress, IconButton, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Fragment } from 'react'

function BlogTable({ blogData, showSnackbar, loadingRowId, setLoadingRowId, setBlogMode, setBlogFormData }) {


    const deleteBlogHandler = async (data = {}) => {

        const userId = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        // setLoadingRowId(data.id);
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}api-blog/api-delete-blog/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: userId })
            });
            const response = await fetchData.json();

            if (fetchData.ok) {
                showSnackbar(response.message)
                // setPortRefresh(prev => !prev);
            }

        } catch (error) {
            // setLoadingRowId(null);
            console.error(error);
        }
    }

    const updateBlogHandler_ = () => {


    }
    const updateBlogHandler = async (data = {}) => {
        const id = localStorage.getItem("user-ID")
        const docsId = data.id

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-blog/api-get-chlid-docs/${id}/${docsId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            const JsonData = await response.json();
            console.log("JsonData", JsonData)
            if (response.ok) {
                const { blogerImage, goIcone, blogDatePicker, blogerRoleIocne, blogerRole, blogHeading, blogDescription, blogButton, _id } = JsonData.data
                setBlogFormData((pre) => ({
                    ...pre,
                    userDocID: _id,
                    blogerImage,
                    goIcone,
                    blogDatePicker,
                    blogerRoleIocne,
                    blogerRole,
                    blogHeading,
                    blogDescription,
                    blogButton

                }))
                setBlogMode("UpdateBlogForm")
            }
            else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    }


    const columns = [
        {
            field: 'blogImage',
            headerName: 'Image',
            width: 370,
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
            field: 'title',
            headerName: 'Title',
            width: 370,
        },
        {
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
                        onClick={() => updateBlogHandler(params.row)}
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
                        onClick={() => deleteBlogHandler(params.row)}
                    >
                        {loadingRowId === "" ? (
                            <CircularProgress size={16} sx={{ color: "#fff" }} />
                        ) : (
                            "Delete"
                        )}
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]
    const rows = blogData?.map((item_) => ({
        id: item_._id,
        blogImage: item_.blogerImage,
        title: item_.blogHeading,
        // subTitle: item_.inFoDescription,

    }))

    const paginationModel = { page: 0, pageSize: 20 };
    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[78vh] flex flex-col justify-center gap-5'>

                <div>
                    <Button
                        onClick={() => setBlogMode("SubmitBlogForm")}
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

export default BlogTable