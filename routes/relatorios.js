const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { response } = require('express');

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        
            const query = `SELECT * FROM Relatorios WHERE chave = ?;`;
            conn.query(query, [req.body.chave], (error, resultado, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (resultado.length < 1) {
                    return res.status(200).send({
                        "error": true,
                        "message": "Problema nao existe",
                    });
                }
               
                    if (resultado) {

                         return res.status(200).json(resultado);

                    }
                    return res.status(200).send({
                        "error": true,
                        "message": "Falha na busca de itens",

                    });
                
            });
        

    });
});
    module.exports = router;