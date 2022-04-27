import {
    getPrimaryStickieResource,
    sendRemarks,
    getResAddRemarkForItem
} from "./utils";

import {
    TEST_ARCHIVERSE_BASE_ID,
    PYRAMID_THUMB_PNG_HASH,
    PYRAMID_A_L1_DOWN_HASH,
    PYRAMID_A_R1_DOWN_HASH,
    OG_PREVIEW_THUMB_HASH,
} from "./constants";


export const run = async () => {
    try {
        let prefix = "12441297-587a4c5c08ef2f0e51-TEST_ARCHY_TWO-TEST_PYRAMID-";

        let nft_ids = ["12440767-587a4c5c08ef2f0e51-TEST_ARCHY_TWO-TEST_PYRAMID-00000007"]
        
        let START = 8;
        let STOP = 9;
        for (var index = START; index <= STOP; index++) {
            console.log(index);
            let sn = `${index}`.padStart(8, "0");
            let nft = `${prefix}${sn}`;
            console.log(nft);
            nft_ids.push(nft);
        }
        let thumb_picture = PYRAMID_THUMB_PNG_HASH;
        // let thumb_picture = OG_PREVIEW_THUMB_HASH;




        let base_id = TEST_ARCHIVERSE_BASE_ID;

        let stickie_resource_remarks = [];

        let ITEM_PNGS = {
            "L1_DOWN": PYRAMID_A_L1_DOWN_HASH,
            "R1_DOWN": PYRAMID_A_R1_DOWN_HASH,
        }


        // let ITEM_PNGS = {
        //     "L1_DOWN": OG_L1_DOWN_HASH,
        //     "R1_DOWN": OG_R1_DOWN_HASH,
        // }





        
        nft_ids.forEach((nft_item) => {
            // Add primary image resource to Stickie
            let { remark: primary_remark, resource_id: primary_res_id } = getPrimaryStickieResource(
                nft_item, // nft item id
                thumb_picture, // png resource
                thumb_picture, // thumb resource
            );
            // Loop through slot resadds


            // Add composable resource to Stickie
            // let { remark: secondary_remark, resource_id: secondary_res_id } = getComposableStickieResource(
            //     nft_item,
            //     base_id,
            //     PYRAMID_THUMB_PNG_HASH, //  thumbnail
            //     PARTS,
            // )
            stickie_resource_remarks.push(primary_remark);
            // stickie_res_ids.push(primary_res_id);

            console.log(ITEM_PNGS);
            for (let slot in ITEM_PNGS) {
                console.log(slot);
                console.log(ITEM_PNGS[slot]);
                let rem = getResAddRemarkForItem(
                    nft_item,
                    base_id,
                    slot,
                    ITEM_PNGS[slot],
                    PYRAMID_THUMB_PNG_HASH,
                )
                stickie_resource_remarks.push(rem);
            }

            // stickie_resource_remarks.push(secondary_remark);
            // stickie_res_ids.push(secondary_res_id);
            // let setpriority_remark = getSetPriorityRemark(nft_item, [secondary_res_id, primary_res_id]);
            // stickie_resource_remarks.push(setpriority_remark);
        });

        console.log(stickie_resource_remarks);

        let resadd_block = await sendRemarks(stickie_resource_remarks);
        console.log(resadd_block);
        // console.log(`Completed Stickie Minting, Block: ${resadd_block}`);
        // console.log(`Minted stickies with these SNs: ${serial_numbers_to_create}`);
        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
