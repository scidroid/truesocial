import { Identity } from "deso.js";

import Deso from "./deso";

const deso = new Deso();

const identity = Identity.init();

const createNFTPost = async (
  publicKey = "",
  body = "",
  img = "",
  data = {}
) => {
  try {
    const post = await deso.createPostForNfts(publicKey, body, img, [], data);

    const hex = post.TransactionHex;

    const signInForHex = await identity.signTxAsync(hex);

    const finalTransaction = await desoApi.submitTransaction(signInForHex);

    return finalTransaction;
  } catch (e) {
    console.error(e);
  }
};

const getPostFromPublicKey = async (publicKey = "") => {
  const posts = await deso.getNfts(publicKey);

  return posts;
};

export { createNFTPost, getPostFromPublicKey };
