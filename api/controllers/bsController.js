const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
    connection.query("SELECT * FROM bondesortie", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("empty");
      }
    });

});
router.get("/get/:documentno", async (req, res) => {
    connection.query(
      "SELECT * FROM bondesortie WHERE documentno = ?",
      [req.params.documentno],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("documentno not found");
        }
      }
    );

});
router.delete("/delete/:documentno", async (req, res) => {
    connection.query(
      "DELETE FROM bondesortie WHERE documentno = ?",
      [req.params.documentno],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:"deleted successfully"});
        } else {
          res.status(404).json({msg:"documentno not found"});
        }
      }
    );

});
router.patch("/update/:documentno", async (req, res) => {

    connection.query(
      "UPDATE bondesortie SET date = ?,recouvreur = ? WHERE documentno = ?",
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
    connection.query(
      "INSERT INTO bondesortie(date,recouvreur) VALUES(?,?)",
      [req.body.date, req.body.recouvreur],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send("something went wrong");
        }
      }
    );
});
