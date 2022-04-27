require('dotenv').config();

import { getSlotParts, fixedParts } from "./archiverse_base_composition";

import { STICKIES_COLLECTION_ID, KSM_ADDRESS, TEST_ARCHIVERSE_COLLECTION_ID } from "./constants";
import { Base } from "rmrk-tools";
import { sendRemarks } from "./utils";

const readline = require("readline-sync");


export const getBaseRemark = async (base_name: string, collection_ids: string[], base_type: string) => {
    try {
        const baseParts = [
            ...fixedParts,
            ...getSlotParts(collection_ids)
        ];
        const baseEntity = new Base(
            0,
            base_name,
            KSM_ADDRESS,
            "svg",
            baseParts
        );
        return baseEntity.base();
    } catch (error: any) {
        console.error(error);
    }
};

export const run = async () => {
    try {
        /// Adjustable values (see also "base_composition" to adjust the base itself)
        const BASE_NAME = "TEST_ARCHY_BASE_2";
        const COLLECTION_IDS = [ /// Collections that may equip into slots
            TEST_ARCHIVERSE_COLLECTION_ID,
        ]
        let base_remark = await getBaseRemark(BASE_NAME, COLLECTION_IDS, "png");
        base_remark = base_remark.replace("svg", "png");
        console.log(base_remark);
        readline.question("Press enter to continue (send BASE remark)...")
        let base_block = await sendRemarks([base_remark]);
        console.log(`base name: base-${base_block}-${BASE_NAME}`);
        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
