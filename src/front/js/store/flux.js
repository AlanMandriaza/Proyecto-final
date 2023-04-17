const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			cart: [
				{
				  nombre: "Polera Hombre",
				  precio: 16990,
				  cantidad: 5,
				  img: "https://cdn.shopify.com/s/files/1/0249/8255/2638/products/33_2000x.png?v=1668118317",
				},
				{
				  nombre: "Poleron Mujer",
				  precio: 22990,
				  cantidad: 1,
				  img: "https://cdn.shopify.com/s/files/1/0249/8255/2638/products/poleronmujer6_2000x.png?v=1670009392",
				},
				{
				  nombre: "Pantalón cargo Mujer",
				  precio: 22990,
				  cantidad: 1,
				  img: "https://cdn.shopify.com/s/files/1/0249/8255/2638/products/cargomujer8_5000x.png?v=1670018111",
				},
			  ],
			  
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
