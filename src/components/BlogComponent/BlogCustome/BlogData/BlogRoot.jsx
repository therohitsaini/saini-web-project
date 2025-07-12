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
    const [blogData, setBlogData] = useState([])
    const [loadingRowId, setLoadingRowId] = useState(false)
    const [imagePreview, setImagePreview] = useState("")


    useEffect(() => {
        const userId = localStorage.getItem("user-ID")
        setId(userId)
    }, [])

    const getBlogData = async () => {
        try {
            const resposne = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-blog/api-get-blog/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const result = await resposne.json()
            if (resposne.ok) {
                setBlogData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBlogData(id)
    }, [id])

   

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
                // setLoading(false)
            }
        } catch (error) {
            showError(result.message)
            console.error('Error submitting team member:', error);
            throw error;
        }
    }
    const updateBloges = async (e) => {
        e.preventDefault();
        const userDocID = blodFormData.userDocID;

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
            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-blog/api-updatedocs/${id}/${userDocID}`, {
                method: 'PUT',
                body: payload,
            });
            const result = await response.json()
            if (response.ok) {
              
                showSnackbar(result.message)
                // setLoading(false)
            }
        } catch (error) {
            showError(result.message)
            console.error('Error submitting team member:', error);
            throw error;
        }
    }

    console.log("blogMode", blogMode)

    return (
        <Fragment>

            {
                blogMode === "SubmitBlogForm" || blogMode === "UpdateBlogForm" ?
                    (
                        <BlogPostForm
                            blodFormData={blodFormData}
                            loading={loading}
                            setBlogFormData={setBlogFormData}
                            postBloges={postBloges}
                            setBlogMode={setBlogMode}
                            blogMode={blogMode}
                            updateBloges={updateBloges}
                            inisialState={inisialState}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}

                        />
                    )
                    :
                    (
                        <BlogTable
                            blogData={blogData}
                            userId={id}
                            showSnackbar={showSnackbar}
                            setLoadingRowId={setLoadingRowId}
                            loadingRowId={loadingRowId}
                            setBlogMode={setBlogMode}
                            setBlogFormData={setBlogFormData}
                        />
                    )
            }

        </Fragment>
    )
}

export default BlogRoot