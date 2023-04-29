import {BASE_URL} from '../Admin/Api';


const getState = ({ getStore, setStore }) => {
	const initialState = {
	  carrito: [],
	  productos: [],
	  total:0,
	};
  
	const getStateFromLocalStorage = () => {
	  const localStorageState = localStorage.getItem("estado");
	  return localStorageState ? JSON.parse(localStorageState) : initialState;
	};
  
	const setStateToLocalStorage = (state) => {
	  localStorage.setItem("estado", JSON.stringify(state));
	};
  
	return {
	  store: getStateFromLocalStorage(),
	  actions: {
		setTotal:(valor)=>{
			setStore({total:valor})
		},

		addToCart: (item) => {
		  const store = getStore();
		  const itemInCart = store.carrito.find((i) => i.id === item.id);
  
		  if (itemInCart) {
			const newCart = store.carrito.map((i) =>
			  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
			);
			const newState = { ...store, carrito: newCart };
			setStore(newState);
			setStateToLocalStorage(newState);
		  } else {
			const newCart = [...store.carrito, { ...item, quantity: 1 }];
			const newState = { ...store, carrito: newCart };
			setStore(newState);
			setStateToLocalStorage(newState);
		  }
		},
		removeFromCart: (itemIndex) => {
		  const store = getStore();
		  const newCart = [...store.carrito];
		  newCart.splice(itemIndex, 1);
		  const newState = { ...store, carrito: newCart };
		  setStore(newState);
		  setStateToLocalStorage(newState);
		},
		increaseCartItemQuantity: (itemIndex) => {
		  const store = getStore();
		  const newCart = [...store.carrito];
		  newCart[itemIndex].quantity += 1;
		  const newState = { ...store, carrito: newCart };
		  setStore(newState);
		  setStateToLocalStorage(newState);
		},
		decreaseCartItemQuantity: (itemIndex) => {
		  const store = getStore();
		  const newCart = [...store.carrito];
		  if (newCart[itemIndex].quantity > 1) {
			newCart[itemIndex].quantity -= 1;
			const newState = { ...store, carrito: newCart };
			setStore(newState);
			setStateToLocalStorage(newState);
		  } else {
			newCart.splice(itemIndex, 1);
			const newState = { ...store, carrito: newCart };
			setStore(newState);
			setStateToLocalStorage(newState);
		  }
		},
		getProducts: async () => {
		  try {
			const resp = await fetch(`${BASE_URL}`);
			const data = await resp.json();
			const newState = { ...getStore(), productos: data };
			setStore(newState);
			setStateToLocalStorage(newState);
		  } catch (error) {
			console.error(error);
		  }
		},
		getCategoryById: async (id) => {
			try {
				const resp = await fetch(`${BASE_URL}/categories/${id}`);
				
				const category = await resp.json();
				return category;
			} catch (error) {
				console.error(error);
				return null;
			}
		},
		
	  },
	  getters: {
		isCartEmpty: () => {
		  const store = getStore();
		  return store.carrito.length === 0;
		},
	  },
	};
  };
  
  export default getState;
  