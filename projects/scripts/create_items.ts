require('dotenv').config();
import { runPinataSequenceForListOfSvgFiles } from "./pinata-utils";

const readline = require("readline-sync");

import {
    getSendAndEquipRemarkForSuperFounder,
    sendRemarks,
    getItemMintRemark, insertRoyalty, getPrimaryResAddRemarkForItem, getResAddRemarkForItem
} from "./utils";
import {
    IS_COLLAB,
    SUPER_FOUNDER,
    STICKIES_ITEM_COLLECTION_ID,
    BASE_ID,
    PROD_STICKIES_KSM,
    TESTING_LIAM_KSM
} from "./constants";

export const run = async () => {
    try {
        let pause;
        let block_number_items_minted;
        pause = false;
        // pause = true;
        // block_number_items_minted = 12067568;
        if (pause) {
            Number(readline.question("You have 'pause' set to true.  Was this intentional?"));
        }

        let primary_same_as_thumb = true;

        // 14
        // pet - dinosaur
        // const SLOTS = ["pet"];
        // const ITEM_NFT_SYMBOL = "GENESIS_PET_DINOSAUR";
        // const SUBDIRECTORY = "genesis-pet-dinosaur"
        // const ITEM_PARTIAL_FILENAME = "dino";
        // const ITEM_TITLE = "Stickie Pet Dinosaur (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Pet Dinosaur, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 10) #";
        // let start = 1;
        // let stop = 10;
        // const ROYALTY_RECEIVER = PROD_STICKIES_KSM;

        // // [COLLAB] Liam - Castle 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["background"];
        // const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_LIAM_CASTLE";
        // const SUBDIRECTORY = "collab-liam-castle"
        // const ITEM_PARTIAL_FILENAME = "castle";
        // const ITEM_TITLE = "Stickie Castle (Collaboration) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Castle, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Castle 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["background"];
        // const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_LIAM_CLASSROOM";
        // const SUBDIRECTORY = "collab-liam-classroom"
        // const ITEM_PARTIAL_FILENAME = "classroom";
        // const ITEM_TITLE = "Stickie Classroom (Collaboration) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Classroom, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Castle 
        const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        const SLOTS = ["background"];
        const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_LIAM_MUSEUM";
        const SUBDIRECTORY = "collab-liam-museum"
        const ITEM_PARTIAL_FILENAME = "museum";
        const ITEM_TITLE = "Stickie Museum (Collaboration) # ";
        const ITEM_DESCRIPTION = "This is a Stickie Museum, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
            "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
            "\n\nTotal supply of 10\n\n#";
        let start = 1;
        let stop = 10;

        const ROYALTY_PERCENTAGE = 10;

        console.log("Royalty Reciever --> ", ROYALTY_RECEIVER);
        console.log("Start            --> ", start);
        console.log("Stop             --> ", stop);
        console.log("Collab           --> ", IS_COLLAB);
        console.log("Collection       --> ", STICKIES_ITEM_COLLECTION_ID);

        readline.question("Press enter to continue...");

        const DIRECTORY = `/assets/chunky/${SUBDIRECTORY}`;
        const THUMB_PATH = `${ITEM_PARTIAL_FILENAME}_thumb.png`
        const PRIMARY_PATH = primary_same_as_thumb ? THUMB_PATH : `${ITEM_PARTIAL_FILENAME}_primary.png`

        let {
            svg_cids: STICKIE_SVG_CIDS,
            thumb: STICKIE_THUMB_CID,
            primary: STICKIE_PRIMARY_CID,
            metadata_cids: cids } = await runPinataSequenceForListOfSvgFiles(
                DIRECTORY, // directory
                ITEM_TITLE, // item title
                ITEM_DESCRIPTION, // metadata description
                [`${ITEM_PARTIAL_FILENAME}_svg.svg`],
                PRIMARY_PATH, // thumb file
                [THUMB_PATH], // thumb file
                ITEM_NFT_SYMBOL, // Item symbol.
                start, // Start index
                stop, // Stop index
            );

        let mint_remarks = []
        let nft_item_ids = []

        cids.forEach((o, i, a) => {
            mint_remarks.push(getItemMintRemark(STICKIES_ITEM_COLLECTION_ID, ITEM_NFT_SYMBOL, start + i, `ipfs://ipfs/${o}`));
        })

        mint_remarks = insertRoyalty(mint_remarks, ROYALTY_RECEIVER, ROYALTY_PERCENTAGE);

        console.log(mint_remarks);
        readline.question("Press enter to continue (send MINT remarks)...")

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
        nft_item_ids.forEach((nft_item) => {
            let primary_resource = getPrimaryResAddRemarkForItem(
                nft_item,
                STICKIE_PRIMARY_CID,
            )
            SLOTS.forEach((slot, i, a) => {
                resadd_item_remarks.push(primary_resource);
                let r = getResAddRemarkForItem(
                    nft_item, // nft item id
                    BASE_ID, // Base ID
                    slot, // Slot ID
                    STICKIE_SVG_CIDS[i], // svg resource
                    STICKIE_THUMB_CID[i], // thumb resource
                    // STICKIE_THUMB_CID, // thumb resource
                )
                resadd_item_remarks.push(r);
            });
        });

        // Send one of them to my test guy
        resadd_item_remarks.push(...getSendAndEquipRemarkForSuperFounder(nft_item_ids[0], SUPER_FOUNDER, SLOTS[1]));
        console.log(resadd_item_remarks);
        readline.question("Press enter to continue (send RESADD remarks)...")
        let resadd_item_block = await sendRemarks(resadd_item_remarks);
        console.log(`Final submission block (RESADD and EQUIP): ${resadd_item_block}`);
        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
