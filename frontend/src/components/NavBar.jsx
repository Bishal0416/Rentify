import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const urlParams = new URLSearchParams(window.location.search);
    //     urlParams.set('searchTerm', searchTerm);
    //     const searchQuery = urlParams.toString();
    //     navigate(`/search?${searchQuery}`);
    // };
    
    // useEffect(() => {
    //     const urlParams = new URLSearchParams(location.search);
    //     const searchTermFromUrl = urlParams.get('searchTerm');
    //     if (searchTermFromUrl) {
    //         setSearchTerm(searchTermFromUrl);
    //     }
    // }, [location.search]);

    const handleChange = () => {
        setMenu(!menu);
    };

    return (
        <header>
            <div className="flex-no-wrap top-0 flex w-full items-center justify-between p-3 px-20 bg-gradient-to-b to-slate-100 from-slate-200 shadow-md">
                <div className="flex items-center justify-center">
                    <NavLink
                        to="/"
                        className=" font-semibold text-xl p-1 cursor-pointer text-green-750 flex items-center"
                    >
                        <span className=""> <MdRealEstateAgent size={40} color={"#05445E"} /></span>
                        <span className="ml-2">Rentify</span>
                    </NavLink>
                </div>

                    <div className="hidden md:flex gap-5 font-medium p-1 text-lg">
                        <NavLink
                            to="/"
                            className={({ isActive }) => ` ${isActive ? "text-green-900 underline" : "text-black"} hover:text-[#539165] transition-all cursor-pointer`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => ` ${isActive ? "text-green-900 underline" : "text-black"} hover:text-[#539165] transition-all cursor-pointer`}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/search"
                            className={({ isActive }) => ` ${isActive ? "text-green-900 underline" : "text-black"} hover:text-[#539165] transition-all cursor-pointer`}
                        >
                            Properties
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className="inline-block bg-[#189AB4] hover:bg-green-600 text-white font-semibold px-4 py-1 rounded-2xl cursor-pointer">
                            {currentUser ? currentUser.firstName : 'SignIn'}
                        </NavLink>
                    </div>
                    <div className="flex md:hidden" onClick={handleChange}>
                        <div className=" p-2">
                            <AiOutlineMenu size={22} />
                        </div>
                    </div>
            </div>

            <div
                className={` ${menu ? "translate-x-0" : "-translate-x-full"
                    } md:hidden flex flex-col absolute bg-[#ffffff] left-0 top-20 font-medium text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 `}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) => ` ${isActive ? "text-green-900" : "text-black"} hover:text-[#539165] transition-all cursor-pointer`}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => ` ${isActive ? "text-green-900" : "text-black"} hover:text-[#539165] transition-all cursor-pointer`}
                >
                    About
                </NavLink>
                <NavLink
                    to="/sign-in"
                    className={({ isActive }) => `  ${isActive ? "text-green-900" : "text-black"} hover:text-[#539165] transition-all cursor-pointer `}
                >
                    SignIn
                </NavLink>
            </div>
        </header>
    );
};

export default NavBar;
