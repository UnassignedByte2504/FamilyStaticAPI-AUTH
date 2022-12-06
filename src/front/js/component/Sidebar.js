import React from 'react'
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Button, Box, IconButton, Typography} from "@mui/material";

import {Link } from 'react-router-dom';


import "react-pro-sidebar/dist/css/styles.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { useContext } from "react";
import { Context } from "../store/appContext";


export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    const {actions, store} = useContext(Context);
    const userFirstName = store.user_info ? store.user_info.first_name : "";
    const userLastName = store.user_info ? store.user_info.last_name : "";

    const Item = ({to, title, icon, selected, setSelected}) => {

        return(
        <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
)
    }
  return (
    <div>
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                background: `#13304f !important`,
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                color: "#6870fa !important",
                },
            }}
        >
        <ProSidebar collapsed={isCollapsed}>
            <Menu>
            <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#e8e8e8",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant='h6'>Family API</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
            <Box display='flex' justifyContent='center' alignItems='center'>
            <img
              src='https://avatars.dicebear.com/api/initials/4geeks.svg?r=50&backgroundColors[]=cyan'
              alt="profile-user"
              width="100px"
              height="100px"
              style={{cursor:"pointer", borderRadius:"50%"}}/>
            </Box>
            <Box textAlign="center">
                <Typography
                  variant="h6"
                  color="#c2c2c2"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userFirstName} {userLastName}
                </Typography>
                <Typography variant="h5" color="#4cceac">
                  Online
                </Typography>
              </Box>
            </Box>
            
          )}
          {/* menu */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Family Members"
              to="/thefamily"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                 <Item
              title="Add a member"
              to="/memberaddition"
              icon={<PersonAddAlt1Icon/>}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
            </Menu>
        </ProSidebar>
        </Box>
    </div>
  )
}
