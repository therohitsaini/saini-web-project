import React from 'react'
import { Fragment } from 'react'
import FeatureListForm from './CustomePage/FeatureListForm'
import { useState } from 'react'
import CustomTable from './CustomePage/CustomTable'
import { useEffect } from 'react'
import { showErrorToast, showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable'
import { ToastContainer } from 'react-toastify'

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
    const [loading, setLoading] = useState(false)

    const postListitemFeature = async () => {
        const id = localStorage.getItem("user-ID");
        if (!featureListForm.listTitle) {
            showErrorToast("Title is Required !")
            return
        }
        const formData = new FormData();
        if (featureListForm.backGroundImage) {
            formData.append("backGroundImage", featureListForm.backGroundImage);
        }

        formData.append("listTitle", featureListForm.listTitle);
        formData.append("listIconeLeft", featureListForm.listIconeLeft);
        formData.append("listIconeRight", featureListForm.listIconeRight);
        formData.append("item_ShowOnWebsite", featureListForm.item_ShowOnWebsite); // if you need this
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-post-list-item/${id}`;
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                showSuccessToast(result.message);
            } else {
                showErrorToast(result.message || result.error)
                console.error("Server error:", result.message || result.error);
            }
        } catch (error) {
            console.error("Request failed:", error);
        } finally {
            setLoading(false)
        }
    };

    // update docs
    const updateListitemFeature = async () => {
        const id = localStorage.getItem("user-ID");
        const userDocID = featureListForm.userDocID
        if (!userDocID) {
            showErrorToast("Try Again !")
            return
        }
        if (!featureListForm.listTitle) {
            showErrorToast("Title is Required !")
            return
        }

        const formData = new FormData();
        if (featureListForm.backGroundImage) {
            formData.append("backGroundImage", featureListForm.backGroundImage);
        }

        formData.append("listTitle", featureListForm.listTitle);
        formData.append("listIconeLeft", featureListForm.listIconeLeft);
        formData.append("listIconeRight", featureListForm.listIconeRight);
        formData.append("item_ShowOnWebsite", featureListForm.item_ShowOnWebsite); // if you need this
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-update/feature-list-item/${id}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                showSuccessToast(result.message)
                // showSnackbar(result.message);
            } else {
                showErrorToast(result.message || result.error)
                console.error("Server error:", result.message || result.error);
            }
        } catch (error) {
            console.error("Request failed:", error);
        } finally {
            setLoading(false)
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

    return (
        <Fragment>
            <ToastContainer />

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
                            inisialState={inisialState}
                            loading={loading}
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