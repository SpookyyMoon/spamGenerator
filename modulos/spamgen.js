//Import nodemailer
const nodemailer = require("nodemailer");

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
    to: 'johndoe@gmail.com',
    subject: 'Asunto',
    text: 'Mensaje'
};

//Array temporal almacena correos
let spamLista = ['wiwelav972@astimei.com'];

//Clase y métodos
class SpamGen{

    correoAdd(correo){
        spamLista.push(correo);
    }    

    listaMostrar(){
        console.log("Lista actual de spam: \n")
        spamLista.forEach(correo => {
            console.log(" " + correo);
        });
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