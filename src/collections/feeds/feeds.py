import xml.etree.ElementTree as ET
import json

tree = ET.parse("feeds.opml.xml")
body = tree.getroot()[1]
array = []
for category in body:
    _category = {"id": category.attrib["text"], "items": []}
    for feed in category:
        _title = feed.get("text")
        _xmlUrl = feed.get("xmlUrl")
        _htmlUrl = feed.get("htmlUrl")
        _description = feed.get("description")
        _category["items"].append({"id": _title, "xmlUrl": _xmlUrl, "htmlUrl": _htmlUrl, "description": _description})
    array.append(_category)
output = json.dumps(array)

with open("feeds.json", "w") as f:
    f.write(output)
print("Feeds.json refreshed!")
