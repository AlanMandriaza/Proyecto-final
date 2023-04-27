import React, { useContext, useState } from "react";
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from "react-icons/ai"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ProductosMujer = () => {
    const { store, actions } = useContext(Context);


    const [isCamisetas, setIsCamisetas] = useState(false);
    const [isPantalones, setIsPantalones] = useState(false);
    const [isZapatos, setIsZapatos] = useState(false);
    const [isChaquetas, setIsChaquetas] = useState(false);
    const [isVestidos, setIsVestidos] = useState(false);
    const [isAccesorios, setIsAccesorios] = useState(false);
    const [isCalcetines, setIsCalcetines] = useState(false);
    const [isRopaInterior, setIsRopaInterior] = useState(false);
    const [isRopaDeDeporte, setIsRopaDeDeporte] = useState(false);
    const [isZapatillas, setIsZapatillas] = useState(false);
    const [isDeporte, setIsDeporte] = useState(false);
    const [isRopaDeBano, setIsRopaDeBano] = useState(false);
    const [isTrajeDeBaño, setIsTrajeDeBaño] = useState(false);
    const [isAbrigos, setIsAbrigos] = useState(false);
    const [isGorrosYSombreros, setIsGorrosYSombreros] = useState(false);
    const [isJoyeria, setIsJoyeria] = useState(false);
    const [isLanceria, setIsLanceria] = useState(false);
    const [isRopaDeDormir, setIsRopaDeDormir] = useState(false);
    const [isDisfraces, setIsDisfraces] = useState(false);
    const [isRopaDeTrabajo, setIsRopaDeTrabajo] = useState(false);
    const [isRopaParaMascotas, setIsRopaParaMascotas] = useState(false);

    const turnRating = (rating) => {
        if (rating === 1) {
            return (<><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></>)
        } else if (rating === 2) {
            return (<><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></>)
        } else if (rating === 3) {
            return (<><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /></>)
        } else if (rating === 4) {
            return (<><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /></>)
        } else {
            return (<><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></>)
        }
    }

    const turnIntoClass = (item) => {
        if (item.category === "Camisetas") {
            return (isCamisetas ? ("col") : ("col d-none"))
        } else if (item.category === "Pantalones") {
            return (isPantalones ? ("col") : ("col d-none"))
        } else if (item.category === "Zapatos") {
            return (isZapatos ? ("col") : ("col d-none"))
        } else if (item.category === "Chaquetas") {
            return (isChaquetas ? ("col") : ("col d-none"))
        } else if (item.category === "Vestidos") {
            return (isVestidos ? ("col") : ("col d-none"))
        } else if (item.category === "Accesorios") {
            return (isAccesorios ? ("col") : ("col d-none"))
        } else if (item.category === "Calcetines") {
            return (isCalcetines ? ("col") : ("col d-none"))
        } else if (item.category === "Ropa interior") {
            return (isRopaInterior ? ("col") : ("col d-none"))
        } else if (item.category === "Ropa de deporte") {
            return (isRopaDeDeporte ? ("col") : ("col d-none"))
        } else if (item.category === "Zapatillas") {
            return (isZapatillas ? ("col") : ("col d-none"))
        } else if (item.category === "Deporte") {
            return (isDeporte ? ("col") : ("col d-none"))
        } else if (item.category === "Ropa de bano") {
            return (isRopaDeBano ? ("col") : ("col d-none"))
        } else if (item.category === "Trajes de baño") {
            return (isTrajeDeBaño ? ("col") : ("col d-none"))
        } else if (item.category === "Abrigos") {
            return (isAbrigos ? ("col") : ("col d-none"))
        } else if (item.category === "Gorros y sombreros") {
            return (isGorrosYSombreros ? ("col") : ("col d-none"))
        } else if (item.category === "Joyeria") {
            return (isJoyeria ? ("col") : ("col d-none"))
        } else if (item.category === "Lanceria") {
            return (isLanceria ? ("col") : ("col d-none"))
        } else if (item.category === "Ropa de dormir") {
            return (isRopaDeDormir ? ("col") : ("col d-none"))
        } else if (item.category === "Disfraces") {
            return (isDisfraces ? ("col") : ("col d-none"))
        } else if (item.category === "Ropa de trabajo") {
            return (isRopaDeTrabajo ? ("col") : ("col d-none"))
        } else if (item.category === "Ropa para mascotas") {
            return (isRopaParaMascotas ? ("col") : ("col d-none"))
        }
    }


    //const [productos, setProductos] = useState(categories)

    if (!isCamisetas && !isPantalones && !isZapatos && !isChaquetas && !isVestidos && !isAccesorios && !isCalcetines && !isRopaInterior && !isRopaDeDeporte && !isZapatillas && !isDeporte && !isRopaDeBano && !isTrajeDeBaño && !isAbrigos && !isGorrosYSombreros && !isJoyeria && !isLanceria && !isRopaDeDormir && !isDisfraces && !isRopaDeTrabajo && !isRopaParaMascotas) {
        return (
            <div className="m-0 p-0 my-2">
                <div className="mx-4">
                    <div className="row">
                        <div className="col-3 border border-success">
                            <h3>Ropa Mujer</h3>
                            <h5>Categorias</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria1" onClick={() => setIsCamisetas(!isCamisetas)} />
                                <label className="form-check-label" htmlFor="categoria1">
                                    Camisetas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria2" onClick={() => setIsPantalones(!isPantalones)} />
                                <label className="form-check-label" htmlFor="categoria2">
                                    Pantalones
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria3" onClick={() => setIsZapatos(!isZapatos)} />
                                <label className="form-check-label" htmlFor="categoria3">
                                    Zapatos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria4" onClick={() => setIsChaquetas(!isChaquetas)} />
                                <label className="form-check-label" htmlFor="categoria4">
                                    Chaquetas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria5" onClick={() => setIsVestidos(!isVestidos)} />
                                <label className="form-check-label" htmlFor="categoria5">
                                    Vestidos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria6" onClick={() => setIsAccesorios(!isAccesorios)} />
                                <label className="form-check-label" htmlFor="categoria6">
                                    Accesorios
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria7" onClick={() => setIsCalcetines(!isCalcetines)} />
                                <label className="form-check-label" htmlFor="categoria7">
                                    Calcetines
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria8" onClick={() => setIsRopaInterior(!isRopaInterior)} />
                                <label className="form-check-label" htmlFor="categoria8">
                                    Ropa interior
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria9" onClick={() => setIsRopaDeDeporte(!isRopaDeDeporte)} />
                                <label className="form-check-label" htmlFor="categoria9">
                                    Ropa de deporte
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria10" onClick={() => setIsZapatillas(!isZapatillas)} />
                                <label className="form-check-label" htmlFor="categoria10">
                                    Zapatillas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria11" onClick={() => setIsDeporte(!isDeporte)} />
                                <label className="form-check-label" htmlFor="categoria11">
                                    Deporte
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria12" onClick={() => setIsRopaDeBano(!isRopaDeBano)} />
                                <label className="form-check-label" htmlFor="categoria12">
                                    Ropa de bano
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria13" onClick={() => setIsTrajeDeBaño(!isTrajeDeBaño)} />
                                <label className="form-check-label" htmlFor="categoria13">
                                    Traje de baño
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria14" onClick={() => setIsAbrigos(!isAbrigos)} />
                                <label className="form-check-label" htmlFor="categoria14">
                                    Abrigos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria15" onClick={() => setIsGorrosYSombreros(!isGorrosYSombreros)} />
                                <label className="form-check-label" htmlFor="categoria15">
                                    Gorros y sombreros
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria16" onClick={() => setIsJoyeria(!isJoyeria)} />
                                <label className="form-check-label" htmlFor="categoria16">
                                    Joyeria
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria17" onClick={() => setIsLanceria(!isLanceria)} />
                                <label className="form-check-label" htmlFor="categoria17">
                                    Lanceria
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria18" onClick={() => setIsRopaDeDormir(!isRopaDeDormir)} />
                                <label className="form-check-label" htmlFor="categoria18">
                                    Ropa de dormir
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria19" onClick={() => setIsDisfraces(!isDisfraces)} />
                                <label className="form-check-label" htmlFor="categoria19">
                                    Disfraces
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria20" onClick={() => setIsRopaDeTrabajo(!isRopaDeTrabajo)} />
                                <label className="form-check-label" htmlFor="categoria20">
                                    Ropa de trabajo
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria21" onClick={() => setIsRopaParaMascotas(!isRopaParaMascotas)} />
                                <label className="form-check-label" htmlFor="categoria21">
                                    Ropa para mascotas
                                </label>
                            </div>
                        </div>
                        <div className="col-9 border border-primary container-fluid">
                            <div className="row row-cols-xm-1 row-cols-sm-2 row-cols-md-3 g-4">
                                {store.mujer.map((item, index) => (
                                    <div className="col" key={index}>
                                        <div className="card" style={{ width: "18rem" }}>
                                            <Link to="/"><img src={item.image} className="card-img-top" /></Link>
                                            <div className="card-body">
                                                <Link to="/" className="text-decoration-none text-dark"><h5 className="card-title">{item.name}</h5></Link>
                                                <span className="card-text fs-4">${item.price}</span><span className="card-text float-end icon-color fs-4"><AiOutlineHeart /></span><br />
                                                <button type="button" className="btn btn-lg w-100 text-light button-color" onClick={() => alert("hola")}>Agreagar al carrito</button>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="m-0 p-0 my-2">
                <div className="mx-4">
                    <div className="row">
                        <div className="col-3 border border-success">
                            <h3>Ropa Mujer</h3>
                            <h5>Categorias</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria1" onClick={() => setIsCamisetas(!isCamisetas)} />
                                <label className="form-check-label" htmlFor="categoria1">
                                    Camisetas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria2" onClick={() => setIsPantalones(!isPantalones)} />
                                <label className="form-check-label" htmlFor="categoria2">
                                    Pantalones
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria3" onClick={() => setIsZapatos(!isZapatos)} />
                                <label className="form-check-label" htmlFor="categoria3">
                                    Zapatos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria4" onClick={() => setIsChaquetas(!isChaquetas)} />
                                <label className="form-check-label" htmlFor="categoria4">
                                    Chaquetas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria5" onClick={() => setIsVestidos(!isVestidos)} />
                                <label className="form-check-label" htmlFor="categoria5">
                                    Vestidos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria6" onClick={() => setIsAccesorios(!isAccesorios)} />
                                <label className="form-check-label" htmlFor="categoria6">
                                    Accesorios
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria7" onClick={() => setIsCalcetines(!isCalcetines)} />
                                <label className="form-check-label" htmlFor="categoria7">
                                    Calcetines
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria8" onClick={() => setIsRopaInterior(!isRopaInterior)} />
                                <label className="form-check-label" htmlFor="categoria8">
                                    Ropa interior
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria9" onClick={() => setIsRopaDeDeporte(!isRopaDeDeporte)} />
                                <label className="form-check-label" htmlFor="categoria9">
                                    Ropa de deporte
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria10" onClick={() => setIsZapatillas(!isZapatillas)} />
                                <label className="form-check-label" htmlFor="categoria10">
                                    Zapatillas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria11" onClick={() => setIsDeporte(!isDeporte)} />
                                <label className="form-check-label" htmlFor="categoria11">
                                    Deporte
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria12" onClick={() => setIsRopaDeBano(!isRopaDeBano)} />
                                <label className="form-check-label" htmlFor="categoria12">
                                    Ropa de bano
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria13" onClick={() => setIsTrajeDeBaño(!isTrajeDeBaño)} />
                                <label className="form-check-label" htmlFor="categoria13">
                                    Traje de baño
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria14" onClick={() => setIsAbrigos(!isAbrigos)} />
                                <label className="form-check-label" htmlFor="categoria14">
                                    Abrigos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria15" onClick={() => setIsGorrosYSombreros(!isGorrosYSombreros)} />
                                <label className="form-check-label" htmlFor="categoria15">
                                    Gorros y sombreros
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria16" onClick={() => setIsJoyeria(!isJoyeria)} />
                                <label className="form-check-label" htmlFor="categoria16">
                                    Joyeria
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria17" onClick={() => setIsLanceria(!isLanceria)} />
                                <label className="form-check-label" htmlFor="categoria17">
                                    Lanceria
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria18" onClick={() => setIsRopaDeDormir(!isRopaDeDormir)} />
                                <label className="form-check-label" htmlFor="categoria18">
                                    Ropa de dormir
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria19" onClick={() => setIsDisfraces(!isDisfraces)} />
                                <label className="form-check-label" htmlFor="categoria19">
                                    Disfraces
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria20" onClick={() => setIsRopaDeTrabajo(!isRopaDeTrabajo)} />
                                <label className="form-check-label" htmlFor="categoria20">
                                    Ropa de trabajo
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="categoria21" onClick={() => setIsRopaParaMascotas(!isRopaParaMascotas)} />
                                <label className="form-check-label" htmlFor="categoria21">
                                    Ropa para mascotas
                                </label>
                            </div>
                        </div>
                        <div className="col-9 border border-primary container-fluid">
                            <div className="row row-cols-xm-1 row-cols-sm-2 row-cols-md-3 g-4">
                                {store.mujer.map((item, index) => (
                                    <div className={turnIntoClass(item)} key={index}>
                                        <div className="card" style={{ width: "18rem" }}>
                                            <Link to="/"><img src={item.image} className="card-img-top" /></Link>
                                            <div className="card-body">
                                                <Link to="/" className="text-decoration-none text-dark"><h5 className="card-title">{item.name}</h5></Link>
                                                <span className="card-text fs-4">${item.price}</span><span className="card-text float-end icon-color fs-4"><AiOutlineHeart /></span><br />
                                                <button type="button" className="btn btn-lg w-100 text-light button-color" onClick={() => alert("hola")}>Agreagar al carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}