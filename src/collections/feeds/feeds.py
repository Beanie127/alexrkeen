import xml.etree.ElementTree as ET
import json

def _build_feed(feed: ET) -> dict[str, str | None]:
    """Collects an RSS feed's title (as id), xmlURL, htmlURL and description"""
    return {
        "id": feed.get("text"),
        "xmlUrl": feed.get("xmlUrl"),
        "htmlUrl": feed.get("htmlUrl"),
        "description": feed.get("description")
    }

def main():
    tree = ET.parse("feeds.opml.xml")
    body = tree.getroot()[1]
    feed_categories = [
        {
            "id": category.attrib["text"],
            "items":[_build_feed(feed) for feed in category]
        }
        for category in body
    ]
    output = json.dumps(feed_categories)

    with open("feeds.json", "w") as f:
        f.write(output)
    print("Feeds.json refreshed!")

if __name__ == "__main__":
    main()
