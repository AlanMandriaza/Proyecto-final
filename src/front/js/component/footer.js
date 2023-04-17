import React from "react";
import { TiLocation } from "react-icons/ti"

export const Footer = () => (
	<div className="footerColor container-fluid p-4">
		<div className="row">
			<div className="col-3">
				<h4 className="mb-3"><TiLocation className="pb-1 fs-3" />Ubícanos</h4>
				<img src="https://http2.mlstatic.com/D_NQ_NP_650945-MLC53193997602_012023-O.jpg" className="img-fluid rounded img-thumbnail border border-dark" style={{ width: "210px", height: "110px" }} />
			</div>
			<div className="col-3">
				<h4>Faux Atelier</h4>
				<ul>
					<li>Tiendas</li>
					<li>Blog</li>
					<li>Contaxto</li>
					<li>Políticas de privacidad</li>
				</ul>
			</div>
			<div className="col-3">
				<h4>Información</h4>
				<ul>
					<li>Preguntas frecuentes</li>
					<li>Despachos</li>
					<li>Retiro en tienda</li>
					<li>Polítocas de pago</li>
					<li>Términos y condiciones</li>
					<li>Sigue tu pedido</li>
				</ul>
			</div>
			<div className="col-3">
				<img src="https://surfwear.sooruz.com/webshop/img/paypal-logo.png" className="img-fluid rounded mt-4" />
			</div>
		</div>

	</div>
);
