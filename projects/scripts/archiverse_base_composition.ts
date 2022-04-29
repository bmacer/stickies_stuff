require('dotenv').config();
import { IBasePart } from "rmrk-tools/dist/classes/base";

import {
    CUSTOM_BANNER_PNG_HASH,
    LIMITED_BANNER_PNG_HASH,
    LEGENDARY_BANNER_PNG_HASH,
    RARE_BANNER_PNG_HASH,
} from "./constants";

export const fixedParts: IBasePart[] = [
    {
        type: "fixed",
        id: "custom",
        src: `ipfs://ipfs/${CUSTOM_BANNER_PNG_HASH}`,
        z: 1,
    },
    {
        type: "fixed",
        id: "limited",
        src: `ipfs://ipfs/${LIMITED_BANNER_PNG_HASH}`,
        z: 1,
    },
    {
        type: "fixed",
        id: "legendary",
        src: `ipfs://ipfs/${LEGENDARY_BANNER_PNG_HASH}`,
        z: 1,
    },
    {
        type: "fixed",
        id: "rare",
        src: `ipfs://ipfs/${RARE_BANNER_PNG_HASH}`,
        z: 1,
    },
];

export const getSlotParts = (equippable: string[] | "*" = []): IBasePart[] => {
    return [
        {
            type: "slot",
            id: "L1",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L2",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L3",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L4",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L5",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L6",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L7",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L8",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L9",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "L10",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R1",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R2",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R3",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R4",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R5",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R6",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R7",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R8",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R9",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R10",
            equippable,
            z: 2,
        },
    ];
};
