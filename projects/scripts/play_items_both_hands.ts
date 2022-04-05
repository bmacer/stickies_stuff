require('dotenv').config();

import { getSendAndEquipRemarkForSuperFounder, insertRoyalty, getPrimaryResAddRemarkForItem } from './utils';
import { runPinataSequenceForListOfSvgFiles } from './pinata-utils';
const readline = require("readline-sync");

import { getItemMintRemark, getResAddRemarkForItem, sendRemarks } from "./utils";
import {
    STICKIES_ITEM_COLLECTION_ID,
    SUPER_FOUNDER,
    BASE_ID,
} from "./constants";

export const run = async () => {
    try {
        let mint_block, pause;
        pause = false;
        // pause = true;
        // mint_block = 11724130;

        if (pause) {
            Number(readline.question("you sure?, you have pause set..."));
        }

        let primary_same_as_thumb = true

        // left first, then right: const SLOTS = ["left_hand_holding", "right_hand_holding"];
        // Plain hand
        // const SLOTS = ["left_hand", "right_hand"];
        // const ITEM_NFT_SYMBOL = "GENESIS_HANDS";
        // const SUBDIRECTORY = "genesis-hands"
        // const ITEM_PARTIAL_FILENAME = "genesis-hands";
        // const ITEM_TITLE = "Stickie Hand (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Hand, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 200) #";
        // let start = 101;
        // let stop = 199;

        // 17 
        // Thumbs up
        // const SLOTS = ["left_hand", "right_hand"];
        // const ITEM_NFT_SYMBOL = "GENESIS_HANDS_THUMBS_UP";
        // const SUBDIRECTORY = "genesis-hands-thumbs-up"
        // const ITEM_PARTIAL_FILENAME = "genesis-hands-thumbs-up";
        // const ITEM_TITLE = "Stickie Thumbs Up (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Thumbs Up, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 200) #";
        // let start = 101;
        // let stop = 199;


        // // [COLLAB] Moridin - Cigar 
        // let primary_same_as_thumb = true;
        // const ROYALTY_RECEIVER = MORIDIN_KSM;
        // const SLOTS = ["left_hand_holding", "right_hand_holding"];
        // const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_MORIDIN_CIGAR";
        // const SUBDIRECTORY = "collab-moridin-cigar"
        // const ITEM_PARTIAL_FILENAME = "collab-moridin-cigar";
        // const ITEM_TITLE = "Stickie Cigar (Collaboration) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Cigar, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@moridin.eth](https://singular.app/space/EVL7rKBDd5Xb3owtTErYMFejQnKKpAdmCd1gkijEzWvN7Pt)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // 100 
        // Net
        // const SLOTS = ["left_hand_holding", "right_hand_holding"];
        // const ITEM_NFT_SYMBOL = "GENESIS_ITEM_NET";
        // const SUBDIRECTORY = "collab-kathy-item-net"
        // const ITEM_PARTIAL_FILENAME = "net";
        // const ITEM_TITLE = "Stickie Net (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Net, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 20) #";
        // let start = 1;
        // let stop = 20;



        //         3
        //         // // Blue Shoes 
        // const SLOTS = ["foot_left", "foot_right"];
        // const ITEM_NFT_SYMBOL = "GENESIS_SHOES_BLUE";
        // const SUBDIRECTORY = "genesis-shoes-blue"
        // const ITEM_PARTIAL_FILENAME = "genesis-shoes-blue";
        // const ITEM_TITLE = "Stickie Blue Shoe (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Blue Shoe, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 200) #";
        // let start = 101;
        // let stop = 199;

        // 2
        //         // Pink Shoes
        // const SLOTS = ["foot_left", "foot_right"];
        // const ITEM_NFT_SYMBOL = "GENESIS_SHOES_PINK";
        // const SUBDIRECTORY = "genesis-shoes-pink"
        // const ITEM_PARTIAL_FILENAME = "genesis-shoes-pink";
        // const ITEM_TITLE = "Stickie Pink Shoe (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Pink Shoe, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 200) #";
        // let start = 101;
        // let stop = 199;

        // 1
        //         // // Red Shoes 
        const SLOTS = ["foot_left", "foot_right"];
        const ITEM_NFT_SYMBOL = "GENESIS_SHOES_RED";
        const SUBDIRECTORY = "genesis-shoes-red"
        const ITEM_PARTIAL_FILENAME = "genesis-shoes-red";
        const ITEM_TITLE = "Stickie Red Shoe (Genesis) # ";
        const ITEM_DESCRIPTION = "This is a Stickie Red Shoe, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 200) #";
        let start = 101;
        let stop = 199;


        const THUMB_PATH_LEFT = `${ITEM_PARTIAL_FILENAME}-left_thumb.png`
        const THUMB_PATH_RIGHT = `${ITEM_PARTIAL_FILENAME}-right_thumb.png`
        const THUMB_PATH_PRIMARY = `${ITEM_PARTIAL_FILENAME}-right_thumb.png`
        const PRIMARY_PATH = primary_same_as_thumb ? THUMB_PATH_PRIMARY : `${ITEM_PARTIAL_FILENAME}_primary.png`

        const ROYALTY_PERCENTAGE = 10;
        const DIRECTORY = `/assets/chunky/${SUBDIRECTORY}`;

        console.log("Royalty Receiver --> ", ROYALTY_RECEIVER);
        console.log("Royalty Percentage --> ", ROYALTY_PERCENTAGE);
        console.log("Starting index --> ", start);
        console.log("Ending index --> ", stop);
        console.log(ITEM_TITLE);
        console.log(ITEM_DESCRIPTION);
        readline.question("Press enter to continue...")

        let {
            svg_cids: STICKIE_SVG_CIDS,
            thumb: STICKIE_THUMB_CID,
            primary: STICKIE_PRIMARY_CID,
            metadata_cids: cids } = await runPinataSequenceForListOfSvgFiles(
                DIRECTORY, // directory
                ITEM_TITLE, // item title
                ITEM_DESCRIPTION, // metadata description
                [`${ITEM_PARTIAL_FILENAME}-left_svg.svg`, `${ITEM_PARTIAL_FILENAME}-right_svg.svg`],
                PRIMARY_PATH, // thumb file
                [THUMB_PATH_LEFT, THUMB_PATH_RIGHT], // thumb file
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
        readline.question("Press enter to continue (sent mint remarks)...")

        console.log("Reached the break point...");
        if (!pause) {
            mint_block = await sendRemarks(mint_remarks);
        }
        console.log("Passed the break point");

        // Populate item IDs
        cids.forEach((o, i, a) => {
            nft_item_ids.push(`${mint_block}-${STICKIES_ITEM_COLLECTION_ID}-${ITEM_NFT_SYMBOL}_${start + i}-${(start + i).toString().padStart(8, "0")}`);
        })

        let resadd_item_remarks = [];
        nft_item_ids.forEach((nft_item) => {
            let primary_resource = getPrimaryResAddRemarkForItem(
                nft_item,
                STICKIE_PRIMARY_CID,
            )
            SLOTS.forEach((slot, i, a) => {
                resadd_item_remarks.push(primary_resource);
                resadd_item_remarks.push(getResAddRemarkForItem(
                    nft_item, // nft item id
                    BASE_ID, // Base ID
                    slot, // Slot ID
                    STICKIE_SVG_CIDS[i], // svg resource
                    STICKIE_THUMB_CID[i], // thumb resource
                    // STICKIE_THUMB_CID, // thumb resource
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