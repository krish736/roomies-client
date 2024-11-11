import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Rooms from "./pages/Rooms.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Header from "./components/Header.jsx";
import Error from "./pages/Error.jsx";
import Contact from "./pages/Contact.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import DashboardProfile from "./components/DashboardProfile.jsx";
import DashboardUpdate from "./components/DashboardUpdate.jsx";
import Signout from "./components/Signout.jsx";
import DashboardUsers from "./components/DashboardUsers.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DashboardDelete from "./components/DashboardDelete.jsx";

function Layout({ children, showHeaderFooter }) {
    return (
        <>
            {showHeaderFooter && <Header />}
            <main className="min-h-svh">{children}</main>
            {showHeaderFooter && <FooterComponent />}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout showHeaderFooter={true}>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <Layout showHeaderFooter={true}>
                            <About />
                        </Layout>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <Layout showHeaderFooter={true}>
                            <Contact />
                        </Layout>
                    }
                />
                <Route element={<PrivateRoute />}>
                    <Route
                        path="/dashboard"
                        element={
                            <Layout showHeaderFooter={true}>
                                <Dashboard />
                            </Layout>
                        }
                    >
                        <Route path="profile" element={<DashboardProfile />} />
                        <Route path="update" element={<DashboardUpdate />} />
                        <Route path="signout" element={<Signout />} />
                        <Route path="delete" element={<DashboardDelete />} />
                        <Route path="users" element={<DashboardUsers />} />
                    </Route>
                </Route>
                <Route
                    path="/rooms"
                    element={
                        <Layout showHeaderFooter={true}>
                            <Rooms />
                        </Layout>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Layout showHeaderFooter={true}>
                            <Signin />
                        </Layout>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Layout showHeaderFooter={true}>
                            <Signup />
                        </Layout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Layout showHeaderFooter={false}>
                            <Error />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
