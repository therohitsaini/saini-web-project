import {
   Box,
   Tab,
   Tabs,
   Typography,
   CircularProgress,
   Divider
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ServiceHeading from "./Pages/ServiceHeading";
import PortFolioHeading from "./Pages/PortFolioHeading";
import PrincingHeading from "./Pages/PrincingHeading";
import TestiminialHeadings from "./Pages/TestiminialHeadings";
import { toast, ToastContainer } from "react-toastify";
import {
   Layers,
   Briefcase,
   DollarSign,
   ThumbsUp
} from "lucide-react"; // For modern icons

const tabsData = [
   { value: 0, label: "Service Heading", icon: <Layers size={18} /> },
   { value: 1, label: "Portfolio Heading", icon: <Briefcase size={18} /> },
   { value: 2, label: "Pricing Heading", icon: <DollarSign size={18} /> },
   { value: 3, label: "Testimonial Heading", icon: <ThumbsUp size={18} /> }
];

function TabPanel({ children, value, index }) {
   return (
      <div hidden={value !== index} role="tabpanel" className="w-full">
         {value === index && (
            <Box className="p-4 w-full">
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired
};

export default function Headings() {
   const [value, setValue] = useState(0);
   const [loading, setLoading] = useState(false);
   const [id, setId] = useState("");
   const [serviceHeadingApiData, setServiceHeadingApiData] = useState([]);
   const [headingsState, setHeadingsState] = useState({
      ServiceHeading: { title: "", Descriptions: "", item_ShowOnWebsite: "true" },
      PortFolioHeading: { title: "", Descriptions: "", item_ShowOnWebsite: "" },
      PrincingHeading: { title: "", Descriptions: "", item_ShowOnWebsite: "" },
      TestimonialHeading: { title: "", Descriptions: "", item_ShowOnWebsite: "" }
   });

   useEffect(() => {
      const userId = localStorage.getItem("user-ID");
      setId(userId);
   }, []);

   useEffect(() => {
      if (!id) return;
      (async () => {
         try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-heading/api-get-heading-top/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.ok) {
               const updated = { ...headingsState };
               data?.data?.forEach(({ section, item }) => {
                  if (item && item[0]) {
                     updated[section] = {
                        title: item[0].item_Title || "",
                        Descriptions: item[0].item_Description || "",
                        item_ShowOnWebsite: item[0].item_ShowOnWebsite || ""
                     };
                  }
               });
               setHeadingsState(updated);
            }
         } catch (err) {
            console.error(err);
         }
      })();
   }, [id]);

   const handleChange = (event, newValue) => setValue(newValue);

   const submitHandler = async (section) => {
      setLoading(true);
      try {
         const url = `${import.meta.env.VITE_BACK_END_URL}api-heading/api-headingtop-api/${id}`;
         const payload = {
            section,
            item: [headingsState[section]]
         };
         const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
         });
         const data = await res.json();
         toast[res.ok ? "success" : "error"](data.message || (res.ok ? "Updated" : "Failed"));
      } catch (err) {
         console.error(err);
         toast.error("Something went wrong.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <Fragment>
         <Box className="flex w-full  rounded-xl overflow-hidden shadow-lg">
            {/* Sidebar Tabs */}
            <Box className="min-w-[250px] bg-[#1f2937] text-white h-[85vh] p-3 sticky top-[90px] shadow-md">
               <Typography
                  variant="h5"
                  sx={{
                     fontWeight: 700,
                     textAlign: 'center',
                     mb: 2,
                     background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                  }}
               >
                  Heading Settings
               </Typography>
               <Divider sx={{
                  mb: 2
               }} />

               <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  TabIndicatorProps={{ style: { background: "#6366f1" } }}
               >

                  {tabsData.map((tab) => (
                     <Tab
                        key={tab.value}
                        icon={tab.icon}
                        iconPosition="start"
                        label={tab.label}
                        sx={{
                           color: value === tab.value ? "white" : "#cbd5e1",
                           backgroundColor: value === tab.value ? "#6366f1" : "transparent",
                           borderRadius: 1,
                           marginBottom: 1,
                           textTransform: "none",
                           justifyContent: "start",
                           paddingX: 2,
                           fontWeight: 500
                        }}
                     />
                  ))}
               </Tabs>
            </Box>

            {/* Main Panel */}
            <Box className="flex-1 h-[85vh] overflow-y-auto  text-white p-6  flex items-center">
               <TabPanel value={value} index={0}>
                  <ServiceHeading
                     serviceHeading={headingsState.ServiceHeading}
                     setServiceHeading={(v) =>
                        setHeadingsState((prev) => ({ ...prev, ServiceHeading: v }))
                     }
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>
               <TabPanel value={value} index={1}>
                  <PortFolioHeading
                     portfolioHeading={headingsState.PortFolioHeading}
                     setPortfolioHeading={(v) =>
                        setHeadingsState((prev) => ({ ...prev, PortFolioHeading: v }))
                     }
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>
               <TabPanel value={value} index={2}>
                  <PrincingHeading
                     princingHeading={headingsState.PrincingHeading}
                     setPrincingHeading={(v) =>
                        setHeadingsState((prev) => ({ ...prev, PrincingHeading: v }))
                     }
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>
               <TabPanel value={value} index={3}>
                  <TestiminialHeadings
                     testimonialHeading={headingsState.TestimonialHeading}
                     setTestimonialHeading={(v) =>
                        setHeadingsState((prev) => ({ ...prev, TestimonialHeading: v }))
                     }
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>
            </Box>
         </Box>
         <ToastContainer />
      </Fragment>
   );
}
