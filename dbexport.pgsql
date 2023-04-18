--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO gitpod;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.cart_items OWNER TO gitpod;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_items_id_seq OWNER TO gitpod;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer,
    created_at timestamp without time zone NOT NULL,
    ordered boolean NOT NULL
);


ALTER TABLE public.carts OWNER TO gitpod;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO gitpod;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO gitpod;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO gitpod;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    payment_id integer,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO gitpod;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO gitpod;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payment_items; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.payment_items (
    id integer NOT NULL,
    product_id integer,
    quantity integer NOT NULL
);


ALTER TABLE public.payment_items OWNER TO gitpod;

--
-- Name: payment_items_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.payment_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_items_id_seq OWNER TO gitpod;

--
-- Name: payment_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.payment_items_id_seq OWNED BY public.payment_items.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    amount double precision NOT NULL
);


ALTER TABLE public.payments OWNER TO gitpod;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO gitpod;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    description character varying(500) NOT NULL,
    price double precision NOT NULL,
    image character varying(500) NOT NULL,
    category_id integer,
    quantity integer NOT NULL
);


ALTER TABLE public.products OWNER TO gitpod;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO gitpod;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    comment character varying(500) NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.reviews OWNER TO gitpod;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO gitpod;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO gitpod;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO gitpod;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO gitpod;

--
-- Name: users; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(200) NOT NULL,
    is_active boolean NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    date_of_birth date,
    address character varying(120),
    city character varying(80),
    country character varying(80),
    phone_number character varying(20),
    avatar character varying(120)
);


