// Object.defineProperty(exports, "__esModule", { value: true });
let web3 = require('web3');
//let ethereumjs = require('ethereumjs-tx');

const providerUrl = 'https://magical-fragrant-feather.ethereum-goerli.discover.quiknode.pro/b81664e5368c4f6c4e9fac174655f055e4777006/';
const ButterChickABI = require("./ButterChick_abi");
let url='https://rpc.ankr.com/eth_goerli'

const webProvider = new web3.default(new web3.default.providers.HttpProvider(url));
const contractAddress = "0x5c615cE01996124e88Ba0dDc2C76ec0D9ED8AF77";
const contract = new webProvider.eth.Contract(ButterChickABI, contractAddress);

const ownerAddress = "0xe54a76c83E20A683fdF9d3Df9D3912A5a218073F";
const privateKey =   "d40a5f7e12e82c2a4b51e652734887725d40fe40204a6c4138500a987ca194c4";

const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
// web3.eth.accounts.wallet.add(account);
// web3.eth.defaultAccount = account.address;
console.log('Address:', account.address);

async function earnToken() {
    let tx={
        from:'0xe54a76c83E20A683fdF9d3Df9D3912A5a218073F',
        to:contractAddress,
        nonce:6,
         gas:3000,
        gasLimit:45000,
         gasPrice:280000,
        // maxFeePerGas:100000018,
        data:contract.methods.earnTokensViaSpend('0x13d6ff29FF49D16010c1318CA9Cb0f3b7C787cB7', '0x77be04328B0511366CE76f5aB654da1D401D5bB4', 200).encodeABI()
    }
    console.log(tx)
    let signedTX=await webProvider.eth.accounts.signTransaction(tx,privateKey)
    console.log({signedTX})
    webProvider.eth.sendSignedTransaction(signedTX.rawTransaction).then((res)=>{
        console.log(res)
    })
}
earnToken()

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

// function earnTokensViaSpend(userAddress, retailerAddress, amount){
//     return contract.methods.earnTokensViaSpend(userAddress, retailerAddress, amount).send({from: ownerAddress});
// }

// const returnedValue = earnTokensViaSpend("0x13d6ff29FF49D16010c1318CA9Cb0f3b7C787cB7", "0x77be04328B0511366CE76f5aB654da1D401D5bB4", 200);
// console.log(returnedValue);

// let updatedBalance = balanceOf(ownerAddress).then((balance) => {
//     console.log(balance);
// }).catch((err) => {
//     console.log(err.message)});

// console.log(updatedBalance);

function newSignUp(newaddress, role){
    return contract.methods.newSignUp(newaddress, role).send({from: account.address});
}

// const roleAssignment = newSignUp("0x13d6ff29FF49D16010c1318CA9Cb0f3b7C787cB7", 1);

function viewRole(userAddress){
    return contract.methods.viewRole(userAddress).call();
}

// const userRole = viewRole("0x13d6ff29FF49D16010c1318CA9Cb0f3b7C787cB7").then((role) => {
//     console.log(role);
// });



// console.log(name);
// console.log(ButterChickABI);
// console.log(contract);
