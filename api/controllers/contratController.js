const router = require("express").Router();
const connection = require("../../database/db");
const { route } = require("./agentController");
module.exports = router;
router.get("/get", async (req, res) => {
  try {
    connection.query("SELECT * FROM contrat", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("no contract was found");
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
      "SELECT * FROM contrat WHERE id = ?",
      req.params.id,
      (error, rows, fields) => {
        if (rows.length != 0) {
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

router.delete("/delete/:id", async (req, res) => {
  // try {
    connection.query(
      "DELETE FROM contrat WHERE id = ?",
      req.params.id,
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"deleted succesfully"});
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
    connection.query(
      "INSERT INTO contrat(numero,client,article,qte,montant,avance,datecontrat,premiereecheance,nbrecheance,mensualite,2annuite,2mensualite,commission_vendeur,recouvreur,remarque,chef,comm,statucontrat,active) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.numero,
        req.body.client,
        req.body.article,
        req.body.qte,
        req.body.montant,
        req.body.avance, 
        req.body.datecontrat,
        req.body.premiereecheance,
        req.body.nbrecheance,
        req.body.mensualite,
        req.body.annuite2,
        req.body.mensualite2,
        req.body.commission_vendeur,
        req.body.recouvreur,
        req.body.remarque,
        req.body.chef,
        req.body.comm,
        req.body.statucontrat,
        req.body.active,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send(error);
        }
      }
    );
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});

router.patch("/update/:id", async (req, res) => {
  try {
    connection.query(
      "UPDATE contrat SET numero = ?, client = ?, article = ?,qte = ?, montant = ?,avance = ?, datecontrat = ?,premiereecheance = ?, nbrecheance = ? ,mensualite = ?, 2annuite = ?, 2mensualite = ?, commission_vendeur = ?, recouvreur = ?,remarque = ?, chef = ?, comm = ?, statucontrat = ?, active = ? WHERE id = ?",
      [
        req.body.numero,
        req.body.client,
        req.body.article,
        req.body.qte,
        req.body.montant,
        req.body.avance,
        req.body.datecontrat,
        req.body.premiereecheance,
        req.body.nbrecheance,
        req.body.mensualite,
        req.body.annuite2,
        req.body.mensualite2,
        req.body.commission_vendeur,
        req.body.recouvreur,
        req.body.remarque,
        req.body.chef,
        req.body.comm,
        req.body.statucontrat,
        req.body.active,
        req.params.id
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});





router.get("/getInfoContra/:num_contra", async (req, res) => {
  connection.query(
    "select contrat.*,sum(payment.PaiedAmmount)+contrat.avance as payeyedsom from contrat,payment WHERE payment.Contrat=? and contrat.numero = ?",
    [req.params.num_contra,req.params.num_contra],
    (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows[0]);
      } else {
        res.status(404).send("documentno not found");
      }
    }
  );

});


router.get("/getContraBayNumro/:num_contra", async (req, res) => {
  connection.query(
    "SELECT * from contrat WHERE contrat.numero= ?",
    [req.params.num_contra,req.params.num_contra],
    (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows[0]);
      } else {
        res.status(404).send("documentno not found");
      }
    }
  );

});
//