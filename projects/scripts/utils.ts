import { SECRET_PHRASE, WS_URL, BASE_ID } from "./constants";
import { Base, NFT } from "rmrk-tools";

require("dotenv").config();
import { KeyringPair } from "@polkadot/keyring/types";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";
import { CodecHash } from "@polkadot/types/interfaces";
import { nanoid } from "nanoid";
import { encodeAddress } from "@polkadot/util-crypto";
import { pinSingleMetadataFromDir } from './pinata-utils';

import { cryptoWaitReady } from "@polkadot/util-crypto";

import fs from 'fs';

export const getNftIds = (block: number, collection_id: string, serial_numbers: number[], symbol: string) => {
  let nft_ids = [];
  serial_numbers.forEach((sn) => {
    nft_ids.push(`${block}-${collection_id}-${symbol}_${sn}-${sn.toString().padStart(8, "0")}`)
  })
  return nft_ids;
}

export const getSendRemark = (from: string, to: string) => {
  return `RMRK::SEND::2.0.0::${from}::${to}`
}

export const getEquippableRemark = (
  // owner_string: string,
  base_id: string,
  collections: string[],
  slot: string
) => {
  try {
    return `RMRK::EQUIPPABLE::2.0.0::${base_id}::${slot}::+${collections.join(",")}`;
  } catch (error: any) {
    console.error(error);
  }
};

export const getPrimaryResAddRemarkForItemWithThumb = (
  // owner_string: string,
  nft_id: string,
  src_ipfs_hash: string,
  thumb: string,
) => {
  try {
    const nft = new NFT({
      block: 666,
      collection: "COLLECTION",
      symbol: `SYMBOL_SERIAL`,
      transferable: 1,
      sn: `${`Q`}`.padStart(8, "0"),
      owner: "dummy_owner_string",
      metadata: "",
    });
    let res_id = nanoid(8);
    let resadd_remark = nft.resadd({
      src: `ipfs://ipfs/${src_ipfs_hash}`,
      id: res_id,
      thumb: thumb,
    });
    console.log(resadd_remark);
    resadd_remark = resadd_remark.replace("666-COLLECTION-SYMBOL_SERIAL-0000000Q", nft_id);
    console.log(resadd_remark);

    // resadd_remark = resadd_remark.replace("src", "mediaUri");
    return resadd_remark;

  } catch (error: any) {
    console.error(error);
  }
};

export const getPrimaryResAddRemarkForItem = (
  // owner_string: string,
  nft_id: string,
  src_ipfs_hash: string,
) => {
  try {
    const nft = new NFT({
      block: 666,
      collection: "COLLECTION",
      symbol: `SYMBOL_SERIAL`,
      transferable: 1,
      sn: `${`Q`}`.padStart(8, "0"),
      owner: "dummy_owner_string",
      metadata: "",
    });
    let res_id = nanoid(8);
    let resadd_remark = nft.resadd({
      src: `ipfs://ipfs/${src_ipfs_hash}`,
      id: res_id,
    });
    resadd_remark = resadd_remark.replace("666-COLLECTION-SYMBOL_SERIAL-0000000Q", nft_id);
    return resadd_remark;

  } catch (error: any) {
    console.error(error);
  }
};

export const getResAddRemarkForItem = (
  // owner_string: string,
  nft_id: string,
  base_symbol: string,
  slot: string,
  src_ipfs_hash: string,
  thumb_ipfs_hash: string,
) => {
  try {
    const nft = new NFT({
      block: 666,
      collection: "COLLECTION",
      symbol: `SYMBOL_SERIAL`,
      transferable: 1,
      sn: `${`Q`}`.padStart(8, "0"),
      owner: "dummy_owner_string",
      metadata: "",
    });
    let res_id = nanoid(8);
    let resadd_remark = nft.resadd({
      slot: `${base_symbol}.${slot}`,
      src: `ipfs://ipfs/${src_ipfs_hash}`,
      thumb: `ipfs://ipfs/${thumb_ipfs_hash}`,
      id: res_id,
    });
    resadd_remark = resadd_remark.replace("666-COLLECTION-SYMBOL_SERIAL-0000000Q", nft_id);
    return resadd_remark;

  } catch (error: any) {
    console.error(error);
  }
};

