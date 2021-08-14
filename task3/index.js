// client [{id,accNo,name,balance,status}] =>all.json
// client status >> false
// client accNo in auto increment
// withdraw max>>5000 status>>true
// deposit max>> 10000 status>>true
// yargs +> add, all, search, delete, edit, activate, deactivate, deposit, withdraw inside all.json
const yargs = require("yargs");
const functions = require("./functions");
// node index add --name
yargs.command({
  command: "add",
  describe: "add new client",
  builder: {
    name: { demandOption: true, type: "string" },
  },
  handler: function (argv) {
    functions.addClient(argv);
  },
});
// node index all
yargs.command({
  command: "all",
  describe: "show all clients",
  handler: function () {
    functions.showAllClients();
  },
});
// node index search --acc-no // --name
yargs.command({
  command: "search",
  describe: "search clients",
  builder: {
    accNo: { type: "number" },
    name: { type: "string" },
  },
  handler: function (argv) {
    functions.searchClients(argv);
  },
});
// node index del --acc-no
yargs.command({
  command: "del",
  describe: "delete client",
  builder: {
    accNo: { demandOption: true, type: "number" },
  },
  handler: function (argv) {
    functions.deleteClient(argv);
  },
});
// node index edit --acc-no --new-name
yargs.command({
  command: "edit",
  describe: "delete client",
  builder: {
    accNo: { demandOption: true, type: "number" },
    newName: { demandOption: true, type: "string" },
  },
  handler: function (argv) {
    functions.editClient(argv);
  },
});
// node index activate --acc-no
yargs.command({
  command: "activate",
  describe: "activate client",
  builder: {
    accNo: { demandOption: true, type: "number" },
  },
  handler: function (argv) {
    functions.activateClient(argv);
  },
});
// node index deactivate --acc-no
yargs.command({
  command: "deactivate",
  describe: "deactivate client",
  builder: {
    accNo: { demandOption: true, type: "number" },
  },
  handler: function (argv) {
    functions.deactivateClient(argv);
  },
});
// node index withdraw --acc-no --amount
yargs.command({
  command: "withdraw",
  describe: "withdraw from balance ,max amount is 5000",
  builder: {
    accNo: { demandOption: true, type: "number" },
    amount: { demandOption: true, type: "number" },
  },
  handler: function (argv) {
    functions.withdrawal(argv);
  },
});
// node index deposit --acc-no --amount
yargs.command({
  command: "deposit",
  describe: "deposit  balance ,max amount is 10000",
  builder: {
    accNo: { demandOption: true, type: "number" },
    amount: { demandOption: true, type: "number" },
  },
  handler: function (argv) {
    functions.deposit(argv);
  },
});
yargs.argv;
