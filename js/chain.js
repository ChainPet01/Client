
$(function () {
})
const ENV_DEV = "dev";
const ENV_PROD = "prod";
var env = ENV_DEV//dev prod
/**
 * 
 */
/*async */function loginEthereumAuto() {
    if (typeof window.ethereum !== 'undefined') {
        getIsOnCurrChain(function (isOnCurrChain) {
            if (isOnCurrChain) {
                const accounts = /*await */ethereum.request({
                    method: 'eth_requestAccounts'
                }).catch((error) => {
                    // cocoMessage.error(error.message, 3000);
                    $.message({
                        message: error.message,
                        type: 'error'
                    });
                }).then((result) => {
                    const account = result[0];
                    if (/0x/.test(account)) {
                        $.message('Wallet connected successfully!');
                        setTimeout(function () {
                            loginData(account);
                        }, 1000);
                    }
                    else {
                        // cocoMessage.error("Wallet connected failure!", 3000);
                        $.message({
                            message: "Wallet connected failure!",
                            type: 'error'
                        });
                    }
                });
            }
        })
    }
    else {
        $.message({
            message: "Please install MetaMask!",
            type: 'error'
        });
    }
}
/*async */function loginEthereum() {
    if (typeof window.ethereum !== 'undefined') {
        switchChain(function (scSucceed) {
            if (scSucceed) {
                const accounts = /*await */ethereum.request({
                    method: 'eth_requestAccounts'
                }).catch((error) => {
                    $.message({
                        message: error.message,
                        type: 'error'
                    });
                }).then((result) => {
                    const account = result[0];
                    if (/0x/.test(account)) {
                        $.message('Wallet connected successfully!');
                        setTimeout(function () {
                            loginData(account);
                        }, 1000)
                    }
                    else {
                        // cocoMessage.error("Wallet connected failure!", 3000);
                        $.message({
                            message: "Wallet connected failure!",
                            type: 'error'
                        });
                    }
                });
            }
            // else{
            // cocoMessage.error("Wallet connected failure!", 3000);
            // }
        });
    }
    else {
        $.message({
            message: "Please install MetaMask!",
            type: 'error'
        });
    }
}

/**
 * 
 * @param {*} fromAddress 
 * @param {*} toAddress 
 * @param {*} value 
 * @param {*} succeed 
 */
function transferBNB(fromAddress, toAddress, value1, succeed) {
    switchChain(function (scSucceed) {
        if (scSucceed) {
            // web3js = new Web3(ethereum);
            let tmp = value1 + '';
            let v = Web3.utils.toWei(tmp, 'ether');
            // let v = '0x' + Math.round(value1 * 1000000000000000000).toString(16);//19位是1
            var params = [
                {
                    from: fromAddress,
                    to: toAddress,
                    value: Web3.utils.toHex(v)//'0x' + v.toString(16)
                },
            ];
            loading();
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params,
                })
                .then((result) => {
                    loaded();
                    succeed(result);
                })
                .catch((error) => {
                    loaded();
                    console.log(error);
                    $.message({
                        message: error.message,
                        type: 'warning'
                    });
                });
        }
        else {

        }
    })
}
// function balanceBNB(addr,callback) {
//     if (typeof window.ethereum !== 'undefined') {
//         getIsOnCurrChain(function (isOnCurrChain) {
//             if (isOnCurrChain) {
//                 web3js = new Web3(ethereum);
//                 web3.eth.getBalance(addr).then(function(res){
// console.log(res);
// callback(res);
//                 });
//             }
//         });
//     }
// }
// function balanceCPET(hash, callback) {
//     if (typeof window.ethereum !== 'undefined') {
//         getIsOnCurrChain(function (isOnCurrChain) {
//             if (isOnCurrChain) {
//                 web3js = new Web3(ethereum);
//                 web3js.eth.getAccounts(function (error, result) {
//                     console.log("web3",result);
//                     if (!error) {
//                         web3jsaccount = result;
//                         var bytecode;
//                         $.ajaxSettings.async = false; //关闭异步，上链成功后再释放线程（控制）
//                         if (env == ENV_DEV) {
//                             $.getJSON("assets/bytecodetest.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
//                                 bytecode = data;
//                             });
//                         }
//                         else {
//                             $.getJSON("assets/bytecode.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
//                                 bytecode = data;
//                             });
//                         }
//                         var VotingContract = new web3js.eth.Contract(bytecode.abi, bytecode.address); //用abi和地址初始化这个合约
//                         VotingContract.methods.balanceOf(web3jsaccount[0]).send({
//                             from: web3jsaccount[0], //用DApp第一个账户
//                         }).on('error', function (error) { //出错了看错，逻辑用不到
//                             console.log("error", error);
//                             cocoMessage.warning(error.message, 0);
//                             callback(0);
//                         }).on('transactionHash', function (transactionHash) {
//                         }).on('receipt', function (receipt) { //看回执单，逻辑用不到
//                         }).then(res => { //全搞完了以后的事件
//                             // console.log("then", res);
//                             callback(res);
//                         });
//                         $.ajaxSettings.async = true; //关闭异步，上链成功后再释放线程（控制）
//                     }
//                     else {
//                         callback(0);
//                         console.log(error);
//                         cocoMessage.warning(error, 0);
//                     }
//                 });
//             }
//         });
//     }
// }
/**
 * 
 * @param {*} toAddress 
 * @param {*} tokenId 精灵的tokenId
 * @param {*} id 精灵的自增Id
 * @param {*} callback 
 */
