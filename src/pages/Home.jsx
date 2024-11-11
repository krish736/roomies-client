import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion";
import { UpdateFollower } from "react-mouse-follower";
import { useSelector } from "react-redux";
import Services from "../components/Services";

const Home = () => {
    const { theme } = useSelector((state) => state.theme);
    const textColor = theme === "light" ? "#333333" : "#ffffff";

    const data = [
        {
            id: 1,
            image: "https://cdn-icons-png.flaticon.com/512/5836/5836188.png",
            title: "Find Your Perfect Roommate",
            subTitle:
                "Our advanced matching algorithm connects you with compatible roommates based on lifestyle preferences, ensuring a harmonious living experience.",
            bgColor: "#8b5958",
            price: "Free to Join",
            modal: "Learn More",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1725797951116-98dc0cce8ac8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwZWNpYWwlMjBvZmZlcnxlbnwwfHwwfHx8MA%3D%3D",
            title: "Explore Available Rooms",
            subTitle:
                "Browse through a wide selection of available rooms in your desired location, complete with detailed descriptions and photos to help you make an informed choice.",
            bgColor: "#638153",
            price: "Low Cost",
            modal: "View Listings",
        },
        {
            id: 3,
            image: "https://img.freepik.com/premium-photo/vibrant-3d-padlock-icon-blue-yellow-perfect-illustrating-online-security-data-protection-privacy-concepts_1142-218356.jpg",
            title: "Secure and Trustworthy",
            subTitle:
                "We prioritize your safety with verified profiles and secure messaging, providing peace of mind as you search for your ideal living arrangement.",
            bgColor: "#5d818c",
            price: "Privacy Ensured",
            modal: "Start Chatting",
        },
    ];

    const [activeData, setActiveData] = useState(data[0]);

    const handleActiveData = (data) => {
        setActiveData(data);
    };

    const animation = {
        hidden: {
            opacity: 0,
            y: 100,
            scale: 0.5,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.2,
            },
        },
        exit: {
            opacity: 0,
            y: 100,
            scale: 0.5,
        },
    };

    const btnAnimate = (id) => {
        return {
            hidden: {
                opacity: 0,
                x: id === 1 ? 150 : id === 2 ? 0 : -150,
            },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.5,
                    delay: 0.5,
                },
            },
        };
    };

    const imageAnimate = {
        hidden: {
            scale: 0.4,
            opacity: 0,
            y: 150,
        },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };
    const navigate = useNavigate()
    const handleCLick = () => navigate('/rooms')
    return (
        <section className="text-white bg-brandDark">
            <div className="container min-h-[700px] grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px]">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.4 }}
                        style={{ color: textColor }}
                        className="space-y-5 text-center md:text-left"
                        key={activeData.id} // Use a unique key based on activeData
                    >
                        <UpdateFollower
                            mouseOptions={{
                                backgroundColor: "white",
                                followSpeed: 0.5,
                                zIndex: 10,
                                rotate: 720,
                                scale: 10,
                                mixBlendMode: "difference",
                            }}
                        >
                            <motion.h1
                                variants={animation}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-3xl lg:text-6xl font-bold"
                            >
                                {activeData.title}
                            </motion.h1>
                        </UpdateFollower>
                        <motion.p
                            variants={animation}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="text-sm leading-loose"
                        >
                            {activeData.subTitle}
                        </motion.p>
                        <UpdateFollower
                            mouseOptions={{
                                backgroundColor: activeData.bgColor,
                                followSpeed: 0.5,
                                rotate: -720,
                                scale: 4,
                                zIndex: 910,
                                mixBlendMode: "normal",
                                backgroundElement: (
                                    <div>
                                        <img
                                            src={activeData.image}
                                            // loading="lazy"
                                        />
                                    </div>
                                ),
                            }}
                        >
                            <motion.button
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={animation}
                                style={{
                                    backgroundColor: activeData.bgColor,
                                    color:
                                        theme === "light"
                                            ? "black"
                                            : "whitesmoke",
                                }}
                                className="px-4 py-2 inline-block max-w-max rounded-sm"
                                onClick={handleCLick}
                            >
                                Find a Friend
                            </motion.button>
                        </UpdateFollower>

                        <div className="flex items-center gap-4 justify-center md:justify-start !mt-24">
                            <div
                                className="w-20 h-[1px]"
                                style={{ background: textColor }}
                            ></div>
                            <p className="text-sm uppercase font-bold">
                                What you will get ??
                            </p>
                            <div
                                className="w-20 h-[1px]"
                                style={{ background: textColor }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-3">
                            {data.map((item) => (
                                <motion.div
                                    variants={btnAnimate(item.id)}
                                    initial="hidden"
                                    animate="visible"
                                    // exit="hidden" // Exit state for buttons
                                    onClick={() => handleActiveData(item)}
                                    key={item.id}
                                >
                                    <UpdateFollower
                                        mouseOptions={{
                                            backgroundColor: item.bgColor,
                                            followSpeed: 0.5,
                                            zIndex: 1000,
                                            scale: 5,
                                            text: "View More",
                                            textFontSize: "3px",
                                            mixBlendMode: "normal",
                                        }}
                                        key={item.id}
                                    >
                                        <motion.button className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                                            <img
                                                width={200}
                                                className="rounded-full"
                                                src={item.image}
                                                loading="lazy"
                                                alt=""
                                            />
                                            <div className="space-y-2">
                                                <p className="text-base font-bold">
                                                    {item.price}
                                                </p>
                                                <p className="text-xs font-semibold">
                                                    {item.modal}
                                                </p>
                                            </div>
                                        </motion.button>
                                    </UpdateFollower>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeData.id}
                            variants={imageAnimate}
                            initial="hidden"
                            exit="hidden"
                            animate="visible"
                            src={activeData.image}
                            className="w-[300px] md:w-[400px] xl:w-[500px]"
                            loading="lazy"
                            alt=""
                        />
                    </AnimatePresence>
                </div>
            </div>
            <Services />
        </section>
    );
};

export default Home;
