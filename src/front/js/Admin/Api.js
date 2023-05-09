
export const BASE_URL = 'https://3001-alanmandria-proyectofin-n3e0vqipd3q.ws-us96b.gitpod.io';



const api = {

  
  getProductosByGenere: (genere) => {
    return fetch(`${BASE_URL}/api/products?genere=${genere}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos por género');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener los productos por género:', error);
        throw error;
      });
  },

 deleteCategory: async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: "Error al eliminar la categoría" };
    }
  } catch (error) {
    return { success: false, message: "Error al eliminar la categoría" };
  }
},
  getProducts: () => {
    return fetch(`${BASE_URL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        throw error;
      });
  },

  getCategories: () => {
    return fetch(`${BASE_URL}/api/categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
        throw error;
      });
  },

  addCategory: (name) => {
    return fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error al agregar la categoría:', error);
        throw error;
      });
  },


  getProductById: (productId) => {
    return fetch(`${BASE_URL}/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        throw error;
      });
  },

  addProduct: (product) => {
    return fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error al agregar el producto:', error);
        throw error;
      });
  },

  updateProduct: (productId, product) => {
    return fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
        throw error;
      });
  },


  deleteProduct: (productId) => {
    return fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        throw error;
      });
  },



  getCategoryById: (categoryId) => {
    return fetch(`${BASE_URL}/api/categories/${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la categoría');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener la categoría:', error);
        throw error;
      });
  },

  getInventory: () => {
    return fetch(`${BASE_URL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener el inventario');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener el inventario:', error);
        throw error;
      });
  },

  addProductQuantity: (productId, quantity) => {
    return fetch(`${BASE_URL}/api/products/${productId}/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al agregar cantidad al producto');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al agregar cantidad al producto:', error);
        throw error;
      });
  },

  getProductsByCategory: (categoryId) => {
    return fetch(`${BASE_URL}/api/categories/${categoryId}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos de la categoría');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener los productos de la categoría:', error);
        throw error;
      });
  },

  subtractProductQuantity: (productId, quantity) => {
    return fetch(`${BASE_URL}/api/products/${productId}/remove`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al restar cantidad al producto');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al restar cantidad al producto:', error);
        throw error;
      });
  },

  getProductCountByCategory: (categoryId) => {
    return fetch(`${BASE_URL}/api/categories/${categoryId}/product_count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la cantidad de productos para la categoría');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener la cantidad de productos para la categoría:', error);
        throw error;
      });
  },
  addToCart: (productId, quantity) => {
    return fetch(`${BASE_URL}/api/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al agregar el producto al carrito');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Producto agregado al carrito:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error al agregar el producto al carrito:', error);
      throw error;
    });
  }
  
  
};
  
  


export default api;