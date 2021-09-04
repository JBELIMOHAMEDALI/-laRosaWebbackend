const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
    connection.query("SELECT * FROM article", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("empty");
      }
    });
});

router.get("/get/:id", async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM article WHERE article_id = ?",
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
router.delete("/delete/:id", async (req, res) => {
  try {
    connection.query(
      "DELETE FROM article WHERE article_id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"deleted successfully"});
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
router.patch("/update/:id", async (req, res) => {
  // try {
    connection.query(
      "UPDATE article SET ref = ?,nom = ?,prix =? ,mavance =?, annuite=?,mensualite= ?,2annuite = ?,2mensualite= ? WHERE article_id = ?",
      [
        req.body.ref,
        req.body.nom,
        req.body.prix,
        req.body.mavance,
        req.body.annuite,
        req.body.mensualite,
        req.body.annuite2,
        req.body.mensualite2,
        req.params.id,
      ],
      (error, rows, fields) => {
       
        if (rows.affectedRows === 1) {
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
    
    connection.query(
      "INSERT INTO article(ref,nom,prix,mavance,annuite,mensualite,2annuite,2mensualite) VALUES(?,?,?,?,?,?,?,?)",
      [
        req.body.ref,
        req.body.nom,
        req.body.prix,
        req.body.mavance,
        req.body.annuite,
        req.body.mensualite,
        req.body.annuite2,
        req.body.mensualite2,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send("something went wrong");
        }
      }
    );

});
