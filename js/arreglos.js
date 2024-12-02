const frutas = ["manzana", "peras", "bananos"];

frutas.push("Durasno")

frutas.pop()

frutas.forEach((frutasRecorrida, index) => {
    console.log(`Fruta ${index + 1}: ${frutasRecorrida}`)
});
