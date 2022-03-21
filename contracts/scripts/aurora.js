const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarketAurora");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();

  var args = process.argv.slice(2);

  console.log("nftMarket deployed to:", nftMarket.address, network.name);

  const NFT = await hre.ethers.getContractFactory("NFTAurora");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address, network.name);

  let config = `module.exports = {
nftmarketaddress: "${nftMarket.address}",
nftaddress: "${nft.address}"
}
`

  let data = JSON.stringify(config)
  fs.writeFileSync(`${network.name}-config.js`, JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });