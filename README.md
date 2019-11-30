# 🚀 node-api-rest-jwt 🚀

Aplicación creada para aprender express.js y sobre todo autorización y autenticación mediante el uso de tokens.

### Arquitectura:

```
src
   |_ middlewares
   |    |_ virifyToken.js
   |
   |_ models
   |    |_ User.js
   |
   |_ routes
   |    |_ private
   |    |    |_ profile.js
   |    |
   |    |_ public
   |    |    |_ index.js
   |    |
   |    |_ auth.js
   |
   |_ validations
   |    |_ auth.js
   |
   |_ app.js
```

_Dentro de la carpeta ***src*** se encuentra todo el codigo, a excepción de los archivos típicos de configuración._

_En la carpeta ***middlewares*** encontraremos el archivo ***verifyToken.js***, que consiste en una función de middleware que utilizaremos para validar los tokens en las distintas peticiones que nos haga el cliente. Denegando el acceso sin token a las rutas dentro de la carpeta ***routes/private***_

_En ***models*** encontraremos el archivo ***User.js*** el cual es un modelo / schema de usuarios para la base de datos noSQL de MongoDB._

_En ***routes*** se almacenan las distintas rutas a las que la api da respuesta._
_***private*** son rutas a las que será necesario aporta un token para poder tener acceso a ellas, mientras que ***public*** serán todas aquellas en las que no sea necesario un token_
_En ***auth.js*** encontraremos dos rutas para el registro de usuario, o logueo_

_En ***validations*** se encontrarán los schemas empleados para la validación con ***Joi** (https://github.com/hapijs/joi)_

_***app.js*** es el archivo principal de nuestra aplicación, y del cual arrancará node._
