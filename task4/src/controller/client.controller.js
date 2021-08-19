const fs = require("fs");
let data = [];
const readJsonFile = () => {
    try {
        data = JSON.parse(fs.readFileSync("src/model/data.json").toString());
        if (!Array.isArray(data)) throw new Error();
    } catch (e) {
        data = [];
    }
};
const saveJsonFile = () => {
    fs.writeFileSync("src/model/data.json", JSON.stringify(data));
};
const incrementAccNo = () => {
    readJsonFile();
    return data.length == 0 ? (newAccNo = 1) : (newAccNo = data[data.length - 1].accNo + 1);
};
class Client {
    addNewClient(name) {
        readJsonFile();
        let newClient = {
            _id: new Date().getTime(),
            accNo: incrementAccNo(),
            name,
            balance: 0,
            status: false,
        };
        data.push(newClient);
        saveJsonFile();
    }
    editClient(clientId, newName) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        data[index].name = newName;
        saveJsonFile();
    }
    showAllClients() {
        readJsonFile();
        data = data.reverse();
        return data;
    }
    searchClient(searchKey) {
        readJsonFile();
        let result = [];
        data.forEach(client => {
            if (client.name.search(searchKey) != -1) result.push(client);
        });
        return result;
    }
    getClientName(clientId) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        return data[index].name;
    }
    deleteClient(clientId) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        data.splice(index, 1);
        saveJsonFile();
    }
    activateClient(clientId) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        data[index].status = true;
        saveJsonFile();
    }
    deactivateClient(clientId) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        data[index].status = false;
        saveJsonFile();
    }
    withdrawal(clientId, amount) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        let oldBalance = data[index].balance;
        if (amount > 5000) {
            throw new Error("you cant withdraw more than 5000");
        } else {
            if (amount > oldBalance) {
                throw new Error(`your balance is not enough to complete the process - your balance is ${oldBalance}`);
            } else {
                data[index].balance -= amount;
                saveJsonFile();
            }
        }
    }
    deposit(clientId, amount) {
        readJsonFile();
        let index = data.findIndex(client => client._id == clientId);
        if (amount > 10000) {
            throw new Error("you cant deposit more than 10000");
        } else {
            data[index].balance += parseInt(amount);
            saveJsonFile();
        }
    }
}
const clientObj = new Client();
module.exports = clientObj;
