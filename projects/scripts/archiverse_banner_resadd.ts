import {
    getPrimaryStickieResource,
    getComposableStickieResource,
    sendRemarks,
    getSetPriorityRemark,
} from "./utils";

import {
    LIMITED_BANNER_PNG_HASH,
    TEST_ARCHIVERSE_BASE_ID,
    RARE_BANNER_PNG_HASH,
    CUSTOM_BANNER_PNG_HASH,
    LEGENDARY_BANNER_PNG_HASH,
} from "./constants";


export const run = async () => {
    try {

        let prefix = "12440749-587a4c5c08ef2f0e51-TEST_ARCHY_TWO-TEST_ARCHY_RARE-";

        let nft_ids = ["12440712-587a4c5c08ef2f0e51-TEST_ARCHY_TWO-TEST_ARCHY_RARE-00000004"]

        // let banner_resource = CUSTOM_BANNER_PNG_HASH;
        let banner_resource = RARE_BANNER_PNG_HASH;
        // let banner_resource = LIMITED_BANNER_PNG_HASH;
        // let banner_resource = LEGENDARY_BANNER_PNG_HASH;

        // let banner_type = "custom";
        let banner_type = "rare";
        // let banner_type = "limited";
        // let banner_type = "legendary";

        let START = 5;
        let STOP = 6;
        for (var index = START; index <= STOP; index++) {
            console.log(index);
            let sn = `${index}`.padStart(8, "0");
            let nft = `${prefix}${sn}`;
            console.log(nft);
            nft_ids.push(nft);
        }

        let base_id = TEST_ARCHIVERSE_BASE_ID;
        const PARTS = [
            banner_type, "L1_DOWN", "R1_DOWN"
        ];

        let stickie_resource_remarks = [];
        // We need to maintain the resource IDs because we will want to reorder the resources (via SETPRIORITY)
        let stickie_res_ids = [];

        nft_ids.forEach((nft_item) => {
            // Add primary image resource to Stickie
            let { remark: primary_remark, resource_id: primary_res_id } = getPrimaryStickieResource(
                nft_item, // nft item id
                banner_resource, // png resource
                banner_resource, // thumb resource
            );
            // Add composable resource to Stickie
            let { remark: secondary_remark, resource_id: secondary_res_id } = getComposableStickieResource(
                nft_item,
                base_id,
                banner_resource, //  thumbnail
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
