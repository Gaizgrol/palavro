const { readFile, writeFile } = require('fs/promises');
const timer = require('../helpers/timerDecorator');

timer('Mapeamento de dados', async () => {
    
    const jsonPalavras = await timer( 'Leitura de arquivo de dados processados', async() =>
        await readFile( './palavras/palavra-descricao.json', { encoding: 'utf-8' } )
    );
    const palavraDescricao = await timer( 'Conversão de dados processados', () => JSON.parse( jsonPalavras ) );
    const palavras = Object.keys( palavraDescricao )

    const palavrasSep = {};
    
    // Filtra as palavras e coloca todo mundo em minúsculo para cada entrada
    await timer( 'Filtragem', () =>
        [ 5, 6, 7 ].forEach( nLetras => {
            palavrasSep[nLetras] = palavras.sort().reduce( (obj, word) => {
                if (
                    // Tamanho informado
                    word.length === nLetras &&
                    // Remoção de símbolos
                    [...word].every( char => ![...' \'/.,-'].includes( char ) ) &&
                    // Sem nomes próprios, números romanos e/ou siglas
                    word === word.toLowerCase()
                ) {
                    obj[word] = palavraDescricao[word];
                }
                return obj;
            }, {});
        })
    );

    const filename = './src/providers/palavras.js';
    await timer( 'Mapeamento de dados', async() =>
        await writeFile( filename, `module.exports = ${JSON.stringify( palavrasSep, null, 2 )};` )
    );
});