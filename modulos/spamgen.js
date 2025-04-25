//Import nodemailer
const nodemailer = require("nodemailer");


//Array temporal almacena correos
let spamLista = ['wiwelav972@astimei.com'];

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
    from: 'janedoe@gmail.com',
    to: spamLista,
    subject: 'Asunto',
    text: 'Mensaje'
};

//Clase y métodos
class SpamGen{

    //Añade un correo a la lista de spam
    correoAdd(correo){
        spamLista.push(correo);
    }    

    //Muestra la lista actual de spam
    listaMostrar(){
        console.log("Lista actual de spam: \n")
        spamLista.forEach(correo => {
            console.log(" " + correo);
        });
    }

    //Modifica el remitente del correo
    remitenteSpamModificar(remitente){
        mailOptions.from = remitente;
    }

    //Modifica el asunto del correo
    asuntoSpamModificar(asunto){
        mailOptions.subject = asunto;
    }

    //Modifica el mensaje del correo
    mensajeSpamModificar(mensaje){
        mailOptions.text = mensaje;
    }

    //Envio de correo
    enviarSpam(){
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log("Spam enviado con éxito!");
            }
        });
    }
}

module.exports = SpamGen;