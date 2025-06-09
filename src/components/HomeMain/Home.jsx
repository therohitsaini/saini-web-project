import React, { Fragment } from 'react'
import ReactTostError from '../ReactToast/ReactTostError'
import DeshFormet from '../DashbordFormet/DashbordMenu'
import Navbar from '../NavbarComponent/Navbar'
import HeroSection from '../PagesComp/HeroSection'
import Footer from '../FooterComp/Footer'

function Home() {
    return (
        <Fragment>
            <Navbar />
            <HeroSection />
            <Footer />
        </Fragment>
    )
}

export default Home