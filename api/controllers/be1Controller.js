const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
  try {
    connection.query("SELECT * FROM bondentree1", (error, rows, fields) => {
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
      "SELECT * FROM bondentree1 WHERE documentno = ?",
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
      "DELETE FROM bondentree1 WHERE documentno = ?",
      [req.params.documentno],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send("deleted successfully");
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

router.patch("/update/:documentno", async (req, res) => {
  try {
    connection.query(
      "UPDATE bondentree1 SET date = ?,recouvreur = ? WHERE documentno = ?",
      [req.body.date, req.body.recouvreur, req.params.documentno],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send("updated succesffuly");
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

router.post("/post", async (req, res) => {
  try {
    connection.query(
      "INSERT INTO bondentree1(date,recouvreur) VALUES(?,?)",
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
