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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch("https://3001-alanmandria-proyectofin-2pdsxmfwi69.ws-us96.gitpod.io/api/hello")
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
					const resp = await fetch("https://3001-alanmandria-proyectofin-na0p9oacdmc.ws-us96.gitpod.io")
					const data = await resp.json()
					setStore({ productos: data })

					for(let i = 0; i < store.productos.length; i++){
						if(store.productos[i].genere === "Mujer"){
							let newArray1 = store.mujer.concat(store.productos[i])
							setStore({ mujer: newArray1 })
						} else if(store.productos[i].genere === "Hombre"){
							let newArray2 = store.hombre.concat(store.productos[i])
							setStore({ hombre: newArray2 })
						} else {
							//let newArray3 = store.infante.concat(store.productos[i])
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