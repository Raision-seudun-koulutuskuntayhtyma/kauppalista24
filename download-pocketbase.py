#!/usr/bin/env python

import os
import platform
import sys
import urllib.request
import zipfile

PB_VER = '0.22.9'
PB_BASE_URL = 'https://github.com/pocketbase/pocketbase/releases/download'


def main():
    url = get_pocketbase_url()
    print("Downloading PocketBase from:", url)
    download_and_unzip(url, dest_directory="pocketbase")


def get_pocketbase_url():
    arch = {
        "x86_64": "amd64",
        "arm": "arm64",
    }.get(platform.processor(), platform.processor())
    plat = {
        "linux": "linux",
        "win32": "windows",
        "darwin": "darwin",
    }.get(sys.platform, sys.platform)
    return f"{PB_BASE_URL}/v{PB_VER}/pocketbase_{PB_VER}_{plat}_{arch}.zip"


def download_and_unzip(url, dest_directory):
    tmp_zipfile = "pocketbase_tmp.zip"
    urllib.request.urlretrieve(url, tmp_zipfile)
    try:
        print("Unzipping to directory:", dest_directory)
        with zipfile.ZipFile(tmp_zipfile, "r") as zipf:
            zipf.extractall(dest_directory)
    finally:
        os.unlink(tmp_zipfile)


if __name__ == "__main__":
    main()
