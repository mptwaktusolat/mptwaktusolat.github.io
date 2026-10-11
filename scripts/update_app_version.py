"""Sync Android version metadata from the app's latest stable GitHub release."""

import argparse
from datetime import datetime
import json
import os
from pathlib import Path
import re
import sys
from urllib.request import Request, urlopen


RELEASE_URL = (
    "https://api.github.com/repos/mptwaktusolat/"
    "app_waktu_solat_malaysia/releases/latest"
)
VERSION_FILE = Path(__file__).resolve().parents[1] / "src/assets/check_version.json"


def fetch_release():
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "waktusolat-website-version-sync",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    token = os.environ.get("GH_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    with urlopen(Request(RELEASE_URL, headers=headers), timeout=30) as response:
        return json.load(response)


def release_metadata(release):
    if not isinstance(release, dict):
        raise ValueError("Expected a GitHub release object")
    if release.get("draft") is not False or release.get("prerelease") is not False:
        raise ValueError("Expected a published stable release")

    for field in ("tag_name", "name", "published_at"):
        if not isinstance(release.get(field), str) or not release[field].strip():
            raise ValueError(f"Release has a missing or invalid {field}")

    match = re.fullmatch(r"v?(\d+\.\d+\.\d+)\+(\d+)", release["tag_name"])
    if not match:
        raise ValueError("Release tag must have the form [v]2.14.3+176")
    published_at = datetime.fromisoformat(release["published_at"].replace("Z", "+00:00"))
    if published_at.tzinfo is None:
        raise ValueError("Release published_at must include a timezone")

    return {
        "tag": release["tag_name"],
        "releaseTitle": release["name"],
        "version": match[1],
        "buildNumber": int(match[2]),
        "publishedAt": release["published_at"],
    }


def update_file(path, release):
    metadata = release_metadata(release)
    versions = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(versions, dict) or not isinstance(versions.get("android"), dict):
        raise ValueError("Version file must contain an android object")
    if all(versions["android"].get(key) == value for key, value in metadata.items()):
        return False

    versions["android"].update(metadata)
    path.write_text(json.dumps(versions, indent=4) + "\n", encoding="utf-8")
    return True


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", nargs="?", type=Path, default=VERSION_FILE)
    args = parser.parse_args(argv)
    try:
        changed = update_file(args.file, fetch_release())
    except (OSError, ValueError, TypeError) as error:
        print(f"Version sync failed: {error}", file=sys.stderr)
        return 1
    print("Updated Android version." if changed else "Android version is already up to date.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
