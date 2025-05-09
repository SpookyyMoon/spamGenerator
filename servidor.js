// Imports
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const multer = require ('multer');
const nodemailer = require('nodemailer');

// Configuración de multer
const memoria = multer.memoryStorage();
const upload = multer({ storage: memoria });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Iniciando servidor...");
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});

// Ruta de configuración de correo 
app.post("/configuracionCorreo", upload.single("listaCorreos"), (req, res) => {
    var remitente = req.body.remitente;
    var asunto = req.body.asunto;
    var mensaje = req.body.mensaje;
    var destinatario;
    var destinatarioLista = [];

    if(req.file){
        // Lee el archivo Excel desde el buffer
        var workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        // Obtiene la primera hoja
        var hojaCorreos = workbook.Sheets[workbook.SheetNames[0]];
        // Convierte a JSON
        correosJSON = xlsx.utils.sheet_to_json(hojaCorreos, { header: 1 });
        correosJSON.forEach(correo => {
            destinatarioLista.push(correo);
        });
        destinatario = destinatarioLista;
    }
    else{
        console.log("Configurando correo sin JSON");
        destinatario = req.body.destinatario;
    }

    console.log("Datos recibidos: ", {remitente, destinatario, asunto, mensaje});

    // Guarda la configuración en un JSON
    const configuracionCorreo = { remitente, destinatario, asunto, mensaje };
    fs.writeFileSync("./config/configCorreo.json", JSON.stringify(configuracionCorreo, null, 2));
    console.log("Datos guardados: ", configuracionCorreo);

    res.redirect("/");
});

// Ruta de enviar correos
app.post("/enviarCorreos", (req, res) => {
    var cantidadCorreos = req.body.cantidadCorreos;
    console.log("Datos recibidos: ", {cantidadCorreos});

    const configCorreo = JSON.parse(fs.readFileSync('./config/configCorreo.json')); //Carga los datos del json
    console.log("Configuración cargada con éxito!");

    //Configuracion de nodemailer usando mailtrap
    var transport = nodemailer.createTransport({
        host: "",
        port: ,
        auth: {
            user: "",
            pass: ""
        }
    });

    // Configuracion de correo
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