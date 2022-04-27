require('dotenv').config();
import { uploadFileToPinata, uploadAndPinIpfsMetadataMp3 } from "./pinata-utils";

const readline = require("readline-sync");

import {
    getSendAndEquipRemarkForSuperFounder,
    sendRemarks, getItemMintRemark, insertRoyalty, getPrimaryResAddRemarkForItem, getResAddRemarkForItem
} from "./utils";
import {
    IS_COLLAB,
    SUPER_FOUNDER,
    STICKIES_ITEM_COLLECTION_ID,
    BASE_ID,
    // ROYALTY_RECEIVER,
} from "./constants";
import { nanoid } from "nanoid";

export const getSendRemark = (from: string, to: string) => {
    return `RMRK::SEND::2.0.0::${from}::${to}`
}

const getResaddForMp3 = (nft_id: string, metadata_ipfs: string, mp3_ipfs: string, thumbnail: string) => {
    let res_id = nanoid(8);
    let mp3_full = `ipfs://ipfs/${mp3_ipfs}`
    let thumb_full = `ipfs://ipfs/${thumbnail}`

    let rem = `RMRK::RESADD::2.0.0::${nft_id}::{"id":"${res_id}","metadata":"${metadata_ipfs}","src":"${mp3_full}","thumb":"${thumb_full}"}`
    return encodeURI(rem);
}

export const run = async () => {
    try {
        const SLOTS = ["foreground"];
        const ITEM_NFT_SYMBOL = "COLLAB_MP3_BOWSER";
        const SUBDIRECTORY = "collab-foreground-boombox"
        const ITEM_PARTIAL_FILENAME = "collab-item-boombox";
        let start = 1;
        let stop = 10;

        let ids = []
        for (let i = start; i <= stop; i++) {
            ids.push(i);
        }
        console.log(ids);

        const ROYALTY_PERCENTAGE = 10;
        const ROYALTY_RECEIVER = "ES7nMTXLmqMM64HfXPhZgG662N6HAitnQPEneSGxgq3Mfe1"; //BOWSER

        console.log("Royalty Reciever --> ", ROYALTY_RECEIVER);
        console.log("Start            --> ", start);
        console.log("Stop             --> ", stop);
        console.log("Collab           --> ", IS_COLLAB);
        console.log("Collection       --> ", STICKIES_ITEM_COLLECTION_ID);

        readline.question("Press enter to continue...");

        let block_number_items_minted;

        const DIRECTORY = `/assets/chunky/${SUBDIRECTORY}`;

        const THUMB_PATH = `${ITEM_PARTIAL_FILENAME}_thumb.png`
        const MP3_FILENAME = "stickies_on_the_beach.mp3"
        const SVG_PATH = `${ITEM_PARTIAL_FILENAME}_svg.svg`

        const MP3_IPFS = await uploadFileToPinata(DIRECTORY, MP3_FILENAME);
        const THUMBNAIL_IPFS = await uploadFileToPinata(DIRECTORY, THUMB_PATH);
        const SVG_IPFS = await uploadFileToPinata(DIRECTORY, SVG_PATH);

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        let cids = [];

        await asyncForEach(ids, async (id) => {
            cids.push(await uploadAndPinIpfsMetadataMp3(
                {
                    "description": `Stickies on the Beach, track from [@BowserStaxx](https://twitter.com/BowserStaxx)\n\n@equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 10)#${id} of 10`,
                    "name": `Stickies on the Beach #${id}`,
                    "mediaUri": `ipfs://ipfs/${MP3_IPFS}`,
                    "thumbnailUri": `ipfs://ipfs/${THUMBNAIL_IPFS}`
                }
            ))
        })

        let pause;
        pause = false;
        // pause = true;
        // block_number_items_minted = 11792066;
        if (pause) {
            Number(readline.question("You have 'pause' set to true.  Was this intentional?"));
        }

        let mint_remarks = []
        let nft_item_ids = []

        cids.forEach((o, i, a) => {
            mint_remarks.push(getItemMintRemark(STICKIES_ITEM_COLLECTION_ID, ITEM_NFT_SYMBOL, start + i, cids[i]));
        })

        mint_remarks = insertRoyalty(mint_remarks, ROYALTY_RECEIVER, ROYALTY_PERCENTAGE);

        console.log(mint_remarks);
        readline.question("Press enter to continue (send mint remarks)...")

        // // // PAUSE HERE
        console.log("Reached the break point...");
        if (!pause) {
            block_number_items_minted = await sendRemarks(mint_remarks);
        }
        console.log("Passed the break point");

        // Populate item IDs
        cids.forEach((o, i, a) => {
            nft_item_ids.push(`${block_number_items_minted}-${STICKIES_ITEM_COLLECTION_ID}-${ITEM_NFT_SYMBOL}_${start + i}-${(start + i).toString().padStart(8, "0")}`);
        })

        let resadd_item_remarks = [];
        nft_item_ids.forEach((o, i, a) => {
            resadd_item_remarks.push(
                getResaddForMp3(
                    nft_item_ids[i],
                    cids[i],
                    MP3_IPFS,
                    THUMBNAIL_IPFS
                )
            )
            SLOTS.forEach((slot) => {
                // resadd_item_remarks.push(primary_resource);
                resadd_item_remarks.push(getResAddRemarkForItem(
                    nft_item_ids[i], // nft item id
                    BASE_ID, // Base ID
                    slot, // Slot ID
                    SVG_IPFS, // SVG resource
                    THUMBNAIL_IPFS, // Thumbnail
                ));
            });
        });

        // Send one of them to my test guy
        resadd_item_remarks.push(...getSendAndEquipRemarkForSuperFounder(nft_item_ids[0], SUPER_FOUNDER, SLOTS[1]));
        console.log("Final remark submission pending");
        let resadd_item_block = await sendRemarks(resadd_item_remarks);
        console.log(`Final submission block (RESADD and EQUIP): ${resadd_item_block}`);
        process.exit(0);

    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
