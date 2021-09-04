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
  try {
    connection.query(
      "DELETE FROM payment WHERE id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send("deleted successfully");
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

router.patch("/update/:id", async (req, res) => {
  try {
    connection.query(
      "UPDATE payment SET Contrat = ?,Date = ?,Mensualite = ?,PaiedAmmount = ?, dp = ?, Reste = ?,Validation= ? WHERE id = ?",
      [req.body.contrat,req.body.date,req.body.mensualite,req.body.paiedAmmount,req.body.dp,req.body.reste,req.body.validation,req.params.id],
      (error, rows, fields) => {
        if (rows) {
          res.status(200).send("updated succesfully");
        } else {
          res.status(404).send('id not found');
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
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
