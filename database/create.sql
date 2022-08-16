CREATE TABLE public.files(
    id uuid NOT NULL,
    filename character varying(100) COLLATE pg_catalog."default" NOT NULL,
    format character varying(20) COLLATE pg_catalog."default" NOT NULL,
    size integer DEFAULT 0,
    "createdAt" date NOT NULL,
    "updatedAt" date,
    CONSTRAINT files_pkey PRIMARY KEY (id)
)

CREATE TABLE public.path(
  pid,
  fileid,
  foldername,
  parentid
)