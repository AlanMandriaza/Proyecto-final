import React, { useState, useEffect, useRef } from "react";
import "../../styles/inventario.css";

import api from "./Api";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    useEffect(() => {
        api.getInventory()
            .then((inventory) => {
                setInventory(inventory);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const showDeleteConfirmation = (productId) => {
        setProductIdToDelete(productId);
        setModal(true);
    };
    const confirmDelete = () => {
        handleDelete(productIdToDelete);
        setModal(false);
    };
    const cancelDelete = () => {
        setModal(false);
    };

    const handleDelete = async (productId) => {
        try {
            await api.deleteProduct(productId);
            setInventory(inventory.filter((product) => product.id !== productId));
            setError(null);
        } catch (error) {
            setError("Error al eliminar el producto");
        }
    };

    const handleAdd = async (productId) => {
        try {
            await api.addProductQuantity(productId, 1);
            setInventory((prevInventory) =>
                prevInventory.map((product) => {
                    if (product.id === productId) {
                        return { ...product, quantity: product.quantity + 1 };
                    }
                    return product;
                })
            );
            setError(null);
        } catch (error) {
            setError("Error al agregar el producto");
        }
    };

    const handleRemove = async (productId) => {
        try {
            await api.subtractProductQuantity(productId, 1);
            setInventory((prevInventory) =>
                prevInventory.map((product) => {
                    if (product.id === productId) {
                        return { ...product, quantity: product.quantity - 1 };
                    }
                    return product;
                })
            );
            setError(null);
        } catch (error) {
            setError("Error al quitar el producto");
        }
    };

    const handleSetQuantity = async (productId, quantity) => {
        try {
            await api.updateProductQuantity(productId, quantity);
            setInventory((prevInventory) =>
                prevInventory.map((product) => {
                    if (product.id === productId) {
                        return { ...product, quantity };
                    }
                    return product;
                })
            );
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

    const ProductQuantity = ({ productId, quantity }) => {
        return (
            <div>
                <input
                    type="number"
                    min="0"
                    step="1"
                    value={quantity}
                    onChange={(e) =>
                        handleSetQuantity(productId, parseInt(e.target.value))
                    }
                    style={{ width: "50px" }}
                    aria-label="Cantidad"
                />
                <button
                    onClick={() => handleRemove(productId)}
                    aria-label="Quitar uno"
                >
                    -
                </button>
                <button onClick={() => handleAdd(productId)} aria-label="Agregar uno">
                    +
                </button>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-center mb-3">Inventario</h1>
            <div className="col-md-12">
                {error && <p>{error}</p>}
                <Dropdown className="mb-4">
                    <Dropdown.Toggle className="custom-dropdown-toggle text-white">
                        Ordenar por
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="custom-dropdown-menu">
                        <Dropdown.Item
                            onClick={sortByPriceAsc}
                            className="custom-dropdown-item text-white"
                        >
                            Precio ascendente
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={sortByPriceDesc}
                            className="custom-dropdown-item text-white"
                        >
                            Precio descendente
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={sortByQuantityAsc}
                            className="custom-dropdown-item text-white"
                        >
                            Cantidad ascendente
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={sortByQuantityDesc}
                            className="custom-dropdown-item text-white"
                        >
                            Cantidad descendente
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td style={{ width: "350px" }}>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <ProductQuantity
                                        productId={product.id}
                                        quantity={product.quantity}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => showDeleteConfirmation(product.id)}
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
            <Modal isOpen={modal} toggle={cancelDelete}>
                <ModalHeader toggle={cancelDelete}>Confirmar eliminación</ModalHeader>
                <ModalBody>
                    ¿Estás seguro de que deseas eliminar este producto?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={confirmDelete}>Eliminar</Button>{' '}
                    <Button color="secondary" onClick={cancelDelete}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
};

export default Inventory;