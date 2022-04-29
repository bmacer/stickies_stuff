require('dotenv').config();
const fs = require('fs');
const readline = require("readline-sync");

// export const TEST_ARCHIVERSE_COLLECTION_ID = "587a4c5c08ef2f0e51-TEST_ARCHIVERSE";
export const TEST_ARCHIVERSE_COLLECTION_ID = "587a4c5c08ef2f0e51-TEST_ARCHY_TWO";
export const TEST_ARCHIVERSE_ITEMS_COLLECTION_ID = "587a4c5c08ef2f0e51-TEST_ARCHY_TWO";
// export const TEST_ARCHIVERSE_BASE_ID = "base-12423833-TEST_ARCHIVERSE_BASE";
export const TEST_ARCHIVERSE_BASE_ID = "base-12440906-TEST_ARCHY_BASE_2";

export const CUSTOM_BANNER_PNG_HASH = "QmWLmgRPKNofCzCvSMoCYQKF2sNNyNY74Xi7rXfd1Gn2Bx";
export const LIMITED_BANNER_PNG_HASH = "QmaArQ8zh5xJ4eubzzfCLc3GXL3PmXdVHr6VHGErfhfGBW";
export const LEGENDARY_BANNER_PNG_HASH = "QmdHhT25X9fkk2XSPhGJDLVTZinYMhN1VrcKX7EymdsK7v";
export const RARE_BANNER_PNG_HASH = "QmfBBjreWoK34XCxQgr68vdm4s17DDdLURtuHn6Z2qgnDU";

export const PYRAMID_THUMB_PNG_HASH = "QmejcKeRiRdnF9wWvbAw4HJdLUEMUZpBUdztNxJ5JAuPVV";
export const OG_PREVIEW_THUMB_HASH = "QmZ4yjy9s5yhB8Q525KYmuPe9Gh8r4zk6BFmJutXpY42xV";

// export const PYRAMID_A_R1_DOWN_HASH = "bafkreienrwftssmy3chvgghr2zklsq5b3ghudbtal5ynnceykzqht27s7u";
// export const PYRAMID_A_L1_DOWN_HASH = "bafkreifqov66tcmqrpq4b7orhqelcjnx725evurc4tdxd6dq6sizvwtjny";


export const PYRAMID_A_L1_DOWN_HASH = "QmfSjVaTCYnjynA3FRGx8pwyooPqkvzXY76ap71VRqncVA";
export const PYRAMID_A_L1_UP_HASH = "QmU6qeGpjcoaSoWBuYussqgSsUgv2q3PfxsB3zNpDrGcbp";
export const PYRAMID_A_L2_DOWN_HASH = "QmcN6jecRmAPvKDQZ1HPUR2iXpxir778g8efghtZAMiymF";
export const PYRAMID_A_L2_UP_HASH = "QmUtgdWAeGsxMLLV74QuJSD9N6Lq2GtTBsBLYbuF6w2dQH";
export const PYRAMID_A_L3_DOWN_HASH = "QmRSEwJF3jZtsXadH1GkT31bGWDg7RBRWoXW3CFRHnCvis";
export const PYRAMID_A_L3_UP_HASH = "QmNWWP8Se2UMH1nDv1bLZ9EjygTu1xjzH3suaQF42Yn3Dh";
export const PYRAMID_A_L4_DOWN_HASH = "QmZqBE6Vhpqg3ZcV5RXGR5XtEdqgtZ94HLTMxbYnCKej2e";
export const PYRAMID_A_L4_UP_HASH = "QmWCJ2aw51qaUDv3Z6QMYzAXWmdc6socyMPXnmmX37wiJF";
export const PYRAMID_A_L5_DOWN_HASH = "QmZFM5quSaqzrYZNyWBShnzHN3oRYgEocXaNnUe5J4ieoD";
export const PYRAMID_A_L5_UP_HASH = "QmfFdo2xa5x2PiGNaP5ptFMxyABLHV2QLcEgYW5S2g7c84";
export const PYRAMID_A_R1_DOWN_HASH = "QmRy9rRoF8gxzU1fbcNgWSp9Duo7j1kepkaPthaudxiVuF";
export const PYRAMID_A_R1_UP_HASH = "QmdRQUgSTvb1Zt1o4BMfNVWNMZnjvfc4q5CidLJPppusgL";
export const PYRAMID_A_R2_DOWN_HASH = "QmVkaNyf2HNFfH1H1eg4Q2rX3zoUa9pcfZVNiyZYtys5VN";
export const PYRAMID_A_R2_UP_HASH = "QmRvE5xcStHfe9iNaBUSekDXmeNxU5gbSacThwVRhugSyu";
export const PYRAMID_A_R3_DOWN_HASH = "QmUiecUQpuddB6N1MX8swVgY2awHKYQDZB2Y3oyDX6vbBC";
export const PYRAMID_A_R3_UP_HASH = "QmQFEMrBPWV8zxd455GPaydv4xbKvkGUAddeyUnjBHKgks";
export const PYRAMID_A_R4_DOWN_HASH = "QmQXDJ1CMiDNUkLK1J583Za9bDvCFiwRjYNngrffMVk7tD";
export const PYRAMID_A_R4_UP_HASH = "QmT1SRGgwMQRNHEd81c4S6qCz9UFivnWRfwZY4W8VvQrxz";
export const PYRAMID_A_R5_DOWN_HASH = "QmbWHqHG2QE5rsUPts6REtnvPgvx8LGwE8doNKD78yiQkk";
export const PYRAMID_A_R5_UP_HASH = "QmdXkhTvXBTAHDpxhM7Tv9pLJTAoAKmNsxjPutJGan2o88";

