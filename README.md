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

#### Query Parameters
Query parameters are optional parameters that are sent with in the URL. Example: `https://example.com/route?param1=value&param2=value`. 

To access it from a request handler, we can use the req object by: `req.query.paramName`.

#### Handling POST requests
We access to the POST parameters from the body with : `req.body.parameterName`. Sometimes, we would need to send the ID for example without showing it on the UI, we can add input element of type hidden, giving it a value of the ID and give it a name to access it from the request handler.

# Side notes
* **include-EJS**: On EJS, if we include a template that uses a variable, this include is used inside a block (for-loop for example). We can pass that variable to the include like this: `<%- include('file', {value: variable})%>` 