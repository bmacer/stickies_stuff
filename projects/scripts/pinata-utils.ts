require('dotenv').config();
import { NFTMetadata } from 'rmrk-tools/dist/classes/nft';
import { Readable } from 'stream';
import { sleep } from './utils';
import fs from 'fs';
import { TWITTER_URL } from './constants';
// @ts-ignore
import pinataSDK, { PinataPinOptions } from '@pinata/sdk';

const defaultOptions: Partial<PinataPinOptions> = {
  pinataOptions: {
    cidVersion: 1,
  },
};

export const pinata = pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

const fsPromises = fs.promises;
export type StreamPinata = Readable & {
  path?: string;
};

// MP3
export const runPinataSequenceForListOfSvgFilesMp3 = async (
  directory: string,
  item_title: string,
  metadata_description: string,
  svg_files: string[],
  primary_file: string,
  thumb_files: string[],
  item_symbol: string,
  start: number,
  stop: number,
) => {
  try {
    for (let file of [...thumb_files, primary_file, ...svg_files]) {
      console.log(file);
      if (
        !fs.existsSync(`${process.cwd()}${directory}/${file}`)) {
        console.log(`File doesn't exit: ${process.cwd()}${directory}/${file}`);
        return;
      }
    }
    let cids = { primary: "", thumb: [], svg_cids: [], metadata_cids: [] }
    cids.primary = await uploadFileToPinata(directory, primary_file);

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    asyncForEach(thumb_files, async (thumb_file) => {
      cids.thumb.push(await uploadFileToPinata(directory, thumb_file))
    })

    for (let i = start; i <= stop; i++) {
      cids.metadata_cids.push(await uploadMetadataToPinata(
        cids.primary, // Primary IPFS
        `${item_title}${i}`, // Name in Pinata
        {
          description: `${metadata_description}${i}`,
          external_url: TWITTER_URL,
          properties: {},
        }
      ));
    }
    for (let svg_file of svg_files) {
      cids.svg_cids.push(await uploadFileToPinata(directory, svg_file));
    }
    return cids;
  } catch (error: any) {
    console.error(error);
    process.exit(0);
  }
}

// Mine
export const runPinataSequenceForListOfSvgFiles = async (
  directory: string,
  item_title: string,
  metadata_description: string,
  svg_files: string[],
  primary_file: string,
  thumb_files: string[],
  item_symbol: string,
  start: number,
  stop: number,
) => {
  try {
    for (let file of [...thumb_files, primary_file, ...svg_files]) {
      console.log(file);
      if (
        !fs.existsSync(`${process.cwd()}${directory}/${file}`)) {
        console.log(`File doesn't exit: ${process.cwd()}${directory}/${file}`);
        return;
      }
    }
    let cids = { primary: "", thumb: [], svg_cids: [], metadata_cids: [] }
    cids.primary = await uploadFileToPinata(directory, primary_file);

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    asyncForEach(thumb_files, async (thumb_file) => {
      cids.thumb.push(await uploadFileToPinata(directory, thumb_file))
    })

    for (let i = start; i <= stop; i++) {
      cids.metadata_cids.push(await uploadMetadataToPinata(
        cids.primary, // Primary IPFS
        `${item_title}${i}`, // Name in Pinata
        {
          description: `${metadata_description}${i}`,
          external_url: TWITTER_URL,
          properties: {},
        }
      ));
    }
    for (let svg_file of svg_files) {
      cids.svg_cids.push(await uploadFileToPinata(directory, svg_file));
    }
    return cids;
  } catch (error: any) {
    console.error(error);
    process.exit(0);
  }
}

// Mine
export const uploadFileToPinata = async (dir: string, filename: string) => {
  try {
    console.log("Uploading file to pinata");

    if (!fs.existsSync(`${process.cwd()}${dir}/${filename}`)) {
      console.log(`File doesn't exit: ${process.cwd()}${dir}/${filename}`);
      process.exit(0);
    }
    console.log("File exists...");
    const imageFile = await fsPromises.readFile(`${process.cwd()}${dir}/${filename}`);
    if (!imageFile) {
      throw new Error('No image file');
    }

    const stream: StreamPinata = Readable.from(imageFile);
    stream.path = filename;

    const imageCid = await pinFileStreamToIpfs(stream, filename);
    console.log(`FILE: `, imageCid);
    return imageCid;
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    return '';
  }
}

// mine
export const uploadMetadataToPinata = async (imageCid: string, name: string, metadataBase: Partial<NFTMetadata>,) => {
  const metadata: NFTMetadata = { ...metadataBase, name, image: `ipfs://ipfs/${imageCid}` };
  const metadataCid = await uploadAndPinIpfsMetadata(metadata);
  await sleep(500);
  console.log(`METADATA: `, metadataCid);
  return metadataCid.replace("ipfs://ipfs/", "");
}

const pinFileStreamToIpfs = async (file: StreamPinata, name?: string) => {
  const options = { ...defaultOptions, pinataMetadata: { name } };
  const result = await pinata.pinFileToIPFS(file, options);
  return result.IpfsHash;
};

export const uploadAndPinIpfsMetadataMp3 = async (metadataFields: any): Promise<string> => {
  const options = {
    ...defaultOptions,
    pinataMetadata: { name: metadataFields.name },
  };
  try {
    const metadata = { ...metadataFields };
    const metadataHashResult = await pinata.pinJSONToIPFS(metadata, options);
    return `ipfs://ipfs/${metadataHashResult.IpfsHash}`;
  } catch (error) {
    console.log("error: ", error);
    return '';
  }
};

export const uploadAndPinIpfsMetadata = async (metadataFields: NFTMetadata): Promise<string> => {
  const options = {
    ...defaultOptions,
    pinataMetadata: { name: metadataFields.name },
  };
  try {
    const metadata = { ...metadataFields };
    const metadataHashResult = await pinata.pinJSONToIPFS(metadata, options);
    return `ipfs://ipfs/${metadataHashResult.IpfsHash}`;
  } catch (error) {
    return '';
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const pinSingleMetadataFromDir = async (
  dir: string,
  path: string,
  name: string,
  metadataBase: Partial<NFTMetadata>,
) => {
  try {
    // await sleep(getRandomInt(5000));
    const imageFile = await fsPromises.readFile(`${process.cwd()}${dir}/${path}`);
    if (!imageFile) {
      throw new Error('No image file');
    }

    const stream: StreamPinata = Readable.from(imageFile);
    stream.path = path;

    const imageCid = await pinFileStreamToIpfs(stream, name);
    console.log(`NFT ${path} IMAGE CID: `, imageCid);
    const metadata: NFTMetadata = { ...metadataBase, name, image: `ipfs://ipfs/${imageCid}` };
    const metadataCid = await uploadAndPinIpfsMetadata(metadata);
    console.log(`NFT ${name} METADATA: `, metadataCid);
    return metadataCid;
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    process.exit(0);
    return '';
  }
};
