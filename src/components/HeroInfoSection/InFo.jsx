import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getHeaderData } from '../../Store/ApisStore/ApisCollection';
import InFoTable from './InfoPages/InFoTable';
import InFoForm from './InfoPages/InFoForm';
import { Button } from '@mui/material';





export default function InFo() {
    const [value, setValue] = useState(0);
    const [inFoIsTrue, setInFoIsTrue] = useState(true)
    const [inFoService, setInFoService] = useState(
        { inFoHeading: "", inFoDescription: "", inFoIcone: "" }
    )




    const dispatch = useDispatch()
    const inFoDataRedux = useSelector((state) => state.getHeaderDataReducer_.headerData.inFoData);
    // console.log("inFoDataRedux___", inFoDataRedux.headerData.inFoData)
    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const allFaMdIcons_ = [

        ...Object.entries(MdIcons),
        ...Object.entries(FaIcons),

    ]

    const allFaMdIcons = allFaMdIcons_.map(([name, Icon]) => ({
        label: name,
        Icon
    }))

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIcons.find((i) => i.label === '')
    )


    const infoHandler = async () => {

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/update-info/683e90debc43f5b825e98d4a`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inFoService)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
            }
        } catch (error) {
            console.log("Internal Error", error)
        }

    }

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', justifyContent: "center" }}
        >
            {
                inFoIsTrue ?
                    <div>
                        <InFoTable
                            setInFoIsTrue={setInFoIsTrue}
                            inFoDataRedux={inFoDataRedux}
                        />
                    </div>
                    :
                    <div className='tabs-contanier h-full  w-full' >
                        <div className='btn w-full px-20'>
                            <Button
                                onClick={() => setInFoIsTrue(true)}
                                sx={{
                                    textTransform: "none",
                                    fontVariant: "all-small-caps",
                                    px: 10
                                }}

                                variant='outlined'
                            >
                                Show Table
                            </Button>
                        </div>
                        <InFoForm

                            setSelectedIcon={setSelectedIcon}
                            selectedIcon={selectedIcon}
                            allFaMdIcons={allFaMdIcons}
                            inFoService={inFoService}
                            setInFoService={setInFoService}
                            infoHandler={infoHandler}

                        />
                    </div>
            }
        </Box>
    );
}
