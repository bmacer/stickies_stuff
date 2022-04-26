import {
    insertRoyalty,
    getPrimaryStickieResource,
    getComposableStickieResource,
    sendRemarks,
    getNftIds,
    getSetPriorityRemark,
    pinMetadataAndGetMintRemarks
} from "./utils";

import {
    BASE_ID,
    STICKIES_COLLECTION_ID,
    PROD_STICKIES_KSM,
    LIMITED_BANNER_PNG_HASH,
    TEST_ARCHIVERSE_BASE_ID,
} from "./constants";

const readline = require("readline-sync");
const STICKIE_PNG_HASH = "QmP4d5mFt4onQ9NXwUPQm9U12srcnFzetUnhdbqjHYFrQy";
const STICKIE_THUMBNAIL_HASH = "Qmf284ZKoTdAEsdbQJMFTNnoSoyx4eNauS3RVn1uPE5ySD";

export const run = async () => {
    try {
        const title_of_banner = "Test Limited Banner";
        const lowercase_of_stickie = "stickie";
        const number_of_stickies_to_mint = 1;
        const starting_serial_number = 2222;
        const ROYALTY_PERCENTAGE = 10;
        const ROYALTY_RECIPIENT = PROD_STICKIES_KSM;
        const SUBDIRECTORY = "/assets/chunky"
        const SVG_PATH = "stickman_invisible.svg";


        // let serial_numbers_to_create = [...Array(number_of_stickies_to_mint).keys()].map(i => i + starting_serial_number)
        // console.log(`Minting stickies with these SNs\n${serial_numbers_to_create}`);
        // readline.question("Press enter to continue (pin Metadata and get MINT remarks)...")
        // console.log("Working.  This may take a minute.");

        // let mint_remarks = await pinMetadataAndGetMintRemarks(
        //     STICKIES_COLLECTION_ID,
        //     serial_numbers_to_create,
        //     title_of_stickie,
        //     lowercase_of_stickie,
        //     SUBDIRECTORY,
        //     SVG_PATH,
        // )
        // mint_remarks = insertRoyalty(mint_remarks, ROYALTY_RECIPIENT, ROYALTY_PERCENTAGE);
        // console.log(mint_remarks);
        // readline.question("Press enter to continue (send mint remarks)...")

        // let mint_block_number = await sendRemarks(mint_remarks);
        // console.log(`Minting complete, block: ${mint_block_number}`);
        // let nft_ids = getNftIds(mint_block_number, STICKIES_COLLECTION_ID, serial_numbers_to_create, lowercase_of_stickie);


        let prefix = "12424022-587a4c5c08ef2f0e51-TEST_ARCHIVERSE-TEST_ARCHIVERSE_LIMITED_NFT_3-";

        let nft_ids = [];

        let START = 2;
        let STOP = 3;
        for (var index = START; index <= STOP; index++) {
            console.log(index);
            let sn = `${index}`.padStart(8, "0");
            let nft = `${prefix}${sn}`;
            console.log(nft);
            nft_ids.push(nft);
        }

        // Run once for the non-clone (original) NFT
        // nft_ids = ["12423996-587a4c5c08ef2f0e51-TEST_ARCHIVERSE-TEST_ARCHIVERSE_LIMITED_NFT_3-00000002"]

        let base_id = TEST_ARCHIVERSE_BASE_ID;
        const PARTS = [
            "limited", "L1-DOWN", "R1-DOWN"
        ];

        let stickie_resource_remarks = [];
        // We need to maintain the resource IDs because we will want to reorder the resources (via SETPRIORITY)
        let stickie_res_ids = [];

        nft_ids.forEach((nft_item) => {
            // Add primary image resource to Stickie
            let { remark: primary_remark, resource_id: primary_res_id } = getPrimaryStickieResource(
                nft_item, // nft item id
                LIMITED_BANNER_PNG_HASH, // png resource
                LIMITED_BANNER_PNG_HASH, // thumb resource
            );
            // Add composable resource to Stickie
            let { remark: secondary_remark, resource_id: secondary_res_id } = getComposableStickieResource(
                nft_item,
                base_id,
                LIMITED_BANNER_PNG_HASH, //  thumbnail
                PARTS,
            )
            stickie_resource_remarks.push(primary_remark);
            stickie_res_ids.push(primary_res_id);
            stickie_resource_remarks.push(secondary_remark);
            stickie_res_ids.push(secondary_res_id);
            let setpriority_remark = getSetPriorityRemark(nft_item, [secondary_res_id, primary_res_id]);
            stickie_resource_remarks.push(setpriority_remark);
        });

        console.log(stickie_resource_remarks);
        // readline.question("Press enter to continue (send RESADD and SETPRIORITY remarks)...")

        let resadd_block = await sendRemarks(stickie_resource_remarks);
        console.log(resadd_block);
        console.log(`Completed Stickie Minting, Block: ${resadd_block}`);
        // console.log(`Minted stickies with these SNs: ${serial_numbers_to_create}`);
        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
