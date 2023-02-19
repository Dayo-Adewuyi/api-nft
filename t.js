const fs = require("fs");
const ethers = require("ethers");

const getContract = async () => {
  try {
    const file = () => {
      return new Promise((resolve, reject) => {
        fs.readFile("./contract.json", "utf-8", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };
    const data = await file(); // this is the key
    return data;
  } catch (err) {
    console.log(err);
  }
};

const NftContract = async (price, uri, creator) => {
  const data = await getContract();
  const parsedData = JSON.parse(data);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/oHLDPPY_psBo2BMiz2y1sKxSiZIFyEDy"
  );

  const privatekey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privatekey, provider);
  const nftPrice = ethers.utils.parseEther(price);

  // Deploy the contract
  const factory = new ethers.ContractFactory(
    parsedData.abi,
    parsedData.bytecode,
    wallet
  );
  const contract = await factory.deploy(nftPrice, uri, creator);
  await contract.deployed();
  return contract.address;
};

module.exports = NftContract;
