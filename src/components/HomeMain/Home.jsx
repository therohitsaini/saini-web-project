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


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHeaderData())
        dispatch(getServiceData())

    }, [dispatch])


    // const headerToBarData = useSelector((state) => state.getHeaderDataReducer_)

    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);
    // const funfactData = useSelector((state) => state.getSerivceSectionReducer_?.funfactSection?.FunfactBox)




    const getHeaderDataBy_ = async () => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-header-data/${"683e90debc43f5b825e98d4a"}`
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


    useEffect(() => {
        getHeaderDataBy_()
    }, [])

    console.log("headerData", headerData.headerTopBar)

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



    return (
        <Fragment>

            <Navbar headerData={headerData} />
            <HeroSection info={headerToBarData} />
            <Service serviceCard={serviceCard} />
            {/* <Funfact funfactData={funfactData} /> */}
            <PortfolioSection />
        </Fragment>
    )
}

export default Home