export const insertRoyalty = (remarks: string[], recipient: string, percentage: number) => {
  remarks.forEach((o, i, a) => {
    a[i] = o.replace("%7D", `%2C%22properties%22%3A%7B%22royaltyInfo%22%3A%7B%22type%22%3A%22` +
      `royalty%22%2C%22value%22%3A%7B%22receiver%22%3A%22${recipient}%22%2C%22` +
      `royaltyPercentFloat%22%3A${percentage}%7D%2C%22_mutation%22%3A%7B%22allowed%22%3Atrue%7D%7D%7D%7D`);
  })
  return remarks;
}

export const convertNftIdToGenericWithoutSerialNumber = (nft_id: string) => {
  let x = nft_id.split("-");
  let to_return = x.slice(0, x.length - 2);
  let cutting = x.slice(0, x.length - 1);
  let name = cutting[cutting.length - 1];
  let split_name = name.split("_");
  let partial = split_name.slice(0, split_name.length - 1);
  let reconstruted_name = `${partial.join("_")}_XXX`;
  let reconstruted_id = `${[...to_return, reconstruted_name].join("-")}-YYY`;
  return reconstruted_id;
}

export const getSerialNumberFromNftId = (nft_id: string) => {
  let as_list = nft_id.split("-");
  let item_name = as_list[as_list.length - 2];
  let split_name = item_name.split("_");
  return split_name[split_name.length - 1];
}

export const checkAllFilesExist = (directory: string, files: string[]) => {
  files.forEach((fn) => {
    if (!fs.existsSync(`${process.cwd()}${directory}/${fn}`)) {
      console.log(`File doesn't exist: ${process.cwd()}${directory}/${fn}`);
      return false;
    }
  })
  return true;
}

export const getSendAndEquipRemarkForSuperFounder = (nft: string, super_founder: string, slot: string) => {
  return [
    getSendRemark(nft, super_founder),
    // `RMRK::EQUIP::2.0.0::${nft}::${BASE_ID}.${slot}`
  ]
}

export const pinMetadataAndGetMintRemarks = async (
  collection_id: string,
  nft_serial_numbers: number[],
  nft_label: string,
  nft_symbol: string,
  subdirectory: string,
  svg_file: string,
) => {
  try {
    await cryptoWaitReady();
    const accounts = getKeys();
    return await Promise.all(nft_serial_numbers.map(async (sn) => {
      await sleep(getRandomInt(15000));
      const metadataCid = await pinSingleMetadataFromDir(
        subdirectory,
        svg_file,
        `${nft_label} #${sn}`,
        {
          external_url: "https://discord.gg/2jAMbr4FRU",
        }
      );
      return new NFT({
        block: 0,
        collection: collection_id,
        symbol: `${nft_symbol}_${sn}`,
        transferable: 1,
        sn: `${sn}`.padStart(8, "0"),
        owner: encodeAddress(accounts[0].address, 2),
        metadata: metadataCid,
      }).mint();
    }));
  } catch (error: any) {
    console.error(error);
  }
};

export const getItemMintRemark = (
  collection_id: string,
  nft_symbol: string,
  sn: number,
  metadata_cid: string
) => {
  try {
    const nft = new NFT({
      block: 0,
      collection: collection_id,
      symbol: `${nft_symbol}_${sn}`,
      transferable: 1,
      sn: `${sn}`.padStart(8, "0"),
      owner: "xyz",
      metadata: metadata_cid,
    });
    return nft.mint();
  } catch (error: any) {
    console.error(error);
  }
};

export const getSetPriorityRemark = (nft_id: string, res_ids: string[]) => {
  return `RMRK::SETPRIORITY::2.0.0::${nft_id}::%5B%22${res_ids[0]}%22%2C%22${res_ids[1]}%22%5D`
};

export const sendRemarks = async (remarks: string[]) => {
  await cryptoWaitReady();
  const accounts = getKeys();
  const ws = WS_URL;
  const phrase = SECRET_PHRASE;
  const kp = getKeyringFromUri(phrase);
  const api = await getApi(ws);

  const txs = remarks.map((remark) => api.tx.system.remark(remark));
  const tx = api.tx.utility.batchAll(txs);
  const { block } = await sendAndFinalize(tx, kp);
  console.log("NFT sent at block: ", block);
  return block;
}




