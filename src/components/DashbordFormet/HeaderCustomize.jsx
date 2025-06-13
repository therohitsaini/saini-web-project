
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderData } from "../../Store/ApisStore/ApisCollection";

const HeaderCustomize = () => {
    const initialState = {
        item_ContactId: "",
        item_Title: "",
        item_Icone: "",
        item_IconeUrl: "",

        icone_One: "",
        icone_One_Url: "",

        icone_Two: "",
        icone_Two_Url: "",

        icone_Three: "",
        icone_Three_Url: "",

        icone_Fourth: "",
        icone_Fourth_Url: "",

        icone_Fvie: "",
        icone_Five_Url: "",

        item_ContactIdRight: "",
        item_TitleRight: "",
        item_IconeRight: "",
        item_IconeUrlRight: ""
    };

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);

    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);

    // Populate form when Redux data arrives
    useEffect(() => {
        if (headerToBarData?.headerData?.headerTopBar?.length > 0) {
            const topLeft = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopLeftBar"
            )?.item[0];

            const topRight = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopRightBar"
            )?.item[0];

            const centerIcons = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderCenterIcone"
            )?.item;

            setFormData((prevState) => ({
                ...prevState,
                item_Title: topLeft?.item_Title || "",
                item_ContactId: topLeft?.item_ContactId || "",
                item_Icone: topLeft?.item_Icone || "",
                item_IconeUrl: topLeft?.item_IconeUrl || "",

                item_TitleRight: topRight?.item_Title || "",
                item_ContactIdRight: topRight?.item_ContactId || "",
                item_IconeRight: topRight?.item_Icone || "",
                item_IconeUrlRight: topRight?.item_IconeUrl || "",

                icone_One: centerIcons?.[0]?.item_Icone || "",
                icone_One_Url: centerIcons?.[0]?.item_IconeUrl || "",

                icone_Two: centerIcons?.[1]?.item_Icone || "",
                icone_Two_Url: centerIcons?.[1]?.item_IconeUrl || "",

                icone_Three: centerIcons?.[2]?.item_Icone || "",
                icone_Three_Url: centerIcons?.[2]?.item_IconeUrl || ""

            }));
        }
    }, [headerToBarData]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitHandler = async () => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/header-top-bar/683e90debc43f5b825e98d4a`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
            }
            // setFormData(initialState);
            console.log(responseJson);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className="header-form h-full w-full flex flex-col gap-5  p-10 bg-[#121313]">
                <div className="w-full flex justify-between">
                    {/* <h1 className="heading font-medium text-cyan-300 text-2xl">Header Top Bar</h1> */}
                    {/* <Button variant="contained" onClick={submitHandler}>
                        Save Changes
                    </Button> */}
                </div>

                <form className="grid grid-cols-3 mt-2 gap-3">
                    {/* Left Section */}
                    <div className="border border-slate-400/20 rounded-md p-5 h-80 bg-[#1f1e1f] flex flex-col gap-4">
                        <Typography component="span">Top Bar Email Section</Typography>
                        <Divider />
                        <TextField
                            label="Title"
                            size="small"
                            variant="outlined"
                            name="item_Title"
                            value={formData.item_Title}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Contact"
                            size="small"
                            variant="outlined"
                            name="item_ContactId"
                            value={formData.item_ContactId}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Icone"
                            size="small"
                            variant="outlined"
                            name="item_Icone"
                            value={formData.item_Icone}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Icone Url"
                            size="small"
                            variant="outlined"
                            name="item_IconeUrl"
                            value={formData.item_IconeUrl}
                            onChange={onChangeHandler}
                        />
                    </div>

                    {/* Right Section */}
                    <div className="border border-slate-400/20 rounded-md p-5 h-80 bg-[#1f1e1f] flex flex-col gap-4">
                        <Typography component="span">Top Bar Support Section</Typography>
                        <Divider />
                        <TextField
                            label="Title"
                            size="small"
                            variant="outlined"
                            name="item_TitleRight"
                            value={formData.item_TitleRight}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Contact"
                            size="small"
                            variant="outlined"
                            name="item_ContactIdRight"
                            value={formData.item_ContactIdRight}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Icone"
                            size="small"
                            variant="outlined"
                            name="item_IconeRight"
                            value={formData.item_IconeRight}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Icone Url"
                            size="small"
                            variant="outlined"
                            name="item_IconeUrlRight"
                            value={formData.item_IconeUrlRight}
                            onChange={onChangeHandler}
                        />
                    </div>

                    {/* Icon Section */}
                    <div className="border border-slate-500/20 bg-[#1f1e1f] rounded-md p-2">
                        <Typography component="span">Top Bar Icone Section</Typography>
                        <Divider />

                        {[1, 2, 3].map((num, index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${num}-content`}
                                    id={`panel${num}-header`}
                                >
                                    <Typography component="span">Icon {num}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="border border-slate-400/20 rounded-md p-5 flex flex-col gap-4">
                                        <TextField
                                            label="Icone"
                                            size="small"
                                            variant="outlined"
                                            name={`icone_${["One", "Two", "Three"][index]}`}
                                            value={formData[`icone_${["One", "Two", "Three"][index]}`]}
                                            onChange={onChangeHandler}
                                        />
                                        <TextField
                                            label="URL"
                                            size="small"
                                            variant="outlined"
                                            name={`icone_${["One", "Two", "Three"][index]}_Url`}
                                            value={formData[`icone_${["One", "Two", "Three"][index]}_Url`]}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default HeaderCustomize;
