import React, { useState, useEffect } from "react";
import "./inventario.css";
import api from "./Api";

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

    const sortByPrice = () => {
        setInventory([...inventory].sort((a, b) => a.price - b.price));
    };

    const sortByQuantity = () => {
        setInventory([...inventory].sort((a, b) => a.quantity - b.quantity));
    };

    return (
        <div>
            <h1>Inventario</h1>
            <table className="table">
            <button onClick={sortByPrice}>Ordenar por precio</button>
            <button onClick={sortByQuantity}>Ordenar por cantidad</button>
           
                <thead className="cell">
                    <tr className="cell">
                        <th className="cell">Nombre</th>
                        <th className="cell">Descripción</th>
                        <th className="cell">Categoría</th>
                        <th className="cell">Precio</th>
                        <th className="cell">Stock</th>
                        <th className="cell">Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {inventory.map((product) => (
                        <tr key={product.id} className="cell">
                            <td className="cell">{product.name}</td>
                            <td className="cell">{product.description}</td>
                            <td className="cell">{product.category}</td>
                            <td className="cell">{product.price}</td>
                            <td className="cell">
                                <input
                                    type="number"
                                    min="0"
                                    value={product.quantity}
                                    onChange={(e) => handleSetQuantity(product.id, parseInt(e.target.value))}
                                    style={{ width: "70px" }} />
                                <button onClick={() => handleAdd(product.id)}>+</button>
                                <button onClick={() => handleRemove(product.id)}>-</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(product.id)} className="boton">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Inventory;