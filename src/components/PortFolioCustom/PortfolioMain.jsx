import { Divider, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import PortfolioForm from './Pages/PortfolioForm'
import { useState } from 'react'
import { useEffect } from 'react'
import PortfolioTable from './Pages/PortfolioTable'

function PortfolioMain() {
  const [portFolioData, setPortFolioData] = useState([])
  const [portFormData, setPortFormData] = useState({
    title: '',
    subTitle: '',
    Icone: '',
    categories: "",
    item_IconeUrl: '',
    userImage: "",
    item_ShowOnWebsite: false,
  });

  const [userID, setUserID] = useState("")
  const [portMode, setPortMode] = useState("Table")
  const [portRefresh, setPortRefresh] = useState()
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const id = localStorage.getItem("user-ID")
    setUserID(id)
  }, [])



  const submitPortHandler = async () => {
    const formData = new FormData();
    if (portFormData.userImage) {
      formData.append("userImage", portFormData.userImage);
    }

    formData.append("title", portFormData.title);
    formData.append("subTitle", portFormData.subTitle);
    formData.append("Icone", portFormData.Icone);
    formData.append("item_IconeUrl", portFormData.item_IconeUrl);
    formData.append("item_ShowOnWebsite", portFormData.item_ShowOnWebsite);
    formData.append("categories", JSON.stringify(portFormData.categories));
    setSubmitted(true)
    if (!portFormData.title.trim()) {
      return; // prevent form submit
    }

    try {
      const url = `${import.meta.env.VITE_BACK_END_URL}api-portfolio/portfolio/api/${userID}`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Successfully submitted.");
        setPortRefresh((ref) => !ref)
      } else {
        console.error("Error response:", result);
        alert("Failed to update portfolio section.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  console.log("portFolioData", portFolioData)

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
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  };
  useEffect(() => {
    getPortDataByID()
  }, [portRefresh])


  const updatePortHandler = async () => {
    const userId = localStorage.getItem("user-ID");
    const userDocID = portFormData.userDocID;

    if (!userId || !userDocID) {
      alert("Missing user ID or document ID.");
      return;
    }

    const formData = new FormData();
    if (portFormData.userImage instanceof File) {
      formData.append("userImage", portFormData.userImage);
    }

    formData.append("title", portFormData.title || "");
    formData.append("subTitle", portFormData.subTitle || "");
    formData.append("Icone", portFormData.Icone || "");
    formData.append("item_IconeUrl", portFormData.item_IconeUrl || "");
    formData.append("item_ShowOnWebsite", portFormData.item_ShowOnWebsite || "");
    formData.append("categories", JSON.stringify(portFormData.categories) || "");
    setSubmitted(true)
    if (!portFormData.title.trim()) {
      return; // prevent form submit
    }

    try {
      const url = `${import.meta.env.VITE_BACK_END_URL}api-portfolio/update-port-folio/${userId}/${userDocID}`;
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Successfully submitted.");
        setPortRefresh((ref) => !ref)
      } else {
        console.error("Error response:", result);
        alert("Failed to update portfolio section.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <Fragment>
      {portMode === "PortForm" || portMode === "UpdateForm" ? (
        <PortfolioForm
          // setPortFolioData={setPortFolioData}
          // portFolioData={portFolioData}
          setPortFormData={setPortFormData}
          portFormData={portFormData}
          submitPortHandler={submitPortHandler}
          setPortMode={setPortMode}
          portMode={portMode}
          submitted={submitted}
          updatePortHandler={updatePortHandler}

        />
      ) :

        (
          <PortfolioTable
            setPortMode={setPortMode}
            portFolioData={portFolioData}
            setPortRefresh={setPortRefresh}
            setPortFormData={setPortFormData}

          />
        )
      }
    </Fragment>
  )
}

export default PortfolioMain