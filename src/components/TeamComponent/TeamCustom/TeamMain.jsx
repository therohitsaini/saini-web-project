import React from 'react'
import TeamForm from './TeamForm'
import { useState } from 'react'

function TeamMain() {
    const inisialState = {
        teamHeading: "",
        teamDescription: "",
        teamBgImage: ""
    }
    const [teamForm, setTeamForm] = useState(inisialState)
    return (
        <div>
            <TeamForm
                setTeamForm={setTeamForm}
                teamForm={teamForm}
            />
        </div>
    )
}

export default TeamMain