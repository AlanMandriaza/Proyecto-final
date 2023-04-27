const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			productos: [],
			mujer: [],
			hombre: [],
			infante: [],
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
			// Use getActions to call a function within a function
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
			},
			getProducts: async () => {
				const store = getStore()
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/products/")
					const data = await resp.json()
					setStore({ productos: data })

					for(let i = 0; i < data.length; i++){
						if(data[i].genere === "Mujer"){
							let newArray1 = store.mujer.concat(data[i])
							setStore({ mujer: newArray1 })
						} else if(data[i].genere === "Hombre"){
							let newArray2 = store.hombre.concat(data[i])
							setStore({ hombre: newArray2 })
						} else {
							//let newArray3 = store.infante.concat(data[i])
							//setStore({ infante: newArray3 })
							console.log("no hay productos infante")
						}
					}

				} catch(error) {
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
