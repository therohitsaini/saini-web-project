

import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function ReactTostError() {
    const notify = () => toast("Email is Already Exsist");

    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
        </div>
    )
}

export default ReactTostError