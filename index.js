const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

//creando el servidor de express
const app = express();
//Base de datos
dbConnection();
//cors
app.use(cors());

//*Directorio publico
app.use(express.static("public"));

//lectura y parse del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));

//TODO: CRUD: Eventos

app.use("/api/events", require("./routes/events"));


//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
