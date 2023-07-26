/**
 * Signs in a user.
 * @param {string} username The user's username.
 * @param {sting} password The user's password.
 * @returns Promise that resolves to `{ token, user }`.
 */
export async function signIn(username, password) {
  return await signUpOrIn('sign-in', username, password);
}

/**
 * Signs up a user.
 * @param {string} username The user's username.
 * @param {sting} password The user's password.
 * @returns Promise that resolves to the user.
 */
export async function signUp(username, password) {
  return await signUpOrIn('sign-up', username, password);
}

/**
 * Signs up or signs in depending on the action.
 * @param {string} action Action to take, either 'sign-up' or 'sign-in'
 * @param {string} username The user's username.
 * @param {sting} password The user's password.
 * @returns Promise that resolves to user (sign-up) or `{ token, user }` (sign-in).
 */
export async function signUpOrIn(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
/**
 * Fetches all products from the API
 * @returns Promise that resolves to an array of products
 */
export async function fetchCatalog() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/** Fetch a single product from API
 * @param {number} productId of selected item
 * @returns Promise that resolves to the product
 */
export async function fetchProduct(productId) {
  const res = await fetch(`/api/products/${productId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 *
 * @param {string} username
 * @returns Promise that resolves to the users username
 */
export async function fetchUser(username) {
  const res = await fetch(`/api/customers/${username}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 *
 * @param {number} cartId
 * @returns a join of every col from products + every col from shoppingCartItems table
 */
export async function fetchCartItems(cartId) {
  const res = await fetch(`/api/shoppingCartItems/${cartId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/** Add a product to customers shopping cart
 * @param {number} productId of item
 * @param {quantity} quantity of items in cart
 * @param {cartId} cartId of each individual customer
 */
export async function addToCart(productId, quantity, cartId) {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity, cartId }),
  };
  const res = await fetch(`/api/cart/${cartId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addItemQuantity(productId, quantity, cartId) {
  const req = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity, cartId }),
  };
  const res = await fetch(`/api/cart/${cartId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function removeAllItems(cartId) {
  const req = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartId }),
  };
  const res = await fetch(`/api/delete/${cartId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function removeItem(cartId, productId) {
  const req = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartId, productId }),
  };
  const res = await fetch(`/api/delete/:cartId/:productId`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
