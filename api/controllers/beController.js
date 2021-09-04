const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
  try {
    connection.query("SELECT * FROM bondentree", (error, rows, fields) => {
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

router.get("/get/:documentno", async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM bondentree WHERE documentno = ?",
      [req.params.documentno],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("documentno not found");
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.delete("/delete/:documentno", async (req, res) => {
  try {
    connection.query(
      "DELETE FROM bondentree WHERE documentno = ?",
      [req.params.documentno],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"deleted successfully"});
        } else {
          res.status(404).json({msg :"documentno not found"});
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.patch("/update/:documentno", async (req, res) => {
    connection.query(
      //{"date":"28-07-2021","recouvreur":"fff","documentno":"109"}
      "UPDATE bondentree SET date = ?,recouvreur = ? WHERE documentno = ?",
      [req.body.date, req.body.recouvreur, req.params.documentno],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"updated succesffuly"});
        } else {
          res.status(404).json({msg:"documentno not found"});
        }
      }
    );

});

router.post("/post", async (req, res) => {
  try {
    connection.query(
      "INSERT INTO bondentree(date,recouvreur) VALUES(?,?)",
      [req.body.date, req.body.recouvreur],
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
