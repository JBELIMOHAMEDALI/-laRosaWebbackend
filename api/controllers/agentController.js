const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;

router.get("/get", async (req, res) => {
  // try {
    connection.query("SELECT * FROM agent", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("empty");
      }
    });
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});

router.get("/get/:id", async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM agent WHERE id = ?",
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
  // try {
    connection.query(
      "DELETE FROM agent WHERE id = ?",
      [req.params.id],
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

router.patch("/update/:id", async (req, res) => {
  // try {
    connection.query(
      "UPDATE agent SET cin = ?,nom = ?,type =? ,Numero =? WHERE id = ?",
      [
        req.body.cin,
        req.body.nom,
        req.body.type,
        req.body.Numero,
        req.params.id,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
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
  // try {
    connection.query(
      "INSERT INTO agent(cin,nom,type,Numero) VALUES(?,?,?,?)",
      [req.body.cin, req.body.nom, req.body.type, req.body.Numero],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).send(rows);
        } else {
          res.status(500).send("something went wrong");
        }
      }
    );
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("server error");
  // }
});

router.get("/getbytype/:type", async (req, res) => {
 console.log("------------------"+req.params.type);
    connection.query(
      "SELECT * from agent where agent.type= ? ",
      [req.params.type],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(404).json({msg:"type not found"});
        }
      }
    );

});
