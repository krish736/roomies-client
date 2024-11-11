import React, { useRef } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Icon1 from "../Images/icon1.png";
import Icon2 from "../Images/icon2.png";
import Icon3 from "../Images/icon3.png";
import { UpdateFollower } from "react-mouse-follower";
import { useSelector } from "react-redux";

const Services = () => {
    const serviceArray = [
        {
            title: "Personalized Roommate Matching",
            description:
                "Utilize our advanced algorithm to connect with compatible roommates based on your lifestyle preferences, ensuring a harmonious living experience.",
            icon: Icon1,
            delay: 1.1,
        },
        {
            title: "Extensive Room Listings",
            description:
                "Explore a wide range of available rooms in your desired locations, complete with detailed descriptions and high-quality photos to help you make informed decisions.",
            icon: Icon2,
            delay: 1.1,
        },
        {
            title: "Secure Communication",
            description:
                "Engage with potential roommates through our secure messaging system, designed to protect your privacy and facilitate open communication.",
            icon: Icon3,
            delay: 1.1,
        },
    ];
    

    const cardVariants = (ind) => {
        return {
            hidden: {
                x: ind == 0 ? 515 : ind == 2 ? -515 : 0,
                opacity: 0,
            },
            visible: {
                x: 0,
                opacity: [0.5, 0.8, 1],
                transition: {
                    // Corrected typo here
                    duration: 0.5,
                },
            },
        };
    };
    const tagetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: tagetRef,
        offset: ["center start", "end 200%"],
    });

    const { theme } = useSelector((state) => state.theme);

    return (
        <section
            className={`h-screen py-8 ${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}
            style={{ color: theme === "light" ? "#333333" : "#ffffff" }}
        >
            <div className="container py-14">
                <h1 className="text-3xl tracking-widest font-bold text-center pb-10">
                    Services
                </h1>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {serviceArray.map((item, ind) => (
                    <AnimatePresence key={ind}>
                        <UpdateFollower
                            mouseOptions={{
                                backgroundColor: "white",
                                followSpeed: 0.5,
                                zIndex: 999,
                                rotate: 720,
                                scale: 5,
                                mixBlendMode: "darken",
                                backgroundElement: (
                                    <div>
                                        <img src={item.icon} alt="" />
                                    </div>
                                ),
                            }}
                        >
                            <motion.div
                                ref={tagetRef}
                                variants={cardVariants(ind)}
                                initial="hidden"
                                whileInView="visible"
                                className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white"
                            >
                                <img
                                    src={item.icon}
                                    alt=""
                                    loading="lazy"
                                    width={100}
                                    className="mb-4"
                                />
                                <div className="text-center space-y-2">
                                    <h1 className="text-2xl font-bold " style={{color: theme === "light" ? "#333333" : "black"}}>
                                        {item.title}
                                    </h1>
                                    <p className=" text-sm text-black/75">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        </UpdateFollower>
                    </AnimatePresence>
                ))}
            </div>
        </section>
    );
};

export default Services;
