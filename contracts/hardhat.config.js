require("dotenv").config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")

const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY || ""
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || ""
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || ""
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY || ""
const KOVAN_PRIVATE_KEY = process.env.KOVAN_PRIVATE_KEY || ""
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY || ""
const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY || ""
const HARMONY_PRIVATE_KEY = process.env.HARMONY_PRIVATE_KEY || ""
const HARMONYTESTNET_PRIVATE_KEY = process.env.HARMONYTESTNET_PRIVATE_KEY || ""
const FANTOM_PRIVATE_KEY = process.env.FANTOM_PRIVATE_KEY || ""
const FANTOMTESTNET_PRIVATE_KEY = process.env.FANTOMTESTNET_PRIVATE_KEY || ""
const CRONOSTESTNET_PRIVATE_KEY = process.env.CRONOSTESTNET_PRIVATE_KEY || ""
const FUJI_PRIVATE_KEY = process.env.FUJI_PRIVATE_KEY || ""
const AVAX_PRIVATE_KEY = process.env.AVAX_PRIVATE_KEY || ""
const AURORATESTNET_PRIVATE_KEY = process.env.AURORATESTNET_PRIVATE_KEY || ""
const INFURA_API_KEY = process.env.INFURA_API_KEY || ""
const VIGIL_API_KEY = process.env.VIGIL_API_KEY || ""
const REPORT_GAS = process.env.REPORT_GAS || false

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [{ version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        } 
      }],
    },
    gasReporter: {
      enabled: REPORT_GAS,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
      // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    contractSizer: {
      runOnCompile: false,
      only: ["APIConsumer", "KeepersCounter", "PriceConsumerV3", "RandomNumberConsumer"],
    },    
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0, //https://github.com/sc-forks/solidity-coverage/issues/652
        },
        localhost: {},
        mumbai: {
          // Infura
          //url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`
          url: `https://rpc-mumbai.maticvigil.com/v1/${VIGIL_API_KEY}`,
          accounts: [MUMBAI_PRIVATE_KEY],
          saveDeployments: true,
        },
        polygon: {
          // Infura
          //url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
           url: `https://rpc-mainnet.maticvigil.com/v1/${VIGIL_API_KEY}`,
          accounts: [POLYGON_PRIVATE_KEY],
          saveDeployments: true,
        },      
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [MAINNET_PRIVATE_KEY],
            saveDeployments: true,
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [RINKEBY_PRIVATE_KEY],
            saveDeployments: true,
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY],
            saveDeployments: true,
        }, 
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [ROPSTEN_PRIVATE_KEY],
            saveDeployments: true,
        }, 
        kovan: {
            url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [KOVAN_PRIVATE_KEY],
            saveDeployments: true,
        },                        
        harmonytestnet: {
            url: `https://api.s0.b.hmny.io`,
            accounts: [`0x${HARMONYTESTNET_PRIVATE_KEY}`],
            saveDeployments: true,
        },
        harmony: {
            url: `https://api.s0.t.hmny.io`,
            accounts: [`0x${HARMONY_PRIVATE_KEY}`],
            saveDeployments: true,
        },
        fantomtestnet: {
            url: `https://rpc.testnet.fantom.network`,
            accounts: [`${FANTOMTESTNET_PRIVATE_KEY}`],
            saveDeployments: true,
        },
        fantom: {
            url: `https://rpc.ftm.tools`,
            accounts: [`${FANTOM_PRIVATE_KEY}`],
            saveDeployments: true,
        },
        cronostestnet: {
            url: `https://cronos-testnet-3.crypto.org:8545`,
            accounts: [`${CRONOSTESTNET_PRIVATE_KEY}`],
            saveDeployments: true,
        },                    
        fuji: {
          url: 'https://api.avax-test.network/ext/bc/C/rpc',
          gasPrice: 470000000000,
          chainId: 43113,
          accounts: [`${FUJI_PRIVATE_KEY}`],
          saveDeployments: true,
        },
        avalanche: {
          url: 'https://api.avax.network/ext/bc/C/rpc',
          gasPrice: 470000000000,
          chainId: 43114,
          accounts: [`${AVAX_PRIVATE_KEY}`],
          saveDeployments: true,
        },
        auroratestnet: {
          url: 'https://testnet.aurora.dev',
          //gasPrice: 120 * 1000000000,
          chainId: 1313161555,
          accounts: [`${AURORATESTNET_PRIVATE_KEY}`],
          saveDeployments: true,
        },                 
        coverage: {
            url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
        },
    },
};
