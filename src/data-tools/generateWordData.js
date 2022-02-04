const { readFile, writeFile } = require('fs/promises');
const TTL = require('@frogcat/ttl2jsonld');
const timer = require('../helpers/timerDecorator');

const removePrefix = ( slug ) => {
    const pieces = slug.split('-');
    return pieces.splice( 2, pieces.length ).join('-');
}

/**
 * Problema do diamante:
 * 
 * Temos os seguintes mapeamentos nos arquivos:
 * 
 *       id 
 *     //   \\
 *    //     \\
 * slug     descrição
 *    \\
 *     \\
 *     palavra
 * 
 * Queremos criar um mapeamento palavra=>descrição,
 * então precisamos ter as informações de id=>palavra
 * para cruzar com id=>descrição e montar os relacionamentos
 * com a função abaixo:
 */
timer( 'Processamento de dados', async () => {

    // Arquivo em formato Turtle
    const ttlDesc = await timer('Leitura de arquivo de descrições', async() => await readFile( './palavras/own-pt-synsets.ttl', { encoding: 'utf-8' } ));
    const ttlWords = await timer('Leitura de arquivo de palavras', async() => await readFile( './palavras/own-pt-words.ttl', { encoding: 'utf-8' } ));
    
    // Transforma a string em formato Turtle em objetos
    const descs = await timer('Conversão de descrições', () =>TTL.parse(ttlDesc));
    const words = await timer('Conversão de palavras', () => TTL.parse(ttlWords));

    // Informações já conhecidas
    const idToSlug = {};
    const slugToWord = {};
    const idToDesc = {};

    // Mapeia todos os relacionamentos id=>slug
    // e todos os relacionamentos slug=>palavra
    await timer('Mapeamento id=>slug + slug=>palavra', () =>
        words['@graph'].forEach( entry => {
            const entryId = entry['@id'];        
            if ( entryId.includes('own-pt:wordsense') )
                idToSlug[
                    removePrefix(entryId).toLowerCase()
                ] = removePrefix(entry['owns:word']['@id']).toLowerCase();
            if ( entryId.includes('own-pt:word-') )
                slugToWord[
                    removePrefix(entryId).toLowerCase()
                ] = entry['owns:lemma']['@value'];
        })
    );

    // Mapeia todos os relacionamentos id=>descrição
    await timer('Mapeamento id=>descrição', () =>
        descs['@graph'].filter( obj =>
            obj['owns:gloss']?.['@language'] === 'pt'
        ).forEach( obj =>
            idToDesc[
                removePrefix(obj['@id']).toLowerCase()
            ] = obj['owns:gloss']['@value']
        )
    );

    // Gerando primeiro relacionamento novo: id=>palavra
    const idToWord = {};

    await timer('Mapeamento novo: id=>palavra', () =>
        Object.keys( idToSlug ).forEach( entry => {
            const slug = idToSlug[entry];
            idToWord[entry] = slugToWord[slug];
        })
    );

    // Último relacionamento: palavra=>descrição
    const wordToDesc = {};

    await timer('Mapeamento novo palavra=>descrição', () =>
        Object.keys( idToWord ).forEach( idx =>
        {
            const id = idx.split('-').splice(0,2).join('-');

            const word = idToWord[idx];
            const desc = idToDesc[id];

            wordToDesc[word] = desc //?? null; // Descomente esse final para manter palavras sem descrições
        })
    );

    // JSON.stringify já remove as entradas com valores undefined.
    // Desta forma, palavras com descrição indefinidas não são
    // mapeadas para o arquivo.
    const filename = './palavras/palavra-descricao.json';
    await timer(`Escrevendo arquivo ${filename}`, async() => await writeFile( filename, JSON.stringify( wordToDesc, null, 2 ) ));
});
