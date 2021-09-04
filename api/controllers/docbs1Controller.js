const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
  try {
    connection.query("SELECT * FROM docbondesortie1", (error, rows, fields) => {
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
      "SELECT * FROM docbondesortie1 WHERE id = ?",
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


router.get("/getDetaile/:id", async (req, res) => {
  try {
    connection.query(" SELECT docbondesortie1.* from docbondesortie1 join bondesortie on bondesortie.documentno=docbondesortie1.id_num_bs WHERE bondesortie.documentno= ?", 
    [req.params.id],
    (error, rows, fields) => {
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






router.delete("/delete/:id", async (req, res) => {
    connection.query(
      "DELETE FROM docbondesortie1 WHERE id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"deleted successfully"});
        } else {
          res.status(404).json({msg:"id not found"});
        }
      }
    );

});

router.patch("/update/:id", async (req, res) => {
  try {
    connection.query(
      "UPDATE docbondesortie1 SET id_num_bs = ?,num_contrat = ?, zone = ?, region = ? WHERE id = ?",
      [
        req.body.id_num_bs,
        req.body.num_contrat,
        req.body.zone,
        req.body.region,
        req.params.id,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send("updated succesffuly");
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

router.post("/post", async (req, res) => {
  try {
    connection.query(
      "INSERT INTO docbondesortie1(id_num_bs,num_contrat,zone,region) VALUES(?,?,?,?)",
      [
        req.body.id_num_bs,
        req.body.num_contrat,
        req.body.zone,
        req.body.region,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send("something went wrong");
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
