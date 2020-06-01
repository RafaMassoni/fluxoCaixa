// yarn add pg

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'claiysiegcrdmb',
    password: 'eed3f7645da2bda6abf80cad08edcc91343f3ad40c6f955809f31b787ff6ef98',
    host: 'ec2-54-211-210-149.compute-1.amazonaws.com',
    database: 'dcfct1rc06la2j',
    port: '5432',
    ssl: {rejectUnauthorized: false}
});

/*
const sqlCreate = `
    CREATE TABLE IF NOT EXISTS fluxocaixa
    (
        id serial primary key,
        operacao varchar(1) not null,
        categoria varchar(25) not null,
        valor float not null,
        data varchar(12) not null
    )
`;

pool.query(sqlCreate, function(error, result) {

    if(error)
        throw error

    console.log('Tabela criada com sucesso!')
} );

*/

// ----------------------------------------------------------

// operação
// + -> Receber
// - -> Pagar


module.exports = {

    async  create(operacao, categoria, valor, data) {
    const sql = ` INSERT INTO fluxocaixa (operacao, categoria, valor, data) 
                                VALUES   ( $1,$2, $3, $4)`;

    const result = await pool.query(sql, [operacao, categoria, valor, data])

    return result.rowCount;
    
},

async  select() {
    const sql = ` SELECT * FROM fluxocaixa `;

    const result = await pool.query(sql)

    return result.rows;
    
},

async  delete(id) {
    const sql = ` DELETE FROM fluxocaixa where $1 = id `;

    const result = await pool.query(sql, [id])

    return result.rowCount;
    
},

async  update(id, operacao, categoria, valor, data) {
    const sql = ` UPDATE fluxocaixa SET 
    operacao = $2,
    categoria = $3,
    valor = $4,
    data = $5

    where $1 = id `;

    const result = await pool.query(sql, [id, operacao, categoria, valor, data])

    return result.rowCount;
    
}

}

