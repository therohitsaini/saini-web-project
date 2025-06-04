import React, { Fragment } from 'react'
import ReactTostError from '../ReactToast/ReactTostError'
import DeshFormet from '../DashbordFormet/DashbordMenu'
import Navbar from '../NavbarComponent/Navbar'
import HeroSection from '../PagesComp/HeroSection'

function Home() {
    return (
        <Fragment>
            <Navbar />
            <HeroSection />

        </Fragment>
    )
}

export default Home