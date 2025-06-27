import { Fragment, useState } from 'react'
import Navbar from '../NavbarComponent/Navbar'
import HeroSection from '../PagesComp/HeroSection'
import Footer from '../FooterComp/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getHeaderData } from '../../Store/ApisStore/ApisCollection'
import Service from '../PagesComp/Service'
import Funfact from '../FunfactSection/FunfactUI/Funfact'
import { getServiceData } from '../../Store/ServiceSectionRedux/ApisSeriveCollaction'
import PortfolioSection from '../PagesComp/Portfolio'

function Home() {
    const [serviceCard, setServiceCard] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [heroSectionData, setHeroSectionData] = useState([])

    console.log("heroSectionData", heroSectionData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHeaderData())
        dispatch(getServiceData())

    }, [dispatch])


    // const headerToBarData = useSelector((state) => state.getHeaderDataReducer_)

    const heroSection = useSelector((state) => state.getHeaderDataReducer_);
    const funfactData = useSelector((state) => state.getSerivceSectionReducer_?.funfactSection?.FunfactBox)

    useEffect(() => {

    }, [])


    const getHeaderDataBy_ = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-header-data/${id}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            if (fetchData.ok) {
                setHeaderData(responseJson.userData)
            }
        } catch (error) {

            console.log(error)
        }
    }

    const getHeroDataBy_ = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-hero-data/${id}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            if (fetchData.ok) {
                setHeroSectionData(responseJson.data)
            }
        } catch (error) {

            console.log(error)
        }
    }


    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getHeaderDataBy_(id)
        getHeroDataBy_(id)
    }, [])



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

    useEffect(() => {
        getServiceCardData()
    }, [])

    // console.log("heroSection___Rohit", heroSection)

    return (
        <Fragment>
            <div className='nav-hero-conrainer relative' >
                <div className='nav-main absolute z-50 w-full'>
                    <Navbar headerData={headerData} />
                </div>
                <HeroSection info={heroSectionData} />
            </div>
            <Service serviceCard={serviceCard} />
            <Funfact funfactData={funfactData} />
            <PortfolioSection />
        </Fragment>
    )
}

export default Home