import { SECRET_PHRASE, WS_URL, BASE_ID } from "./constants";
import { Base, consolidatedCollectionToInstance, NFT } from "rmrk-tools";
import { uploadFileToPinata } from './pinata-utils';

require("dotenv").config();

import { Readable } from 'stream';
import fs from 'fs';
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



// export const pinSingleMetadataFromDir = async (
//     dir: string,
//     path: string,
//     name: string,
//     metadataBase: Partial<NFTMetadata>,
// ) => {
//     try {
//         // await sleep(getRandomInt(5000));
//         const imageFile = await fsPromises.readFile(`${process.cwd()}${dir}/${path}`);
//         if (!imageFile) {
//             throw new Error('No image file');
//         }

//         const stream: StreamPinata = Readable.from(imageFile);
//         stream.path = path;

//         const imageCid = await pinFileStreamToIpfs(stream, name);
//         console.log(`NFT ${path} IMAGE CID: `, imageCid);
//         const metadata: NFTMetadata = { ...metadataBase, name, image: `ipfs://ipfs/${imageCid}` };
//         const metadataCid = await uploadAndPinIpfsMetadata(metadata);
//         console.log(`NFT ${name} METADATA: `, metadataCid);
//         return metadataCid;
//     } catch (error) {
//         console.log(error);
//         console.log(JSON.stringify(error));
//         process.exit(0);
//         return '';
//     }
// };


// const collectionMetadataCid = await pinSingleMetadataFromDir(
//     "/assets/chunky",
//     "Chunky Preview.png",
//     "RMRK2 demo chunky collection",
//     {
//         description: "This is Chunky! RMRK2 demo nested NFT",
//         externalUri: "https://rmrk.app",
//         properties: {},
//     }
// );



export const run = async () => {
    try {
        for (let i in ["L", "R"]) {
            console.log(i);
        }
        let partial = `/assets/archiverse/NFT Child/01 - PYRAMID A`;
        ["L", "R"].forEach((i, index, array) => {
            console.log(i);
            // ["DOWN", "UP"].forEach((j, index, array) => {
            ["DOWN"].forEach((j, index, array) => {
                ["1"].forEach(async (k, index, array) => {
                    // ["1", "2", "3", "4", "5"].forEach((k, index, array) => {
                    let file = `PYRAMID-A_${i}${k}-${j}.png`;
                    let directory = `${process.cwd()}/${partial}/`;
                    let full = `${process.cwd()}/${partial}/${file}`;
                    console.log(full);
                    console.log(fs.existsSync(full));
                    let slot = `${i}${k}-${j}`;
                    console.log(slot);
                    // const metadataCid = await uploadFileToPinata(partial, file);
                });
            })
        })
        // let directory = "/assets/archiverse";
        // let file = "NFT Child/02 - OG_preview.jpg";
        // let path = `${process.cwd()}${directory}`;
        // let full_path = `${path}${file}`
        // console.log(full_path);
        // console.log(fs.existsSync(full_path));
        // !fs.existsSync(path) {
        //     console.log(`File doesn't exit: ${process.cwd()}${directory}/${file}`);
        //     return;
        // }
        // const metadataCid = await uploadFileToPinata(directory, file);
        // console.log("Hello");
        // process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();

// /Users/bmacer/rmrk/examples/rmrk2-examples/projects/scripts/assets/archiverse/NFT Child/02 - OG_preview.jpg