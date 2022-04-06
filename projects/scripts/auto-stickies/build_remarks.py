import random
import json
from itertools import chain
import sys
import math


EXTRACTED_JSON = "b.json"
SUPER_FOUNDER = "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_1-00000001"
STICKIE_KSM = "G9xJaAqygUMmeoTGu4tafGK9LdDbS6k54a3mLHyWydLyUA5"
NUM = 10
OFFSET = 1


def is_owned(j, query_owner):
    return True


def get_mine(filename):
    with open(filename) as infile:
        return json.load(infile)

# slot_dict = {}
# with open("pairs_as_csv.json") as infile:
#     j = infile.readlines()
# j = list(map(lambda i: i.strip(), j))
# j = list(map(lambda i: i.replace('"', ""), j))
# j = list(map(lambda i: i.replace(',', ""), j))
# for i in range(len(j)):
#     if "STICKIES_ITEMS_GENESIS" in j[i]:
#         print("ok")
#         slot_dict[j[i]] = j[i+1]
# print(slot_dict)
# for i in slot_dict:
#     print(i)


# input("waiting")

# with open("all_stickies_i_own.txt", "r") as infile:
#     r = infile.readlines()

# with open("all_items_i_own.txt", "r") as infile:
#     x = infile.readlines()

# stickies_i_own = list(map(lambda i: i.strip(), r))
# items_i_own = list(map(lambda j: j.strip(), x))

# blocks = set()

# for i in items_i_own:
#     blocks.add(i[:9])


# print(len(items_i_own))
# print("[")
# for j in range(20):
#     chosen_stickie = stickies_i_own[176]
#     stickies_i_own.remove(chosen_stickie)
#     for i in range(8):
#         # print(blocks)
#         block = random.choice(list(blocks))
#         blocks.remove(block)
#         filtered_items = list(
#             filter(lambda i: i.startswith(block), items_i_own))
#         # print(filtered_items)
#         item = random.choice(filtered_items)
#         items_i_own.remove(item)
#         print(f"\"RMRK::SEND::2.0.0::{item}::{chosen_stickie}\",")
#         print(f"\"RMRK::EQUIP::2.0.0::{item}::{slot_dict[item]}\",")
#     blocks = set()
#     for i in items_i_own:
#         blocks.add(i[:9])
# print("]")
# print(len(items_i_own))

# print(slot_dict)

# Is for sale?
def is_for_sale(nft):
    changes = nft["changes"]
    for_sale = False
    if len(changes) > 0:
        for c in changes:
            if c["opType"] == "LIST":
                if c["new"] != "0":
                    for_sale = True
                else:
                    for_sale = False
    return for_sale


def get_price(nft):
    changes = nft["changes"]
    price = "0"
    if len(changes) > 0:
        for c in changes:
            if c["opType"] == "LIST":
                price = c["new"]
    return price


def filter_for(item, from_list):
    """
    Get a certain item from a list, like "COFFEE"
    """
    return list(filter(lambda i: item in i["id"], from_list))

# Get all items I own directly that are not for sale


def get_unlisted_stickies_i_own(items_filename):
    with open(items_filename) as infile:
        j = json.load(infile)
    stickies = j["nfts"]
    stickies_i_own = list(
        filter(lambda i: i["owner"] == STICKIE_KSM, stickies))
    stickie_i_own_not_for_sale = list(
        filter(lambda i: not is_for_sale(i), stickies_i_own))
    return stickie_i_own_not_for_sale


def get_listed_stickies_i_own(items_filename):
    with open(items_filename) as infile:
        j = json.load(infile)
    stickies = j["nfts"]
    stickies_i_own = list(
        filter(lambda i: i["owner"] == STICKIE_KSM, stickies))
    listed_stickies_i_own = list(
        filter(lambda i: is_for_sale(i), stickies_i_own))
    return listed_stickies_i_own


def get_all_stickies_i_own(items_filename):
    with open(items_filename) as infile:
        j = json.load(infile)
    stickies = j["nfts"]
    stickies_i_own = list(
        filter(lambda i: i["owner"] == STICKIE_KSM, stickies))
    return stickies_i_own


