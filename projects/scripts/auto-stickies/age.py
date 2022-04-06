from faulthandler import cancel_dump_traceback_later
import sys
import json
from tracemalloc import start


def calculate_age(starting_block, ending_block):
    diff = ending_block - starting_block
    minutes = diff / 10
    hours = minutes / 60
    days = hours / 24
    print(f"Starting block: {starting_block}")
    print(f"Ending block  : {ending_block}")
    print(f"Age: {minutes:0.1f} minutes, {hours:0.1f} hours, {days:0.1f} days")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Not enough args, need JSON file and ending block")
        print("Example: py age.py backup.link 12125147")
        sys.exit()
    with open(sys.argv[1]) as infile:
        j = json.load(infile)
    starting_block = float(j["lastBlock"])
    ending_block = float(sys.argv[2])
    calculate_age(starting_block, ending_block)
