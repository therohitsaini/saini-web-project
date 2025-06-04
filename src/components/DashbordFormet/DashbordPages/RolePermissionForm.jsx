import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react'
import { Fragment } from 'react'

function RolePermissionForm() {
    return (
        <Fragment>
            <div className='h-screen w-full flex justify-center'>
                <div className='permission-label  p-4 w-full'>
                    <label className='w-full'>Permissions</label>
                    <FormGroup sx={{ display: 'flex', }}>
                        {/* <input type='checkbox'
                                name='create'
                                // name='check'
                                checked={checkBoxValue.create}
                                onChange={(event) => checkHandler(event)}
                                placeholder='Enter full name'
                                className='border bg-gradient-to-r from-cyan-100 to-blue-100 border-purple-900 p-2 rounded-md'>
                            </input> */}
                        <div>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Create" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Read" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Edit" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Delete" />
                        </div>
                    </FormGroup>
                </div>
            </div>
        </Fragment>
    )
}

export default RolePermissionForm;