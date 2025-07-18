import React from 'react'
import { Fragment } from 'react'
import TestimonialForm from './TestimonialForm'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSnackbar } from '../Snakbar/Snakbar'
import TestimonialTable from './TestimonialTable'
import { showErrorToast } from '../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable'
import { ToastContainer } from 'react-toastify'

function TestimonialCustome() {
    const [testimonialMode, setTestimonialMode] = useState("Table")
    const [loading, setLoading] = useState(false)
    const inisialState = {
        heading: "",
        paragraph: "",
        userName: "",
        occupationRole: "",
        userProfile: ""
    }
    const [testimonialForm, setTestimonialForm] = useState(inisialState)
    const [submitted, setSubmitted] = useState(false);
    const [id, setId] = useState()
    const [reFresh, setRefresh] = useState(false)
    const [testimonialApiesData, setTestimonialApiesData] = useState([])


    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        setId(id)
    }, [])

    const snackbar = useSnackbar();
    if (!snackbar) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    // const { showSnackbar, showErrorToast } = snackbar;/

    const postTestimonialForm = async () => {


        const { userProfile, heading, paragraph, userName, occupationRole } = testimonialForm;

        if (!userProfile) {
            showErrorToast("User Image is Required !")
            return;
        }
        if (!heading) {
            showErrorToast("Title is Required !")
            return;
        }
        if (!userName) {
            showErrorToast("Name is Required !")
            return;
        }
        if (!occupationRole) {
            showErrorToast("Role is Required !")
            return;
        }
        setLoading(true)

        const formData = new FormData()

        if (testimonialForm.userProfile) {
            formData.append("userProfile", testimonialForm.userProfile)
        }

        formData.append("heading", testimonialForm.heading);
        formData.append("paragraph", testimonialForm.paragraph);
        formData.append("userName", testimonialForm.userName);
        formData.append("occupationRole", testimonialForm.occupationRole);


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/testimonial/api/testimonial/${id}`;
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setLoading(false)
                showSuccessToast(result.message)
                setTestimonialForm(inisialState)
                setRefresh((ref) => !ref)

            }
        } catch (error) {
            showErrorToast("Try After Some Time")
            console.error("Network error:", error);
            alert("Something went wrong. Please try again.");
        }

    }

    // update docs
    const updateTestimonialForm = async () => {
        const { userProfile, heading, paragraph, userName, occupationRole } = testimonialForm;

        if (!userProfile) {
            showErrorToast("User Image is Required !")
            return;
        }
        if (!heading) {
            showErrorToast("Title is Required !")
            return;
        }
        if (!userName) {
            showErrorToast("Name is Required !")
            return;
        }
        if (!occupationRole) {
            showErrorToast("Role is Required !")
            return;
        }
        const userDocID = testimonialForm.userDocID
        setLoading(true)

        const formData = new FormData()

        if (testimonialForm.userProfile) {
            formData.append("userImage", testimonialForm.userProfile)
        }

        formData.append("heading", testimonialForm.heading);
        formData.append("paragraph", testimonialForm.paragraph);
        formData.append("userName", testimonialForm.userName);
        formData.append("occupationRole", testimonialForm.occupationRole);


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/testimonial/api-update/${id}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setLoading(false)
                showSuccessToast(result.message)

                // setRefresh((ref) => !ref)
            }
        } catch (error) {
            // showErrorToast("Try After Some Time")
            console.error("Network error:", error);
            // alert("Something went wrong. Please try again.");
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
                setTestimonialApiesData(JsonData.data)
            }
            else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    };
    useEffect(() => {
        getTestmonialDataByID(id)
    }, [id, reFresh])



    return (
        <Fragment>
            <ToastContainer />

            {
                testimonialMode === "SubmitForm" || testimonialMode === "UpdateForm"
                    ?
                    (
                        <TestimonialForm

                            testimonialMode={testimonialMode}
                            setTestimonialMode={setTestimonialMode}
                            loading={loading}
                            testimonialForm={testimonialForm}
                            setTestimonialForm={setTestimonialForm}
                            submitted={submitted}
                            postTestimonialForm={postTestimonialForm}
                            updateTestimonialForm={updateTestimonialForm}

                        />
                    )
                    :
                    (
                        < TestimonialTable
                            testimonialApiesData={testimonialApiesData}
                            setTestimonialMode={setTestimonialMode}
                            setTestimonialForm={setTestimonialForm}
                            setRefresh={setRefresh}
                            reFresh={reFresh}
                        />
                    )
            }
        </Fragment>
    )
}

export default TestimonialCustome
