import React from 'react'
import PrincingForm from './PrincingForm'
import { useState } from 'react'
import { toast } from 'react-toastify'
import PrincingTable from './PrincingTable'
import { Fragment } from 'react'
import { useEffect } from 'react'

function PrincingCustom() {
    const initialState = {
        heading: "",
        listItem: "",
        price: "",
        button: ""
    }
    const [princingData, setPrincingData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [princingMode, setPrincingMode] = useState("Table")
    const [princingGetApiesData, setPrincingGetApiesData] = useState([])
    const [id, setId] = useState()
    const [reFresh, setRefresh] = useState(false)



    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        setId(id)
    }, [])
    const postPrincingData = async () => {
        setLoading(true);

        const payload = {

            heading: princingData.heading,
            price: princingData.price,
            button: princingData.button,
            listItem: princingData.listItem
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '')
        };
        setSubmitted(true);

        if (
            !princingData.heading.trim() ||
            !princingData.listItem.trim() ||
            !princingData.price.trim() ||
            !princingData.button.trim()
        ) {
            return;
        }

        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}api-princing/api/princing/${id}`;
            const fetchData = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                toast.success(responseJson.message)
                alert("Succesfully")
                setPrincingData(initialState)

            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }


    const updatePrincing = async () => {
        const userId = localStorage.getItem("user-ID");
        const userDocID = princingData._id;

        const payload = {

            heading: princingData.heading,
            price: princingData.price,
            button: princingData.button,
            listItem: typeof princingData.listItem === 'string'
                ? princingData.listItem
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item !== '')
                : princingData.listItem
        };

        setSubmitted(true);
        if (
            !payload.heading.trim() ||
            typeof princingData.listItem === 'string' && !princingData.listItem.trim() ||
            !payload.price.trim() ||
            !payload.button.trim()
        ) {
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-princing/api-update/${userId}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (response.ok) {
                alert("Successfully updated!");
                console.log("Updated Data:", result);
            } else {
                console.error("Update failed:", result);
                alert("Update failed. Check console for details.");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };


    useEffect(() => {

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
        getPrincingData(id)
    }, [id, reFresh])




    return (
        <Fragment>
            {
                princingMode === "SubmitForm" || princingMode === "UpdateForm" ?
                    (
                        <PrincingForm
                            setPrincingData={setPrincingData}
                            princingData={princingData}
                            postPrincingData={postPrincingData}
                            loading={loading}
                            setLoading={setLoading}
                            submitted={submitted}
                            setPrincingMode={setPrincingMode}
                            princingMode={princingMode}
                            updatePrincing={updatePrincing}
                            initialState={initialState}
                        />
                    )
                    :
                    (
                        <PrincingTable
                            setPrincingMode={setPrincingMode}
                            princingGetApiesData={princingGetApiesData}
                            setRefresh={setRefresh}
                            princingMode={princingMode}
                            setPrincingData={setPrincingData}
                        />
                    )
            }

        </Fragment>
    )
}

export default PrincingCustom