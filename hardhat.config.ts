// Plugins
// Tasks
import "@nomicfoundation/hardhat-toolbox";
import {config as dotenvConfig} from "dotenv";
import "fhenix-hardhat-docker";
import "fhenix-hardhat-plugin";
import "hardhat-deploy";
import {HardhatUserConfig} from "hardhat/config";
import {resolve} from "path";

// DOTENV_CONFIG_PATH is used to specify the path to the .env file for example in the CI
const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const TESTNET_CHAIN_ID = 42069;
const TESTNET_RPC_URL = "https://api.testnet.fhenix.zone:7747";

const testnetConfig = {
    chainId: TESTNET_CHAIN_ID,
    url: TESTNET_RPC_URL,
    timeout: 100000,
}


// Select either private keys or mnemonic from .env file or environment variables
const keys = process.env.PRIVATE_KEY_0;
testnetConfig['accounts'] = [keys];


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // Optional: defaultNetwork is already being set to "localfhenix" by fhenix-hardhat-plugin
  defaultNetwork: "localfhenix",
  networks: {
    testnet: testnetConfig,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
  mocha: {
    timeout: 100000, // Set a higher timeout value (e.g., 200 seconds)
  },
};

export default config;