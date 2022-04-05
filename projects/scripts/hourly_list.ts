var fs = require('fs');
console.log("list")

import { sendRemarks } from './utils';

const get_list_remark = (item: string, price: number) => {
    return `RMRK::LIST::2.0.0::${item}::${price}`
}

const run = () => {
    try {
        // 129750000000 = 0.15KSM
        // 43250000000 = 0.05KSM
        const data = fs.readFileSync("auto-stickies/random_stickie.txt", "utf8");
        console.log(data);
        let unlist_remark = get_list_remark(data, 0);
        let list_remark = get_list_remark(data, 43250000000);

        setTimeout(() => {
            console.log(unlist_remark);
            sendRemarks([unlist_remark])
        }, 1000);

        setTimeout(() => {
            console.log(list_remark);
            sendRemarks([list_remark])
        }, 60000);

        setTimeout(() => {
            process.exit(0);
        }, 120000);

    } catch (err) {
        console.log(err)
    }
}

run();