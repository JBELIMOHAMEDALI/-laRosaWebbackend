const router = require("express").Router();
const connection = require("../../database/db");
module.exports = router;
router.get("/get", async (req, res) => {
    connection.query("SELECT * from region JOIN zone on zone.id_region=region.id ORDER by region.nom_region", (error, rows, fields) => {
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send("empty");
      }
    });
});
router.get("/get/:id", async (req, res) => {
    connection.query(
      "SELECT * FROM zone WHERE id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("id not found");
        }
      }
    );

});
router.delete("/delete/:id", async (req, res) => {
  try {
    connection.query(
      "DELETE FROM zone WHERE id = ?",
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
    connection.query(
      " UPDATE zone SET nom_zone = ? ,id_region = ? WHERE id = ?",
      [
        req.body.nom_zone,
        req.body.id_region,
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

});
router.post("/post", async (req, res) => {
    
    connection.query(
      "INSERT INTO zone(nom_zone, id_region) VALUES (?,?)",
      [
        req.body.nom_zone,
        req.body.id_region,
      ],
      (error, rows, fields) => {
        if (rows.affectedRows != 0) {
          res.status(200).json({msg:rows});
        } else {
          res.status(500).json({msg:"something went wrong"});
        }
      }
    );

});



  router.get("/getZoneByRegion/:id", async (req, res) => {
    connection.query(
      "SELECT zone.* from zone join region  on region.id=zone.id_region WHERE region.id = ?",
      [req.params.id],
      (error, rows, fields) => {
        if (rows.length > 0) {
          res.status(200).send(rows);
        } else {
          res.status(404).send("id not found");
        }
      }
    );

});