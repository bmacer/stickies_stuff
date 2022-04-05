import { getResAddRemarkForItem, getSendAndEquipRemarkForSuperFounder, checkAllFilesExist } from './utils';
import { uploadFileToPinata } from './pinata-utils';

import { convertNftIdToGenericWithoutSerialNumber, sendRemarks } from "./utils";
import {
    SUPER_FOUNDER,
    BASE_ID,
} from "./constants";

export const run = async () => {
    try {
        /*
                const PARTS = [
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
        // Double-check this:
        // shirt_overlay: binoculars
        const SLOTS = ["shirt_overlay"];
        const ITEM_NFT_SYMBOL = "GENESIS_BINOCULARS";
        const SUBDIRECTORY = "genesis-accessory-binoculars"
        const ITEM_PARTIAL_FILENAME = "genesis-accessory-binoculars";
        const ITEM_TITLE = "Stickie Binoculars # ";
        const ITEM_DESCRIPTION = "These are Stickie Binoculars, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
            "\n\nTotal supply of 20\n\n#";
        let start = 1;
        let stop = 2;
        */
        let starting_serial_number = 1053;
        let ending_serial_number = 1053;
        // An example NFT ID of the range to replace, ensure block portion is all the same (check first and last)
        // let nft_id = "11771487-9e5ba1a373b2e45818-STICKIES_ITEMS_GENESIS-GENESIS_BACKGROUND_MOUNTAINS_1-00000001";
        let nft_id = "12035563-587a4c5c08ef2f0e51-OFFICIAL_STICKIES_TESTING-TEST_MP3_TEST-00001053"
        const files = [
            "collab-item-boombox_svg.svg",
            // "mushroom-left_svg.svg",
            // "mushroom-right_svg.svg",
        ]
        const slots = [
            "extra_slot_six",
            // "left_h and_holding",
            // "right_hand_holding"
        ]
        const THUMBNAIL_FILENAME = "collab-item-boombox_thumb.png";
        const SUBDIRECTORY = "collab-foreground-boombox"
        const DIRECTORY = `/assets/chunky/${SUBDIRECTORY}`;

        let generic_nft_id = convertNftIdToGenericWithoutSerialNumber(nft_id);

        // Get the array of SNs to create (based on starting_serial_number and ending_serial_number)
        let serial_numbers_to_create = [
            ...Array(ending_serial_number - starting_serial_number + 1).keys()].map(i => i + starting_serial_number)

        let nfts = [];
        for (let i of serial_numbers_to_create) {
            let sn = `${i}`.padStart(8, "0");
            nfts.push(generic_nft_id.replace("XXX", i.toString()).replace("YYY", sn));
        }
        console.log(nfts);

        // If manually done, list here:
        nfts = [
            "12035563-587a4c5c08ef2f0e51-OFFICIAL_STICKIES_TESTING-TEST_MP3_TEST-00001053"
        ]

        if (!await checkAllFilesExist(DIRECTORY, [...files, THUMBNAIL_FILENAME])) {
            process.exit(0);
        };

        let thumb_cid = await uploadFileToPinata(DIRECTORY, THUMBNAIL_FILENAME);

        let svg_cids = [];

        await Promise.all(files.map(async (file) => {
            let cid = await uploadFileToPinata(DIRECTORY, file);
            svg_cids.push(cid);
        }));

        let resadd_remarks = [];
        for (let nft of nfts) {
            for (const [i, svg_cid] of svg_cids.entries()) {
                let slot = slots[i];
                let rem = getResAddRemarkForItem(
                    nft,
                    BASE_ID,
                    slot,
                    svg_cid,
                    thumb_cid,
                )
                resadd_remarks.push(rem);
            }
        }
        resadd_remarks.push(...getSendAndEquipRemarkForSuperFounder(nfts[0], SUPER_FOUNDER, slots[0]));
        console.log(resadd_remarks);
        let block = await sendRemarks(resadd_remarks);
        console.log(`Final block (RESADD + SEND + EQUIP): ${block}`);
        process.exit(0);

    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
