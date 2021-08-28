const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const dbConnection = require("../src/model/dbConnection");

const incrementAccNo = () => {
    let newAccNo = 1;
    dbConnection((error, response) => {
        response
            .collection("clients")
            .find()
            .sort({ _id: -1 })
            .toArray((e, d) => {
                d.length == 0 ? (newAccNo = 1) : (newAccNo = d[0].accNo + 1);
            });
    });
};

router.get("", (req, res) => res.redirect("/showAll"));
router.get("/showAll", (req, res) => {
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response
            .collection("clients")
            .find()
            .sort({ _id: -1 })
            .toArray((e, d) => {
                if (e) res.send(e);
                res.render("all", {
                    title: "all Data",
                    allClients: d,
                    isEmpty: d.length ? false : true,
                });
            });
    });
});

router.get("/add", (req, res) => res.render("add", { title: "add new client" }));
router.post("/add", (req, res) => {
    let newClient = {
        accNo: new Date().getTime(),
        name: req.body.name,
        balance: 0,
        status: false,
    };
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response.collection("clients").insertOne(newClient, (e, d) => {
            if (e) res.send(e);
            res.redirect("/showAll");
        });
    });
});

router.post("/delete/:id", (req, res) => {
    id = req.params.id;
    console.log(id);
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response
            .collection("clients")
            .deleteOne({ _id: new ObjectId(id) })
            .then(() => res.redirect("/showAll"))
            .catch(() => res.send("can't delete"));
    });
    res.redirect("/showAll");
});

router.get("/edit/:id", (req, res) => {
    id = req.params.id;
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response.collection("clients").findOne({ _id: new ObjectId(id) }, (e, d) => {
            if (e) res.send(e);
            res.render("edit", { clientName: d.name });
        });
    });
});
router.post("/edit/:id", (req, res) => {
    id = req.params.id;
    name = req.body.name;
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response
            .collection("clients")
            .updateOne({ _id: new ObjectId(id) }, { $set: { name } })
            .then(() => res.redirect("/showAll"))
            .catch(() => res.send("can't edit client"));
    });
});

router.post("/activate/:id", (req, res) => {
    id = req.params.id;
    status = req.body.status;
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response
            .collection("clients")
            .updateOne({ _id: new ObjectId(id) }, { $set: { status: true } })
            .then(() => res.redirect("/showAll"))
            .catch(() => res.send("can't activate client"));
    });
});
router.post("/deactivate/:id", (req, res) => {
    id = req.params.id;
    status = req.body.status;
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response
            .collection("clients")
            .updateOne({ _id: new ObjectId(id) }, { $set: { status: false } })
            .then(() => res.redirect("/showAll"))
            .catch(() => res.send("can't deactivate client"));
    });
});

router.get("/deposit/:id", (req, res) => res.render("transactions", { moneyTransaction: "deposit", deposit: true }));
router.post("/deposit/:id", (req, res) => {
    id = req.params.id;
    amount = parseInt(req.body.amount);
    try {
        if (isNaN(amount)) throw new Error("please enter number");
        if (amount > 10000) throw new Error("you cant deposit more than 10000");
        dbConnection((error, response) => {
            if (error) throw new Error("database error");
            response
                .collection("clients")
                .updateOne({ _id: new ObjectId(id) }, { $inc: { balance: amount } })
                .then(() => res.redirect("/showAll"))
                .catch(() => {
                    throw new Error("deposit faild");
                });
        });
    } catch (e) {
        res.render("transactions", { moneyTransaction: "deposit", deposit: true, err: e.message });
    }
});

router.get("/withdrawal/:id", (req, res) => res.render("transactions", { moneyTransaction: "withdrawal", withdrawal: true }));
router.post("/withdrawal/:id", (req, res) => {
    id = req.params.id;
    amount = parseInt(req.body.amount);
    dbConnection((error, response) => {
        if (error) res.send("database error");
        response.collection("clients").findOne({ _id: new ObjectId(id) }, (e, d) => {
            try {
                if (isNaN(amount)) throw new Error("please enter number");
                if (amount > 5000) throw new Error("you cant withdraw more than 5000");
                if (amount > d.balance) {
                    throw new Error(`your balance is not enough to complete the process - your balance is ${d.balance}`);
                }
                response
                    .collection("clients")
                    .updateOne({ _id: new ObjectId(id) }, { $inc: { balance: -amount } })
                    .then(() => res.redirect("/showAll"))
                    .catch(() => {
                        throw new Error("deposit faild");
                    });
            } catch (e) {
                res.render("transactions", { moneyTransaction: "withdrawal", withdrawal: true, err: e.message });
            }
        });
    });
});

router.get("*", (req, res) => res.render("err404"));
module.exports = router;
