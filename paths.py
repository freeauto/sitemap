from os.path import dirname, realpath
import sys
def add_path(path):
    if path not in sys.path:
        sys.path.insert(0, path)
PROJECT_PATH = dirname(realpath(__file__))
add_path(PROJECT_PATH)
