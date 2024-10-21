
CREATE TYPE role AS ENUM ('user', 'admin', 'super-admin');

CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user',
	"name" varchar(255),
	"address" text,
	"isVerified" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
