import React from 'react'
import { Fragment } from 'react'
import FeatureListForm from './CustomePage/FeatureListForm'
import { useState } from 'react'
import CustomTable from './CustomePage/CustomTable'
import { useEffect } from 'react'

function FeatureListItem({ showSnackbar }) {
    const inisialState = {
        listIconeLeft: "",
        listTitle: "",
        listIconeRight: "",
        backGroundImage: ""
    }

    const [featureListForm, setFeatureListForm] = useState(inisialState)
    const [freatureMode, setFeatureMode] = useState("Table")
    const [featureListItem, setFeatureListItem] = useState([])

    const postListitemFeature = async () => {
        const id = localStorage.getItem("user-ID");

        const formData = new FormData();
        if (featureListForm.backGroundImage) {
            formData.append("backGroundImage", featureListForm.backGroundImage);
        }

        formData.append("listTitle", featureListForm.listTitle);
        formData.append("listIconeLeft", featureListForm.listIconeLeft);
        formData.append("listIconeRight", featureListForm.listIconeRight);
        formData.append("item_ShowOnWebsite", featureListForm.item_ShowOnWebsite); // if you need this

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-post-list-item/${id}`;
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                showSnackbar(result.message);
            } else {
                console.error("Server error:", result.message || result.error);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    // update docs
    const updateListitemFeature = async () => {
        const userId = localStorage.getItem("user-ID");
        const userDocID = featureListForm.userDocID

        const formData = new FormData();
        if (featureListForm.backGroundImage) {
            formData.append("backGroundImage", featureListForm.backGroundImage);
        }

        formData.append("listTitle", featureListForm.listTitle);
        formData.append("listIconeLeft", featureListForm.listIconeLeft);
        formData.append("listIconeRight", featureListForm.listIconeRight);
        formData.append("item_ShowOnWebsite", featureListForm.item_ShowOnWebsite); // if you need this

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-update/feature-list-item/${userId}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                showSnackbar(result.message);
            } else {
                console.error("Server error:", result.message || result.error);
            }
        } catch (error) {
            console.error("Request failed:", error);
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

            if (response.ok) {
                setFeatureListItem(JsonData.data)
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
        getFeatureDataListItem()
    }, [])

    console.log("featureListItem", featureListItem)

    return (
        <Fragment>

            {
                freatureMode === "SubmitForm" || freatureMode === "UpdateForm" ?
                    (
                        <FeatureListForm
                            featureListForm={featureListForm}
                            setFeatureListForm={setFeatureListForm}
                            postListitemFeature={postListitemFeature}
                            freatureMode={freatureMode}
                            setFeatureMode={setFeatureMode}
                            updateListitemFeature={updateListitemFeature}
                        />
                    )
                    :
                    (
                        <CustomTable
                            setFeatureMode={setFeatureMode}
                            featureListItem={featureListItem}
                            showSnackbar={showSnackbar}
                            setFeatureListForm={setFeatureListForm}
                        />
                    )
            }
        </Fragment>
    )
}

export default FeatureListItem