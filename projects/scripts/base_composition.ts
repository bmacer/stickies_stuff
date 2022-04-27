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
    // {
    //     type: "fixed",
    //     id: "legendary",
    //     src: `ipfs://ipfs/${LEGENDARY_BANNER_PNG_HASH}`,
    //     z: 1,
    // },
    // {
    //     type: "fixed",
    //     id: "rare",
    //     src: `ipfs://ipfs/${RARE_BANNER_PNG_HASH}`,
    //     z: 1,
    // },
];

export const getSlotParts = (equippable: string[] | "*" = []): IBasePart[] => {
    return [
        // {
        //     type: "slot",
        //     id: "background",
        //     equippable,
        //     z: 1,
        // },
        {
            type: "slot",
            id: "L1-DOWN",
            equippable,
            z: 2,
        },
        {
            type: "slot",
            id: "R1-DOWN",
            equippable,
            z: 2,
        },
    ];
};
