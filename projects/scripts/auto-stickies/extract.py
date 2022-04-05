import sys
import json
import os


def extract_consolidated(consolidated_full_file_path, destination_file_path):
    """
    Turns full consolidated JSON into filtered JSON with keys "nfts" and "items"
    Parameters:
    - consolidated_full_file_path: name of consolidated file, e.g. "precon-rmrk2.rmrk.link"
    - destination_file_path: where to dump the JSON output, e.g. "just_my_items.json"
    """
    if not os.path.exists(consolidated_full_file_path):
        raise Exception(f"File doesn't exist: {consolidated_full_file_path}")
    print(f"Loading {consolidated_full_file_path}...")
    with open(consolidated_full_file_path, "r") as infile:
        j = json.load(infile)
    print(f"Loaded {consolidated_full_file_path}...")
    nfts_i_own = list(
        filter(lambda i: "9e5ba1a373b2e45818-STICKIES_OFFICIAL" in i, j["nfts"]))
    items_i_own = list(
        filter(lambda i: "9e5ba1a373b2e45818-STICKIES_ITEMS_GENESIS" in i, j["nfts"]))
    data = {
        "nfts": [],
        "items": []
    }
    print(f"Found {len(nfts_i_own)} Stickies")
    print(f"Found {len(items_i_own)} Stickie Items")

    for n in nfts_i_own:
        data["nfts"].append(j["nfts"][n])
    for i in items_i_own:
        data["items"].append(j["nfts"][i])

    with open(f"data/{destination_file_path}", "w") as outfile:
        json.dump(data, outfile)
    print(f"NFTs file written to {destination_file_path}")


def run():
    if len(sys.argv) != 3:
        print(
            "Usage: py extract.py [input consolidated file name] [output JSON file]")
        print("Example:")
        print("py extract.py ")
        return
    extract_consolidated(sys.argv[1], sys.argv[2])


if __name__ == "__main__":
    run()
