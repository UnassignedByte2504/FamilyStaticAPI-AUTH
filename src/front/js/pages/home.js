import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { TextField, Button } from "@mui/material";
import {Link} from "react-router-dom"
import { useState } from "react";
import "../../styles/home.css";

export const Home = () => {
	const NavItem = ({to, title}) => {

		return (
			<Link className="MsLink" to={to}>
			<Button variant="outlined" >
				{title}
			</Button>
			</Link>
		)
	}
	const { store, actions } = useContext(Context);
	const ImgUrl = "https://picsum.photos/800/800";
	return (
		<div className="text-center mt-5">
			<div className="container bg-light">
				<div className="Jumbotron">
					<h2 className="display-4">Family Static API</h2>
					<p className="lead">
						Welcome to the family REST API, this is a simple example
						on how to use an API
					</p>
					<hr className="my-4" />
				</div>
				<div className="JumboContent">
					<div className="LeftSide">
						<img 
							src={ImgUrl}
							width="300px"
							height="300px"
							className="m-5"
						/>
					</div>
					<div className="RightSide">
						<h3>
							<strong>Why don't you join us?</strong>
						</h3>
						<p className="justifiedText me-5">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						</p>
						<NavItem to="/signup" title={'Sign up!'} />
					</div>
				</div>

					</div>
				</div>
	);
};
