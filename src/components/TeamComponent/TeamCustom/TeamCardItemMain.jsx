import React, { useEffect } from 'react'
import { Fragment } from 'react'
import TeamMemberSubmitForm from './TeamMemberSubmitForm'
import { useState } from 'react';
import TeamTable from './TeamTable';

function TeamCardItemMain({ showSnackbar, showError }) {
    const [teamMemberForm, setTeamMemberForm] = useState({
        image: null,
        name: '',
        role: '',
        item_Icone: ['', '', '', ''],
        urls: ['', '', '', ''],
    });

    const [id, setID] = useState()
    const [loader, setLoader] = useState(false)
    const [teamMode, setTeamMode] = useState("Table")
    const [teamCardDataApies, setTeamcardApies] = useState([])


    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        setID(userID)
    }, [])

    const submitTeamMember = async (e) => {
        // e.preventDefault();
        // setTeamMode("SubmitTeamForm")
        // if (!teamMemberForm.image) {
        //     showError("User Image is Requied !")
        //     return 
        // }
        // if (!teamMemberForm.name) {
        //     showError(" Name is Requied !")
        //     return
        // }
        // if (!teamMemberForm.role) {
        //     showError(" Role is Requied !")
        //     return
        // }
        try {
            const payload = new FormData();
            payload.append('image', teamMemberForm.image);
            payload.append('name', teamMemberForm.name);
            payload.append('role', teamMemberForm.role);
            payload.append('item_Icone', JSON.stringify(teamMemberForm.item_Icone));
            payload.append('urls', JSON.stringify(teamMemberForm.urls));
            setLoader(true)

            const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-team/api-post-team/${id}`, {
                method: 'POST',
                body: payload,
            });
            const result = await response.json()

            if (response.ok) {
                showSnackbar(result.message)
                // payload.append('urls', JSON.stringify(teamMemberForm.urls));
                setLoader(false)
            }


        } catch (error) {
            // showError(result.message)
            console.error('Error submitting team member:', error);
            throw error;
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
                setTeamcardApies(JsonData.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeamCardData(id)
    }, [id])

    console.log("teamCardDataApies", teamMemberForm)

    return (
        <Fragment>
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
                        />
                    )
            }
        </Fragment>
    )
}

export default TeamCardItemMain