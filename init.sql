--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cuisines; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.cuisines (
    id integer NOT NULL,
    name character varying(30)
);


ALTER TABLE public.cuisines OWNER TO me;

--
-- Name: cuisines_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.cuisines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cuisines_id_seq OWNER TO me;

--
-- Name: cuisines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.cuisines_id_seq OWNED BY public.cuisines.id;


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    name text,
    description character varying(300),
    image_url text,
    restaurant_id integer
);


ALTER TABLE public.menu_items OWNER TO me;

--
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_items_id_seq OWNER TO me;

--
-- Name: menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name text,
    address character varying(100),
    phone_number character varying(30),
    website character varying(200),
    image_url character varying(500),
    cuisine_id integer
);


ALTER TABLE public.restaurants OWNER TO me;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO me;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30),
    email character varying(30),
    password_digest character varying(1000)
);


ALTER TABLE public.users OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cuisines id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.cuisines ALTER COLUMN id SET DEFAULT nextval('public.cuisines_id_seq'::regclass);


--
-- Name: menu_items id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: cuisines cuisines_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.cuisines
    ADD CONSTRAINT cuisines_pkey PRIMARY KEY (id);


--
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: me
--

GRANT USAGE ON SCHEMA public TO me;


--
-- Name: TABLE cuisines; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON TABLE public.cuisines TO me;


--
-- Name: SEQUENCE cuisines_id_seq; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON SEQUENCE public.cuisines_id_seq TO me;


--
-- Name: TABLE menu_items; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON TABLE public.menu_items TO me;


--
-- Name: SEQUENCE menu_items_id_seq; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON SEQUENCE public.menu_items_id_seq TO me;


--
-- Name: TABLE restaurants; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON TABLE public.restaurants TO me;


--
-- Name: SEQUENCE restaurants_id_seq; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON SEQUENCE public.restaurants_id_seq TO me;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON TABLE public.users TO me;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: me
--

GRANT ALL ON SEQUENCE public.users_id_seq TO me;


--
-- PostgreSQL database dump complete
--

