import React, { Fragment, useState } from 'react'
import ReactTostError from '../ReactToast/ReactTostError'
import DeshFormet from '../DashbordFormet/DashbordMenu'
import Navbar from '../NavbarComponent/Navbar'
import HeroSection from '../PagesComp/HeroSection'
import Footer from '../FooterComp/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getHeaderData } from '../../Store/ApisStore/ApisCollection'
import Loader from '../CurculeLoader/Loader'

function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHeaderData())
    }, [dispatch])


    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_)




    return (
        <Fragment>

            <Navbar data={headerToBarData} />
            <HeroSection info={headerToBarData} />
            {/* <Footer /> */}
        </Fragment>
    )
}

export default Home