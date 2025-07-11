import React from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import BlogPostForm from './BlogPostForm'
import { useEffect } from 'react'
import BlogTable from './BlogTable'

function BlogRoot({ showSnackbar, showError }) {
    const inisialState = {
        blogerImage: "",
        goIcone: "",
        blogDatePicker: "",
        blogerRoleIocne: "",
        blogerRole: "",
        blogHeading: "",
        blogDescription: "",
        blogButton: ""
    }
    const [blodFormData, setBlogFormData] = useState(inisialState)
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState()
    const [blogMode, setBlogMode] = useState("Table")

    useEffect(() => {
        const userId = localStorage.getItem("user-ID")
        setId(userId)
    }, [])
    const getBlogData = async () => {
        try {
            const resposne = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-blog/api-post-blog-Card/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const result = await resposne.json()

        } catch (error) {
            console.log(error)
        }
    }
    const postBloges = async () => {
        try {
            const payload = new FormData();
            payload.append('blogerImage', blodFormData.blogerImage);
            payload.append('goIcone', blodFormData.goIcone);
            payload.append('blogDatePicker', blodFormData.blogDatePicker);
            payload.append('blogerRoleIocne', blodFormData.blogerRoleIocne);
            payload.append('blogerRole', blodFormData.blogerRole);
            payload.append('blogHeading', blodFormData.blogHeading);
            payload.append('blogDescription', blodFormData.blogDescription);
            payload.append('blogButton', blodFormData.blogButton);
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-blog/api-post-blog-Card/${id}`, {
                method: 'POST',
                body: payload,
            });
            const result = await response.json()
            if (response.ok) {
                showSnackbar(result.message)
                setLoading(false)
            }
        } catch (error) {
            showError(result.message)
            console.error('Error submitting team member:', error);
            throw error;
        }
    }
    return (
        <Fragment>

            {
                blogMode === "SubmitBlogForm" ?
                    (
                        <BlogPostForm
                            blodFormData={blodFormData}
                            loading={loading}
                            setBlogFormData={setBlogFormData}
                            postBloges={postBloges}
                            setBlogMode={setBlogMode}
                        />
                    )
                    :
                    (
                        <BlogTable />
                    )
            }

        </Fragment>
    )
}

export default BlogRoot