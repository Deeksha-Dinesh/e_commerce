# API Documentation

Base URL: `/api`

## Auth
- `POST /auth/register` - register user
- `POST /auth/login` - login user
- `GET /auth/me` - get profile (Bearer token)

## Products
- `GET /products?category=&search=` - list products with filters
- `GET /products/:id` - product details
- `POST /products` - create product (admin)
- `PUT /products/:id` - update product (admin)
- `DELETE /products/:id` - delete product (admin)

## Orders
- `POST /orders` - create order
- `GET /orders/mine` - list authenticated user orders
- `GET /orders` - list all orders (admin)
- `PUT /orders/:id/status` - update order status (admin)

## Users
- `GET /users` - list users (admin)
- `PUT /users/:id/role` - update user role (admin)
