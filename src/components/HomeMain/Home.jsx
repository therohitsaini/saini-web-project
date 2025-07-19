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
import TestimonialSection from '../Testimonial/Pages/TestimonialSection'
import styled, { keyframes } from "styled-components";
import { useRef } from 'react'
import TeamSection from '../TeamComponent/pagesTeam/TeamSection'
import BlogSection from '../BlogComponent/BlogSection/BlogSection'
import FeatureSection from '../Featuresection/pages/FeatureSection'




const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionWrapper = styled.div`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView }) => (inView ? "translateY(0)" : "translateY(60px)")};
  animation: ${({ inView }) => (inView ? fadeInUp : "none")} 0.6s ease forwards;
  transition: opacity 0.5s, transform 0.5s;
`;


function Home() {
    const [serviceCard, setServiceCard] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [heroSectionData, setHeroSectionData] = useState([])
    const [funfactSectionData, setFunfactSectionData] = useState([])
    const [portFolioData, setPortFolioData] = useState([])
    const [princingGetApiesData, setPrincingGetApiesData] = useState([])
    const [testimonialApiesDataUI, setTestimonialApiesDataUI] = useState([])
    const [teamApiesDataUi, setTeamApiesDataUi] = useState([])
    const [teamHeading, setTeamHeading] = useState([])
    const [blogApiesData, setBlogApiesData] = useState([])
    const [footerData, setFooterData] = useState([])
    const [featureHeadlineApies, setFeatureHeadlineApies] = useState([])
    const [featureListItemApies, setFeatureListItemApies] = useState([])
    const [sectionHeadingApies, setSectionHeadingApies] = useState([])
    const dispatch = useDispatch()

    const funfactData = useSelector((state) => state.getSerivceSectionReducer_?.funfactSection?.FunfactBox)
    console.log("footerData", footerData)
    const sectionRef = useRef();
    const [inView, setInView] = useState(false);
    const lastScrollY = useRef(0);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentY = window.scrollY;
                const isScrollingDown = currentY > lastScrollY.current;

                if (entry.isIntersecting && isScrollingDown) {
                    setInView(true);
                }

                lastScrollY.current = currentY;
            },
            { threshold: 0.2 }
        );

        const element = sectionRef.current;
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);


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



    const getPrincingData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-princing/api-get/princing/${id}`
            const fatchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const jsonResponse = await fatchData.json()
            if (fatchData.ok) {
                setPrincingGetApiesData(jsonResponse.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTestmonialDataByID = async (id) => {

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/testimonial/get-testimonial/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            const JsonData = await response.json();

            if (response.ok) {
                setTestimonialApiesDataUI(JsonData.data)
            }
            else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    };

    const getTeamCardData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-team/api-get-team-card/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            const JsonData = await response.json();

            if (response.ok) {
                setTeamApiesDataUi(JsonData.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTeamHeadingData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-team/api-get/team-heading/${id}`;
            const response = await fetch(url, { method: "GET" });
            const json = await response.json();

            if (response.ok) {
                setTeamHeading(json.data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    const getBlogData = async (id) => {
        try {
            const resposne = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-blog/api-get-blog/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const result = await resposne.json()
            if (resposne.ok) {
                setBlogApiesData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getFooterData = async (id) => {
        try {
            const resposne = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-footer/footer-all-data/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const result = await resposne.json()
            if (resposne.ok) {
                setFooterData(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getFeatureData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-get/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });


            const JsonData = await response.json();

            if (response.ok) {
                setFeatureHeadlineApies(JsonData.data)
            }
            else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    };

    const getFeatureDataListItem = async () => {
        const id = localStorage.getItem("user-ID")
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-get-list-item/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });
            const JsonData = await response.json();
            console.log("list", JsonData.data)
            if (response.ok) {
                setFeatureListItemApies(JsonData.data)
            }
            else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    };
    const getServiceHeading = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-heading/api-get-heading-top/${id}`;
            const fetchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })
            const responseJson = await fetchData.json();
            if (fetchData.ok) {
                setSectionHeadingApies(responseJson)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getHeaderDataBy_(id)
        getHeroDataBy_(id)
        getServiceCardData(id)
        getFunfactDataBy_(id)
        getPortDataByID()
        getPrincingData(id)
        getTestmonialDataByID(id)
        getTeamCardData(id)
        getTeamHeadingData(id)
        getBlogData(id)
        getFooterData(id)
        getFeatureData(id)
        getFeatureDataListItem(id)
        getServiceHeading(id)
    }, [])

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    return (
        <Fragment>
            <div className='nav-hero-conrainer relative' >
                <div className='nav-main absolute z-50 w-full'>
                    <Navbar
                        headerData={headerData} />
                </div>
                <HeroSection
                    info={heroSectionData} />
            </div>
            <Service
                serviceCard={serviceCard}
                sectionHeadingApies={sectionHeadingApies}
            />

            <Funfact
                funfactData={funfactSectionData} />
            <PortfolioSection
                portFolioData={portFolioData}
                sectionHeadingApies={sectionHeadingApies}
            />
            <PrincingSection
                princingGetApiesData={princingGetApiesData}
                sectionHeadingApies={sectionHeadingApies}
            />
            <TestimonialSection
                testimonialApiesDataUI={testimonialApiesDataUI}
                sectionHeadingApies={sectionHeadingApies}
            />
            <FeatureSection
                featureHeadlineApies={featureHeadlineApies}
                featureListItemApies={featureListItemApies}
            />
            <TeamSection
                teamApiesDataUi={teamApiesDataUi}
                teamHeading={teamHeading}
            />

            <BlogSection
                blogApiesData={blogApiesData}
            />
            <Footer
                footerData={footerData}
            />

        </Fragment>
    )
}

export default Home