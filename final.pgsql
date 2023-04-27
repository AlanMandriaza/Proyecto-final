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
-- Name: generes; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.generes (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.generes OWNER TO gitpod;

--
-- Name: generes_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.generes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.generes_id_seq OWNER TO gitpod;

--
-- Name: generes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.generes_id_seq OWNED BY public.generes.id;


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
    quantity integer NOT NULL,
    genere_id integer
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
-- Name: generes id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.generes ALTER COLUMN id SET DEFAULT nextval('public.generes_id_seq'::regclass);


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
cbb9c5c696fd
322e37d3c86c
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.cart_items (id, cart_id, product_id, quantity) FROM stdin;
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
2	Pantalones
3	Zapatos
4	Chaquetas
5	Vestidos
6	Accesorios
11	Zapatillas
14	Abrigos
\.


--
-- Data for Name: generes; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.generes (id, name) FROM stdin;
1	Mujer
2	Hombre
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

COPY public.products (id, name, description, price, image, category_id, quantity, genere_id) FROM stdin;
49	Zapatillas para mujer	Zapatillas de mujer con diseño moderno y cómodo. Ideales para el día a día.	25000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	11	10	1
50	Pantalón de mezclilla	Este pantalón de mezclilla es un clásico que nunca pasa de moda. Con su corte recto y su tela resistente, te acompañará en cualquier aventura.	50000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379828/pantalon_hombre_u3fcln.jpg	2	10	2
51	Zapatos de tacón	Estos zapatos de tacón alto son ideales para una noche de fiesta o una cena elegante. Su diseño sofisticado y suave textura de cuero te harán sentir como una reina.	120000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	3	5	1
52	Chaqueta de cuero	Esta chaqueta de cuero es una pieza clásica que no puede faltar en tu armario. Con su diseño atemporal y suave textura, te mantendrá abrigado y elegante.	150000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379276/chaqueta_hombre_zdbvzw.jpg	4	7	2
54	Pantalón negro	Este pantalón negro de corte recto es ideal para cualquier ocasión. Su diseño clásico y elegante te hará sentir cómodo y a la moda.	60000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379828/pantalon_hombre_u3fcln.jpg	2	20	2
55	Zapatillas de running	Estas zapatillas de running son ideales para tus entrenamientos diarios. Con su diseño cómodo y resistente, te ayudarán a alcanzar tus metas deportivas.	90000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379389/zapatilla_hombre_ozcubj.jpg	3	15	2
56	Chaqueta de cuero roja	Esta chaqueta de cuero roja es un clásico que nunca pasa de moda. Con su diseño atrevido y suave textura, te hará sentir seguro y elegante.	180000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379276/chaqueta_hombre_zdbvzw.jpg	4	5	2
57	Vestido de encaje blanco	Este vestido de encaje blanco es perfecto para una boda o una cena elegante. Con su diseño romántico y sofisticado, te hará sentir como una princesa.	150000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	8	1
58	Zapatos de tacón bajo	Estos zapatos de tacón bajo son ideales para el trabajo o una reunión formal. Con su diseño clásico y elegante, te harán sentir segura y profesional.	100000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	3	10	1
59	Pantalón corto de mezclilla	Este pantalón corto de mezclilla es perfecto para un look casual de verano. Con su diseño fresco y desenfadado, te hará sentir cómodo y a la moda.	30000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379828/pantalon_hombre_u3fcln.jpg	2	30	2
60	Botas de cuero marrón	Estas botas de cuero marrón son ideales para un look rústico y aventurero. Con su diseño resistente y elegante, te harán sentir preparado para cualquier desafío.	120000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379389/zapatilla_hombre_ozcubj.jpg	3	7	2
61	Chaqueta acolchada	Esta chaqueta acolchada es ideal para los días fríos de invierno. Con su diseño cálido y resistente al viento, te mantendrá abrigado y a la moda.	140000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378499/chaqueta_ho8to8.jpg	4	9	1
62	Vestido de seda	Este vestido largo de seda es perfecto para una noche de gala o una boda. Con su diseño elegante y sofisticado, te hará sentir como una estrella de cine.	200000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	4	1
63	Zapatos deportivos	Estos zapatos deportivos son ideales para tus entrenamientos de alto rendimiento. Con su diseño ligero y transpirable, te ayudarán a alcanzar tus metas deportivas.	80000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379389/zapatilla_hombre_ozcubj.jpg	3	12	2
64	Zapatillas blancas de plataforma	Estas zapatillas blancas de plataforma son ideales para un look urbano y moderno. Con su diseño original y cómodo, te harán sentir a la moda en cualquier ocasión.	80000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	3	10	1
65	Chaqueta de cuero negra	Esta chaqueta de cuero negra es una pieza clásica que no puede faltar en tu armario. Con su diseño atemporal y suave textura, te mantendrá abrigado y elegante.	150000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378499/chaqueta_ho8to8.jpg	4	7	1
66	Vestido corto rosa	Este vestido corto de color rosa es perfecto para una tarde de verano o una cena romántica. Con su diseño fresco y juvenil, te hará sentir radiante y a la moda.	60000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	20	1
67	Zapatos de piel	Estos zapatos de piel son ideales para un look elegante y sofisticado. Con su diseño clásico y suave textura, te harán sentir seguro y a la moda en cualquier ocasión.	150000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379389/zapatilla_hombre_ozcubj.jpg	3	8	2
68	Pantalón corto verde militar	Este pantalón corto de color verde militar es perfecto para un look casual y aventurero. Con su diseño fresco y desenfadado, te hará sentir cómodo y a la moda en cualquier ocasión.	40000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379828/pantalon_hombre_u3fcln.jpg	2	25	2
69	Botas de cuero negras	Estas botas de cuero negras son ideales para un look urbano y sofisticado. Con su diseño elegante y resistente, te harán sentir a la moda en cualquier situación.	110000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379389/zapatilla_hombre_ozcubj.jpg	3	10	2
70	Chaqueta de mezclilla	Esta chaqueta de mezclilla es ideal para un look casual y desenfadado. Con su diseño fresco y juvenil, te hará sentir cómodo y a la moda en cualquier ocasión.	80000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378499/chaqueta_ho8to8.jpg	4	15	1
71	Vestido largo azul marino	Este vestido largo de color azul marino es perfecto para una noche elegante. Con su diseño sofisticado y elegante, te hará sentir como una princesa moderna.	180000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	6	1
72	Zapatos de vestir	Estos zapatos de vestir son ideales para un look elegante y sofisticado. Con su diseño clásico y suave textura, te harán sentir seguro y a la moda en cualquier ocasión.	170000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379389/zapatilla_hombre_ozcubj.jpg	3	7	2
73	Pantalones de cuero negro	Estos pantalones de cuero negro son ideales para un look sofisticado y elegante. Con su diseño atemporal y suave textura, te harán sentir seguro y a la moda en cualquier ocasión.	180000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379828/pantalon_hombre_u3fcln.jpg	2	5	2
74	Chaqueta de cuero marrón	Esta chaqueta de cuero marrón es una pieza clásica que no puede faltar en tu armario. Con su diseño atemporal y suave textura, te mantendrá abrigado y elegante en cualquier ocasión.	170000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379276/chaqueta_hombre_zdbvzw.jpg	4	8	2
75	Vestido corto rojo	Este vestido corto de color rojo es perfecto para una noche de fiesta o una cena elegante. Con su diseño vibrante y sexy, te hará sentir como una estrella de cine.	80000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	20	1
76	Mocasines de cuero marrón	Estos mocasines de cuero marrón son ideales para un look elegante y sofisticado. Con su diseño clásico y suave textura, te harán sentir seguro y a la moda en cualquier ocasión.	120000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642498/samples/ecommerce/leather-bag-gray.jpg	3	10	2
77	Sandalias de tacón rojas	Estas sandalias de tacón alto de color rojo son ideales para una noche de fiesta o una cena elegante. Con su diseño elegante y sexy, te harán sentir como una verdadera diva.	100000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	3	8	1
78	Chaqueta de cuero rosa	Esta chaqueta de cuero rosa es perfecta para un look juvenil y desenfadado. Con su diseño fresco y suave textura, te hará sentir cómoda y a la moda en cualquier ocasión.	120000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378499/chaqueta_ho8to8.jpg	4	6	1
79	Vestido largo verde	Este vestido largo de color verde es perfecto para una noche de gala o una boda elegante. Con su diseño sofisticado y elegante, te hará sentir como una verdadera princesa.	200000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	4	1
80	Zapatillas deportivas rosa	Estas zapatillas deportivas de color rosa son ideales para tus entrenamientos de alta intensidad. Con su diseño ligero y cómodo, te ayudarán a alcanzar tus metas deportivas con estilo.	90000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	3	10	1
81	Bolso de cuero marrón	Este bolso de cuero marrón es perfecto para un look casual y desenfadado. Con su diseño clásico y suave textura, te hará sentir cómoda y a la moda en cualquier ocasión.	90000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642498/samples/ecommerce/leather-bag-gray.jpg	6	12	1
82	Zapatos de tacón negro	Estos zapatos de tacón de color negro son ideales para un look elegante y sofisticado. Con su diseño clásico y suave textura, te harán sentir segura y a la moda en cualquier ocasión.	150000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1680642513/cld-sample-5.jpg	3	7	1
83	Vestido corto negro	Este vestido corto de color negro es perfecto para una noche de fiesta o una cena elegante. Con su diseño sexy y atrevido, te hará sentir como una verdadera estrella.	100000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	15	1
84	Leggings azul marino	Estos leggings de color azul marino son ideales para un look casual y cómodo. Con su diseño fresco y suave textura, te harán sentir relajada y a la moda en cualquier ocasión.	60000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682379683/pantalon_mujer_jydlip.jpg	2	20	1
53	Vestido floral	Este vestido corto de estampado floral es perfecto para una tarde de verano o una fiesta al aire libre. Su diseño fresco y juvenil te hará sentir radiante.	80000	https://res.cloudinary.com/dfpfb6yon/image/upload/v1682378379/vestido_ekmsuk.jpg	5	14	1
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
1	Admin
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

SELECT pg_catalog.setval('public.categories_id_seq', 22, true);


--
-- Name: generes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.generes_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.products_id_seq', 84, true);


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
-- Name: generes generes_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.generes
    ADD CONSTRAINT generes_pkey PRIMARY KEY (id);


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
-- Name: products products_genere_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_genere_id_fkey FOREIGN KEY (genere_id) REFERENCES public.generes(id);


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

