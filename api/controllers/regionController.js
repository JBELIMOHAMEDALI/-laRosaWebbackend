const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
    connection.query("SELECT * FROM region", (error, rows, fields) => {
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
      "SELECT * FROM region WHERE id = ?",
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
      "DELETE FROM region WHERE id = ?",
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
        // WHERE id = ?
      " UPDATE region SET nom_region = ? WHERE id = ?",
      [
        req.body.nom_region,
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
      "INSERT INTO region(nom_region) VALUES (?)",
      [
        req.body.nom_region,
,
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
