require('dotenv').config();
import { IBasePart } from "rmrk-tools/dist/classes/base";

const STICKMAN_SVG = "QmXaxBYNV8PnP5ahHqyF9tafnekGuD5ZsA41RzwwoV4Bvz";

export const fixedParts: IBasePart[] = [
    {
        type: "fixed",
        id: "body",
        src: `ipfs://ipfs/${STICKMAN_SVG}`,
        z: 13,
    }
];

export const getSlotParts = (equippable: string[] | "*" = []): IBasePart[] => {
    return [
        {
            type: "slot",
            id: "background",
            equippable,
            z: 1,
        },
        {
            type: "slot",
            id: "background_additional_one",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "background_additional_two",
            equippable,
            z: 3,
        },
        {
            type: "slot",
            id: "friend_one",
            equippable,
            z: 4,
        },
        {
            type: "slot",
            id: "friend_one_overlay",
            equippable,
            z: 5,
        },
        {
            type: "slot",
            id: "friend_two",
            equippable,
            z: 6,
        },
        {
            type: "slot",
            id: "friend_two_overlay",
            equippable,
            z: 7,
        },
        {
            type: "slot",
            id: "friend_three",
            equippable,
            z: 8,
        },
        {
            type: "slot",
            id: "friend_three_overlay",
            equippable,
            z: 9,
        },
        {
            type: "slot",
            id: "pet",
            equippable,
            z: 10,
        },
        {
            type: "slot",
            id: "pet_overlay",
            equippable,
            z: 11,
        },
        {
            type: "slot",
            id: "extra_slot_one",
            equippable,
            z: 12,
        },
        {
            type: "slot",
            id: "extra_slot_two",
            equippable,
            z: 14,
        },
        {
            type: "slot",
            id: "foot_right",
            equippable,
            z: 15,
        },
        {
            type: "slot",
            id: "foot_left",
            equippable,
            z: 16,
        },
        {
            type: "slot",
            id: "extra_slot_three",
            equippable,
            z: 17,
        },
        {
            type: "slot",
            id: "pants",
            equippable,
            z: 18,
        },
        {
            type: "slot",
            id: "pants_overlay",
            equippable,
            z: 19,
        },
        {
            type: "slot",
            id: "shirt",
            equippable,
            z: 20,
        },
        {
            type: "slot",
            id: "shirt_overlay",
            equippable,
            z: 21,
        },
        {
            type: "slot",
            id: "extra_slot_four",
            equippable,
            z: 22,
        },
        {
            type: "slot",
            id: "left_hand",
            equippable,
            z: 23,
        },
        {
            type: "slot",
            id: "right_hand",
            equippable,
            z: 24,
        },
        {
            type: "slot",
            id: "left_hand_holding",
            equippable,
            z: 25,
        },
        {
            type: "slot",
            id: "right_hand_holding",
            equippable,
            z: 26,
        },
        {
            type: "slot",
            id: "left_arm",
            equippable,
            z: 27,
        },
        {
            type: "slot",
            id: "right_arm",
            equippable,
            z: 28,
        },
        {
            type: "slot",
            id: "left_arm_overlay",
            equippable,
            z: 29,
        },
        {
            type: "slot",
            id: "right_arm_overlay",
            equippable,
            z: 30,
        },
        {
            type: "slot",
            id: "extra_slot_five",
            equippable,
            z: 31,
        },
        {
            type: "slot",
            id: "eyes",
            equippable,
            z: 32,
        },
        {
            type: "slot",
            id: "eyewear",
            equippable,
            z: 33,
        },
        {
            type: "slot",
            id: "face",
            equippable,
            z: 34,
        },
        {
            type: "slot",
            id: "face_overlay",
            equippable,
            z: 35,
        },
        {
            type: "slot",
            id: "long_hair",
            equippable,
            z: 36,
        },
        {
            type: "slot",
            id: "hat_or_hair",
            equippable,
            z: 37,
        },
        {
            type: "slot",
            id: "bubble",
            equippable,
            z: 38,
        },
        {
            type: "slot",
            id: "bubble_overlay",
            equippable,
            z: 39,
        },
        {
            type: "slot",
            id: "foreground",
            equippable,
            z: 40,
        },
        {
            type: "slot",
            id: "foreground_overlay",
            equippable,
            z: 41,
        },
        {
            type: "slot",
            id: "extra_slot_six",
            equippable,
            z: 42,
        },
        {
            type: "slot",
            id: "extra_slot_seven",
            equippable,
            z: 43,
        },
        {
            type: "slot",
            id: "ticket_one",
            equippable,
            z: 44,
        },
        {
            type: "slot",
            id: "ticket_two",
            equippable,
            z: 45,
        },
        {
            type: "slot",
            id: "ticket_three",
            equippable,
            z: 46,
        },
        {
            type: "slot",
            id: "chest_one",
            equippable,
            z: 47,
        },
        {
            type: "slot",
            id: "chest_two",
            equippable,
            z: 48,
        },
        {
            type: "slot",
            id: "chest_three",
            equippable,
            z: 49,
        },
        {
            type: "slot",
            id: "extra_slot_eight",
            equippable,
            z: 50,
        },
        {
            type: "slot",
            id: "extra_slot_nine",
            equippable,
            z: 51,
        },
        {
            type: "slot",
            id: "extra_slot_ten",
            equippable,
            z: 52,
        }
    ];
};
