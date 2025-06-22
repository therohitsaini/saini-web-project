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
import Service from '../PagesComp/Service'
import Funfact from '../FunfactSection/FunfactUI/Funfact'

function Home() {
    const [serviceCard, setServiceCard] = useState([])


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHeaderData())
    }, [dispatch])


    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_)


    const getServiceCardData = async () => {
        try {
            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-servcie-card/683e90debc43f5b825e98d4a`
                const fetchData = await fetch(url, {
                    method: "GET"
                })
                const responseJson = await fetchData.json()
                setServiceCard(responseJson?.dat)
            } catch (error) {

                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    // const getHeroData = async () => {
    //     try {
    //         try {
    //             const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-hero-data/683e90debc43f5b825e98d4a`
    //             const fetchData = await fetch(url, {
    //                 method: "GET"
    //             })
    //             const responseJson = await fetchData.json()
    //             setHeroSection(responseJson?.data)
    //         } catch (error) {

    //             console.log(error)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        getServiceCardData()
    }, [])

    // console.log("serviceCard", headerToBarData.headerData.HeroSection)
    // const HeroData = headerToBarData.headerData.HeroSection

    return (
        <Fragment>

            <Navbar data={headerToBarData} />
            <HeroSection info={headerToBarData} />
            <Service serviceCard={serviceCard} />
            <Funfact />
        </Fragment>
    )
}

export default Home