function transferNFT(toAddress, tokenId, id, callback) {
    switchChain(function (scSucceed) {
        if (scSucceed) {
            web3js = new Web3(ethereum);
            web3js.eth.getAccounts(function (error, result) {
                if (!error) {
                    web3jsaccount = result;
                    var bytecode;
                    $.ajaxSettings.async = false; //关闭异步，上链成功后再释放线程（控制）
                    if (env == ENV_DEV) {
                        $.getJSON("assets/bytecodetest.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    else {
                        $.getJSON("assets/bytecode.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    var VotingContract = new web3js.eth.Contract(bytecode.abi, bytecode.address); //用abi和地址初始化这个合约
                    VotingContract.methods.transferFrom(web3jsaccount[0], toAddress, tokenId).send({
                        from: web3jsaccount[0], //用DApp第一个账户
                    }).on('error', function (error) { //出错了看错，逻辑用不到
                        console.log("error", error);
                        $.message({
                            message: error.message,
                            type: 'warning'
                        });
                        callback(null, id, tokenId);
                    }).on('transactionHash', function (transactionHash) {
                    }).on('receipt', function (receipt) { //看回执单，逻辑用不到
                    }).then(res => { //全搞完了以后的事件
                        callback(res, id, tokenId);
                    });
                    $.ajaxSettings.async = true; //关闭异步，上链成功后再释放线程（控制）
                }
                else {
                    callback(null, id, tokenId);
                    console.log(error);
                    $.message({
                        message: error,
                        type: 'warning'
                    });
                }
            });
        }
        else {
            callback(null, id, tokenId);
        }
    })
}
/**
 * 
 * @param {*} toAddress 
 * @param {*} tokenId 
 * @param {*} value 
 * @param {*} callback 
 */
function transferToken(toAddress, tokenId, value, callback) {
    switchChain(function (scSucceed) {
        if (scSucceed) {
            web3js = new Web3(ethereum);
            web3js.eth.getAccounts(function (error, result) {
                if (!error) {
                    // let value = 43571;
                    let tmp = value + '';
                    let v = web3js.utils.toWei(tmp, 'ether');//Math.round(value * 1000000000000000000);//19位是1
                    // console.log(v);
                    // let a = '0x' + v.toString(16);
                    web3jsaccount = result;
                    var bytecode;
                    $.ajaxSettings.async = false; //关闭异步，上链成功后再释放线程（控制）
                    if (env == ENV_DEV) {
                        $.getJSON("assets/bytecodetest.json?v=1", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    else {
                        $.getJSON("assets/bytecode.json?v=1", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    var VotingContract = new web3js.eth.Contract(bytecode.abi_token, bytecode.address_token); //用abi和地址初始化这个合约
                    VotingContract.methods.transfer(toAddress, v).send({
                        from: web3jsaccount[0], //用DApp第一个账户
                    }).on('error', function (error) { //出错了看错，逻辑用不到
                        console.log(error);
                        $.message({
                            message: error.message,
                            type: 'warning'
                        });
                        callback(null, tokenId);
                    }).on('transactionHash', function (transactionHash) {
                    }).on('receipt', function (receipt) { //看回执单，逻辑用不到
                    }).then(res => { //全搞完了以后的事件
                        // console.log("then", res);
                        callback(res, tokenId);
                    });
                    $.ajaxSettings.async = true; //关闭异步，上链成功后再释放线程（控制）
                }
                else {
                    callback(null, tokenId);
                    console.log(error);
                    $.message({
                        message: error.message,
                        type: 'warning'
                    });
                }
            });
        } else {
            callback(null, tokenId);
        }
    });
}
/**
 * 
 * @param {*} toAddress 
 * @param {*} tokenId 精灵的tokenId
 * @param {*} id 精灵的自增Id
 * @param {*} callback 
 */
function approvedNFT(toAddress, tokenId, id, callback) {
    switchChain(function (scSucceed) {
        if (scSucceed) {
            web3js = new Web3(ethereum);
            web3js.eth.getAccounts(function (error, result) {
                if (!error) {
                    web3jsaccount = result;
                    var bytecode;
                    $.ajaxSettings.async = false; //关闭异步，上链成功后再释放线程（控制）
                    if (env == ENV_DEV) {
                        $.getJSON("assets/bytecodetest.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    else {
                        $.getJSON("assets/bytecode.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    var VotingContract = new web3js.eth.Contract(bytecode.abi, bytecode.address); //用abi和地址初始化这个合约
                    VotingContract.methods.approve(toAddress, tokenId).send({
                        from: web3jsaccount[0], //用DApp第一个账户
                    }).on('error', function (error) { //出错了看错，逻辑用不到
                        console.log(error);
                        $.message({
                            message: error.message,
                            type: 'warning'
                        });
                        callback(null, id, tokenId);
                    }).on('transactionHash', function (transactionHash) {
                    }).on('receipt', function (receipt) { //看回执单，逻辑用不到
                    }).then(res => { //全搞完了以后的事件
                        callback(res, id, tokenId);
                    });
                    $.ajaxSettings.async = true; //关闭异步，上链成功后再释放线程（控制）
                }
                else {
                    callback(null, id, tokenId);
                    console.log(error);
                    $.message({
                        message: error,
                        type: 'warning'
                    });
                }
            });
        }
        else {
            callback(null, id, tokenId);
        }
    });
}
function removeApprovedNFT(tokenId, callback) {
    switchChain(function (scSucceed) {
        if (scSucceed) {
            web3js = new Web3(ethereum);
            web3js.eth.getAccounts(function (error, result) {
                if (!error) {
                    web3jsaccount = result;
                    var bytecode;
                    $.ajaxSettings.async = false; //关闭异步，上链成功后再释放线程（控制）
                    if (env == ENV_DEV) {
                        $.getJSON("assets/bytecodetest.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    else {
                        $.getJSON("assets/bytecode.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    var VotingContract = new web3js.eth.Contract(bytecode.abi, bytecode.address); //用abi和地址初始化这个合约
                    VotingContract.methods.approve(bytecode.address_black, tokenId).send({
                        from: web3jsaccount[0], //用DApp第一个账户
                    }).on('error', function (error) { //出错了看错，逻辑用不到
                        console.log(error);
                        $.message({
                            message: error.message,
                            type: 'warning'
                        });
                        callback(null, tokenId);
                    }).on('transactionHash', function (transactionHash) {
                    }).on('receipt', function (receipt) { //看回执单，逻辑用不到
                    }).then(res => { //全搞完了以后的事件
                        callback(res, tokenId);
                    });
                    $.ajaxSettings.async = true; //关闭异步，上链成功后再释放线程（控制）
                }
                else {
                    callback(null, tokenId);
                    console.log(error);
                    $.message({
                        message: error,
                        type: 'warning'
                    });
                }
            });
        }
        else {
            callback(null, tokenId);
        }
    });
}
function approvedAll(toAddress, callback) {
    switchChain(function (scSucceed) {
        if (scSucceed) {
            loading();
            web3js = new Web3(ethereum);
            web3js.eth.getAccounts(function (error, result) {
                if (!error) {
                    web3jsaccount = result;
                    var bytecode;
                    $.ajaxSettings.async = false; //关闭异步，上链成功后再释放线程（控制）
                    if (env == ENV_DEV) {
                        $.getJSON("assets/bytecodetest.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    else {
                        $.getJSON("assets/bytecode.json", function (data) { //说实话我也是只关心abi，只要有abi就行，怎么存无所谓
                            bytecode = data;
                        });
                    }
                    var VotingContract = new web3js.eth.Contract(bytecode.abi, bytecode.address); //用abi和地址初始化这个合约
                    VotingContract.methods.setApprovalForAll(toAddress, true).send({
                        from: web3jsaccount[0], //用DApp第一个账户
                    }).on('error', function (error) { //出错了看错，逻辑用不到
                        console.log(error);
                        $.message({
                            message: error.message,
                            type: 'warning'
                        });
                        loaded();
                        callback(null);
                    }).on('transactionHash', function (transactionHash) {
                    }).on('receipt', function (receipt) { //看回执单，逻辑用不到
                    }).then(res => { //全搞完了以后的事件
                        loaded();
                        callback(res);
                    });
                    $.ajaxSettings.async = true; //关闭异步，上链成功后再释放线程（控制）
                }
                else {
                    callback(null);
                    console.log(error);
                    $.message({
                        message: error,
                        type: 'warning'
                    });
                }
            });
        }
        else {
            callback(null);
        }
    });
}
//测试
const valueChainNameTest = 'Binance Smart Chain - Testnet';
const valueChainIdTest = '0x61';
const valueRpcUrlsTest = "https://data-seed-prebsc-1-s1.binance.org:8545";
const valueBlockExplorerUrlsTest = 'https://testnet.bscscan.com';
//正式
const valueChainName = 'Binance Smart Chain';
const valueChainId = '0x38';
const valueRpcUrls = 'https://bsc-dataseed.binance.org';
const valueBlockExplorerUrls = 'https://bscscan.com';
/*async */function getIsOnCurrChain(callback) {
    const chainId =/* await */ethereum.request({ method: 'eth_chainId' });
    let isOnCurrChain = false;
    if (env == ENV_DEV) {
        console.log("curr", chainId);
        // console.log("dev", valueChainIdTest);
        if (chainId == valueChainIdTest)
            isOnCurrChain = true;
    }
    else {
        // console.log("prod", valueChainId);
        if (chainId == valueChainId)
            isOnCurrChain = true;

    }
    callback(isOnCurrChain);
}
/*async */function addChain(data, callback) {
    ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [data]
    }).then(() => {
        switchChain(callback);
    }).catch(res => {
        $.message({
            message: res,
            type: 'error'
        });
    })
}
/*async */function switchChain(callback) {
    if (env == ENV_DEV)
        console.log("env", env)
    if (env == ENV_DEV) {
        let hecoMainnetTest = {
            chainId: valueChainIdTest,
            rpcUrls: [valueRpcUrlsTest],
            chainName: valueChainNameTest,
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
            }
        };
        ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: valueChainIdTest }]
        }).then(() => {
            callback(true);//成功回调
        }).catch(res => {
            if (res.code == 4902) {
                addChain(hecoMainnetTest, callback);
            }
            else if (res.code == -32601) {
                callback(false);//失败回调
                $.message({
                    message: "Please select the BSC main chain or upgrade your wallet",
                    type: 'warning'
                });
            }
            else {
                callback(false);//失败回调
                $.message({
                    message: res.code + ":" + res.message,
                    type: 'error'
                });
            }
        })
    }
    else {
        let hecoMainnet = {
            chainId: valueChainId,
            rpcUrls: [valueRpcUrls],
            chainName: valueChainName,
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
            }
        };
        ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: valueChainId }]
        }).then(() => {
            callback(true);//成功回调
        }).catch(res => {
            if (res.code == 4902) {
                addChain(hecoMainnet, callback);
            }
            else if (res.code == -32601) {
                callback(false);//失败回调
                $.message({
                    message: "Please select the BSC main chain or upgrade your wallet",
                    type: 'error'
                });
            }
            else {
                callback(false);//失败回调
                $.message({
                    message: res.code + ":" + res.message,
                    type: 'error'
                });
            }
        })
    }
}