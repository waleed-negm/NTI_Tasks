const express = require("express");
const router = express.Router();
const clientController = require("../src/controller/client.controller");

router.get("", (req, res) => {
    res.redirect("/showAll");
});
router.get("/add", (req, res) => {
    res.render("add", { title: "add new client" });
});
router.post("/add", (req, res) => {
    clientController.addNewClient(req.body.name);
    res.redirect("/showAll");
});
router.get("/showAll", (req, res) => {
    allClients = clientController.showAllClients();
    res.render("all", {
        title: "all Data",
        allClients,
        isEmpty: allClients.length ? false : true,
    });
});
router.post("/delete/:id", (req, res) => {
    clientController.deleteClient(req.params.id);
    res.redirect("/showAll");
});
router.get("/edit/:id", (req, res) => {
    clientName = clientController.getClientName(req.params.id);
    res.render("edit", { title: "edit", clientName });
});
router.post("/edit/:id", (req, res) => {
    clientController.editClient(req.params.id, req.body.name);
    res.redirect("/showAll");
});
router.post("/activate/:id", (req, res) => {
    clientController.activateClient(req.params.id);
    res.redirect("/showAll");
});
router.post("/deactivate/:id", (req, res) => {
    clientController.deactivateClient(req.params.id);
    res.redirect("/showAll");
});
router.get("/deposit/:id", (req, res) => {
    res.render("transactions", { moneyTransaction: "deposit", deposit: true });
});
router.post("/deposit/:id", (req, res) => {
    try {
        clientController.deposit(req.params.id, req.body.amount);
        res.redirect("/showAll");
    } catch (e) {
        res.render("transactions", { moneyTransaction: "deposit", deposit: true, err: e.message });
    }
});
router.get("/withdrawal/:id", (req, res) => {
    res.render("transactions", { moneyTransaction: "withdrawal", withdrawal: true });
});
router.post("/withdrawal/:id", (req, res) => {
    try {
        clientController.withdrawal(req.params.id, req.body.amount);
        res.redirect("/showAll");
    } catch (e) {
        res.render("transactions", { moneyTransaction: "withdrawal", withdrawal: true, err: e.message });
    }
});
router.post("*", (req, res) => {
    result = clientController.searchClient(req.body.search);
    res.render("all", {
        title: "search result",
        allClients: result,
        isEmpty: result.length ? false : true,
    });
});
router.get("*", (req, res) => {
    res.render("err404");
});
module.exports = router;
