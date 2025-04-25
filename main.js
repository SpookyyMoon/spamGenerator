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

        1. Enviar correos
        2. Añadir correos
        3. Configurar spam
        5. Mostrar lista de spam

        6. Salir
        
    `);

    let opcion = Number(prompt ("Selecciona una opción: "));
    switch (opcion){
        case 1:
            spamgenInstancia.enviarSpam();
            break;
        case 2:
            console.clear();
            //Muestra opciones
            console.log(`

    === Spam Generator ===
            
        1. Añadir desde terminal
        2. Importar desde .xlsx
        3. Importar desde .csv
            
        4. Volver`);

            let opcionNested = Number(prompt ("Selecciona una opción: "))
            
            switch(opcionNested){
                case 1:
                    addCorreos();
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    return menu();
            }
            break;
        case 3:
            console.clear();
            //Muestra opciones
            console.log(`

    === Spam Generator ===
            
        1. Configurar remitente
        2. Modificar asunto
        3. Modificar mensaje
            
        4. Volver`);

            let opcionNested2 = Number(prompt ("Selecciona una opción: "))
            
            switch(opcionNested2){
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    return menu();
            }
            break;
        case 4:
            break;
        case 5:
            mostrarLista();
            break;
        case 6:
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
    de introducir correos. El correo debe seguir el siguiente formato [correo@proveedor.dominio]\n`);
    
    let opcion = prompt ("¿Quieres añadir nuevos correos? [S/N]: ");
    if(opcion == "S" || opcion == "s"){
        let correo = null;
        while(true){
            console.clear();
            console.log(" === Spam Generator === ")
            console.log("  == Añadir correos ==\n");
            correo = prompt ("Introduce un correo para añadir a la lista de spam: ");
            console.log(correo);
            if(correo.includes('@')){
                spamgenInstancia.correoAdd(correo);
                console.log(`\nCorreo "${correo} añadido correctamente!`);
            }
            else if(correo == "Salir" || correo == "salir"){
                console.log("Volviendo...")
                await();
                return menu();
            }
            else{
                console.log("\nHas introducido un correo inválido! Recuerda seguir el formato especificado!");
            }
        }
    }
    else{
        console.log("Volviendo...")
        await();
        return menu();
    }
}

function mostrarLista(){
    console.clear();
    console.log(" === Spam Generator === ");
    console.log("  == Añadir correos ==\n");

    let opcion = prompt("¿Quieres ver la lista actual de spam? [S/N]: ")
    if (opcion == "S" || opcion == "s"){
        spamgenInstancia.listaMostrar();
        prompt("Pulsa enter para volver...");
            return menu();
    }
    else{
        console.log("Volviendo...")
        await();
        return menu();
    }

}

function await(){
    return new Promise(resolve => setTimeout(resolve, 3));
}

menu();

module.exports = menu;