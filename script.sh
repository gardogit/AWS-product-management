#!/bin/bash

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 1", "category": "Categoría A", "price": 100}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 2", "category": "Categoría B", "price": 150}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 3", "category": "Categoría C", "price": 200}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 4", "category": "Categoría A", "price": 300}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 5", "category": "Categoría B", "price": 400}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 6", "category": "Categoría C", "price": 500}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 7", "category": "Categoría A", "price": 600}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 8", "category": "Categoría B", "price": 700}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 9", "category": "Categoría C", "price": 800}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 10", "category": "Categoría A", "price": 900}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 11", "category": "Categoría B", "price": 1000}'

curl -X POST http://localhost:3000/dev/products \
-H "Content-Type: application/json" \
-d '{"name": "Producto 12", "category": "Categoría C", "price": 1100}'
