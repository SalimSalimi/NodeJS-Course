## Dynamic routes
The goal of dynamic route is to specify which element (product) that we want to access according to his ID. We have just to print with EJS `<%= product.id>` on `<a>`
* **NOTE**: The order is important, we should make dynamic routes after static routes (In case they share the same root). Example: 
```
app.get("products/delete", handler);
app.get("products/:something, handler);
```
If we invert the order here, It will consider "delete" like an argument so It will execute the second one.

#### Access parameter from the request
To access a parameter from the request, we simply use `req.params.parameterName` to access it on our controller. `const parameterValue = req.params.parameterName`. For now, It should treated as a String.