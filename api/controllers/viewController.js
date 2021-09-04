const connection = require('../../database/db');
const router = require('express').Router();
module.exports = router;


router.get('/get',async(req,res)=>{
    try {
        connection.query('SELECT * FROM be',(error,rows,field)=>{
            if(rows.length > 0){
                res.status(200).send(rows);
            }else{
                res.status(404).send('view is empty');
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})