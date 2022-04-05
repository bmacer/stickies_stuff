import {
    getEquippableRemark
} from './utils';
const readline = require("readline-sync");
import { uploadFileToPinata } from './pinata-utils';

import { convertNftIdToGenericWithoutSerialNumber, sendRemarks } from "./utils";
import {
    SUPER_FOUNDER,
    BASE_ID,
} from "./constants";

export const run = async () => {
    try {
        //9e5ba1a373b2e45818-STICKIES_ITEMS_COLLABS
        // const COLLECTION_TO_ADD = "587a4c5c08ef2f0e51-TEST_STICKIES_COLLABORATION";
        const COLLECTION_TO_ADD = "9e5ba1a373b2e45818-STICKIES_ITEMS_COLLABS";


        console.log("Collection will be added --> ", COLLECTION_TO_ADD);
        console.log("Referring to base --> ", BASE_ID);

        readline.question("Enter to continue... ");


        const SLOTS = [
            "background", "background_additional_one", "background_additional_two", "friend_one",
            "friend_one_overlay", "friend_two", "friend_two_overlay", "friend_three",
            "friend_three_overlay", "pet", "pet_overlay", "extra_slot_one", "body",
            "extra_slot_two", "foot_right", "foot_left", "extra_slot_three", "pants",
            "pants_overlay", "shirt", "shirt_overlay", "extra_slot_four", "left_hand",
            "right_hand", "left_hand_holding", "right_hand_holding", "left_arm", "right_arm",
            "left_arm_overlay", "right_arm_overlay", "extra_slot_five", "eyes", "eyewear",
            "face", "face_overlay", "long_hair", "hat_or_hair", "bubble", "bubble_overlay",
            "foreground", "foreground_overlay", "extra_slot_six", "extra_slot_seven",
            "ticket_one", "ticket_two", "ticket_three", "chest_one", "chest_two", "chest_three",
            "extra_slot_eight", "extra_slot_nine", "extra_slot_ten"
        ]

        let remarks = []
        SLOTS.forEach((slot) => {
            let rem = getEquippableRemark(BASE_ID, [COLLECTION_TO_ADD], slot)
            remarks.push(rem);
        })
        console.log(remarks);
        readline.question("Enter to push remarks to blockchain... ");
        let block = await sendRemarks(remarks);

        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
