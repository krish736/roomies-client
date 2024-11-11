import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { rooms } from "../data/roomsData.js";
import { useSelector } from "react-redux";
import {
    Box,
    Typography,
    Button,
    Link,
    Drawer,
    IconButton,
    ButtonGroup,
    Tooltip,
    Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getCountries } from "../utilities/AllUtilities.jsx";
import FormInput from "../components/FormInput.jsx";
import axios from "axios";

export default function Rooms() {
    const location = useSelector((state) => state.location);
    const [formLocationDetails, setFormLocationDetails] = useState(location);
    const drawerWidth = 500;

    const [open, setOpen] = useState(false);

    const Main = styled("main", {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        position: "relative",
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        }),
    }));

    const handleClose = () => {
        setOpen(false);
    };

    const [allCountriesAndStates, setAllContriesAndStates] = useState([]);
    console.log(allCountriesAndStates, 10101918);

    useEffect(() => {
        const getAll = async () => {
            try {
                const res = await getCountries();
                setAllContriesAndStates(res);
            } catch (err) {
                console.log(err, 2242424);
            }
        };
        getAll();
    }, []);

    const formInputGroups = {
        country: {
            key: "country",
            label: "Country",
            value: formLocationDetails.country,
            options: Array.isArray(allCountriesAndStates)
                ? [...new Set(allCountriesAndStates?.map((item) => item?.name))]
                : [],
            required: true,
            isAutoComplete: true,
        },

        state: {
            key: "state",
            label: "State",
            value: formLocationDetails.state,
            options: Array.isArray(allCountriesAndStates)
                ? allCountriesAndStates
                      ?.find(
                          (item) => item?.name === formLocationDetails?.country
                      )
                      ?.states.map((item) => item?.name)
                : [],
            required: true,
            isAutoComplete: true,
        },

        city: {
            key: "city",
            label: "City",
            value: formLocationDetails.city,
            required: true,
            isAutoComplete: false,
        },
    };

    const handleOnChange = (field) => async(value) => {
        if (field === "country") {
            const state =
                allCountriesAndStates
                    ?.find((item) => item?.name === value)
                    ?.states.map((item) => item?.name) || [];
            setFormLocationDetails((prev) => ({
                ...prev,
                state: state[0],
                [field]: value,
            }));
            const res = await axios.get(`https://api.countrystatecity.in/v1/countries/[ciso]/states/[siso]/cities`, )
        } else {
            setFormLocationDetails((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const [topLocations, setTopLocations] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await axios.post(
            "http://localhost:3000/api/locations",
            formLocationDetails,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Fetch photo URLs for each location and update topLocations state
        const locationsWithPhotos = await Promise.all(
            res?.data?.data?.map(async (room) => {
                const key_id = room?.fsq_id;
                const photoRes = await axios.get(
                    `https://api.foursquare.com/v3/places/${key_id}/photos`,
                    {
                        headers: {
                            Authorization:
                                "fsq3yi9Quz+0xvcDUO5vBIbsBXtqxkigRojt4jM5luFitic=",
                        },
                    }
                );
                const img =
                    photoRes?.data?.[0]?.prefix && photoRes?.data?.[0]?.suffix
                        ? photoRes?.data?.[0]?.prefix +
                          "original" +
                          photoRes?.data?.[0]?.suffix
                        : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                return { ...room, img };
            })
        );
        console.log(locationsWithPhotos, 281716161);
        setTopLocations(locationsWithPhotos);
    };

    console.log(topLocations, "main papa");

    return (
        <Box className="!overflow-hidden">
            <Main open={open}>
                <div className="my-10 container">
                    <Button className="!ml-auto" onClick={() => setOpen(!open)}>
                        Search By Place
                    </Button>
                    {topLocations && (
                        <div>
                            {topLocations.length > 0 && (
                                <div>
                                    <h1 className="border-b-2 mx-10 mt-20 text-3xl">
                                        Location: Country -{" "}
                                        {formLocationDetails.country}, State -{" "}
                                        {formLocationDetails.state}, City -{" "}
                                        {formLocationDetails.city}
                                    </h1>
                                    <div className="grid lg:grid-cols-3 gap-5 mx-10 mt-10">
                                        {topLocations.map((room) => (
                                            <>
                                                {console.log(
                                                    room?.fsq_id,
                                                    29282726262
                                                )}
                                                <Cards
                                                    key={room?.fsq_id}
                                                    image={
                                                        room?.img ||
                                                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                                    }
                                                    rating={room?.rating}
                                                    title={room?.name}
                                                    description={
                                                        room?.description
                                                    }
                                                    address={
                                                        room?.location
                                                            ?.formatted_address
                                                    }
                                                />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <h1 className="border-b-2 mx-10 text-3xl">
                        Location - Indore
                    </h1>
                    <div className="grid lg:grid-cols-3 gap-5 mx-10 mt-10">
                        {rooms.map((room, index) => (
                            <Cards
                                key={index}
                                image={room.img}
                                rating={room.rating}
                                title={room.title}
                                description={room.description}
                                address={room.address}
                            />
                        ))}
                    </div>

                    <h1 className="border-b-2 mx-10 mt-20 text-3xl">
                        Location - MHOW
                    </h1>
                    <div className="grid lg:grid-cols-3 gap-5 mx-10 mt-10">
                        {rooms.map((room, index) => (
                            <Cards
                                key={index}
                                image={room.img}
                                rating={room.rating}
                                title={room.title}
                                description={room.description}
                                address={room.address}
                            />
                        ))}
                    </div>
                </div>
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        height: "calc(100% - 64px)", // Drawer height adjusted
                        top: 64, // Start below the navbar (assuming navbar height is 64px)
                        position: "fixed", // Position the drawer below the navbar
                    },
                }}
                variant="persistent"
                anchor="right"
                onClose={handleClose}
                open={open}
            >
                <Box
                    className="!h-full !w-full"
                    component="form"
                    onSubmit={handleSearch}
                >
                    <Typography variant="h5" className="!p-6">
                        Search By{" "}
                    </Typography>
                    <Divider className="!mb-5" />
                    {Object.entries(formInputGroups).map((val, index) => (
                        <>
                            {console.log(val, " ----- ")}
                            <FormInput
                                {...val[1]}
                                onChange={handleOnChange(val[1]?.key)}
                            />
                        </>
                    ))}

                    <Box className="!pl-5 !flex !items-center !gap-5 mt-2">
                        <Button type="submit">Search</Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}