export const getKeys = (): KeyringPair[] => {
  const k = [];
  const keyring = new Keyring({ type: "sr25519" });
  k.push(keyring.addFromMnemonic(SECRET_PHRASE));
  return k;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

export const getKeyringFromUri = (phrase: string): KeyringPair => {
  const keyring = new Keyring({ type: "sr25519" });
  return keyring.addFromUri(phrase);
};

export const getApi = async (wsEndpoint: string): Promise<ApiPromise> => {
  const wsProvider = new WsProvider(wsEndpoint);
  const api = ApiPromise.create({ provider: wsProvider });
  return api;
};

export const chunkArray = (array: any[], size: number) => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
};


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


export const getPrimaryStickieResource = (
  // owner_string: string,
  nft_id: string,
  thumbnail_ipfs_hash: string,
  src_ipfs_hash: string,
) => {
  try {
    const dummy_nft = new NFT({
      block: 666,
      collection: "COLLECTION",
      symbol: `SYMBOL_SERIAL`,
      transferable: 1,
      sn: `${`Q`}`.padStart(8, "0"),
      owner: "owner_string",
      metadata: "",
    });

    const baseResId = nanoid(8);

    let dummy_resadd_statement = dummy_nft.resadd({
      id: baseResId,
      thumb: `ipfs://ipfs/${thumbnail_ipfs_hash}`,
      src: `ipfs://ipfs/${src_ipfs_hash}`,
    });
    let real_resadd_statement = dummy_resadd_statement.replace("666-COLLECTION-SYMBOL_SERIAL-0000000Q", nft_id);
    return { remark: real_resadd_statement, resource_id: baseResId };
  } catch (error: any) {
    console.error(error);
  }
};



export const getComposableStickieResource = (
  // owner_string: string,
  nft_id: string,
  base_id: string,
  thumbnail_ipfs_hash: string,
  // src_ipfs_hash: string,
  parts: string[],
) => {
  try {
    const dummy_nft = new NFT({
      block: 666,
      collection: "COLLECTION",
      symbol: `SYMBOL_SERIAL`,
      transferable: 1,
      sn: `${`Q`}`.padStart(8, "0"),
      owner: "owner_string",
    });

    const baseResId = nanoid(8);
    console.log(`res id composable: ${baseResId}`);

    let dummy_resadd_statement = dummy_nft.resadd({
      base: base_id,
      id: baseResId,
      parts,
      thumb: `ipfs://ipfs/${thumbnail_ipfs_hash}`,
    });
    let real_resadd_statement = dummy_resadd_statement.replace("666-COLLECTION-SYMBOL_SERIAL-0000000Q", nft_id);
    return { remark: real_resadd_statement, resource_id: baseResId };
  } catch (error: any) {
    console.error(error);
  }
};



/*
 Thanks to Martin for this util example
 */
export const sendAndFinalize = async (
  tx: SubmittableExtrinsic<"promise", ISubmittableResult>,
  account: KeyringPair
): Promise<{
  block: number;
  success: boolean;
  hash: CodecHash;
  included: any[];
  finalized: any[];
}> => {
  return new Promise(async (resolve) => {
    let success = false;
    let included = [];
    let finalized = [];
    let block = 0;
    let unsubscribe = await tx.signAndSend(
      account,
      async ({ events = [], status, dispatchError }) => {
        if (status.isInBlock) {
          success = dispatchError ? false : true;
          console.log(
            `📀 Transaction ${tx.meta.name} included at blockHash ${status.asInBlock} [success = ${success}]`
          );
          const api = await getApi(WS_URL);
          const signedBlock = await api.rpc.chain.getBlock(status.asInBlock);
          block = signedBlock.block.header.number.toNumber();
          included = [...events];
        } else if (status.isBroadcast) {
          console.log(`🚀 Transaction broadcasted.`);
        } else if (status.isFinalized) {
          console.log(
            `💯 Transaction ${tx.meta.name}(..) Finalized at blockHash ${status.asFinalized}`
          );
          finalized = [...events];
          let hash = status.hash;
          unsubscribe();
          resolve({ success, hash, included, finalized, block });
        } else if (status.isReady) {
          // let's not be too noisy..
        } else {
          console.log(`🤷 Other status ${status}`);
        }
      }
    );
  });
};
