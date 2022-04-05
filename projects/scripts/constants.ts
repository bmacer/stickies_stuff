require('dotenv').config();
const fs = require('fs');
const readline = require("readline-sync");

// My KSM addresses
export const TESTING_LIAM_KSM = "EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U";
export const PROD_STICKIES_KSM = "G9xJaAqygUMmeoTGu4tafGK9LdDbS6k54a3mLHyWydLyUA5";

// Defining if we are testing or prod
export const TESTING = false;
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