def get_items_i_own_directly_that_are_for_sale(items_filename):
    with open(items_filename) as infile:
        j = json.load(infile)
    items = j["items"]
    items_i_rootown = list(
        filter(lambda i: i["rootowner"] == STICKIE_KSM, items))
    items_i_dont_directly_own = list(
        filter(lambda i: i["owner"] != STICKIE_KSM, items_i_rootown))
    items_i_directly_own = list(
        filter(lambda i: i["owner"] == STICKIE_KSM, items))
    print(f"I directly own {len(items_i_directly_own)} items")
    items_i_directly_own_that_are_for_sale = list(
        filter(lambda i: is_for_sale(i), items_i_directly_own))
    print(
        f"I directly own {len(items_i_directly_own_that_are_for_sale)} items that are not for sale")
    filter_out_interim_sales = []

    return items_i_directly_own_that_are_for_sale


def get_items_i_own_directly_that_are_not_for_sale(items_filename):
    with open(items_filename) as infile:
        j = json.load(infile)
    items = j["items"]
    items_i_rootown = list(
        filter(lambda i: i["rootowner"] == STICKIE_KSM, items))
    items_i_dont_directly_own = list(
        filter(lambda i: i["owner"] != STICKIE_KSM, items_i_rootown))
    items_i_directly_own = list(
        filter(lambda i: i["owner"] == STICKIE_KSM, items))
    print(f"I directly own {len(items_i_directly_own)} items")
    items_i_directly_own_that_are_not_for_sale = list(
        filter(lambda i: not is_for_sale(i), items_i_directly_own))
    print(
        f"I directly own {len(items_i_directly_own_that_are_not_for_sale)} items that are not for sale")
    filter_out_interim_sales = []

    # for item in items_i_directly_own_that_are_not_for_sale:
    #     item_already_sent = False
    #     for check in rems:
    #         if item['id'] in check:
    #             item_already_sent = True
    #     if not item_already_sent:
    #         filter_out_interim_sales.append(item)
    # print(
    #     f"I directly own {len(filter_out_interim_sales)} items that are not for sale/interim")
    return items_i_directly_own_that_are_not_for_sale

# Categorize them


def categorize(item_list):
    def get(item):
        return filter_for(item.upper(), item_list)
    skirts = get("skirt")
    print(f"skirts: {len(skirts)}")
    shorts = get("short")
    print(f"shorts: {len(skirts)}")
    bottoms = list(chain(*[skirts, shorts]))
    print(f"bottoms: {len(bottoms)}")
    shirts = get("shirt")
    print(f"shirts: {len(shirts)}")
    shoes = get("SHOES")
    print(f"shoes: {len(shoes)}")
    backgrounds = get("BACKGROUND")
    print(f"backgrounds: {len(backgrounds)}")
    faces = get("_FACE")
    print(f"faces: {len(faces)}")
    eyes = get("EYES")
    print(f"eyes: {len(eyes)}")
    pets = get("_PET_")
    print(f"pets: {len(pets)}")
    hats = get("_HAT_")
    print(f"hats: {len(hats)}")
    smiles = get("SMILE")
    print(f"smiles: {len(smiles)}")
    hands = get("_HANDS_")
    hands = list(filter(lambda i: "DOWN" not in i["id"], hands))
    # print(hands)
    # for i in hands:
    #     print(i["id"])
    # input()
    print(f"hands: {len(hands)}")
    ice_creams = get("ICECREAM")
    print(f"ice_creams: {len(ice_creams)}")
    flowers = get("FLOWER")
    print(f"flowers: {len(flowers)}")
    cellphone = get("CELLPHONE")
    print(f"cellphone: {len(cellphone)}")
    coffees = get("COFFEE")
    print(f"coffees: {len(coffees)}")
    wines = get("WINE")
    print(f"wines: {len(wines)}")
    nets = get("_NET_")
    print(f"nets: {len(nets)}")
    handheld_items = list(
        chain(*[ice_creams, flowers, cellphone, coffees, wines, nets]))
    handheld_items = list(handheld_items)

    print(f"items: {len(handheld_items)}")

    maximum_possible = min(
        len(bottoms),
        len(shirts),
        len(shoes),
        len(backgrounds),
        len(faces),
        len(eyes),
        len(pets),
        len(hats),
        # len(smiles),
        len(hands),
        len(handheld_items)
    )

    if NUM >= maximum_possible:
        print(f"can't do {NUM} most i can do: {maximum_possible}")
        sys.exit()

    return [
        bottoms,
        shirts,
        shoes,
        backgrounds,
        faces,
        eyes,
        pets,
        hats,
        smiles,
        hands,
        handheld_items
    ]

