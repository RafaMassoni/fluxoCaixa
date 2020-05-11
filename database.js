// yarn add pg

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'yqplyklcayjpvf',
    password: '1ab8c4e94dba79f021c5d2d62a5aa7daf3ffb4c17f21926110d784774c877da9',
    host: 'ec2-52-202-146-43.compute-1.amazonaws.com',
    database: 'd77j7ftccbro3p',
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

