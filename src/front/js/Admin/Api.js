const BASE_URL = 'https://3001-alanmandria-proyectofin-hdiuzx5yfab.ws-us95.gitpod.io';

const api = {
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
};

export default api;
