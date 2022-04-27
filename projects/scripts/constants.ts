require('dotenv').config();
const fs = require('fs');
const readline = require("readline-sync");

// export const TEST_ARCHIVERSE_COLLECTION_ID = "587a4c5c08ef2f0e51-TEST_ARCHIVERSE";
export const TEST_ARCHIVERSE_COLLECTION_ID = "587a4c5c08ef2f0e51-TEST_ARCHY_TWO";
// export const TEST_ARCHIVERSE_BASE_ID = "base-12423833-TEST_ARCHIVERSE_BASE";
export const TEST_ARCHIVERSE_BASE_ID = "base-12440906-TEST_ARCHY_BASE_2";

export const CUSTOM_BANNER_PNG_HASH = "QmWLmgRPKNofCzCvSMoCYQKF2sNNyNY74Xi7rXfd1Gn2Bx";
export const LIMITED_BANNER_PNG_HASH = "QmaArQ8zh5xJ4eubzzfCLc3GXL3PmXdVHr6VHGErfhfGBW";
export const LEGENDARY_BANNER_PNG_HASH = "QmdHhT25X9fkk2XSPhGJDLVTZinYMhN1VrcKX7EymdsK7v";
export const RARE_BANNER_PNG_HASH = "QmfBBjreWoK34XCxQgr68vdm4s17DDdLURtuHn6Z2qgnDU";

export const PYRAMID_THUMB_PNG_HASH = "QmejcKeRiRdnF9wWvbAw4HJdLUEMUZpBUdztNxJ5JAuPVV";
export const OG_PREVIEW_THUMB_HASH = "QmZ4yjy9s5yhB8Q525KYmuPe9Gh8r4zk6BFmJutXpY42xV";

export const PYRAMID_A_R1_DOWN_HASH = "bafkreienrwftssmy3chvgghr2zklsq5b3ghudbtal5ynnceykzqht27s7u";
export const PYRAMID_A_L1_DOWN_HASH = "bafkreifqov66tcmqrpq4b7orhqelcjnx725evurc4tdxd6dq6sizvwtjny";






























// My KSM addresses
export const TESTING_LIAM_KSM = "EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U";
export const PROD_STICKIES_KSM = "G9xJaAqygUMmeoTGu4tafGK9LdDbS6k54a3mLHyWydLyUA5";

// Defining if we are testing or prod
export const TESTING = true;
// Is this a collab item?
export const IS_COLLAB = true;

export const TWITTER_URL = "https://twitter.com/StickiesRMRK";
export const WS_URL = 'wss://kusama-rpc.polkadot.io';

let collection_id;
let item_collection_id;
let base_id;
let super_founder;
let ksm_address;
let collaboration_collection_id;
let secret_phrase;

if (TESTING) {
    console.log("\n\nTesting.\n\n");
    secret_phrase = process.env.MNEMONIC_PHRASE_LIAM;
    collection_id = "587a4c5c08ef2f0e51-OFFICIAL_STICKIES_TESTING";
    item_collection_id = "587a4c5c08ef2f0e51-OFFICIAL_STICKIES_TESTING";
    base_id = "base-11766067-STICKIES";
    // super_founder = "11766088-587a4c5c08ef2f0e51-OFFICIAL_STICKIES_TESTING-stickie_1-00000001";
    super_founder = "11862480-587a4c5c08ef2f0e51-OFFICIAL_STICKIES_TESTING-stickie_20-00000020";
    ksm_address = TESTING_LIAM_KSM;
    collaboration_collection_id = "587a4c5c08ef2f0e51-TEST_STICKIES_COLLABORATION"
} else {
    console.log("\n\nProduction.\n\n");
    secret_phrase = process.env.MNEMONIC_PHRASE_STICKIE_OFFICIAL;
    collection_id = "9e5ba1a373b2e45818-STICKIES_OFF";
    item_collection_id = "9e5ba1a373b2e45818-STICKIES_ITEMS_GENESIS";
    base_id = "base-11765645-STICKIES";
    // super_founder = "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_1-00000001";
    super_founder = "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_2-00000002";
    ksm_address = PROD_STICKIES_KSM;
    collaboration_collection_id = "9e5ba1a373b2e45818-STICKIES_ITEMS_COLLABS";
}

export const SECRET_PHRASE = secret_phrase;
export const STICKIES_COLLECTION_ID = collection_id;
export const STICKIES_ITEM_COLLECTION_ID = IS_COLLAB ? collaboration_collection_id : item_collection_id;
export const BASE_ID = base_id;
export const SUPER_FOUNDER = super_founder;
export const KSM_ADDRESS = ksm_address;

console.log(`TESTING STICKIES : ${TESTING_LIAM_KSM}`)
console.log(`PROD STICKIES: ${PROD_STICKIES_KSM}`)

// I use this to list potential collaborators KSM addresses, but if you don't have this file oh well
try {
    const data = fs.readFileSync("../../local/COLLABORATORS.txt", "utf8");
    console.log(data);
} catch (_) {
    console.log("no collab file found, oh well...")
}


