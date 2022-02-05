module.exports = async ( rotulo, callback, ...args ) => {
    
    console.log( `Tarefa '${rotulo}' iniciada...` )
    
    const inicio = Date.now();
    const valor = await callback(...args);
    const fim = Date.now();

    console.log( `Tarefa '${rotulo}' finalizada em ${fim-inicio}ms!` )

    return valor;
}