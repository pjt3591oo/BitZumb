var Web3 = require('web3');
var web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

    web3 = new Web3(window.web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('__PROVIDER_URL__'));
}