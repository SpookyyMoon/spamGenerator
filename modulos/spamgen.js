//Array temporal almacena correos
let correosLista = ['wiwelav972@astimei.com'];

class SpamGen{

    correoAdd(correo){
        correosLista.push(correo);
    }    

}

module.exports = SpamGen;