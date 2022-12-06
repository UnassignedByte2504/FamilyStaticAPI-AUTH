import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			LogOut: () =>{
				// delete user info and token
				Navigate("/home")
				sessionStorage.removeItem('token')
				setStore({
					user_info: null
				})
			},
			fetchUser: async (access_token) =>{
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${access_token}`
					}
				}
				const response = await fetch('https://3001-4geeksacade-reactflaskh-yr9yengmj8h.ws-eu77.gitpod.io/api/user_login', options
				)
				const data = await response.json()
				setStore({
					user_info: data
					// message: data.message
				})
			},
			fetchFamilyMembers: async (Family) =>{
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${sessionStorage.getItem('token')}`
					}
				}
				const response = await fetch(`https://3001-4geeksacade-reactflaskh-yr9yengmj8h.ws-eu77.gitpod.io/api/families/${Family}/members`, options
				)
				const data = await response.json()
				setStore({
					family_members: data 
				})
			},
			getFamilies: async () =>{
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${sessionStorage.getItem('token')}`
					}
				}
				const response = await fetch('https://3001-4geeksacade-reactflaskh-yr9yengmj8h.ws-eu77.gitpod.io/api/families', options
				)
				const data = await response.json()
				setStore({
					families: data 
				})
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
