const db = require("../model");

exports.index = async (req, res) => {
    let sql = "SELECT * FROM users";

    try {
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
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
    
}

exports.show = async (req, res) => {
    try {
        db.get(`SELECT * FROM users where id = ?`, [req.params.id], (err, row) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            if (!row) {
                res.status(404).json({
                    error: "not found",
                });
                return;
            }
            res.status(200).json(row);
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
        return;
    }
}