import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    TextField,
    Grid,
    Pagination,
    Typography
} from '@mui/material';
import { getHeaderData } from '../../Store/ApisStore/ApisCollection';
import InFoTable from './InfoPages/InFoTable';
import InFoForm from './InfoPages/InFoForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function InFo() {

    const dispatch = useDispatch();
    const [inFoIsTrue, setInFoIsTrue] = useState("");
    const [inFoService, setInFoService] = useState({
        inFoHeading: "",
        inFoDescription: "",
        inFoIcone: ""
    });

    const inFoDataRedux = useSelector(
        (state) => state.getHeaderDataReducer_.headerData
    );

    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);

    const [selectedIcon, setSelectedIcon] = useState(null);

    const infoHandler = async () => {
        const id = localStorage.getItem("user-ID");
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/info/update-info/${id}`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inFoService)
            });

            if (fetchData.ok) {
                alert("Successfully Updated");
                setInFoService({
                    inFoHeading: "",
                    inFoDescription: "",
                    inFoIcone: ""
                });
                setSelectedIcon(null);
            }
        } catch (error) {
            console.error("Internal Error", error);
        }
    };

    const infoUpdateHandler = async () => {
        const userId = localStorage.getItem("user-ID")
        const userDocID = inFoService.userDocId
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/info/update-docs/${userId}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inFoService)

            });
            const result = await response.json();

            if (response.ok) {
                alert("Successfully updated!");
                console.log("Updated Data:", result);
            } else {
                console.error("Update failed:", result);
                alert("Update failed. Check console for details.");
            }
        } catch (error) {

        }
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                justifyContent: "center",
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,


            }}
        >
            {inFoIsTrue === "Save" || inFoIsTrue === "Edit" ? (
                <Box className="tabs-container w-full">
                    <Box className="btn w-full px-20 ">
                        <Button
                            onClick={() => setInFoIsTrue("")}
                            sx={{
                                textTransform: "none",
                                fontVariant: "all-small-caps",
                                px: 5
                            }}
                            variant="outlined"
                        >
                            <KeyboardBackspaceIcon sx={{ mr: 1 }} />   Back
                        </Button>
                    </Box>

                    <InFoForm
                        inFoService={inFoService}
                        setInFoService={setInFoService}
                        selectedIcon={selectedIcon}
                        infoHandler={infoHandler}
                        setSelectedIcon={setSelectedIcon}
                        inFoIsTrue={inFoIsTrue}
                        infoUpdateHandler={infoUpdateHandler}
                    // allFaMdIcons={allIcons}
                    />

                </Box>

            ) : (
                <div className='flex justify-center items-center'>
                    <InFoTable
                        setInFoIsTrue={setInFoIsTrue}
                        setInFoService={setInFoService}
                        inFoDataRedux={inFoDataRedux}
                    />
                </div>
            )
            }
        </Box >
    );
}