ALTER TABLE public.users OWNER TO gitpod;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO gitpod;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payment_items id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.payment_items ALTER COLUMN id SET DEFAULT nextval('public.payment_items_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.alembic_version (version_num) FROM stdin;
322e37d3c86c
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.cart_items (id, cart_id, product_id, quantity) FROM stdin;
43	17	1	4
44	17	21	4
45	17	23	4
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.carts (id, user_id, created_at, ordered) FROM stdin;
17	\N	2023-04-18 22:50:42.074864	f
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.categories (id, name) FROM stdin;
1	Camisetas
2	Pantalones
3	Zapatos
4	Chaquetas
5	Vestidos
6	Accesorios
7	Calcetines
8	Ropa interior
9	Ropa de deporte
11	Zapatillas
12	Deporte
10	Ropa de bano
13	Trajes de baño
14	Abrigos
15	Gorros y sombreros
16	Joyería
17	Lencería
18	Ropa de dormir
19	Disfraces
20	Ropa de trabajo
21	Ropa para mascotas
22	Mujer
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.orders (id, user_id, payment_id, created_at) FROM stdin;
\.


--
-- Data for Name: payment_items; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.payment_items (id, product_id, quantity) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.payments (id, amount) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.products (id, name, description, price, image, category_id, quantity) FROM stdin;
2	Zapatilla barata	zapatilla barata	5000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	11	100
3	Botas de cuero	Botas de cuero para hombre, de color marrón oscuro.	75000	https://via.placeholder.com/300x300.png?text=Botas+de+cuero	3	75
4	Chaqueta impermeable	Chaqueta impermeable para mujer, ideal para días lluviosos.	45000	https://via.placeholder.com/300x300.png?text=Chaqueta+impermeable	4	60
5	Pantalones de mezclilla	Pantalones de mezclilla para hombre, de color negro.	55000	https://via.placeholder.com/300x300.png?text=Pantalones+de+mezclilla	2	80
6	Vestido de noche	Vestido de noche para mujer, con detalles de encaje y pedrería.	95000	https://via.placeholder.com/300x300.png?text=Vestido+de+noche	5	45
7	Accesorios para cabello	Set de accesorios para cabello, que incluye pasadores, broches y pinzas.	12000	https://via.placeholder.com/300x300.png?text=Accesorios+para+cabello	6	120
8	Calcetines deportivos	Calcetines deportivos para hombre, de color blanco y gris.	8000	https://via.placeholder.com/300x300.png?text=Calcetines+deportivos	7	90
9	Ropa interior femenina	Set de 3 prendas de ropa interior femenina, de encaje y algodón.	25000	https://via.placeholder.com/300x300.png?text=Ropa+interior+femenina	8	65
10	Jeans deslavados	Jeans de alta calidad, lavado a la piedra y desgastado, de color azul oscuro.	45000	https://example.com/jeans-deslavados.jpg	2	80
11	Chaqueta de cuero	Chaqueta de cuero para hombre, color marrón, con cierre de cremallera y bolsillos con cremallera.	89000	https://example.com/chaqueta-cuero.jpg	4	30
12	Sudadera con capucha	Sudadera de algodón con capucha para mujer, de color rosa con estampado floral.	35000	https://example.com/sudadera-capucha.jpg	1	70
13	Zapatillas deportivas	Zapatillas deportivas para hombre, de color negro con suela blanca y logo en relieve.	78000	https://example.com/zapatillas-deportivas.jpg	11	50
14	Vestido de noche	Vestido de noche para mujer, de color rojo oscuro con encaje negro en la parte superior.	125000	https://example.com/vestido-noche.jpg	5	20
15	Pantalón de jogging	Pantalón de jogging para hombre, de color gris claro con ribetes negros y cordón en la cintura.	55000	https://example.com/pantalon-jogging.jpg	9	60
16	Bolso de mano	Bolso de mano para mujer, de cuero marrón con cierre de cremallera y asa larga.	98000	https://example.com/bolso-mano.jpg	6	25
17	Vestido de verano	Vestido de tela fresca para el verano con estampado de flores.	35000	https://example.com/images/vestido_verano.jpg	5	75
18	Pantalón de cuero	Pantalón de cuero negro para mujer con cierre de cremallera en la parte trasera.	80000	https://example.com/images/pantalon_cuero.jpg	2	20
19	Sandalias de plataforma	Sandalias de plataforma con tiras de tela en tonos pastel y suela de yute.	45000	https://example.com/images/sandalias_plataforma.jpg	3	40
20	Camisa a rayas	Camisa para hombre a rayas azules y blancas con cuello clásico.	25000	https://example.com/images/camisa_rayas.jpg	1	60
21	Jersey de lana	Jersey de lana para mujer en tonos rosas con cuello redondo.	55000	https://example.com/images/jersey_lana.jpg	4	15
22	Bikini	Bikini de dos piezas en tonos verdes con estampado de hojas.	40000	https://example.com/images/bikini.jpg	10	30
23	Jeans ajustados1	Jeans ajustados de color negro, hechos con tela elástica de alta calidad.	55000	https://example.com/jeans-ajustados.jpg	2	100
24	Zapatos deportivos	Zapatos cómodos y ligeros, ideales para correr o hacer ejercicio.	65000	https://example.com/zapatos-deportivos.jpg	3	100
25	Vestido de noche	Vestido elegante y sofisticado para ocasiones especiales.	120000	https://example.com/vestido-noche.jpg	5	50
26	Sudadera con capucha	Sudadera de algodón con capucha y bolsillo delantero.	45000	https://example.com/sudadera-capucha.jpg	9	120
27	Boxer de algodón	Boxer cómodo y transpirable de algodón.	15000	https://example.com/boxer-algodon.jpg	8	200
28	Chaqueta de cuero	Chaqueta de cuero de alta calidad, con cierre frontal y bolsillos laterales.	180000	https://example.com/chaqueta-cuero.jpg	4	30
29	Gorra de béisbol	Gorra clásica de béisbol, de algodón y con cierre ajustable.	25000	https://example.com/gorra-beisbol.jpg	6	80
30	Jeans ajustados	Jeans ajustados de alta calidad, de color negro y con detalles desgastados.	75000	https://example.com/jeans-ajustados.jpg	2	60
31	Blusa de seda	Blusa elegante de seda, con cuello redondo y mangas cortas.	110000	https://example.com/blusa-seda.jpg	5	40
32	Calcetines deportivos	Calcetines deportivos de alta calidad, transpirables y con soporte para el arco del pie.	20000	https://example.com/calcetines-deportivos.jpg	7	150
33	Traje de baño	Traje de baño de una pieza, con estampado floral y tirantes ajustables.	90000	https://example.com/traje-bano.jpg	10	20
34	Jersey de lana	Jersey de lana suave y cálida, de corte holgado y cuello redondo.	95000	https://example.com/jersey-lana.jpg	9	90
35	Sandalias de cuero	Sandalias cómodas y elegantes de cuero, con correa ajustable en el tobillo.	78000	https://example.com/sandalias-cuero.jpg	3	70
36	Pantalón corto de algodón	Pantalón corto de algodón transpirable, con bolsillos laterales y cintura elástica.	35000	https://example.com/pantalon-corto.jpg	9	120
37	Blazer de lino	Blazer ligero de lino, con cierre de botón y bolsillos con solapa.	140000	https://example.com/blazer-lino.jpg	4	40
38	Bolso de cuero	Bolso de cuero elegante y práctico, con asas y correa desmontable.	175000	https://example.com/bolso-cuero.jpg	6	25
39	Chaqueta de mezclilla	Chaqueta de mezclilla clásica, de corte holgado y con botones de metal.	85000	https://example.com/chaqueta-mezclilla.jpg	4	55
40	Botas de cuero	Botas de cuero resistentes, con suela antideslizante y cierre con cordones.	120000	https://example.com/botas-cuero.jpg	3	30
41	Top de encaje	Top de encaje delicado, con tirantes ajustables y escote en V.	65000	https://example.com/top-encaje.jpg	5	80
42	Gorra de lana	Gorra de lana suave y cálida, con diseño de rayas y pompón en la parte superior.	30000	https://example.com/gorra-lana.jpg	6	100
43	Pantalón cargo	Pantalón cargo resistente, de tela gruesa y con múltiples bolsillos.	95000	https://example.com/pantalon-cargo.jpg	2	50
44	Tennis clásicos	Tennis clásicos de lona, con suela de goma y cierre con cordones.	90000	https://example.com/tennis-clasicos.jpg	11	50
45	Sudadera con capucha	Sudadera con capucha suave y cálida, de tela gruesa y bolsillo frontal.	75000	https://example.com/sudadera-capucha.jpg	9	60
1	Zapatilla	zapatilla bonita	40000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	1	100
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.reviews (id, user_id, product_id, comment, rating) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.roles (id, name) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.user_roles (user_id, role_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.users (id, email, password, is_active, first_name, last_name, date_of_birth, address, city, country, phone_number, avatar) FROM stdin;
1	jane.doe@example.com	pbkdf2:sha256:260000$XcvbUjKYZmZntM0c$19b043dfde493f0f16f31bbed37d87b96e17925e41f0df2c58034939d8d771bd	t	Jane	Doe	1990-01-01	123 Main St	Anytown	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
2	john.doe@example.com	pbkdf2:sha256:260000$8KW7LvKV7sLvthXq$ea80c529f1b94c8d47cd9a0fcca9858f91a520ef53f41e6368d71b4c0ffdd5f8	t	John	Doe	1990-01-01	123 Main St	Anytown	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
3	susan.smith@example.com	pbkdf2:sha256:260000$kApzCTUJmGtLpryV$2921ad95a2a663d60d78356d106226f87c0bb6b2496575fd33050d549f558237	t	Susan	Smith	1990-01-01	123 Main St	Anytown	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
4	michael.smith@example.com	pbkdf2:sha256:260000$OuiDJx13ePCLjioC$a2476693ca69705b5bcb89dac5a4eb2b0b56cabf81d063c91224a52b8189c301	t	Michael	Smith	1990-01-01	123 Main St	Anytown	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
5	sara.miller@example.com	pbkdf2:sha256:260000$35Il324asJQHnGIv$275f2c82a8d59112de33848b004ee2b90fc3734f692cbc94dbb096ee1c903cac	t	Sara	Miller	1985-06-03	456 1st St	Otherville	USA	555-234-5678	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
6	alexandra.jones@example.com	pbkdf2:sha256:260000$nbX2uOQe7AoHFJ4n$f227599c5d8e790ce9e88eab521b542a79205ff2ae4f04ca8e0accd43718bb3c	t	Alexandra	Jones	1988-03-21	123 Main St	New York	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
7	bradley.thompson@example.com	pbkdf2:sha256:260000$yWl8FlONOYDecXTv$23661198976106bef56249024d17f1eb237e9f1d13e2a24472844769f0c91a18	t	Bradley	Thompson	1995-09-12	123 Main St	Los Angeles	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
8	megan.miller@example.com	pbkdf2:sha256:260000$en4uqJYYdO1eZFk3$88ba2662c73005d97c478672d45b514fb403a426cf28bb9163d4dcb450d987c2	t	Megan	Miller	1992-08-05	123 Main St	Chicago	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
9	joshua.hernandez@example.com	pbkdf2:sha256:260000$HofRZyi3uK9vxfZm$ef36f8f7ce14556b2a6cb230fd775ffd24282ce5de9230e2756fff39a9a3ca2b	t	Joshua	Hernandez	1990-02-14	123 Main St	Miami	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
10	ashley.davis@example.com	pbkdf2:sha256:260000$qnXRI9zUnXpVQjIC$712c17116625ed7e8ba703b7906f04296e5dca6c083a9da2962aae6bbbe2fbfb	t	Ashley	Davis	1986-11-29	123 Main St	Seattle	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
11	natalie.perez@example.com	pbkdf2:sha256:260000$JNH6LG6grkKI2M41$b83255cd78b3552bc349048e0d95d5b1810cc3d7eb17ec575377a030237c46f1	t	Natalie	Perez	1995-07-17	123 Main St	Houston	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
12	eric.carter@example.com	pbkdf2:sha256:260000$ZA0Spdyo0q9vFdkW$b569df222821fe30948a816a857513e0aab85b076f11aea9e417c0124be6f6d8	t	Eric	Carter	1989-06-08	123 Main St	Atlanta	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
13	kaitlyn.brown@example.com	pbkdf2:sha256:260000$ob7kitm6gAsk9z04$781932e3d633f952feecf5681fc966afbb7fdac96665a311661a144185705dd4	t	Kaitlyn	Brown	1998-12-01	123 Main St	Boston	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
14	jonathan.smith@example.com	pbkdf2:sha256:260000$hVvaUioyN8o4mKac$cc0d62c5825aafdebbeb8923436005abc6566c2a00d58ee1287591d6a80aad99	t	Jonathan	Smith	1991-09-28	123 Main St	San Francisco	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
15	katherine.gonzalez@example.com	pbkdf2:sha256:260000$nIrvVxgetDIDukkj$4ac7e4a6de12f89c387e064777c3bdada6681e5b60e744fbe58353af05ef76b9	t	Katherine	Gonzalez	1997-02-05	123 Main St	Dallas	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
16	lisa.jones@example.com	pbkdf2:sha256:260000$oCjTU4d7CY4VTp5K$693092c51bb5ddf8ad183a874d826f1feb325b91953ad17fd7ceb82835e1e207	t	Lisa	Jones	1993-03-22	123 Main St	Los Angeles	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
17	jason.nguyen@example.com	pbkdf2:sha256:260000$tyqzjoxRsvfApuIc$58bf61e0031279e146d5341c4fd26b11946bc0ac8c703a02c17c3c1b99c360bd	t	Jason	Nguyen	1996-08-11	123 Main St	San Diego	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
18	amber.jackson@example.com	pbkdf2:sha256:260000$YS6dk8Modg3tGQXX$745f4513db68334f44944b21f25a4a7c6c73694e73b53744ce59b6f83e3ce471	t	Amber	Jackson	1992-05-14	123 Main St	Chicago	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
19	kevin.williams@example.com	pbkdf2:sha256:260000$o3AafGZtrygrPeTE$b36828e590e764c6cb6afb4cd85387ff08aeed018e2df03e363b31f18c7dc4ae	t	Kevin	Williams	1990-12-10	123 Main St	New York	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
20	lindsay.phillips@example.com	pbkdf2:sha256:260000$pGvFh9uCr79AqD7a$5500346b542b8fb1fb122a14c4a3e5f89761d6f34695715b61bbec8495938a1d	t	Lindsay	Phillips	1994-09-18	123 Main St	Miami	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
21	jessica.walker@example.com	pbkdf2:sha256:260000$DAopQP0yvB2Jkxp1$cfd86553d69f3f4f68688605c2d303427e597a4ae7301c770b741cd81202f151	t	Jessica	Walker	1995-02-08	123 Main St	Seattle	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
22	tyler.scott@example.com	pbkdf2:sha256:260000$JAVhntd0Ec3kOa5j$fd65f03bd3378e6a3241ea2a4d332fad7dbb224de55c8ddd49df328a2c2a77b4	t	Tyler	Scott	1991-07-19	123 Main St	San Francisco	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
23	natalie.baker@example.com	pbkdf2:sha256:260000$dRVrFjKI1Bd263hj$23ec26f0e7e0f4fa8b487f965852384fe104a86b1d5558496cdb8c283fc2ebc9	t	Natalie	Baker	1994-11-02	123 Main St	Boston	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
25	adam.nelson@example.com	pbkdf2:sha256:260000$ngMCltDcfQm6B13f$7705071511d608b9dafdc27e92a78dc99b89b95df4ad7eb15fd2f05aee8b6848	t	Adam	Nelson	1989-05-16	123 Main St	Houston	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
26	kaitlyn.evans@example.com	pbkdf2:sha256:260000$DOIt4SnYE0suABIs$1aceae4ad1c869787279c65d33d62eb7e95f595b40949735f8eb3b2fc41dfbeb	t	Kaitlyn	Evans	1992-09-23	123 Main St	Denver	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
27	madison.hughes@example.com	pbkdf2:sha256:260000$M3nCnjdLEP8BXcEq$d48cea53cd2665c66e6c8514613dc8e125c32fb2f17876d9a136bec6141c0a3b	t	Madison	Hughes	1993-01-17	123 Main St	Portland	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
28	jacob.kim@example.com	pbkdf2:sha256:260000$zJ8OG34qBsc7se9x$5106dbc2273c1efe088a0ab3e90cc555b8da0eb108620410332e41228ddc5b41	t	Jacob	Kim	1995-04-12	123 Main St	Austin	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
30	ethan.martin@example.com	pbkdf2:sha256:260000$RmIvGJMGXW8PJETR$948ef5444791a7cb1f0d5deecdaded077d5865e3f4eb5897934f0805072764ad	t	Ethan	Martin	1989-11-20	123 Main St	Chicago	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
32	ashley.flores@example.com	pbkdf2:sha256:260000$1h8jV4EJEdbR0Hu7$5cef7365f8f4fb7855a607a4a935b2ada9dda19bc5d02b93471040e7e6cfc6ab	t	Ashley	Flores	1998-02-20	123 Main St	Seattle	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
34	brianna.fernandez@example.com	pbkdf2:sha256:260000$8UmGHWTywARrIthE$66f04d9c382d4b6fc12093e54db6ae0737265e178e5ac3a12831f4f12d2f126a	t	Brianna	Fernandez	1993-09-02	123 Main St	Dallas	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
36	alexa.sanchez@example.com	pbkdf2:sha256:260000$fK5DoEXDxfKm6amK$7a2e1dbc39340abf0b7e17b999755c1c3dcafbde780964b97dd4326055754ada	t	Alexa	Sanchez	1987-08-24	123 Main St	Los Angeles	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
38	justin.flores@example.com	pbkdf2:sha256:260000$1GVFRsBLsNRiWCBJ$41a6633635885064ee5304b769dd7b021037a2058d41031b5570365f7a1e0e38	t	Justin	Flores	1997-04-05	123 Main St	Seattle	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
40	travis.carter@example.com	pbkdf2:sha256:260000$C1GwFPlLN0vRDazm$b517adfd086fb7072f74a4413d230a5f81a5b251b3765dbebfcf9c04aa119aa5	t	Travis	Carter	1992-09-22	123 Main St	Miami	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
42	maria.sanchez@example.com	pbkdf2:sha256:260000$3uj7u9eVKDWX0Ax3$f7a8354f59b60aa8cf4cb740c36765e52226717ee781da7fc0d5a64993ac6f1c	t	Maria	Sanchez	1995-03-20	123 Main St	Madrid	Spain	+34 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
44	laura.santos@example.com	pbkdf2:sha256:260000$0ixQZBwFnBSqSo94$e4f260430fb5d0e984648599ca314c0df124ed253d6e4583e6f0490d7fd0981d	t	Laura	Santos	1991-12-17	123 Main St	Barcelona	Spain	+34 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
46	sofia.rodriguez@example.com	pbkdf2:sha256:260000$x8uWX1NkwDcDCBHM$ca1214ed0e977b5230ef70f45e36f6d647bb27dee24eb4f738c7cf01f6d6c387	t	Sofia	Rodriguez	1997-01-12	123 Main St	Barcelona	Spain	+34 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
48	jake.simpson@example.com	pbkdf2:sha256:260000$SWBKOjyj7GvTNOHX$c64910d3252adc8461036b64adedba1f1b6e5125c5ee8b0aebfc99d60ea9c283	t	Jake	Simpson	1990-11-12	123 Main St	New York	USA	+1 555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
50	oliver.carter@example.com	pbkdf2:sha256:260000$Iv5NZPcS60K7caXk$9a0793e9cf1518f435c0b51ad109a5860993da67e567f419cf1889b0be7aa5da	t	Oliver	Carter	1985-02-28	123 Main St	London	United Kingdom	+44 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
29	sophia.davis@example.com	pbkdf2:sha256:260000$t0RkYmrVBLbiiT1Z$c4dc721d81104b5b4370a9e9123f71454a5315f6b28e8076b6d5aa8447d02035	t	Sophia	Davis	1996-08-28	123 Main St	Atlanta	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
31	katherine.lopez@example.com	pbkdf2:sha256:260000$6hYUcOqViW7TwtLE$8b374ed9a9f0e4a0ea003b1bc2e5bc9f3727f59e81fc173e9cac8bfe15e62db4	t	Katherine	Lopez	1991-05-03	123 Main St	New York	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
33	william.ward@example.com	pbkdf2:sha256:260000$a66towEeKwd12OkA$d09ed20fa4111f6b69eea4b0f98ae5034a7f38cc9e1534db917c00bd1e1ff922	t	William	Ward	1996-10-15	123 Main St	San Francisco	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
35	nathan.allen@example.com	pbkdf2:sha256:260000$jWcgBDCVxKy6tmuH$da4e94b150c31d9ffecd79bcd84e1b877a041898a3aeebc1de886a9af6bc38b9	t	Nathan	Allen	1995-12-18	123 Main St	Miami	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
37	stephanie.evans@example.com	pbkdf2:sha256:260000$iFxaxDyjePbjXGOm$51627b5187a90531ec7808caf8936d5bb2d08ec70e0a1afdc1dda5cf8eff5c32	t	Stephanie	Evans	1989-11-07	123 Main St	Chicago	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
39	kayla.thomas@example.com	pbkdf2:sha256:260000$C6l7QHCYsOfbMDoz$6d94ac55d33e96c8df426d2394e5394f3cbbae7d66d7255017eaae8c87936057	t	Kayla	Thomas	1994-07-03	123 Main St	Dallas	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
41	katherine.hernandez@example.com	pbkdf2:sha256:260000$Czs0KD3QGmGkDFqG$1528ddef9b0b79149c62270d955baeaf6c7735b4468a7ac72b77c8924f65e1a0	t	Katherine	Hernandez	1985-12-10	123 Main St	Los Angeles	USA	555-123-4567	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
43	jack.nelson@example.com	pbkdf2:sha256:260000$yRWNt2YwA1NJNyB5$eb513c973ff6087856eae6736ed1b59288d71cca958929ab5f7c627bfe5d4b1b	t	Jack	Nelson	1989-06-05	123 Main St	Sydney	Australia	+61 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
45	george.miller@example.com	pbkdf2:sha256:260000$TTaXmQ61I9x8efKp$cd16f1f51ff7e8006ee2012b9c99f451dca6fb92c4d9ea3ea87f26323408e5b5	t	George	Miller	1986-10-30	123 Main St	London	United Kingdom	+44 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/onvre_ozbokx.jpg
47	julia.lopez@example.com	pbkdf2:sha256:260000$NZq5so1pnOM0ulDh$09a406ae498fe72b6810412f016fbec65caa773aeb362c5baf29e4b35cc37765	t	Julia	Lopez	1993-05-22	123 Main St	Madrid	Spain	+34 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
49	carla.fernandez@example.com	pbkdf2:sha256:260000$oT3EirFKLrbgjKpw$6fdef2dc7dc15d0698ff6f2640b873154f5930c8f3174592ce0a79bf2394145e	t	Carla	Fernandez	1988-09-15	123 Main St	Barcelona	Spain	+34 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
51	lucia.garcia@example.com	pbkdf2:sha256:260000$df2W5UYS0Y94brnF$eb3f105142b60eaa517df85127a326399ac923c2ec2288baa80547302307ccca	t	Lucia	Garcia	1992-12-05	123 Main St	Madrid	Spain	+34 555-123-456	https://res.cloudinary.com/dfpfb6yon/image/upload/v1681787189/mujer_m14usj.jpg
52	usuario@ejemplo.com	pbkdf2:sha256:260000$hhDDsHnONR0FcYDh$5df0efbb67a90cc01fa86df3fdf1c324dd7a98dcff07193c1667ad1e7d85b56e	t	\N	\N	\N	\N	\N	\N	\N	\N
53	1usuario@ejemplo.com	pbkdf2:sha256:260000$GfoPjH9TKXjtI12N$e570dfbff7ca5a243eb4561b7a24dd62d5ba676b0863458264f1bd796e6e9ca8	t	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 45, true);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.carts_id_seq', 17, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.categories_id_seq', 21, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: payment_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.payment_items_id_seq', 1, false);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.products_id_seq', 48, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.users_id_seq', 53, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payment_items payment_items_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.payment_items
    ADD CONSTRAINT payment_items_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: orders orders_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: payment_items payment_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.payment_items
    ADD CONSTRAINT payment_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