# Randomly choose 1 of each category for a defined range of Stickies I own directly that aren't for sale


def pick_random_slot(item):
    # print()
    # print(item["id"])
    # if "MOUNTAIN" in item["id"]:
    # slots = ["base-11765645-STICKIES.background"]
    # else:
    # print("\n"*10)
    # print(item)
    # print()
    # print(item["resources"])
    # slots = list(map(lambda i: i["slot"], item["resources"]))
    slots = []
    for i in item["resources"]:
        if i.get("slot"):
            slots.append(i.get("slot"))
    return random.choice(slots)


def get_random_selection_for(nfts, item_categories):
    data = {}
    for c in item_categories:
        for nft in nfts:
            # print(nft["id"])
            # print(c)
            choice = random.choice(c)
            c.remove(choice)
            # print()
            slot = pick_random_slot(choice)
            # print(slot)
            # print(data)
            d = {"item": choice["id"], "slot": slot}
            # print("ok")
            if data.get(nft["id"]):
                data[nft["id"]].append(d)
            else:
                data[nft["id"]] = [d]
    return data


def convert_data_into_printed_resadd_remarks(data):
    print("[")
    for nft, v in data.items():
        for item in v:
            print(f"\"RMRK::SEND::2.0.0::{item['item']}::{nft}\",")
            print(
                f"\"RMRK::EQUIP::2.0.0::{item['item']}::{item['slot']}\",")
    print("]")


def get_category(item):
    """
    11999935-9e5ba1a373b2e45818-STICKIES_ITEMS_GENESIS-GENESIS_HAT_BEANIE_97-00000097 -> STICKIES_ITEMS_GENESIS-GENESIS_HAT_BEANIE
    """
    return item.split("-")[3][0:-3]


