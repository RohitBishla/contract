// Object.defineProperty(exports, "__esModule", { value: true });
let web3 = require('web3');

const providerUrl = 'wss://magical-fragrant-feather.ethereum-goerli.discover.quiknode.pro/b81664e5368c4f6c4e9fac174655f055e4777006/';
const ButterChickABI = require("./ButterChick_abi");


const webProvider = new web3.default(new web3.default.providers.WebsocketProvider(providerUrl));
const contractAddress = "0x5c615cE01996124e88Ba0dDc2C76ec0D9ED8AF77";
const contract = new webProvider.eth.Contract(ButterChickABI, contractAddress);

const ownerAddress = "0xe54a76c83E20A683fdF9d3Df9D3912A5a218073F";

function balanceOf(address){
    return contract.methods.balanceOf(address).call()
}

let ownerBalance = balanceOf(ownerAddress).then((balance) => {
    console.log(balance);
}).catch((err) => {
    console.log(err.message);
})

function checkOwner(){
    return contract.methods.owner().call()
}

const name = checkOwner().then((name) => {
    console.log(name);
})


// console.log(name);
// console.log(ButterChickABI);
// console.log(contract);