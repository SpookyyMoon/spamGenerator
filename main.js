// Imports
const spamgen = require('./modulos/spamgen.js');
//Instancia clase
const spamgenInstancia = new spamgen;
// Prompt
const prompt = require('prompt-sync')();

// Funcion menu
function menu(){
    console.clear();
    // Muestra opciones
    console.log(`

    === Spam Generator ===

        1. Enviar correo
        2. Añadir correos
        3. Añadir desde .xlsx
        4. Añadir desde .csv

        5. Salir
        
    `);

    let opcion = Number(prompt ("Selecciona una opción: "));
    switch (opcion){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 5:
            process.exit();
        default:
            console.log("Has seleccionado una opción inválida!");
            console.clear();
            menu(); // Sustituyo bucle por volver a llamar la función.
                break;
    }
}

function addCorreos(){
    console.clear();
    console.log(" === Spam Generator === ")
    console.log("  == Añadir correos ==");
    
    console.log(`
    Instrucciones:

    Introduce uno a uno los correos que quieras añadir, introduce "salir" para dejar
    de introducir correos. El correo debe seguir el siguiente formato [correo@proveedor.dominio]`);
    
    let opcion = prompt ("\n¿Quieres añadir nuevos correos? [S/N]: ");
    if(opcion == "S" || opcion == "s"){
        let correo;
        while(correo != "salir" || correo != "Salir"){
            correo = prompt ("\nIntroduce un correo para añadir a la lista de spam: ");
            if(correo.includes('@')){
                spamgenInstancia.correoAdd(correo);
                console.log(`\nCorreo "${correo} añadido correctamente!`);
            }
            else{
                console.log("\nHas introducido un correo inválido! Recuerda seguir el formato especificado!");
            }
        }
        console.log("Volviendo...")
        await();
        return menu();
    }
    else{
        console.log("Volviendo...")
        await();
        return menu();
    }
}

function await(){
    return new Promise(resolve => setTimeout(resolve, 2));
}

module.exports = menu;