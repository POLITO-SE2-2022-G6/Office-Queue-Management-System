BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "serving" (
	"ticket"	INTEGER,
	"counter"	INTEGER,
	FOREIGN KEY("ticket") REFERENCES "ticket"("id"),
	FOREIGN KEY("counter") REFERENCES "counter"("id"),
	PRIMARY KEY("ticket","counter")
);
CREATE TABLE IF NOT EXISTS "service" (
	"id"	INTEGER,
	"type"	text,
	"time"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ticket" (
	"id"	INTEGER,
	"service"	INTEGER,
	"eta"	INTEGER,
	"served"	INTEGER DEFAULT 0,
	FOREIGN KEY("service") REFERENCES "service"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "counter" (
	"id"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "ServiceCounter" (
	"service"	INTEGER,
	"counter"	INTEGER,
	FOREIGN KEY("counter") REFERENCES "counter"("id"),
	FOREIGN KEY("service") REFERENCES "service"("id"),
	PRIMARY KEY("service","counter")
);
COMMIT;
