# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - /products [GET]
- Show - /products/:id [GET]
- Create [token required] - /products [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
- [ADDED] Destroy [token required] - /products/:id [DELETE]

#### Users
- Index [token required] - /users [GET]
- Show [token required] - /users/:id [GET]
- Create N[token required] - /users [POST]
- [ADDED] Destroy [token required] - /users/:id [DELETE]

#### Orders
- Current Order by user (args: user id)[token required] - /users/:userID/orders/:orderID/products [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- [ADDED] Index [token required] /orders [GET]
- [ADDED] Show [token required] /orders [GET]
- [ADDED] Create [token required] /orders [POST]
- [ADDED] Destroy [token required] /orders [DELETE]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- status of order (active or complete)
- user_id

### Order_Products
- id  
- quantity
- order_id
- product_id

## Database Schema

- Table: Products(id: SERIAL PRIMARY KEY, name:VARCHAR, price:decimal)
- Table: Users(id: SERIAL PRIMARY KEY, first_name:VARCHAR, last_name:VARCHAR, password_digest: VARCHAR)
- Table: Orders(id: SERIAL PRIMARY KEY, status: VARCHAR, userID: BIGINT [Foreign Key to Users Table])
- Table: Order_Products(id: SERIAL PRIMARY KEY, quantity: integer, order_id: BIGINT [Foreign Key to Orders Table], product_id: BIGINT [Foreign Key to Products Table])