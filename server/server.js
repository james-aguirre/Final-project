import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import ClientError from './lib/client-error.js';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import argon2 from 'argon2';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// relates to sign up server call
app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password)
      throw new ClientError(400, 'username and password are required fields');
    const hashedPassword = await argon2.hash(password);
    const sql = `insert into "customers" ("username", "hashedPassword")
    values ($1, $2)
    returning
      "customerId",
    "username",
    "createdAt";
    `;
    const userParams = [username, hashedPassword];
    const userResult = await db.query(sql, userParams);
    const [user] = userResult.rows;
    const cartSql = `insert into "shoppingCart" ("customerId", "cartId")
    values($1, $1);
    `;
    const cartParams = [userResult.rows[0].customerId];
    await db.query(cartSql, cartParams);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

// relates to sign in server call
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new ClientError(401, 'invalid login');

    const sql = `
      select "customerId",
            "hashedPassword"
        from "customers"
        where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(201).json({ token, user: payload });
  } catch (e) {
    next(e);
  }
});

// relates to addToCart server call
app.post('/api/cart/:cartId', async (req, res, next) => {
  try {
    const { productId, quantity, cartId } = req.body;
    if (!productId || !quantity || !cartId)
      throw new ClientError(400, 'please select a valid product and quantity');
    const sql = `
    insert into "shoppingCartItems" ("productId", "quantity", "cartId")
    values ($1, $2, $3)
    `;
    const params = [productId, quantity, cartId];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);
  } catch (e) {
    next(e);
  }
});

// relates to updateCart server call
// app.patch('/api/cart/:cartId', async (req, res, next) => {
//   try {
//     const { productId, quantity, cartId } = req.body;
//     if (!quantity) throw new ClientError(400, 'please select a value between 1 and 3');
//     const sql = `
//     update "shoppingCartItems" ("productId, "quantity", "cartId")
//     values ($1, $2, $3)
//     set "quantity" = $2
//     where "productId", "cartId" = $1, $3
//     ;
//     `
//   }
//   const params = [productId, quantity, cartId];
//   const result = await db.query(sql, params);
// })

// relates to fetchProducts server call
app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
    select "productId",
    "productName",
    "price",
    "imageUrl",
    "description",
    "category"
    from "products"`;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (e) {
    next(e);
  }
});

// relates to fetchProduct server call
app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
    select "productId",
    "productName",
    "price",
    "imageUrl",
    "description"
    from "products"
    where "productId" = $1`;
    const params = [productId];
    const result = await db.query(sql, params);
    if (!result.rows[0])
      throw new ClientError(
        404,
        `cannot find product with productId ${productId}`
      );
    res.status(200).json(result.rows[0]);
  } catch (e) {
    next(e);
  }
});

app.get('/api/customers/:username', async (req, res, next) => {
  const user = req.params.username;
  if (!user) throw new ClientError(400, 'user not found');
  try {
    const sql = `
    select "customerId",
    "username"
    from "customers"
    where "username" = $1;`;
    const params = [user];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows[0]);
  } catch (e) {
    next(e);
  }
});

// relates to cartItems server call
app.get('/api/shoppingCartItems/:cartId', async (req, res, next) => {
  const cart = req.params.cartId;
  try {
    const sql = `
    select *
    from "products"
    join "shoppingCartItems" using ("productId")
    where "cartId" = $1`;
    const params = [...cart];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (e) {
    next(e);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
