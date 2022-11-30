const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            token: "",
            name:"",
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("name");
				setStore({token: ""});
				setStore({name: ""});
			},

            login: async (email, password) => {
                const opts = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    })
                }
    
                try{
                    const resp = await fetch("http://127.0.0.1:5000/api/token", opts)
                    if(resp.status !== 200) {
                        alert("There has been some error");
                        return false;
                    };
    
                    const data = await resp.json();
                    console.log("This came from backend = ", data);
                    sessionStorage.setItem("token", data.access_token);
                    sessionStorage.setItem("name", data.name);
                    setStore({token: data.access_token});
                    setStore({name: data.name});
                    return true;
                }catch(error){
                    console.log("There has been some error logging in");
                }
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
					console.log(error)
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