import { useState } from "react"
import { Icon } from '@iconify/react';
import { margin } from "@mui/system";


function Icone({ item_ }) {
    
    const [linkdinHover, setLinkdinHover] = useState(false)

    return (
        <div className={`icon-linkdin h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${linkdinHover ? "bg-red-600/40" : "bg-white/50"}`}>
            <div onMouseOver={() => setLinkdinHover(true)} onMouseLeave={() => setLinkdinHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${linkdinHover ? "bg-red-500 " : "bg-white"}`}>
                {/* <LinkedInIcon sx={{ color: linkdinHover ? "white" : "#db3125", fontSize: 23 }} /> */}
                <Icon fontSize={20} className={`${linkdinHover ? "text-white" : "text-red-700"}  duration-500`} icon={item_} />
            </div>
        </div>
    )

}

export default Icone


export const FooterArrow = ({ KeyboardDoubleArrowRightIcon, listItem_ }) => {
    const [margin_, setMargin_] = useState(false)
    return (
        <p onMouseOver={() => setMargin_(true)} onMouseLeave={() => setMargin_(false)} className='flex items-center'> <a className='text-white font-medium hover:text-[#df442d] duration-500 z-50' href=''>{listItem_}</a>
            {/* <KeyboardDoubleArrowRightIcon sx={{ color: "#df442d", margin:-1,   }} /> */}
        </p>

    )
}

export const ButtonComponent = ({ item_ }) => {
    return (
        <button className='border border-white text-white p-2 px-5 rounded-l-[100px] rounded-r-[30px] hover:bg-[#df442d] duration-800 hover:border-[#df442d]'>{item_}</button>

    )
}


export const ContactComponent = ({ Icone_Contact, heading, paragraph }) => {
    const [facebookHover, setFacebookHover] = useState(false)
    return (
        <div className='contact-section flex items-center gap-5'>
            <div className={`icon-fecebook h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${facebookHover ? "bg-red-600/40" : "bg-white/50"}`}>
                <div onMouseOver={() => setFacebookHover(true)} onMouseLeave={() => setFacebookHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${facebookHover ? "bg-red-500 " : "bg-white"}`}>
                    {/* <Icone_Contact sx={{ color: facebookHover ? "white" : "#db3125", fontSize: 23 }} /> */}
                    <Icon fontSize={20} className={`${facebookHover ? "text-white" : ""}`} color="#db3125" icon={Icone_Contact} />
                </div>
            </div>

            <div className='contact-info flex flex-col'>
                <sapn className=" font-semibold text-[#db3125] text-xl" >{heading}</sapn>
                <span className='font-medium text-white text-base'>{paragraph}</span>
            </div>

        </div>
    )
}