# The mid is /g/11h91cqh49
# In Google Maps, mid /g/11... can be queried via:
# https://www.google.com/maps/place/?q=place_id:... or https://maps.google.com/?cid=...
# Or directly: https://www.google.com/maps/search/?api=1&query=Google&query_place_id=...
# Or search google with mid:
import urllib.request
import json
import re

mid = '/g/11h91cqh49'
url = f'https://www.google.com/maps/place/data=!3m1!4b1!4m2!3m1!1s{mid}'
print(url)
