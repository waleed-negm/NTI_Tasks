const fs = require("fs");
class Bank {
  myData = null;
  readData() {
    try {
      this.myData = JSON.parse(fs.readFileSync("all.json").toString());
      if (!Array.isArray(this.myData)) throw new Error("");
    } catch (e) {
      this.myData = [];
    }
  }
  writeDate() {
    fs.writeFileSync("all.json", JSON.stringify(this.myData));
  }
  incrementAccNo() {
    this.readData();
    let newAccNo;
    return this.myData.length == 0 ? (newAccNo = 1) : (newAccNo = this.myData[this.myData.length - 1].accNo + 1);
  }
  addClient(data) {
    let client = {
      id: new Date().getTime(),
      accNo: this.incrementAccNo(),
      name: data.name,
      balance: 0,
      status: false,
    };
    this.readData();
    this.myData.push(client);
    this.writeDate();
    console.log("new client added successfuly");
    console.table(client);
  }
  showAllClients() {
    this.readData();
    console.table(this.myData);
  }
  searchClients(argv) {
    let searchKey = null;
    for (let x in argv) if (x != "_" && x != "$0") searchKey = x;
    this.readData();
    let result = this.myData.filter((client) => client[searchKey] == argv[searchKey]);
    result.length < 1 ? console.log("not found") : console.table(result);
  }
  deleteClient(argv) {
    this.readData();
    let x = this.myData.findIndex((client) => client.accNo == argv.accNo);
    if (x == -1) return console.log("not found");
    this.myData.splice(x, 1);
    this.writeDate();
    console.log(`accNo:${argv.accNo} client deleted succesfully!`);
    this.showAllClients();
  }
  editClient(argv) {
    this.readData();
    let x = this.myData.findIndex((client) => client.accNo == argv.accNo);
    if (x == -1) return console.log("not found");
    let oldName = this.myData[x].name;
    this.myData[x].name = argv.newName;
    this.writeDate();
    console.log(`accNo:${argv.accNo} client updated succesfully!`);
    // this.searchClients({ accNo: argv.accNo });
    console.table([{ accNo: this.myData[x].accNo, "old name": oldName, "new name": this.myData[x].name }]);
  }
  activateClient(argv) {
    this.readData();
    let x = this.myData.findIndex((client) => client.accNo == argv.accNo);
    if (x == -1) return console.log("not found");
    this.myData[x].status = true;
    this.writeDate();
    console.log(`accNo:${argv.accNo} client activated succesfully!`);
    this.searchClients({ accNo: argv.accNo });
  }
  deactivateClient(argv) {
    this.readData();
    let x = this.myData.findIndex((client) => client.accNo == argv.accNo);
    if (x == -1) return console.log("not found");
    this.myData[x].status = false;
    this.writeDate();
    console.log(`accNo:${argv.accNo} client deactivated succesfully!`);
    this.searchClients({ accNo: argv.accNo });
  }
  withdrawal(argv) {
    this.readData();
    let x = this.myData.findIndex((client) => client.accNo == argv.accNo);
    if (x == -1) return console.log("not found");
    let oldBalance = this.myData[x].balance;
    if (this.myData[x].status) {
      if (argv.amount > 5000) {
        return console.log("you cant withdraw more than 5000");
      } else {
        if (argv.amount > oldBalance) {
          return console.log(`your balance is not enough to complete the process - your balance is ${oldBalance}`);
        } else {
          this.myData[x].balance -= argv.amount;
          this.writeDate();
          console.log(`the operation succesfully!`);
          console.table([{ accNo: this.myData[x].accNo, "old balance": oldBalance, "current balance": this.myData[x].balance }]);
        }
      }
    } else {
      console.log("you are not allowed make shure that your account was activated");
    }
  }
  deposit(argv) {
    this.readData();
    let x = this.myData.findIndex((client) => client.accNo == argv.accNo);
    if (x == -1) return console.log("not found");
    let oldBalance = this.myData[x].balance;
    if (this.myData[x].status) {
      if (argv.amount > 10000) {
        return console.log("you cant deposit more than 10000");
      } else {
        this.myData[x].balance += argv.amount;
        this.writeDate();
        console.log(`the operation succesfully!`);
        console.table([{ accNo: this.myData[x].accNo, "old balance": oldBalance, "current balance": this.myData[x].balance }]);
      }
    } else {
      console.log("you are not allowed make shure that your account was activated");
    }
  }
}
let banking = new Bank();
module.exports = banking;
