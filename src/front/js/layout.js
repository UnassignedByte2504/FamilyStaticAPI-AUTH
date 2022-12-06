import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";


import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login"
import { UserProfile } from "./pages/UserProfile";
import { Sidebar } from "./component/Sidebar";
import { TheFamily } from "./pages/TheFamily";
import { MemberAddition } from "./pages/MemberAddition";

import { useState } from "react";


//create your first component
const Layout = () => {
    
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const hasJWT = () => {
        let flag = false
        sessionStorage.getItem('token') ? flag = true : flag = false
        return flag
    }

    const basename = process.env.BASENAME || "";
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <div className="container app">
                {hasJWT()?<Sidebar isSidebar={isSidebar} />:null}
                    <main className="content">
                    <Navbar setIsSidebar={setIsSidebar} />
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<UserProfile />} path="/user_profile" />
                        <Route element={hasJWT() ? <TheFamily /> : <Login />} path="/thefamily" />
                        <Route element={<MemberAddition />} path="/memberaddition" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