export const OG_L1_DOWN_HASH = "QmVavDZCdXFYrwAoD1qv5rTCoSckEiyYMqAHZNnLvP8QqW";
export const OG_L1_UP_HASH = "QmauFGzjVN3gjmnMWhFZTwWEtFnRuU7ZWZeanNkPzHfyXj";
export const OG_L2_DOWN_HASH = "QmP8nr4CiEn3vzkboiHpWcQPcm8FRpz7XwNF9hHQrMib12";
export const OG_L2_UP_HASH = "QmajHs5RMXBUNMoKNXsvhuyFqfcwXM12hUPHeg2rnUpShv";
export const OG_L3_DOWN_HASH = "QmcM3G84JD9RWZ3ZEAzhcFtPYLnQsk1DUKnm87kYXwaQBD";
export const OG_L3_UP_HASH = "QmbkQ61GAHJL59LHqoRqutQCJVFVNaXW3wGRjA5CdN7Hpo";
export const OG_L4_DOWN_HASH = "QmWEjB5tsmuyk6HbBrQBD76pxy7PmsGbU9FSNdvYvBxUKs";
export const OG_L4_UP_HASH = "QmZU7ZG9KQF8352q7d6Yq9hY4LXw96M8EXdkmgNi6HhoV8";
export const OG_L5_DOWN_HASH = "QmTRfZngqUNEyZ6WGLRoEfToTNFeC7qVrDYrPQdpoWqJnZ";
export const OG_L5_UP_HASH = "QmasFJViy97HhCRud4s7zageeRZgxCW7jKEc2AfYH862Wn";
export const OG_R1_DOWN_HASH = "QmRswgSXYeb5EHmjSiQcCEi8e8fDmyvGsJd88hRS6P2HaJ";
export const OG_R1_UP_HASH = "QmVHmdgN5zFMjXk1Ze6TsifEi1GSa9dTzQETLSX5mBTMzQ";
export const OG_R2_DOWN_HASH = "Qmf6s8C1dwpyFVsGaxmSvwd1tJcCtYgfWjC4z8vmjpFoEe";
export const OG_R2_UP_HASH = "Qmb3BAE8V2eeJHU7pyqJuky6k4WowyEqWZohxDrn2HqYiE";
export const OG_R3_DOWN_HASH = "QmRxSWQswgrsfN1pxHPFo3MeApbbvzEwqVshaDjgX57pdK";
export const OG_R3_UP_HASH = "QmaZndaieQ8f3rN8pgyENRCt4QaszMJMuZoGz5YXNVnXjh";
export const OG_R4_DOWN_HASH = "QmZR5itJBetsxC7eAiyVeg3TZHJkGEtMsJbVixuacVvj2i";
export const OG_R4_UP_HASH = "QmWjz2BBHdkzz8gNQgaT8APnsZdFJxWhoDgJDkJpnnGkSy";
export const OG_R5_DOWN_HASH = "QmQzKTAqSAwsJ5sSmRCPbv56fxNBNNo9JHETVu9Gu9wmDv";
export const OG_R5_UP_HASH = "QmYF5V9pimJoA4MtAdEsSFPpKZNzbhd7q5zzkRKYPxbdBR";
















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


