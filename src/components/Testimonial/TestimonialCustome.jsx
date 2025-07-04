import React from 'react'
import { Fragment } from 'react'
import TestimonialForm from './TestimonialForm'
import { useState } from 'react'
import { useEffect } from 'react'

function TestimonialCustome() {
    const [testimonialMode, setTestimonialMode] = useState()
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

    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        setId(id)
    }, [])

    const postTestimonialForm = async () => {

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
                alert("Successfully submitted.");
                setTestimonialForm(inisialState)
                setRefresh((ref) => !ref)

            } else {
                console.error("Error response:", result);
                alert("Failed to update portfolio section.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong. Please try again.");
        }

    }


    return (
        <Fragment>
            <TestimonialForm
                testimonialMode={testimonialMode}
                loading={loading}
                testimonialForm={testimonialForm}
                setTestimonialForm={setTestimonialForm}
                submitted={submitted}
                postTestimonialForm={postTestimonialForm}
            />
        </Fragment>
    )
}

export default TestimonialCustome