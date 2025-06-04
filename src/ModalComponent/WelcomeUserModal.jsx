import { Box, Button, Modal, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { Fragment, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatedCard } from '../StyledComponents/StyledComp';



function WelcomeUserModal({ modalIsTure, setModalIsTrue,userDetails }) {

    return (
        <Fragment>
            <Modal
                open={userDetails || modalIsTure}

            >
                <div className='h-screen  flex justify-center items-center  outline-0'>
                    <AnimatedCard>
                        <div className='h-70 w-[450px] bg-gray-700 bg-blend-darken rounded-md p-2 '>
                            <div className='handler    flex justify-end '> <Icon onClick={() => setModalIsTrue(!modalIsTure)} fontSize={40} icon={"line-md:close-circle"} /> </div>

                        </div>
                    </AnimatedCard>
                </div>
            </Modal>
        </Fragment>
    )
}

export default WelcomeUserModal;