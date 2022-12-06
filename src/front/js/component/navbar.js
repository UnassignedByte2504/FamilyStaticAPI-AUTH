import { arrayOf } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { Button, Box } from "@mui/material";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';

export const Navbar = () => {

	const token = sessionStorage.getItem("token");
	const {actions, store}= useContext(Context);

	const userFirstName = store.user_info ? store.user_info.first_name : "";
    const userLastName = store.user_info ? store.user_info.last_name : "";


	const Item = ({to, title, logout}) => {
		const Navigate = useNavigate();

		const logOut = () => {
			if (logout) {
				Navigate("/");
				sessionStorage.removeItem("token");
				actions.cleanUserInfo()
				}
		}

		return (
			
			<Button sx={{margin: "0 10px 0 0"}} variant="outlined"><Link className="MsLink"to={to} onClick={() => logOut()}>{title}</Link></Button>
		)
		}
	return (
		<nav className="navbar navbar-light NavBar">
			<div className="container">
					<Box display="flex" justifyContent="space-between" alignItems="center">
					<Item to="/home" title={<HomeIcon />} />
					<h5 className="Welcome">{userFirstName} {userLastName}</h5>
					</Box>
					

				<div className="ml-auto">
					{token ? null : <Item to="/signup" title="Sign Up"/>}
					{token ? <Item to="/" title="Log out" logout={true}/> : <Item to="/login" title="Log in" />}
				</div>
			</div>
		</nav>
	);
};
