import { sendRemarks } from './utils';

export const run = async () => {
    try {
        let remarks = [
            "RMRK::SEND::2.0.0::11807586-9e5ba1a373b2e45818-STICKIES_ITEMS_GENESIS-GENESIS_SHORTS_YELLOW_20-00000020::11769105-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_35-00000035",
        ]

        let block = await sendRemarks(remarks);
        console.log(`Submitted on block ${block}`);
        process.exit(0);
    } catch (error: any) {
        console.error(error);
        process.exit(0);
    }
};

run();
