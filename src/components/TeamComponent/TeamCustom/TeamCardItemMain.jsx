import React, { useEffect } from 'react'
import { Fragment } from 'react'
import TeamMemberSubmitForm from './TeamMemberSubmitForm'
import { useState } from 'react';
import TeamTable from './TeamTable';
import { showErrorToast, showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import { ToastContainer } from 'react-toastify';

function TeamCardItemMain({ showSnackbar, showError }) {
    const [teamMemberForm, setTeamMemberForm] = useState({
        image: null,
        name: '',
        role: '',
        item_Icone: ['', '', '', ''],
        urls: ['', '', '', ''],
        docsId: null, // Add docsId for update operations
    });

    const [id, setID] = useState()
    const [loader, setLoader] = useState(false)
    const [teamMode, setTeamMode] = useState("Table")
    const [teamCardDataApies, setTeamcardApies] = useState([])
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        setID(userID)
    }, [])

    const submitTeamMember = async (e) => {
        try {
            const payload = new FormData();

            // Only append image if it's a File object (new image selected)
            if (teamMemberForm.image instanceof File) {
                payload.append('image', teamMemberForm.image);
            }

            payload.append('name', teamMemberForm.name);
            payload.append('role', teamMemberForm.role);
            payload.append('item_Icone', JSON.stringify(teamMemberForm.item_Icone));
            payload.append('urls', JSON.stringify(teamMemberForm.urls));
            setLoader(true)

            let url, method;

            if (teamMode === "UpdateTeamForm") {
                // Update existing team member
                url = `${import.meta.env.VITE_BACK_END_URL}api-team/api-update-team/${id}/${teamMemberForm.docsId}`;
                method = 'PUT';
            } else {
                // Create new team member
                url = `${import.meta.env.VITE_BACK_END_URL}api-team/api-post-team/${id}`;
                method = 'POST';
            }

            const response = await fetch(url, {
                method: method,
                body: payload,
            });
            const result = await response.json()

            if (response.ok) {
                setLoader(false)
                showSuccessToast(result.message)
                setRefresh(prev => !prev)
            } else {
                showErrorToast(result.message || 'Something went wrong')
                setLoader(false)
            }

        } catch (error) {

            console.error('Error submitting team member:', error);
            setLoader(false)
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
            // console.log("JsonData", JsonData)
            if (response.ok) {
                setTeamcardApies(JsonData.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeamCardData(id)
    }, [id, refresh])

    // console.log("teamCardDataApies", teamMemberForm)

    return (
        <Fragment>
            <ToastContainer />
            {
                teamMode === "SubmitTeamForm" || teamMode === "UpdateTeamForm" ?
                    (
                        <TeamMemberSubmitForm
                            setTeamMemberForm={setTeamMemberForm}
                            teamMemberForm={teamMemberForm}
                            submitTeamMember={submitTeamMember}
                            loader={loader}
                            setTeamMode={setTeamMode}
                            teamMode={teamMode}
                        />
                    )
                    :
                    (
                        <TeamTable
                            teamCardDataApies={teamCardDataApies}
                            showSnackbar={showSnackbar}
                            setTeamMode={setTeamMode}
                            setTeamMemberForm={setTeamMemberForm}
                            setRefresh={setRefresh}
                        />
                    )
            }
        </Fragment>
    )
}

export default TeamCardItemMain