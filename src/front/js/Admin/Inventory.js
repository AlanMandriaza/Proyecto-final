import React, { useState, useEffect } from "react";
import "./inventario.css";
import api from "./Api";
import { Dropdown } from "react-bootstrap";



const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.getInventory().then((inventory) => {
            setInventory(inventory);
        }).catch(error => {
            setError(error.message);
        });
    }, []);

    const handleDelete = async (productId) => {
        try {
            await api.deleteProduct(productId);
            setInventory(inventory.filter(product => product.id !== productId));
            setError(null);
        } catch (error) {
            setError("Error al eliminar el producto");
        }
    };

    const handleAdd = async (productId) => {
        try {
            await api.addProductQuantity(productId, 1);
            setInventory(inventory.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            }));
            setError(null);
        } catch (error) {
            setError("Error al agregar el producto");
        }
    };

    const handleRemove = async (productId) => {
        try {
            await api.subtractProductQuantity(productId, 1);
            setInventory(inventory.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            }));
            setError(null);
        } catch (error) {
            setError("Error al quitar el producto");
        }
    };

    const handleSetQuantity = async (productId, quantity) => {
        try {
            await api.updateProductQuantity(productId, quantity);
            setInventory(inventory.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity };
                }
                return product;
            }));
            setError(null);
        } catch (error) {
            setError("Error al actualizar la cantidad del producto");
        }
    };
    const sortByPriceAsc = () => {
        setInventory([...inventory].sort((a, b) => a.price - b.price));
    };

    const sortByPriceDesc = () => {
        setInventory([...inventory].sort((a, b) => b.price - a.price));
    };

    const sortByQuantityAsc = () => {
        setInventory([...inventory].sort((a, b) => a.quantity - b.quantity));
    };

    const sortByQuantityDesc = () => {
        setInventory([...inventory].sort((a, b) => b.quantity - a.quantity));
    };


    return (
        <div>
            <h1>Inventario</h1>
            <table className="table table-striped">
                <div className="col">
                    {error && <p>{error}</p>}
                    <Dropdown>
                    <Dropdown.Toggle className="custom-dropdown-toggle">
                            Ordenar por
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item onClick={sortByPriceAsc} className="custom-dropdown-item">
                                Precio ascendente
                            </Dropdown.Item>
                            <Dropdown.Item onClick={sortByPriceDesc} className="custom-dropdown-item">
                                Precio descendente
                            </Dropdown.Item>
                            <Dropdown.Item onClick={sortByQuantityAsc} className="custom-dropdown-item">
                                Cantidad ascendente
                            </Dropdown.Item>
                            <Dropdown.Item onClick={sortByQuantityDesc} className="custom-dropdown-item">
                                Cantidad descendente
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleSetQuantity(product.id, parseInt(e.target.value))
                                    }
                                    style={{ width: '70px' }}
                                />
                                <button onClick={() => handleRemove(product.id)}>-</button>
                                <button onClick={() => handleAdd(product.id)}>+</button>
                                
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="btn btn-primary boton"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

};

export default Inventory;