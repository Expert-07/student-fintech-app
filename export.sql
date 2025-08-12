--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: gideon
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO gideon;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: budgets; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.budgets (
    user_id integer,
    category character varying(100) NOT NULL,
    limit_amount numeric(10,5) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.budgets OWNER TO gideon;

--
-- Name: connections; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.connections (
    id integer NOT NULL,
    requester_id integer,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.connections OWNER TO gideon;

--
-- Name: connections_id_seq; Type: SEQUENCE; Schema: public; Owner: gideon
--

CREATE SEQUENCE public.connections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.connections_id_seq OWNER TO gideon;

--
-- Name: connections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gideon
--

ALTER SEQUENCE public.connections_id_seq OWNED BY public.connections.id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    user_id integer,
    title text NOT NULL,
    amount numeric(10,2) NOT NULL,
    category text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.expenses OWNER TO gideon;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: gideon
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expenses_id_seq OWNER TO gideon;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gideon
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message text NOT NULL,
    type character varying(50),
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO gideon;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: gideon
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO gideon;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gideon
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: timetable; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.timetable (
    id integer NOT NULL,
    user_id integer,
    course_name character varying(100) NOT NULL,
    day_of_the_week character varying(10) NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    location character varying(100),
    lecturer character varying(100),
    recurrencce character varying(20) DEFAULT 'weekly'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.timetable OWNER TO gideon;

--
-- Name: timetable_id_seq; Type: SEQUENCE; Schema: public; Owner: gideon
--

CREATE SEQUENCE public.timetable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.timetable_id_seq OWNER TO gideon;

--
-- Name: timetable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gideon
--

ALTER SEQUENCE public.timetable_id_seq OWNED BY public.timetable.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL,
    budget_type character varying(20) DEFAULT 'moderate'::character varying,
    department character varying(100),
    year_of_study character varying(20),
    bio text,
    profile_pic text
);


ALTER TABLE public.users OWNER TO gideon;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: gideon
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO gideon;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gideon
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: wallets; Type: TABLE; Schema: public; Owner: gideon
--

CREATE TABLE public.wallets (
    id integer NOT NULL,
    user_id integer,
    balance numeric DEFAULT 0
);


ALTER TABLE public.wallets OWNER TO gideon;

--
-- Name: wallets_id_seq; Type: SEQUENCE; Schema: public; Owner: gideon
--

CREATE SEQUENCE public.wallets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wallets_id_seq OWNER TO gideon;

--
-- Name: wallets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gideon
--

ALTER SEQUENCE public.wallets_id_seq OWNED BY public.wallets.id;


--
-- Name: connections id; Type: DEFAULT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.connections ALTER COLUMN id SET DEFAULT nextval('public.connections_id_seq'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: timetable id; Type: DEFAULT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.timetable ALTER COLUMN id SET DEFAULT nextval('public.timetable_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: wallets id; Type: DEFAULT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.wallets ALTER COLUMN id SET DEFAULT nextval('public.wallets_id_seq'::regclass);


--
-- Data for Name: budgets; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.budgets (user_id, category, limit_amount, created_at) FROM stdin;
6	Housing	10000.00000	2025-08-11 18:29:56.854337
8	Education	10000.00000	2025-08-11 21:38:56.914024
6	Transportation	10000.00000	2025-08-11 18:17:40.711293
6	Education	10000.00000	2025-08-11 23:12:52.21566
6	Food & Dining	20000.00000	2025-08-11 20:48:48.796341
6	Shopping	20000.00000	2025-08-12 13:56:11.352892
7	Food & Dining	10000.00000	2025-08-12 18:22:24.063019
7	Education	50000.00000	2025-08-12 18:24:28.909424
\.


--
-- Data for Name: connections; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.connections (id, requester_id, status, created_at) FROM stdin;
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.expenses (id, user_id, title, amount, category, created_at) FROM stdin;
2	3	Books	299.00	ok	2025-07-30 08:27:44.594465
3	3	Food	100.00	okk	2025-07-30 09:04:19.652789
5	3	Testing	100.00	tesst	2025-07-30 09:07:50.502665
6	3	Test	100.00	tesst	2025-07-30 09:09:57.315166
16	3	Garri	100.00	Food	2025-08-04 19:59:31.665083
17	3	Garri	100.00	Food	2025-08-04 19:59:58.3998
20	3	test	1000000.00	Food	2025-08-04 20:02:22.597249
21	3	test	100.00	test	2025-08-04 20:03:34.342191
22	4	Gala	100.00	Food	2025-08-04 20:09:14.255719
23	4	test	100.00	Food	2025-08-04 20:11:47.652455
25	4	test	10.00	edu	2025-08-04 20:27:58.976967
26	4	test	100.00	test	2025-08-04 20:59:31.647097
27	5	Bread	200.00	Food	2025-08-05 04:34:43.925002
28	5	Bread	10000.00	Food	2025-08-05 08:18:50.588417
36	6	test	100.00		2025-08-10 06:20:15.704882
43	8	PhysicsTextbook	4000.00	education	2025-08-10 08:43:40.225951
44	7	PhysicsTextbook	1000.00	education	2025-08-10 09:22:18.596799
45	7	test	69.00		2025-08-10 09:29:29.097032
47	9	Bread	1000.00		2025-08-11 15:53:15.9629
48	9	Physicstextbook	5000.00	education	2025-08-11 15:54:06.671053
49	9	test	1999999.00		2025-08-11 18:10:59.444032
50	9	test	100000.00		2025-08-11 18:11:27.829172
51	6	test	1000.00	education	2025-08-11 18:16:33.518726
52	6	1210	10000.00	food	2025-08-11 18:17:02.574041
54	6	test	200000.00	transport	2025-08-11 18:24:19.899517
62	6	test	1000.00		2025-08-11 20:49:38.659938
65	8	test	1000.00	transport	2025-08-11 22:22:01.432893
66	8	test	1000.00	transport	2025-08-11 22:22:34.038812
67	8	test	1000.00	education	2025-08-11 22:25:10.146235
68	8	test	10000.00	transport	2025-08-11 22:55:43.56715
69	6	test	1000.00	transport	2025-08-11 23:00:22.310138
72	6	test	1000.00		2025-08-11 23:04:50.364937
73	6	test	1000.00	transport	2025-08-11 23:05:59.564093
74	6	test	5000.00	education	2025-08-11 23:14:00.815329
75	6	test	1000.00	housing	2025-08-11 23:30:17.50057
76	6	test	100.00		2025-08-11 23:37:46.680602
77	6	test	4000.00	housing	2025-08-11 23:40:19.687849
78	6	test	1000.00	housing	2025-08-11 23:41:07.558845
79	6	testing	20000.00	housing	2025-08-12 12:07:52.489707
81	7	Bread	1000.00		2025-08-12 18:23:14.347057
82	7	TEST	1000.00	education	2025-08-12 18:24:03.721589
83	7	test	999.00		2025-08-12 18:34:44.820551
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.notifications (id, user_id, message, type, is_read, created_at) FROM stdin;
\.


--
-- Data for Name: timetable; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.timetable (id, user_id, course_name, day_of_the_week, start_time, end_time, location, lecturer, recurrencce, created_at) FROM stdin;
7	3	GST 112	Monday	08:00:00	10:00:00	EDH		weekly	2025-08-04 17:37:23.726012
8	3	PHY 102	Monday	12:00:00	14:00:00	CPELT		weekly	2025-08-04 17:38:38.17659
9	3	CHM 102	Monday	14:00:00	16:00:00	EDR		weekly	2025-08-04 17:39:17.564466
10	3	PHY 104	Tuesday	08:00:00	10:00:00	PL1		weekly	2025-08-04 17:40:33.395253
11	3	 GET 102	Tuesday	10:00:00	12:00:00	EDR		weekly	2025-08-04 17:41:26.77668
12	3	STA  112	Tuesday	12:00:00	14:00:00			weekly	2025-08-04 17:42:19.041269
13	3	PHY 108	Wednesday	20:45:00	08:00:00	PL1		weekly	2025-08-04 17:43:07.103599
39	6	Math	Thursday	19:00:00	21:00:00	test		weekly	2025-08-07 21:27:02.690417
40	6	GST 112	Thursday	21:35:00	21:40:00	test		weekly	2025-08-07 21:28:10.983201
41	6	MTH 102	Friday	08:00:00	23:00:00	test		weekly	2025-08-07 21:29:15.915559
43	6	MTH 102	Friday	06:00:00	07:00:00	PL1		weekly	2025-08-07 21:32:06.026267
44	6	GET 102	Thursday	22:00:00	23:11:00	TEST		weekly	2025-08-07 21:34:01.659576
45	5	MTH	Thursday	21:40:00	21:59:00	test		weekly	2025-08-07 21:38:29.927425
46	5	GST 112	Thursday	22:00:00	23:01:00	test		weekly	2025-08-07 21:40:07.848538
47	5	GST 112 	Friday	08:00:00	22:00:00	test		weekly	2025-08-07 22:08:44.860668
69	7	GET102	Tuesday	10:00:00	12:00:00	CPELT		weekly	2025-08-12 10:31:15.384328
70	8	GET102	Tuesday	10:00:00	12:00:00	CPELT		weekly	2025-08-12 10:44:10.482724
71	8	STA112	Tuesday	12:00:00	14:00:00	CPELT		weekly	2025-08-12 10:55:55.345812
72	7	PHY108	Wednesday	08:00:00	10:00:00	PL-1		weekly	2025-08-12 18:07:17.122766
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.users (id, name, email, password, budget_type, department, year_of_study, bio, profile_pic) FROM stdin;
1	Gideon	gidsoala@gmail.com	$2b$10$.Wj6fkr9tfy8LEwYV5rKSO6NCuCngCxaaDy9WoSWhHveaVQSgwDt.	moderate	\N	\N	\N	\N
2	Chinuaz	chinua@gmail.com	$2b$10$rP293J/geJBvcYRX9JOCt.roOZVgWAN3SbI9Ywol9O06NW3J9yux.	moderate	\N	\N	\N	\N
3	Harry	harry@gmail.com	$2b$10$VN4zoLAaO/XgPCyanCK9EOZvBiNn/w/M9boIjNAjPWkM8eKDJql5C	moderate	\N	\N	\N	\N
4	Gideon	gid@gmail.com	$2b$10$4ZlgnEN/sJ8kDVSPBjuuWezh6tONXG50nUpxVxT8XB7fboWOJ2/XS	moderate	\N	\N	\N	\N
5	Janice	janice@gmail.com	$2b$10$zpmGuaMmBB8dlTEnEiWTVesWS0EYFgr61J9dj94raCIrxaTj2rLCu	moderate	\N	\N	\N	\N
6	Emmanuel	emma@gmail.com	$2b$10$sGk/1JKeKBvwvw8fayFDfuysnvEhKYxAWJoQVPjMdefR8cdQk.Gj.	moderate	\N	\N	\N	\N
7	Daniel	daniel@gmail.com	$2b$10$ME8zfnf76VT5WsftxVSXGOYYPDQdRup6ZJWOvf/t836/vfY8kdNxS	moderate	\N	\N	\N	\N
8	David Soala	david@gmail.com	$2b$10$dP8Z9D1xRslU9ePaHu4PFOm5aNCxHd7Gch3MTurg5aLCQcsIcjadK	moderate	\N	\N	\N	\N
9	PascalMoore	omnivector07@gmail.com	$2b$10$pgpNFPlgNDXydTqOMOZfLOsxXcD/7f4NtMOduxAZH7.YTa4zOSCv6	moderate	\N	\N	\N	\N
10	Jan al	jan@gmail.com	$2b$10$UXg4JbGm40hJSAtXwdRdH.gai5ZCXVnCXsEtF.dnFU2Kya/RyGHDG	moderate	\N	\N	\N	\N
\.


--
-- Data for Name: wallets; Type: TABLE DATA; Schema: public; Owner: gideon
--

COPY public.wallets (id, user_id, balance) FROM stdin;
1	3	1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
2	4	100
3	5	0
5	7	1000
7	9	0
8	10	0
6	8	1000000
4	6	122335875884
\.


--
-- Name: connections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gideon
--

SELECT pg_catalog.setval('public.connections_id_seq', 1, false);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gideon
--

SELECT pg_catalog.setval('public.expenses_id_seq', 83, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gideon
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: timetable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gideon
--

SELECT pg_catalog.setval('public.timetable_id_seq', 72, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gideon
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: wallets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gideon
--

SELECT pg_catalog.setval('public.wallets_id_seq', 8, true);


--
-- Name: connections connections_pkey; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: timetable timetable_pkey; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wallets wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);


--
-- Name: budgets budgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: connections connections_requester_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_requester_id_fkey FOREIGN KEY (requester_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: expenses expenses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: timetable timetable_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: wallets wallets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gideon
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

