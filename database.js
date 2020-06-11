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
    CREATE TABLE IF NOT EXISTS CaixaFluxo
    (
        id serial primary key,
        operacao varchar(1) not null,
        categoria varchar(25) not null,
        valor float not null,
        data date not null,
        ativo int not null
    )
`;

const abc = `
    INSERT INTO CaixaFluxo (operacao, categoria, valor, data, ativo) 
                                VALUES   ( '+','Aporte','12000','06/30/2020', 0)
`;


pool.query(abc, function(error, result) {

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

async  create(operacao, categoria, valor, data, ativo) {
const sql = ` INSERT INTO CaixaFluxo (operacao, categoria, valor, data, ativo) 
                            VALUES   ( $1,$2, $3, $4, $5)`;

const result = await pool.query(sql, [operacao, categoria, valor, data, ativo])

return result.rowCount;
    
},

async  select() {
    const sql = ` SELECT * FROM CaixaFluxo order by id`;

    const result = await pool.query(sql)

    return result.rows;
    
},

async  delete(id) {
    const sql = ` DELETE FROM CaixaFluxo where $1 = id `;

    const result = await pool.query(sql, [id])

    return result.rowCount;
    
},

async  update(id, operacao, categoria, valor, data, ativo) {
    const sql = ` UPDATE CaixaFluxo SET 
    operacao = $2,
    categoria = $3,
    valor = $4,
    data = $5,
    ativo = $6

    where $1 = id `;

    const result = await pool.query(sql, [id, operacao, categoria, valor, data, ativo])

    return result.rowCount;
    
},

async  updateAtivo(id, ativo) {
    const sql = ` UPDATE CaixaFluxo SET 
 
    ativo = $2

    where $1 = id `;

    const result = await pool.query(sql, [id, ativo])

    return result.rowCount;
    
}



}

