const { open } = require( 'fs/promises' );

/**
 * @param {number} nLetters 
 * @param {string} searchFileName 
 */
const filterBy = async ( nLetters, searchFileName ) => {
    const file = await open( searchFileName, 'r' );
    const data = await file.readFile({ encoding: 'utf-8' });
    await file.close();
    
    return data.split('\n');
};

(async (a) => {
    // Busca informações
    const nLetras = parseInt( process.argv[3] );
    const saida = process.argv[4] ?? `./public/palavras/${nLetras}letras.js`;
    const entrada = './public/palavras/originais.txt';

    // Verifica execução do arquivo
    if ( isNaN( nLetras ) || nLetras < 1 || nLetras > 50 )
        throw new Error( '\n\nUtilização:\n\n\tnpm run filter <n> <arquivo?>\n\n\t<n>: Valor entre 1-50 -> filtrar as palavras pelo número de letras;\n\t<arquivo?>: Texto -> arquivo de saída (./public/palavras/<n>letras.js por padrão)\n\n' );

    console.log( `Buscando palavras de ${nLetras} letras no arquivo ${entrada}...` );
    
    // Busca as palavras
    let palavras = await filterBy( nLetras, entrada );
    
    console.log( `Removendo palavras contendo (.), (,), (-), ( ) e (')...\nRemovendo palavras somente maiúsculas...\nColocando todas em letras minúsculas...` );
    
    // Filtra as palavras e coloca todo mundo para lowercasea
    palavras = palavras.filter(
        word => (
            word.length === nLetras && // Tamanho que pedi
            [...word].every( char => ![...'\' .,-'].includes(char) ) && // Sem símbolo por favor
            word !== word.toUpperCase() // Morram, números romanos e siglas
        )
    ).map(
        word => word.toLowerCase()
    );

    console.log( `Removendo duplicatas...` );

    // Array -> Coleção -> Array para remover entradas duplicadas
    palavras = [...( new Set( palavras ) )];

    console.log( `Gerando string...` );

    palavras = `const palavras${nLetras}Letras = [${palavras.reduce( (acc, palavra, i) => {
        return `${acc}'${palavra}'${ i===palavras.length-1 ? '' : ',' }`
    }, '')}]; module.exports = palavras${nLetras}Letras;`;

    // console.log( palavras );

    console.log( `Escrevendo no arquivo ${saida}...` );

    // Escrita em arquivo
    const file = await open( saida, 'w' );
    await file.write( palavras );
    await file.close();

    console.log( 'Finalizado!' );
})();