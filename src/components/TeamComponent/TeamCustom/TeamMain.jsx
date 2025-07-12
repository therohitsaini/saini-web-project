import React, { useEffect, useState } from 'react';
import TeamForm from './TeamForm';

function TeamMain({ showSnackbar, showError }) {
    const initialState = {
        _id: "",
        teamHeading: "",
        teamDescription: "",
        teamBgImage: "",
    };

    const [teamForm, setTeamForm] = useState(initialState);
    const [id, setId] = useState();
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const userID = localStorage.getItem("user-ID");
        setId(userID);
    }, []);

    useEffect(() => {
        if (id) {
            getTeamData(id);
        }
    }, [id]);

    useEffect(() => {
        if (teamData && teamData.length > 0) {
            const firstItem = teamData[0];
            setTeamForm({
                _id: firstItem._id,
                teamHeading: firstItem.teamHeading,
                teamDescription: firstItem.teamDescription,
                teamBgImage: "",
            });
        }
    }, [teamData]);

    const getTeamData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-team/api-get/team-heading/${id}`;
            const response = await fetch(url, { method: "GET" });
            const json = await response.json();

            if (response.ok) {
                setTeamData(json.data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const sectionId = teamForm._id;
        const formData = new FormData();
        if (teamForm.teamBgImage) {
            formData.append("teamBgImage", teamForm.teamBgImage);
        }
        formData.append("teamHeading", teamForm.teamHeading);
        formData.append("teamDescription", teamForm.teamDescription);
        setLoading(true)
        const baseUrl = `${import.meta.env.VITE_BACK_END_URL}api-team/api-team/create-update/${id}`;
        const url = sectionId ? `${baseUrl}/${sectionId}` : baseUrl;

        try {
            const response = await fetch(url, {
                method: "PUT",
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                showSnackbar(result.message);
                setLoading(false)
                getTeamData(id);

            }
        } catch (error) {
            console.error("Network error:", error);
            showError("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <TeamForm
                setTeamForm={setTeamForm}
                teamForm={teamForm}
                submitHandler={submitHandler}
                loading={loading}
            />

        </div>
    );
}

export default TeamMain;