def run():
    if len(sys.argv) != 2:
        print(
            "Usage: py extract.py [consolidated just-mine file name]")
        print("Example:")
        print("py new_output.json")
        return sys.argv[1]


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(
            "Usage: py extract.py [consolidated just-mine file name]")
        print("Example:")
        print("py new_output.json")
        sys.exit()
    else:
        EXTRACTED_JSON = sys.argv[1]

    with open(EXTRACTED_JSON) as infile:
        j = json.load(infile)

    all_stickies = j["nfts"]
    print("\n" * 10)
    print(f"There are {len(all_stickies)} total Stickies")

    all_stickies_i_own = get_all_stickies_i_own(
        EXTRACTED_JSON)
    print(f"\n\nI own {len(all_stickies_i_own)} Stickies")
    # choice = input("List Stickies I own? ('y' for yes, enter for no) --> ")
    # if choice == "y":
    print("\n\nStickies I own:")
    print("\n".join(list(map(lambda i: i["id"], all_stickies_i_own))))
    # input("Enter to continue...")

    unlisted_stickies_i_own = get_unlisted_stickies_i_own(
        EXTRACTED_JSON)
    print(f"\n\nI own {len(unlisted_stickies_i_own)} *Unlisted* Stickies")
    # choice = input(
    #     "List *Unlisted* Stickies I own? ('y' for yes, enter for no) --> ")
    # if choice == "y":
    print("\n\nUnlisted Stickies I own:")
    print(
        "\n".join(list(map(lambda i: i["id"], unlisted_stickies_i_own))))
    # input("Enter to continue...")

    listed_stickies_i_own = get_listed_stickies_i_own(
        EXTRACTED_JSON)
    print(f"\n\nI own {len(listed_stickies_i_own)} *Listed* Stickies")
    # choice = input(
    #     "List *Listed* Stickies I own? ('y' for yes, enter for no) --> ")
    # if choice == "y":
    print("\n\nListed Stickies I own:")
    print(
        "\n".join(list(map(lambda i: i["id"], listed_stickies_i_own))))
    # input("Enter to continue...")

    item_filter_blacklist = {
        "GENESIS_HANDS": ["DOWN", "UP"],
        "COLLAB_LIAM_HAT": ["DOOR", "CLOUDS", "SPARTAN"]
    }

    item_names = [
        "GENESIS_BACKGROUND_BEACH",
        "GENESIS_COFFEE",
        "GENESIS_TICKET",
        "GENESIS_CELLPHONE",
        "GENESIS_FLOWER",
        "GENESIS_ICECREAM",
        "GENESIS_HAT_COWBOY",
        "GENESIS_HANDS_THUMBS_UP",
        "GENESIS_HANDS_THUMBS_DOWN",
        "GENESIS_HANDS",  # Check not THUMBS_UP or THUMBS_DOWN
        "GENESIS_EYES_BLUE",
        "GENESIS_SMILE",
        "GENESIS_HAT_WITCH",
        "GENESIS_HAT_BEANIE",
        "GENESIS_PET_SNAKE",
        "GENESIS_PET_SHEEP",
        "GENESIS_PET_TURTLE",
        "GENESIS_BACKGROUND_PARIS",
        "GENESIS_BACKGROUND_MOUNTAINS",
        "GENESIS_HAIR_LONG",
        "GENESIS_LONG_HAIR_PINK",
        "GENESIS_LONG_HAIR_BLUE",
        "GENESIS_LONG_HAIR_BROWN",
        "GENESIS_EYES_GREEN",
        "GENESIS_EYES_BROWN_",
        "GENESIS_BACKGROUND_DESERT",
        "GENESIS_BACKGROUND_GALACTIC",
        "GENESIS_BACKGROUND_MARS",
        "GENESIS_BACKGROUND_OFFICE",
        "GENESIS_BACKGROUND_SEA",
        "GENESIS_BACKGROUND_RAINBOW",
        "GENESIS_SUNGLASSES",
        "GENESIS_FACE_FROWN",
        "GENESIS_FACE_MASK",
        "GENESIS_FACE_O",
        "GENESIS_FACE_BEARD",
        "GENESIS_SHOES_BLUE",
        "GENESIS_SHOES_PINK",
        "GENESIS_SHOES_RED",
        "GENESIS_SHIRT_GREEN",
        "GENESIS_SHIRT_ORANGE",
        "GENESIS_SHIRT_YELLOW",
        "GENESIS_SHIRT_RED",
        "GENESIS_SHIRT_BLUE",
        "GENESIS_SHIRT_RED",
        "GENESIS_SHIRT_TEAL",
        "GENESIS_SHORTS_BLUE",
        "GENESIS_SHORTS_GREY",
        "GENESIS_SHORTS_YELLOW",
        "GENESIS_SKIRT_RED",
        "GENESIS_SKIRT_PURPLE",
        "GENESIS_SKIRT_PINK",
        "GENESIS_PET_FISH",
        "GENESIS_FOREGROUND_MUSHROOM",
        "GENESIS_HANDHELD_WINE",
        "GENESIS_BACKGROUND_RAINBOW",
        "GENESIS_BINOCULARS",
        "GENESIS_GOLD",
        "GENESIS_SUNGLASSES_70",

        # Kathy
        "GENESIS_PET_CAT",
        "GENESIS_ITEM_NET",
        "GENESIS_PET_DINOSAUR",


        # Veronica
        "GENESIS_VOLLEYBALL_BG",

        # Collabs
        "STICKIE_COLLAB_BLOWTORCH",

        # Kate
        "COLLAB_STICKIE_WEED",

        # Bowser
        "COLLAB_MP3_BOWSER",

        # Stickiaga
        "COLLAB_SHIRT_STICKIAGA",

        # Moridin
        "STICKIE_COLLAB_MORIDIN_CIGAR",
        "STICKIES_ITEMS_COLLABS-COLLAB_MORIDIN_69_SHIRT",

        # Liam
        "COLLAB_LIAM_HAT_DOOR",
        "COLLAB_LIAM_HAT_CLOUDS",
        "COLLAB_LIAM_HAT_SPARTAN",
        "COLLAB_LIAM_HAT",  # Check that it's not DOOR or CLOUDS or SPARTAN
        "COLLAB_LIAM_SUNGLASSES",
        "COLLAB_LIAM_BACKGROUND_FARM",
        "STICKIE_COLLAB_LIAM_CASTLE",
        "STICKIE_COLLAB_LIAM_CLASSROOM",
        "STICKIE_COLLAB_LIAM_SHOE",
        "STICKIE_COLLAB_LIAM_MUSEUM",
        "COLLAB_LIAM_SHIRT_CLOUD",
        "COLLAB_LIAM_SHIRT_MUSHROOM",
        "COLLAB_LIAM_SHIRT_YELLOW_STRIPED",

        "COLLAB_MP3_TEST",

    ]

    all_items = j["items"]
    print(
        f"\n\nThere are {len(all_items)} total items (both GENESIS and COLLAB)")
    print(f"There are {len(item_names)} different items")

    print(
        f"\n{'TOT':4} | {'ROOT':4} | {'OWN':4} | {'UNL':4} | {'LIS':4} | {'PRICE':5} | {'ITEM':25} | {'EXAMPLE':40}")
    for item_name in item_names:
        items = list(filter(lambda i: item_name in i["id"], all_items))
        if item_name in item_filter_blacklist:
            for black in item_filter_blacklist[item_name]:
                items = list(filter(lambda i: black not in i["id"], items))
        items_i_own = list(
            filter(lambda i: i["owner"] == STICKIE_KSM, items))

        items_i_rootown = list(
            filter(lambda i: i["rootowner"] == STICKIE_KSM, items))

        unlisted_items_i_own = list(
            filter(lambda i: not is_for_sale(i), items_i_own))

        listed_items_i_own = list(
            filter(lambda i: is_for_sale(i), items_i_own))
        extra = ""
        price = "0"
        if len(listed_items_i_own) > 0:
            price = get_price(listed_items_i_own[0]) + " "
        if len(listed_items_i_own) == 0 and len(unlisted_items_i_own) > 0:
            extra += unlisted_items_i_own[-1]["id"]
        elif len(listed_items_i_own) > 0:
            extra += listed_items_i_own[-1]["id"]
        print(
            f"{len(items): 4} | {len(items_i_rootown): 4} | {len(items_i_own): 4} | {len(unlisted_items_i_own): 4} | {len(listed_items_i_own): 4} | {float(int(float(price)/10_000_000_000/0.85))/100:5.2} | {item_name[:25]:25} | {extra}")

    for i in all_items:
        found = False
        for n in item_names:
            if n in i["id"]:
                found = True
        if not found:
            print(i["id"])
            input()

    # list_example = 129750000000

    blacklist = [
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_9-00000009",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_8-00000008",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_7-00000007",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_6-00000006",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_5-00000005",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_4-00000004",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_3-00000003",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_2-00000002",
        "11765795-9e5ba1a373b2e45818-STICKIES_OFFICIAL-stickie_1-00000001",
    ]

    with open("random_stickie.txt", "w") as outfile:
        outfile.write(random.choice(listed_stickies_i_own)["id"])

    items_for_sale = set()

    items_not_for_sale = set()

    listed_items_i_directly_own = get_items_i_own_directly_that_are_for_sale(
        EXTRACTED_JSON)

    for i in listed_items_i_directly_own:
        items_for_sale.add(get_category(i["id"]))

    unlisted_items_i_directly_own = get_items_i_own_directly_that_are_not_for_sale(
        EXTRACTED_JSON)

    for i in unlisted_items_i_directly_own:
        # print(i["id"])
        # print(get_category(i["id"]))
        items_not_for_sale.add(get_category(i["id"]))

    # print(items_for_sale)
    # input()
    # print(items_not_for_sale)
    # input()

    need_to_list = []

    for i in items_not_for_sale:
        if i not in items_for_sale:
            need_to_list.append(i)

    # print(need_to_list)
    # input()

    # sys.exit()
    bottoms, shirts, shoes, backgrounds, faces, eyes, pets, hats, smiles, hands, items = categorize(
        unlisted_items_i_directly_own)

    categories = [bottoms, shirts, shoes, shoes, backgrounds,
                  faces, eyes, pets, hats,
                  #   smiles,
                  hands, items]

    unlisted_stickies_i_own.reverse()

    print("Stickies I own that aren't listed:")
    stickies = unlisted_stickies_i_own[OFFSET:NUM+OFFSET]
    for i in unlisted_stickies_i_own:
        print(i["id"])
    print("Stickies I'll decorate:")
    for i in stickies:
        print(i["id"])
    print("\n" * 20)
    data = get_random_selection_for(
        # get_random_selection_for(
        stickies,
        categories
    )

    convert_data_into_printed_resadd_remarks(data)

    # Send all items that I rootown but don't directly own back to main account if Stickie is not for sale

    # for i in items_i_dont_directly_own:
    #     owner = i["owner"]
    #     if owner != SUPER_FOUNDER:
    #         if not is_for_sale(
    #                 list(filter(lambda i: i["id"] == owner, stickies_i_own))[0]):
    #             print(f"\"RMRK::SEND::2.0.0::{i['id']}::{STICKIE_KSM}\",")
