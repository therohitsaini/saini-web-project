import {
    Button,
    Checkbox,
    Divider,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSnackbar } from '../../../Snakbar/Snakbar';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import GradientButton from '../../../ReuseComponent/ReuseComponent';


function FunfactTable() {
    const [funfactMode, setFunfactMode] = useState("Tabel");
    const [funfactForm, setFunfactForm] = useState({ projectCount: "", aboutProject: "" });
    const [funfactData, setFunfactData] = useState([]);
    const [funfactRefresh, setFunfactRefesh] = useState();
    const [deletingId, setDeletingId] = useState(null);

    const snackbar = useSnackbar();
    if (!snackbar) throw new Error("useSnackbar must be used within a SnackbarProvider");
    const { showSnackbar, showError } = snackbar;

    useEffect(() => {
        if (funfactMode === "FunfactForm" || funfactMode === "Tabel") {
            setFunfactForm({ projectCount: "", aboutProject: "" });
        }
    }, [funfactMode]);

    const funfactonChangeHandler = (e) => {
        const { name, value } = e.target;
        setFunfactForm(prev => ({ ...prev, [name]: value }));
    };

    const funFactHandler = async () => {
        const { projectCount, aboutProject } = funfactForm

        if (!projectCount) {
            showError("Project Count is Required !")
            return
        }
        if (!aboutProject) {
            showError("About Project is Required !")
            return
        }

        const id = localStorage.getItem("user-ID");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-section/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funfactForm)
            });
            const json = await res.json();
            if (res.ok) {
                showSnackbar(json.message);
                setFunfactForm({ projectCount: "", aboutProject: "" });
                setFunfactRefesh(prev => !prev);
            }
        } catch (err) {
            showError("Try After Some Time !")
            console.log("Internal Error", err);
        }
    };

    const funFactHandlerUpdate = async () => {

        const { projectCount, aboutProject } = funfactForm
        if (!projectCount) {
            showError("Project Count is Required !")
            return
        }
        if (!aboutProject) {
            showError("About Project is Required !")
            return
        }

        const userId = localStorage.getItem("user-ID");
        const userDocID = funfactForm.userDocId;
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-funfact/update/funfact/${userId}/${userDocID}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funfactForm)
            });
            const json = await res.json();
            if (res.ok) {
                showSnackbar(json.message);
                setFunfactRefesh(prev => !prev);
            } else {
                alert("Update failed.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getFunfactDataBy_ = async () => {
        const id = localStorage.getItem("user-ID");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-get/${id}`);
            const json = await res.json();
            if (res.ok) setFunfactData(json.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFunfactDataBy_();
    }, [funfactRefresh]);

    const handleActionClick = (data) => {
        setFunfactForm({
            userDocId: data.id,
            projectCount: data.funfact,
            aboutProject: data.paragraph
        });
        setFunfactMode("Edit");
    };

    const handleActionClickDelete = async (data = {}) => {
        const pageId = localStorage.getItem("user-ID");
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        setDeletingId(data.id);

        setTimeout(async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-delete/`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: data.id, pageId })
                });
                const json = await res.json();
                if (res.ok) {
                    showSnackbar(json.message);
                    setFunfactRefesh(prev => !prev);
                }
            } catch (err) {
                showError("Try After Some Time ")
                console.error(err);
            } finally {
                setDeletingId(null);
            }
        }, 300);
    };

    const columns = [
        { field: 'funfact', headerName: 'Funfact Count', width: 330 },
        { field: 'paragraph', headerName: 'Paragraph', width: 430 },
        {
            field: 'action',
            headerName: 'Action',
            width: 320,
            renderCell: (params) => (
                <div className='flex gap-1 items-center'>
                    <IconButton
                        sx={{
                            background: "green",
                            color: '#fff',
                            height: "27px",
                            width: "70px",
                            borderRadius: 2,
                            fontSize: 10,
                            boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #14d240 30%, #14dc78 90%)',
                            },
                        }}
                        onClick={() => handleActionClick(params.row)}>
                        Edit
                    </IconButton>
                    <IconButton
                        sx={{
                            background: "red",
                            color: '#fff',
                            height: "27px",
                            width: "70px",
                            borderRadius: 2,
                            fontSize: 10,
                            boxShadow: '0 3px 5px 2px rgba(7, 7, 7, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #cf0d0d 30%, #e61010 90%)',
                            },
                        }}
                        onClick={() => handleActionClickDelete(params.row)}>
                        Delete
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    const rows = Array.isArray(funfactData)
        ? funfactData.map(item => ({
            id: item._id,
            funfact: item.projectCount,
            paragraph: item.aboutProject,
        }))
        : [];

    const paginationModel = { page: 0, pageSize: 5 };





    return (
        <Fragment>
            <div className='hero-tabel-main w-full h-[80vh] flex flex-col justify-center items-center gap-5'>
                {
                    funfactMode === "FunfactForm" || funfactMode === "Edit" ? (
                        <div className='funfact-mian w-full flex flex-col items-center gap-30'>
                            <div className='w-[80%] flex justify-items-start'>
                                <Button onClick={() => setFunfactMode("Tabel")} sx={{ px: 4, display: "flex", gap: 1 }} variant='outlined'>
                                    <KeyboardBackspaceIcon /> Back
                                </Button>
                            </div>
                            <form className='form-main flex flex-col gap-4 w-[50%] py-5 border border-slate-600/30 rounded-md p-5'>
                                <h1  className=' text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Funfact Section Form</h1>
                                <Divider />
                                <TextField
                                    type='number'
                                    name='projectCount'
                                    value={funfactForm.projectCount}
                                    size='small'
                                    label="Total Project"
                                    onChange={funfactonChangeHandler}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '12px',
                                            '& input': {
                                                fontSize: '14px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'blue',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'blue',
                                            },
                                        },
                                        '& label': {
                                            color: 'gray',
                                            fontSize: '14px',
                                        },
                                        '& label.Mui-focused': {
                                            color: 'white',
                                        }
                                    }}
                                />
                                <TextField
                                    name='aboutProject'
                                    value={funfactForm.aboutProject}
                                    size='small'
                                    label="About Project"
                                    onChange={funfactonChangeHandler}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '12px',
                                            '& input': {
                                                fontSize: '14px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'blue',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'blue',
                                            },
                                        },
                                        '& label': {
                                            color: 'gray',
                                            fontSize: '14px',
                                        },
                                        '& label.Mui-focused': {
                                            color: 'white',
                                        }
                                    }}
                                />
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={true}
                                        // onChange={(e) =>
                                        //     setFormData((prev) => ({
                                        //         ...prev,
                                        //         item_ShowOnWebsite: e.target.checked,
                                        //     }))
                                        // }
                                        sx={{ m: 0, p: 0 }}
                                        size="small"
                                        color='default'
                                    />
                                    <p className="text-[14px] text-slate-500">
                                        If you want to show this on the website
                                    </p>
                                </div>
                                <div className='flex justify-end'>
                                    {
                                        funfactMode === "Edit" ? (
                                            <GradientButton onClick={funFactHandlerUpdate}>Update Document</GradientButton>
                                        ) : (
                                            <GradientButton onClick={funFactHandler}>Save Document</GradientButton>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className='w-full px-10'>
                            <div className='flex justify-between items-center  mb-5 rounded-md'>
                                <Button sx={{
                                    px: 8
                                }} onClick={() => setFunfactMode("FunfactForm")} variant="outlined">+Add More</Button>
                                {/* <div className='flex gap-2'>
                                    <Button onClick={handlePrint} variant='outlined'> <PrintIcon /> </Button>
                                    <Button onClick={downloadCSV} variant='outlined'> <DownloadIcon /> </Button>
                                </div> */}
                            </div>
                            <Paper sx={{ height: 400, display: "flex", justifyContent: "center" }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                    getRowClassName={(params) =>
                                        params.id === deletingId ? 'row-deleting' : ''
                                    }
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
                        </div>
                    )
                }
            </div>
        </Fragment>
    );
}

export default FunfactTable;
