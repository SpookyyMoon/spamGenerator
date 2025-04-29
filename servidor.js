const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Iniciando servidor...");
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});

//Ruta de configuración de correo
app.post("/configuracionCorreo", (req, res) => {
    var remitente = req.body.remitente;
    var destinatario = req.body.destinatario;
    var asunto = req.body.asunto;
    var mensaje = req.body.mensaje;
    console.log("Datos recibidos: ", {remitente, destinatario, asunto, mensaje});

    //Guardado en JSON
    var configuracionCorreo = {remitente, destinatario, asunto, mensaje};
    fs.writeFileSync("./config/configCorreo.json", JSON.stringify(configuracionCorreo, null, 2));
    console.log("Datos guardados: ", {configuracionCorreo});
    res.redirect("./public/index.html");
});