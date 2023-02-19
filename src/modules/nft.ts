import fs from "fs";
import { ethers } from "ethers";
import path from "path";

const getContract = async () => {
  try {
    const file = () => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "../contract.json");
        fs.readFile(filePath, "utf-8", (err, data) => {
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

  const parsedData = JSON.parse(data as string);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/oHLDPPY_psBo2BMiz2y1sKxSiZIFyEDy"
  );

  const privatekey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privatekey as string, provider);
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

export default NftContract;
