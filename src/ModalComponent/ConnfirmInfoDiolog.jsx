// import React from 'react'

// function ConnfirmInfoDiolog() {
//     return (
//         <div>ConnfirmInfoDiolog</div>
//     )
// }

// export default ConnfirmInfoDiolog

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Fragment } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ConnfirmInfoDiolog({ isDilogTrue, setIsDilogeTrue, updateUserProfleHandler }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsDilogeTrue(false);
    };
    // const updateUserProfleHandler = () => {
    //     setIsDilogeTrue(false);

    // }

    return (
        <Fragment>

            <Dialog
                open={isDilogTrue}

                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Alert?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You Want To Update Your Profile Details
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={(e) => updateUserProfleHandler(e)} >Agree</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
export default ConnfirmInfoDiolog;