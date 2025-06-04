import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useEffect } from 'react';


function RolePermissionModal({ open, setOpen }) {

    const handleClose = () => setOpen(false);
    const [role, setRole] = useState("")
    const [permissions, setPermissions] = useState({

        Read: false,
        Create: false,
        Update: false,
        Delete: false,
        Post: false,

    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setPermissions(prev => ({
            ...prev,
            [name]: checked
        }));
    };


    const submiitHandler = async () => {

        const permissionArray = Object.entries(permissions).map(([key, value]) => ({
            [key]: value
        }));
        const payload = {
            role,
            permission: permissionArray
        }
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/post-permission/`;
            const fetch_ = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            const response = await fetch_.json()
            console.log(response)
            alert(JSON.stringify(response))
        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div>


            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
            >
                <Box
                    sx={{

                        height: "300px",
                        width: "500px",
                        bgcolor: "#272626",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 5,
                        flexDirection: "column",
                        borderRadius: 2

                    }}
                >
                    <div className=' w-full'>
                        <TextField sx={{
                            width: "100%"
                        }}
                            onChange={(e) => setRole(e.target.value)}
                            id="outlined-basic" label="Role Name" variant="outlined" />

                    </div>
                    <div className='permission-label  p-4 w-full'>
                        <label className='w-full'>Permissions</label>
                        <div >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Read"
                                        checked={permissions.Read}
                                        onChange={handleChange}
                                    />
                                }
                                label="Read"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Create"
                                        checked={permissions.Create}
                                        onChange={handleChange}
                                    />
                                }
                                label="Create"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Update"
                                        checked={permissions.Update}
                                        onChange={handleChange}
                                    />
                                }
                                label="Update"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Delete"
                                        checked={permissions.Delete}
                                        onChange={handleChange}
                                    />
                                }
                                label="Delete"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Post"
                                        checked={permissions.Post}
                                        onChange={handleChange}
                                    />
                                }
                                label="Post"
                            />
                        </div>


                        <Button sx={{ width: "100%", mt: 1 }} variant='contained' onClick={submiitHandler}>Submit</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default RolePermissionModal