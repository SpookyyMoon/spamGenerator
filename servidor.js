const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

//Import nodemailer
const nodemailer = require("nodemailer");

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
    res.redirect("/");
});

//Ruta de enviar correos
app.post("/enviarCorreos", (req, res) => {
    var cantidadCorreos = req.body.cantidadCorreos;
    console.log("Datos recibidos: ", {cantidadCorreos});

    const configCorreo = JSON.parse(fs.readFileSync('./config/configCorreo.json')); //Carga los datos del json
    console.log("Configuración cargada con éxito!");

    //Configuracion de nodemailer usando mailtrap
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "401d0fae5fe213",
        pass: "b4c1777447ac9f"
        }
    });

    //Configuracion de correo
    var mailOptions = {
        from: configCorreo.remitente,
        to: configCorreo.destinatario,
        subject: configCorreo.asunto,
        text: configCorreo.mensaje
    };

    let contadorCorreo = 0;
    while(contadorCorreo < cantidadCorreos){
        contadorCorreo++;
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log(`Correo enviado con éxito, restantes: ${cantidadCorreos-contadorCorreo}`);
            }
        });
    }

    res.redirect("/pages/mensajeEnviar.html");
});