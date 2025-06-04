import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Icon } from '@iconify/react/dist/iconify.js';
import { red } from '@mui/material/colors';

function UserTableNew() {

    const [userLoginInformation, setUserLoginInformation] = useState([])
    const [userRole, setRole] = useState("")

    useEffect(() => {
        const getUserInformation = async () => {

            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}all/users`
                const fetchUser = await fetch(url, {
                    method: "GET",
                });
                const response = await fetchUser.json()
                setUserLoginInformation(response.data)

            } catch (error) {
                console.log("Server Error ...!", error)
            }
        }

        getUserInformation()

    }, [])

    // const userDetails = useSelector((state) => state.fullName.data.role)

    // useEffect(() => {
    //     if (userDetails) {
    //         localStorage.setItem("", userDetails);
    //     }
    // }, [userDetails]);

    // useEffect(() => {
    //     const getUser = localStorage.getItem("user-Role");
    //     setRole(getUser);
    // }, []);

    // console.log("role", userDetails)

    // const checkAdmin = await



    console.log("userLoginInformation", userLoginInformation)
    return (
        <Fragment>
            <div className='h-50 border border-red-600 border-none w-full z-40'>
                <h1>{ }</h1>

            </div>
            <table className=' w-full text-center    '>
                <thead className='  shadow-md shadow-black/20 border border-slate-100/20 sticky top-15 bg-black overflow-hidden '>
                    <tr className='  text-white rounded-md bg-black '>

                        <th className='p-4 border-2 border-slate-500 font-semibold text-[16px]'>ID</th>
                        <th className='p-4 border-2 border-slate-500'>Full Name</th>
                        <th className='p-4 border-2 border-slate-500'>Username</th>
                        <th className='p-4 border-2 border-slate-500'>Email</th>
                        <th className='p-4 border-2 border-slate-500'>Role</th>
                        {
                            userRole == "admin" &&
                            <>
                                <th className='p-4 border-2 border-slate-500'>Status </th>
                                <th className='p-4 border-2 border-slate-500'>Action </th>
                            </>
                        }

                        {/* <th className='p-4 border-2 border-slate-300'>Role Type</th> */}

                    </tr>
                </thead>
                <tbody className='bg-black text-white'>

                    {userLoginInformation.map((user,) => (

                        <tr className='border border-slate-700 font-semibold text-[14px] text-slate-600  hover:bg-blue-200 hover:text-black duration-700'>
                            <td className='p-3 '>{user._id}</td>
                            <td>{user.fullname}</td>
                            <td>{user.username === "" ? Null : user.username}</td>
                            <td>{user.email}</td>
                            <td className={`${user.role === "admin" ? "text-green-500" : ""}`}>{user.role}</td>
                            {
                                userRole == "admin" &&
                                <>
                                    <td className='text-green-400'>Active</td>
                                    <td className='flex  justify-center items-center  gap-2'>{<DeleteOutlineIcon sx={{ color: "#e0414e", mt: 1 }} />} <Icon className='text-2xl mt-2' icon="clarity:update-line" ></Icon></td>
                                </>
                            }




                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default UserTableNew