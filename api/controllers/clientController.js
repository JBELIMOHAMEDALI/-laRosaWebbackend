const router = require("express").Router();
const connection = require("../../database/db");
const applciation = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
  try {
    connection.query("SELECT * FROM clients", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("no client was found");
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
router.get("/getNom", async (req, res) => {
  try {
    connection.query("SELECT clients.nom from clients", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("no client was found");
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
      "SELECT * FROM clients WHERE id = ?",
      req.params.id,
      (error, rows, fields) => {
        if (rows.length != 0) {
          res.status(200).send([rows[0]]);
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
      "DELETE FROM clients WHERE id = ?",
      req.params.id,
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"deleted successfully"});
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

    connection.query(
      "INSERT INTO clients(cin,nom,greeting,phone,2phone,adresse,zone,region,solvale) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        req.body.cin,
        req.body.nom,
        req.body.greeting,
        req.body.phone,
        req.body.phone2,
        req.body.adresse,
        req.body.zone,
        req.body.region,
        req.body.solvale,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send("server error");
        }
      }
    );

});

router.patch("/update/:id", async (req, res) => {
  try {
    connection.query(
      "UPDATE clients SET cin = ?,nom = ?,greeting =?,phone = ?,2phone = ?,adresse = ?,zone = ?,region = ?,solvale = ? WHERE id = ?",
      [
        req.body.cin,
        req.body.nom,
        req.body.greeting,
        req.body.phone,
        req.body.phone2,
        req.body.adresse,
        req.body.zone,
        req.body.region,
        req.body.solvale,
        req.params.id,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"updated successfully"});
        } else {
          res.status(404).json({msg:"id not found"});
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/getRegitionBayNom/:nom_r/:nom_zone", async (req, res) => {
  // try {
    connection.query(
      // "SELECT region.id as id_reg from region WHERE region.nom_region= ?",
      "SELECT region.id as id_reg,zone.id as id_zon from region,zone WHERE region.nom_region=? and zone.nom_zone=?",
    [  req.params.nom_r,
      req.params.nom_zone,],
      (error, rows, fields) => {
        if (rows.length != 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("id not found");
        }
      }
    );
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});
//SELECT region.id as id_reg from region WHERE region.nom_region="r1"
