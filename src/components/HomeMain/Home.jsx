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
import { FooterArrow } from '../IconeComp/Icone'
import PrincingSection from '../PrincingSection/pages/PrincingSection'

function Home() {
    const [serviceCard, setServiceCard] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [heroSectionData, setHeroSectionData] = useState([])
    const [funfactSectionData, setFunfactSectionData] = useState([])
    const [portFolioData, setPortFolioData] = useState([])

    console.log("funfactSectionData__________TT", portFolioData)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getHeaderData())
    //     dispatch(getServiceData())

    // }, [dispatch])


    // const headerToBarData = useSelector((state) => state.getHeaderDataReducer_)

    // const heroSection = useSelector((state) => state.getHeaderDataReducer_);
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


    const getServiceCardData = async (id) => {
        try {
            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-servcie-card/${id}`
                const fetchData = await fetch(url, {
                    method: "GET"
                })
                const responseJson = await fetchData.json()
                setServiceCard(responseJson?.data)
            } catch (error) {

                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getFunfactDataBy_ = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-funfact/funfact-get/${id}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            if (fetchData.ok) {
                setFunfactSectionData(responseJson.data)
            }
        } catch (error) {

            console.log(error)
        }
    }

    const getPortDataByID = async () => {
        const id = localStorage.getItem("user-ID")
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-portfolio/get-portfolio/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            const JsonData = await response.json();

            if (response.ok) {
                setPortFolioData(JsonData.data)
            }
            else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    };
    // useEffect(() => {

    // }, [portRefresh])

    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getHeaderDataBy_(id)
        getHeroDataBy_(id)
        getServiceCardData(id)
        getFunfactDataBy_(id)
        getPortDataByID()
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
            <Funfact funfactData={funfactSectionData} />
            <PortfolioSection
                portFolioData={portFolioData}
            />

            <PrincingSection />

        </Fragment>
    )
}

export default Home