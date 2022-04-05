from faulthandler import cancel_dump_traceback_later
import sys


def calculate_age(starting_block, ending_block):
    diff = ending_block - starting_block
    minutes = diff / 10
    hours = minutes / 60
    days = hours / 24
    print(f"Age: {minutes:0.1f} minutes, {hours:0.1f} hours, {days:0.1f} days")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Not enough args, need starting block and ending block")
        sys.exit()
    starting_block = float(sys.argv[1])
    ending_block = float(sys.argv[2])
    calculate_age(starting_block, ending_block)
