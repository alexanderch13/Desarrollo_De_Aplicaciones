/*
ARCHIVO     : ejercicio1.js
AUTOR       : Chipana Flores Alexander Tomas
FECHA       : 03/09/2026
DESCRIPCIÓN : Calcula el costo de envío y valida los datos.
*/

function calcularEnvio(peso, tipo = "normal") {
    // Se aceptan números o cadenas que representen un número.
    if (typeof peso !== "number" && typeof peso !== "string") {
        throw new Error("El peso debe ser un número mayor que cero.");
    }

    const pesoNumerico = Number(peso);
    if (!Number.isFinite(pesoNumerico) || pesoNumerico <= 0) {
        throw new Error("El peso debe ser un número mayor que cero.");
    }

    // Se comprueba que el tipo corresponda a una opción disponible.
    if (tipo !== "normal" && tipo !== "express") {
        throw new Error("El tipo debe ser normal o express.");
    }

    let costoBase;
    if (pesoNumerico <= 2) {
        costoBase = 8;
    } else if (pesoNumerico <= 5) {
        costoBase = 12;
    } else {
        costoBase = 18;
    }

    // Express: costo base + 40 %. Se conserva un resultado numérico.
    const costoFinal = tipo === "express"
        ? Number((costoBase * 1.40).toFixed(2))
        : costoBase;

    return { peso: pesoNumerico, tipo, costoBase, costoFinal };
}

// Pruebas mínimas solicitadas en la guía.
const casosEnvio = [
    { descripcion: "Envío normal", peso: 1.5 },
    { descripcion: "Envío express", peso: "4", tipo: "express" },
    { descripcion: "Peso inválido", peso: -2 }
];

casosEnvio.forEach(caso => {
    console.log(caso.descripcion);
    try {
        const envio = calcularEnvio(caso.peso, caso.tipo);
        console.log(envio);
        console.log("Costo final: S/ " + envio.costoFinal.toFixed(2));
    } catch (error) {
        console.error(error.message);
    }
});
