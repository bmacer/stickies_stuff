var fs = require('fs');
console.log("list")

import { sleep } from '../utils';
import { sendRemarks } from '../utils';

const unlist = (item: string) => {
    console.log("unlisting")
}

const list_item = (item: string) => {
    console.log("listing");
}

const get_list_remark = (item: string, price: number) => {
    return `RMRK::LIST::2.0.0::${item}::${price}`
}

const run = () => {
    try {
        // 129750000000
        const data = fs.readFileSync("random_stickie.txt", "utf8");
        console.log(data);
        let unlist_remark = get_list_remark(data, 0);
        let list_remark = get_list_remark(data, 129750000000);
        console.log(unlist_remark);
        sendRemarks([unlist_remark])
        console.log(list_remark);
        sendRemarks([list_remark])
    } catch (err) {
        console.log(err)
    }
    unlist("this item");
    list_item("that item");
}

run();