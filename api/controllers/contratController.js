const router = require("express").Router();
const { query } = require("express");
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
        req.params.id,
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
    [req.params.num_contra, req.params.num_contra],
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
    [req.params.num_contra, req.params.num_contra],
    (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows[0]);
      } else {
        res.status(404).send("documentno not found");
      }
    }
  );
});

router.get("/stat-contrat", async (req, res) => {
  try {
    if (
      req.body.client == "" &&
      req.body.region != "" &&
      req.body.article == "" &&
      (req.body.montant == null || req.body.montant == "") &&
      req.body.chef == "" &&
      req.body.client == "" &&
      req.body.recouvreur == "" &&
      req.body.comm == "" &&
      req.body.status == ""
    ) {
      connection.query(
        "SELECT contrat.numero,contrat.client,contrat.article,contrat.qte,contrat.datecontrat,contrat.premiereecheance,contrat.statucontrat FROM contrat,clients WHERE (contrat.client = clients.nom) AND (clients.region = ?)",
        [req.body.region],
        (error, rows, fields) => {
          if (rows.length > 0) {
            res.status(200).send(rows);
          } else {
            res.status(404).send("no contrat found");
          }
        }
      );
    }
    else if (
    req.body.client == "" &&
    req.body.region == "" &&
    req.body.zone != "" &&
    req.body.article == "" &&
    (req.body.montant == null || req.body.montant == "") &&
    req.body.chef == "" &&
    req.body.client == "" &&
    req.body.recouvreur == "" &&
    req.body.comm == "" &&
    req.body.status == ""){
      connection.query(
        "SELECT contrat.numero,contrat.client,contrat.article,contrat.qte,contrat.datecontrat,contrat.premiereecheance,contrat.statucontrat FROM contrat,clients WHERE (contrat.client = clients.nom) AND (clients.zone = ?)",
        [req.body.zone],
        (error, rows, fields) => {
          if (rows.length > 0) {
            res.status(200).send(rows);
          } else {
            res.status(404).send("no contrat found");
          }
        }
      );

    }
    else if(
      req.body.client == "" &&
      req.body.region == "" &&
      req.body.article == "" &&
      (req.body.montant == null || req.body.montant == "") &&
      req.body.chef == "" &&
      req.body.client == "" &&
      req.body.recouvreur == "" &&
      req.body.comm == "" &&
      req.body.status == ""
    ){
      connection.query("SELECT contrat.numero,contrat.client,contrat.article,contrat.qte,contrat.datecontrat,contrat.premiereecheance,contrat.statucontrat FROM contrat",(error , rows ,fields)=>{
        if(rows.length > 0){
          res.status(200).send(rows)
        }else{
          res.status(404).send('not found');
        }
      })
    }
     
    else{
      connection.query(
        "SELECT contrat.numero,contrat.client,contrat.article,contrat.qte,contrat.datecontrat,contrat.premiereecheance,contrat.statucontrat FROM contrat,clients WHERE (((? = clients.nom) AND (clients.region = ?) AND (? NOT LIKE '')) OR (? LIKE '')) AND (((? = clients.nom) AND (clients.zone = ?) AND (? NOT LIKE '')) OR (? LIKE '')) AND(contrat.article = ? OR (? LIKE '')) AND (contrat.montant = ? OR (? IS NULL) OR (? LIKE '')) AND (contrat.chef = ? OR (? LIKE '')) AND (contrat.client = ? OR (? LIKE '')) AND (contrat.recouvreur = ? OR (? LIKE '')) AND (contrat.comm = ? OR (? LIKE '')) AND (contrat.statucontrat = ? OR (? LIKE '')) GROUP BY contrat.id",
        [
          req.body.client,
          req.body.region,
          req.body.client,
          req.body.region,
          req.body.client,
          req.body.zone,
          req.body.client,
          req.body.zone,
          req.body.article,
          req.body.article,
          req.body.montant,
          req.body.montant,
          req.body.montant,
          req.body.chef,
          req.body.chef,
          req.body.client,
          req.body.client,
          req.body.recouvreur,
          req.body.recouvreur,
          req.body.comm,
          req.body.comm,
          req.body.status,
          req.body.status,
        ],
        (error, rows, fields) => {
          if (rows.length > 0) {
            res.status(200).send(rows);
          } else {
            res.status(404).send("contract not found");
          }
        }
      );
    }
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
//
