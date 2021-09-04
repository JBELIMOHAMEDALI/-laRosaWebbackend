const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/getInfoAgontBe/:id", async (req, res) => {
    try {
      connection.query("SELECT bondentree.* ,count(contrat.id) as num_contra from bondentree join agent join contrat on bondentree.recouvreur=agent.nom and agent.nom=contrat.recouvreur where agent.type='Recouvreur' and bondentree.documentno= ?", 
      [req.params.id],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("empty");
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  });
  
  
  router.get("/getInfoAgontBs/:id", async (req, res) => {
    try {
      connection.query("SELECT bondesortie.*,count(contrat.id) as num_contra from bondesortie join agent join contrat ON bondesortie.recouvreur=agent.nom and agent.nom=contrat.recouvreur where agent.type='Recouvreur' and bondesortie.documentno = ?", 
      [req.params.id],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("empty");
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  });



