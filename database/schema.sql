set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


 CREATE TABLE "products" (
	"productName" TEXT NOT NULL,
	"productId" int NOT NULL,
	"price" real NOT NULL,
	"categoryId" int NOT NULL,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "customers" (
	"customerId" int NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "customers_pk" PRIMARY KEY ("customerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "shoppingCart" (
	"productId" int NOT NULL,
	"customerId" int NOT NULL,
	"cartId" int NOT NULL,
	CONSTRAINT "shoppingCart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orders" (
	"orderId" int NOT NULL,
	"cartId" int NOT NULL,
	"placedAt" TIMESTAMP,
	"productName" TEXT NOT NULL,
	"price" real NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"categoryId" int NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");


ALTER TABLE "shoppingCart" ADD CONSTRAINT "shoppingCart_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "shoppingCart" ADD CONSTRAINT "shoppingCart_fk1" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("cartId") REFERENCES "shoppingCart"("cartId");
