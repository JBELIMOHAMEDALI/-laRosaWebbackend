const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
  try {
    connection.query("SELECT * FROM payment", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("empty");
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM payment WHERE id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("id not found");
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
router.get("/get_detalie_payment_contra/:num_contra", async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM payment WHERE payment.Contrat = ?",
      [req.params.num_contra],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows);
        } else {
          res.status(404).send("id not found");
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
//
router.delete("/delete/:id", async (req, res) => {
  // try {
    connection.query(
      "DELETE FROM payment WHERE id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({ msg: "deleted succesfully" });
      } else {
        res.status(404).json({ msg: "id not found" });
      }
      }
    );
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});

router.patch("/update/:id", async (req, res) => {
  // try {
    connection.query(
      "UPDATE payment SET Contrat = ?,Date = ?,Mensualite = ?,PaiedAmmount = ?, dp = ?, Reste = ?,Validation= ? WHERE id = ?",
      [req.body.contrat,req.body.date,req.body.mensualite,req.body.paiedAmmount,req.body.dp,req.body.reste,req.body.validation,req.params.id],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"updated succesffuly"});
        } else {
          res.status(404).json({msg:"id not found"});
        }
      }
    );
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});

router.post("/post", async (req, res) => {
  // try {
    // console.log(req.body);
    connection.query(
      "INSERT INTO payment(Contrat,Date,Mensualite,PaiedAmmount,dp,Reste,Validation) VALUES(?,?,?,?,?,?,?)",
      [req.body.contrat,req.body.date,req.body.mensualite,req.body.paiedAmmount,req.body.dp,req.body.reste,req.body.validation],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send("something went wrong");
        }
      }
    );
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});

router.post('/payment-contra',async(req,res)=>{
  // try {
    let ts = Date.now();
let date_ob = new Date(ts);
const date_db=(date_ob.getDate() + "-" + (date_ob.getMonth() + 1) + "-" + date_ob.getFullYear());
connection.query("SELECT * FROM payment WHERE Contrat = ? AND PaiedAmmount = '0'",[req.body.contrat],(error , rows , fields)=>{
  if(rows.length > 0){
        console.log(rows[0]);
        connection.query("UPDATE payment SET PaiedAmmount = ? , Reste = '0',dp = ? WHERE id = ? AND Contrat = ?",[rows[0].Mensualite,date_db,rows[0].id,rows[0].Contrat],(error , rows , fields)=>{
          if(rows.affectedRows != 0){
            res.status(200).json({msg:'done'});
          }else{
            res.status(500).json({msg:'somthing went wrong'});
          }
        })
      }else{
        res.status(404).json({msg:'no payment found for this contract'});
      }
    })
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send('server error');
  // }
})
