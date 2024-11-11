import React from "react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../store/slices/themeSlice";
import { motion } from "framer-motion";
import { UpdateFollower } from "react-mouse-follower";

export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const handleTheme = () => {
        dispatch(toogleTheme());
    };

    const navImgVariants = {
        hidden: {
            opacity: 0,
            x: -50,
        },
        visible: {
            x: 0,
            opacity: [0, 0, 0, 0, 0, 0.2, 0.4, 1],
            transition: {
                type: "spring",
                stiffness: 550,
                damping: 150,
                delay: 0.2,
            },
        },
    };

    const liVariants = {
        hidden: {
            opacity: 0,
            y: -40,
        },
        visible: {
            transition: {
                type: "spring",
                stiffness: 95,
                // damping: 150,
            },
            opacity: 1,
            y: 0,
        },
    };

    const navItems = [
        {
            to: "/",
            className: `text-xl ${
                path === "/"
                    ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                    : ""
            }`,
            title: "Home",
        },
        {
            to: "/rooms",
            className: `text-xl ${
                path === "/rooms"
                    ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                    : ""
            }`,
            title: "Rooms",
        },
        {
            to: "/contact",
            className: `text-xl ${
                path === "/contact"
                    ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                    : ""
            }`,
            title: "Contact",
        },
        {
            to: "/about",
            className: `text-xl ${
                path === "/about"
                    ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                    : ""
            }`,
            title: "About",
        },
    ];

    return (
        <Navbar
            fluid
            rounded
            className="sticky top-0 z-50 bg-opacity-30 backdrop-filter backdrop-blur-lg border-b-4"
            >
            <NavbarBrand as={"div"}>
                <motion.div
                    variants={navImgVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        to="/"
                        className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white"
                    >
                        Roomies
                    </Link>
                </motion.div>
            </NavbarBrand>

            <div className="flex md:order-2">
                <Button
                    className=" mr-3 w-12 h-10 border-4"
                    color="grey"
                    pill
                    onClick={handleTheme}
                >
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </Button>

                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        className=""
                        label={
                            <Avatar
                                alt="User settings"
                                img={currentUser.profilePicture}
                                rounded
                                className="w-10 h-10 mx-auto rounded-full cursor-pointer object-cover"
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm text-center">
                                {currentUser.username}
                            </span>
                            <span className="block truncate text-sm font-medium text-center">
                                {currentUser.email}
                            </span>
                        </DropdownHeader>
                        <DropdownItem>
                            <Link to="/dashboard/profile">Dashboard</Link>
                        </DropdownItem>
                        <DropdownDivider />
                        <Link to="/dashboard/signout">
                            <DropdownItem>Sign out</DropdownItem>
                        </Link>
                    </Dropdown>
                ) : (
                    <Button color="grey" className=" border-2">
                        <Link to="/signin">Sign in</Link>
                    </Button>
                )}
                <NavbarToggle />
            </div>

            <NavbarCollapse>
                <motion.ul
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.3, // Stagger children animations
                            },
                        },
                    }}
                    initial="hidden"
                    animate="visible"
                    className="flex w-full gap-6 justify-between items-center"
                >
                    {navItems?.map((item) => (
                        <motion.li
                            className="li"
                            key={item.to}
                            variants={liVariants}
                        >
                            <UpdateFollower
                                mouseOptions={{
                                    scale: 1.5,
                                    backgroundColor: "white",
                                    followSpeed: 1.5,
                                    zIndex: 999,
                                }}
                            >
                                <Link to={item.to} className={item.className}>
                                    {item.title}
                                </Link>
                            </UpdateFollower>
                        </motion.li>
                    ))}
                </motion.ul>
            </NavbarCollapse>
        </Navbar>
    );
}
