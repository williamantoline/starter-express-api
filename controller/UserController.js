const db = require("../model");

exports.index = async (req, res) => {
    console.log(req.params);
    let sql = "SELECT * FROM users";

    return db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
        }
        res.json({
            message: "success",
            data: rows,
        });
    });
}

exports.show = async (req, res) => {
    db.get(`SELECT * FROM users where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
}