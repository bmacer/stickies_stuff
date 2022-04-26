require('dotenv').config();
import { runPinataSequenceForListOfSvgFiles } from "./pinata-utils";

const readline = require("readline-sync");

import {
    getSendAndEquipRemarkForSuperFounder,
    sendRemarks,
    getItemMintRemark, insertRoyalty, getPrimaryResAddRemarkForItem, getResAddRemarkForItem
} from "./utils";
import {
    IS_COLLAB,
    SUPER_FOUNDER,
    STICKIES_ITEM_COLLECTION_ID,
    BASE_ID,
    PROD_STICKIES_KSM,
    TESTING_LIAM_KSM,
    KSM_ADDRESS
} from "./constants";

export const run = async () => {
    try {
        let pause;
        let block_number_items_minted;
        pause = false;
        // pause = true;
        // block_number_items_minted = 12067568;
        if (pause) {
            Number(readline.question("You have 'pause' set to true.  Was this intentional?"));
        }


        // 14
        // pet - dinosaur
        // const SLOTS = ["pet"];
        // const ITEM_NFT_SYMBOL = "GENESIS_PET_DINOSAUR";
        // const SUBDIRECTORY = "genesis-pet-dinosaur"
        // const ITEM_PARTIAL_FILENAME = "dino";
        // const ITEM_TITLE = "Stickie Pet Dinosaur (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Pet Dinosaur, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 10) #";
        // let start = 1;
        // let stop = 10;
        // const ROYALTY_RECEIVER = PROD_STICKIES_KSM;

        // // [COLLAB] Liam - Castle 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["background"];
        // const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_LIAM_CASTLE";
        // const SUBDIRECTORY = "collab-liam-castle"
        // const ITEM_PARTIAL_FILENAME = "castle";
        // const ITEM_TITLE = "Stickie Castle (Collaboration) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Castle, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Castle 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["background"];
        // const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_LIAM_CLASSROOM";
        // const SUBDIRECTORY = "collab-liam-classroom"
        // const ITEM_PARTIAL_FILENAME = "classroom";
        // const ITEM_TITLE = "Stickie Classroom (Collaboration) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Classroom, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Castle 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["background"];
        // const ITEM_NFT_SYMBOL = "STICKIE_COLLAB_LIAM_MUSEUM";
        // const SUBDIRECTORY = "collab-liam-museum"
        // const ITEM_PARTIAL_FILENAME = "museum";
        // const ITEM_TITLE = "Stickie Museum (Collaboration) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Museum, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;



        // // [COLLAB] Liam - Sunglasses 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["eyewear"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_SUNGLASSES";
        // const SUBDIRECTORY = "collab-liam-sunglasses"
        // const ITEM_PARTIAL_FILENAME = "sunglasses";
        // const ITEM_TITLE = "Stickie Orange Sunglasses (Collab) # ";
        // const ITEM_DESCRIPTION = "These are Stickie Sunglasses, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Fisherman's Hat 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["hat_or_hair"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_HAT";
        // const SUBDIRECTORY = "collab-liam-hat"
        // const ITEM_PARTIAL_FILENAME = "hat";
        // const ITEM_TITLE = "Stickie Fisherman's Hat (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Fisherman's Hat, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Hidden Door Hat 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["hat_or_hair"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_HAT_DOOR";
        // const SUBDIRECTORY = "collab-liam-hat-door"
        // const ITEM_PARTIAL_FILENAME = "hat_door";
        // const ITEM_TITLE = "Stickie Hidden Door Hat (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Hidden Door Hat, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Clouds Hat 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["hat_or_hair"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_HAT_CLOUDS";
        // const SUBDIRECTORY = "collab-liam-hat-clouds"
        // const ITEM_PARTIAL_FILENAME = "hat_clouds";
        // const ITEM_TITLE = "Stickie Clouds Hat (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Clouds Hat, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Clouds Hat 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["hat_or_hair"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_HAT_SPARTAN";
        // const SUBDIRECTORY = "collab-liam-hat-spartan"
        // const ITEM_PARTIAL_FILENAME = "hat_spartan";
        // const ITEM_TITLE = "Stickie Spartan Hat (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Spartan Hat, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Background Farm 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["background"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_BACKGROUND_FARM";
        // const SUBDIRECTORY = "collab-liam-background-farm"
        // const ITEM_PARTIAL_FILENAME = "background-farm";
        // const ITEM_TITLE = "Stickie Farm Background (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Farm Background, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Cloud Shirt 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["shirt"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_SHIRT_CLOUD";
        // const SUBDIRECTORY = "collab-liam-shirt-cloud"
        // const ITEM_PARTIAL_FILENAME = "shirt-cloud";
        // const ITEM_TITLE = "Stickie Clouds Shirt (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Clouds Shirt, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Mushroom Shirt 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["shirt"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_SHIRT_MUSHROOM";
        // const SUBDIRECTORY = "collab-liam-shirt-mushroom"
        // const ITEM_PARTIAL_FILENAME = "shirt-mushroom";
        // const ITEM_TITLE = "Stickie Mushroom Shirt (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Mushroom Shirt, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] Liam - Mushroom Shirt 
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["shirt"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_SHIRT_YELLOW_STRIPED";
        // const SUBDIRECTORY = "collab-liam-shirt-yellow-striped"
        // const ITEM_PARTIAL_FILENAME = "shirt-yellow-striped";
        // const ITEM_TITLE = "Stickie Yellow Striped Shirt (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Yellow Striped Shirt, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // // [COLLAB] MORIDIN - 69 Shirt 
        // const MORIDIN_KSM = "EVL7rKBDd5Xb3owtTErYMFejQnKKpAdmCd1gkijEzWvN7Pt";
        // const ROYALTY_RECEIVER = MORIDIN_KSM;
        // const SLOTS = ["shirt"];
        // const ITEM_NFT_SYMBOL = "COLLAB_MORIDIN_69_SHIRT";
        // const SUBDIRECTORY = "collab-moridin-69"
        // const ITEM_PARTIAL_FILENAME = "69";
        // const ITEM_TITLE = "Stickie #69 Shirt (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie #69 Shirt, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@moridin.eth](https://twitter.com/moridin_eth)." +
        //     "\n\nTotal supply of 1\n\n#";
        // let start = 1;
        // let stop = 1;


        // Get Stuck bubble
        // const SLOTS = ["bubble"];
        // const ROYALTY_RECEIVER = KSM_ADDRESS;
        // const ITEM_NFT_SYMBOL = "GENESIS_BUBBLE_GET_STUCK";
        // const SUBDIRECTORY = "genesis-bubble-get-stuck"
        // const ITEM_PARTIAL_FILENAME = "genesis-bubble-get-stuck";
        // const ITEM_TITLE = "Stickie Bubble - Get Stuck (Genesis) # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Bubble - Get Stuck, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 10) #";
        // let start = 1;
        // let stop = 10;

        // Red Lips
        // const ROYALTY_RECEIVER = KSM_ADDRESS;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "GENESIS_FACE_LIPS_RED";
        // const SUBDIRECTORY = "collab-kathy-lips-red"
        // const ITEM_PARTIAL_FILENAME = "lips";
        // const ITEM_TITLE = "Stickie Red Lips (Genesis) # ";
        // const ITEM_DESCRIPTION = "These are Stickie Red Lips, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 50) #";
        // let start = 1;
        // let stop = 10;

        // Red Lips Open Mouth
        // const ROYALTY_RECEIVER = KSM_ADDRESS;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "GENESIS_FACE_LIPS_RED_OPEN_MOUTH";
        // const SUBDIRECTORY = "collab-kathy-lips-red-open-mouth"
        // const ITEM_PARTIAL_FILENAME = "lips-open";
        // const ITEM_TITLE = "Stickie Red Lips Open Mouth (Genesis) # ";
        // const ITEM_DESCRIPTION = "These are Stickie Red Lips (Open Mouth), equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL) (Genesis, total supply of 50) #";
        // let start = 1;
        // let stop = 10;

        // Liam Big Giant Smile
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_GIANT_SMILE";
        // const SUBDIRECTORY = "liam-april/collab-liam-big-giant-smile"
        // const ITEM_PARTIAL_FILENAME = "big-giant-smile";
        // const ITEM_TITLE = "Stickie Big Giant Smile # ";
        // const ITEM_DESCRIPTION = "This is a Stickie Big Giant Smile, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Big Green Eyes
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["eyes"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_GIANT_SMILE";
        // const SUBDIRECTORY = "liam-april/collab-liam-big-green-eyes"
        // const ITEM_PARTIAL_FILENAME = "big-green-eyes";
        // const ITEM_TITLE = "Stickie Big Green Eyes (Collab) # ";
        // const ITEM_DESCRIPTION = "These are Stickie Big Green Eyes, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Big Toothy Grin
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_BIG_TOOTHY_GRIN";
        // const SUBDIRECTORY = "liam-april/collab-liam-big-toothy-grin"
        // const ITEM_PARTIAL_FILENAME = "big-toothy-grin";
        // const ITEM_TITLE = "Stickie Big Toothy Grin (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Big Toothy Grin, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Goblin Frown
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_GOBLIN_FROWN";
        // const SUBDIRECTORY = "liam-april/collab-liam-goblin-frown"
        // const ITEM_PARTIAL_FILENAME = "goblin-frown";
        // const ITEM_TITLE = "Stickie Goblin Frown (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Goblin Frown, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Gopher Tooth
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_GOPHER_TOOTH";
        // const SUBDIRECTORY = "liam-april/collab-liam-gopher-tooth"
        // const ITEM_PARTIAL_FILENAME = "gopher-tooth";
        // const ITEM_TITLE = "Stickie Gopher Tooth (Collab) # ";
        // const ITEM_DESCRIPTION = "This is a Gopher Tooth, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Rainbow Smile
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_RAINBOW_SMILE";
        // const SUBDIRECTORY = "liam-april/collab-liam-rainbow-smile"
        // const ITEM_PARTIAL_FILENAME = "rainbow-smile";
        // const ITEM_TITLE = "Stickie Rainbow Smile # ";
        // const ITEM_DESCRIPTION = "This is a Rainbow Smile, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Slobber Mouth
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_SLOBBER_MOUTH";
        // const SUBDIRECTORY = "liam-april/collab-liam-slobber-mouth"
        // const ITEM_PARTIAL_FILENAME = "slobber-mouth";
        // const ITEM_TITLE = "Stickie Slobber Mouth # ";
        // const ITEM_DESCRIPTION = "This is a Slobber Mouth, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Tight Lips
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_TIGHT_LIPS";
        // const SUBDIRECTORY = "liam-april/collab-liam-tight-lips"
        // const ITEM_PARTIAL_FILENAME = "tight-lips";
        // const ITEM_TITLE = "Stickie Tight Lips # ";
        // const ITEM_DESCRIPTION = "These are Tight Lips, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Toothy Frown
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_TOOTHY_FROWN";
        // const SUBDIRECTORY = "liam-april/collab-liam-toothy-frown"
        // const ITEM_PARTIAL_FILENAME = "toothy-frown";
        // const ITEM_TITLE = "Stickie Toothy Frown # ";
        // const ITEM_DESCRIPTION = "This is a Toothy Frown, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;


        // Liam Wavy Half-Smile
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["face"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_WAVY_HALF_SMILE";
        // const SUBDIRECTORY = "liam-april/collab-liam-wavy-half-smile"
        // const ITEM_PARTIAL_FILENAME = "wavy-half-smile";
        // const ITEM_TITLE = "Stickie Half-Smile # ";
        // const ITEM_DESCRIPTION = "This is a Wavy Half-Smile, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Wide Eyes
        // const ROYALTY_RECEIVER = TESTING_LIAM_KSM;
        // const SLOTS = ["eyes"];
        // const ITEM_NFT_SYMBOL = "COLLAB_LIAM_WIDE_EYES";
        // const SUBDIRECTORY = "liam-april/collab-liam-wide-eyed"
        // const ITEM_PARTIAL_FILENAME = "wide-eyed";
        // const ITEM_TITLE = "Stickie Wide Eyes # ";
        // const ITEM_DESCRIPTION = "These are Wide Eyes, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nCreated by [@liam](https://singular.app/space/EaL4YCtFDmBd9TfUxR3jxUJR7KQUAANgh1KWiYSKyNJXf3U)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Liam Wide Eyes
        // const ROYALTY_RECEIVER = KSM_ADDRESS;
        // const SLOTS = ["extra_slot_one"];
        // const ITEM_NFT_SYMBOL = "GENESIS_RED_SKATEBOARD";
        // const SUBDIRECTORY = "red-skateboard"
        // const ITEM_PARTIAL_FILENAME = "red-skateboard";
        // const ITEM_TITLE = "Stickie Red Skateboard # ";
        // const ITEM_DESCRIPTION = "These is a Stickie Red Skateboard, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
        //     "\n\nTotal supply of 10\n\n#";
        // let start = 1;
        // let stop = 10;

        // Moridin Dope Chain
        const MORIDIN_KSM = "EVL7rKBDd5Xb3owtTErYMFejQnKKpAdmCd1gkijEzWvN7Pt";
        const ROYALTY_RECEIVER = MORIDIN_KSM;
        const SLOTS = ["shirt_overlay"];
        const ITEM_NFT_SYMBOL = "DOPE_CHAIN";
        const SUBDIRECTORY = "moridin/chain"
        const ITEM_PARTIAL_FILENAME = "dope-chain";
        const ITEM_TITLE = "Stickie Dope Chain # ";
        const ITEM_DESCRIPTION = "These is a Dope Chain, equippable onto a [Stickie](https://singular.app/collections/9e5ba1a373b2e45818-STICKIES_OFFICIAL)." +
            "\n\nCreated by [@moridin_eth](https://twitter.com/moridin_eth)." +
            "\n\nTotal supply of 10\n\n#";
        let start = 1;
        let stop = 10;










        let primary_same_as_thumb = true;

        const ROYALTY_PERCENTAGE = 10;

        console.log("Royalty Reciever --> ", ROYALTY_RECEIVER);
        console.log("Start            --> ", start);
        console.log("Stop             --> ", stop);
        console.log("Collab           --> ", IS_COLLAB);
        console.log("Collection       --> ", STICKIES_ITEM_COLLECTION_ID);

        readline.question("Press enter to continue...");

        const DIRECTORY = `/assets/chunky/${SUBDIRECTORY}`;
        const THUMB_PATH = `${ITEM_PARTIAL_FILENAME}_thumb.png`
        const PRIMARY_PATH = primary_same_as_thumb ? THUMB_PATH : `${ITEM_PARTIAL_FILENAME}_primary.png`

        let {
            svg_cids: STICKIE_SVG_CIDS,
            thumb: STICKIE_THUMB_CID,
            primary: STICKIE_PRIMARY_CID,
            metadata_cids: cids } = await runPinataSequenceForListOfSvgFiles(
                DIRECTORY, // directory
                ITEM_TITLE, // item title
                ITEM_DESCRIPTION, // metadata description
                [`${ITEM_PARTIAL_FILENAME}_svg.svg`],
                PRIMARY_PATH, // thumb file
                [THUMB_PATH], // thumb file
                ITEM_NFT_SYMBOL, // Item symbol.
                start, // Start index
                stop, // Stop index
            );

        let mint_remarks = []
        let nft_item_ids = []

        cids.forEach((o, i, a) => {
            mint_remarks.push(getItemMintRemark(STICKIES_ITEM_COLLECTION_ID, ITEM_NFT_SYMBOL, start + i, `ipfs://ipfs/${o}`));
        })

        mint_remarks = insertRoyalty(mint_remarks, ROYALTY_RECEIVER, ROYALTY_PERCENTAGE);

        console.log(mint_remarks);
        readline.question("Press enter to continue (send MINT remarks)...")

        // // // PAUSE HERE
        console.log("Reached the break point...");
        if (!pause) {
            block_number_items_minted = await sendRemarks(mint_remarks);
        }
        console.log("Passed the break point");

        // Populate item IDs
        cids.forEach((o, i, a) => {
            nft_item_ids.push(`${block_number_items_minted}-${STICKIES_ITEM_COLLECTION_ID}-${ITEM_NFT_SYMBOL}_${start + i}-${(start + i).toString().padStart(8, "0")}`);
        })

        let resadd_item_remarks = [];
        nft_item_ids.forEach((nft_item) => {
            let primary_resource = getPrimaryResAddRemarkForItem(
                nft_item,
                STICKIE_PRIMARY_CID,
            )
            SLOTS.forEach((slot, i, a) => {
                resadd_item_remarks.push(primary_resource);
                let r = getResAddRemarkForItem(
                    nft_item, // nft item id
                    BASE_ID, // Base ID
                    slot, // Slot ID
                    STICKIE_SVG_CIDS[i], // svg resource
                    STICKIE_THUMB_CID[i], // thumb resource
                    // STICKIE_THUMB_CID, // thumb resource
                )
                resadd_item_remarks.push(r);
            });
        });

        // Send one of them to my test guy
        resadd_item_remarks.push(...getSendAndEquipRemarkForSuperFounder(nft_item_ids[0], SUPER_FOUNDER, SLOTS[1]));
        console.log(resadd_item_remarks);
        readline.question("Press enter to continue (send RESADD remarks)...")
        let resadd_item_block = await sendRemarks(resadd_item_remarks);
        console.log(`Final submission block (RESADD and EQUIP): ${resadd_item_block}`);
        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
