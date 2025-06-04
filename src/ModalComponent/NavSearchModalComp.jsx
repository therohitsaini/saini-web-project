import { Box, Modal } from '@mui/material'
import React, { Fragment } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { AnimatedCard } from '../StyledComponents/StyledComp';

function NavSearchModalComp({ setSearchBarIsTrue, searchBarIsTrue }) {
    return (
        <Fragment>
            <Modal
                open={searchBarIsTrue}
                sx={{ height: screen, width: "100%", display: 'flex', alignItems: 'center', justifyContent: "center", }}

            >
                <Box sx={{ outline: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className='close-btn-section p-1 w-[700px] flex justify-end'>
                        <div onClick={() => setSearchBarIsTrue(!searchBarIsTrue)} className='h-10 w-10  flex justify-center items-center rounded-full hover:bg-white/20 bg-white/10 duration-500'>
                            <CloseIcon sx={{ fontSize: 30, color:'red'}} />
                        </div>
                    </div>
                    <AnimatedCard className='w-[500px] h-52 flex items-center  '>
                        <div className='w-full flex items-center bg-white rounded-md'>
                            <input className=' w-full p-2 font-semibold ml-2 outline-0' type='text' placeholder='Type to Search ...' />
                            <div className='h-10 w-12 bg-[#db3125] flex justify-center items-center m-1 rounded-md'>
                                <SearchIcon sx={{ fontSize: 25, color: "white" }} />
                            </div>
                        </div>
                    </AnimatedCard>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default NavSearchModalComp