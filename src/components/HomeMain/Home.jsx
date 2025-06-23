import  { Fragment, useState } from 'react'
import Navbar from '../NavbarComponent/Navbar'
import HeroSection from '../PagesComp/HeroSection'
import Footer from '../FooterComp/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getHeaderData } from '../../Store/ApisStore/ApisCollection'
import Service from '../PagesComp/Service'
import Funfact from '../FunfactSection/FunfactUI/Funfact'
import { getServiceData } from '../../Store/ServiceSectionRedux/ApisSeriveCollaction'

function Home() {
    const [serviceCard, setServiceCard] = useState([])


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHeaderData())
        dispatch(getServiceData())

    }, [dispatch])


    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_)
    const funfactData = useSelector((state) => state.getSerivceSectionReducer_?.funfactSection?.FunfactBox)

    console.log("rohitRedux______", funfactData)

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

    // console.log("funfactData", funfactData)

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
            <Funfact funfactData={funfactData} />
        </Fragment>
    )
}

export default Home