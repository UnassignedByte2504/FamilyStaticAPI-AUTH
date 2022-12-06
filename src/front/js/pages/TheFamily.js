import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Box } from "@mui/system";
import { Formik, useFormik } from "formik";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import Header from "../component/Header";
import { TextField, MenuItem } from "@mui/material";

export const TheFamily = () => {
  const { actions, store } = useContext(Context);
  const [data, setData] = useState([]);
  const [families, setFamilies] = useState({});
  const [selectedFamily, setSelectedFamily] = useState("all");
  useEffect(() => {
    actions.fetchFamilyMembers(selectedFamily);
  }, [selectedFamily]);

  useEffect(() => {
    setData(store.family_members);
    console.log(store.family_members);
  }, [store.family_members]);
  useEffect(() => {
    actions.getFamilies();
  }, []);
  useEffect(() => {
    setFamilies(store?.families);
  }, [store?.families]);

  const handleChange = (e) => {
    setSelectedFamily(e.target.value)
  }
  console.log( "family" + selectedFamily)
  const { values, errors, touched } =
    useFormik({
      initialValues: {
        lastName: "",
      },
    });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-column--cell",
    },
    {
      field: "first_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Family",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "birth_day",
      headerName: "Birthday",
      flex: 1,
      cellClassName: "content-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "content-column--cell",
    },
    {
      field: "lucky_number",
      headerName: "Lucky Number",
      flex: 1,
      cellClassName: "content-column--cell",
    },
    {
      field: "creation_date",
      headerName: "Creation Date",
      flex: 1,
      cellClassName: "content-column--cell",
    },
  ];
  return (
    <Box m="20px">
      <Header title="The Family" subtitle="Jackson's Family" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: "",
          },
          "& .name-column--cell": {
            color: "#94e2cd",
          },
          "& .id-column--cell": {
            color: "#bc93f3",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",
            fontWeight: "700",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: `"#b7ebde" !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `"#e0e0e0" !important`,
          },
          "& .content-column--cell": {
            color: "#e0e0e0 !important",
          },
        }}
      >
        {store.families ? (
          <div className="Light">
          <TextField
            name="lastName"
            label="Family"
            select
            value={selectedFamily}
            onChange={handleChange}
            helperText="Please select a family"
          >
            <MenuItem value="all">All</MenuItem>
            {store?.families?.map((option) => (
              <MenuItem key={option.id} value={option.last_name}>
                {option.last_name}
              </MenuItem>
            ))}
          </TextField></div>
        ) : (
          <></>
        )}
        {data ? (
          <DataGrid
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          "loading"
        )}
      </Box>
    </Box>
  );
};
