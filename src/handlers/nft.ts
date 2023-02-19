import NftContract from "../modules/nft";

export const createContract = async (req, res, next) => {
  try {
    const contract = await NftContract(
      req.body.price,
      req.body.uri,
      req.body.creator
    );
    res.status(200);
    res.json({ contract });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
