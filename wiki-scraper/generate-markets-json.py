from bs4 import BeautifulSoup
import urllib2
import json
import tzconvert

wiki = 'https://en.wikipedia.org/w/index.php?title=List_of_stock_exchange_opening_times'
header = {'User-Agent': 'Mozilla/5.0'}
req = urllib2.Request(wiki, headers=header)
page = urllib2.urlopen(req)
soup = BeautifulSoup(page, 'html.parser')
table = soup.find("table", {"class": "wikitable sortable"})

result = []
for row in table.findAll('tr'):
  cells = row.findAll('td')
  if len(cells) == 13:
    name = cells[0].findAll(text=True)
    if len(name) >= 2:
        name = name[1]
    else:
        name = name[0] 
    country = cells[2].findAll(text=True)[0]
    city = cells[3].findAll(text=True)[0]
    market = {
      'name': name,
      'id': cells[1].findAll(text=True)[0],
      'country': country,
      'city': city,
      'tz': tzconvert.get_tz_zone_id(country, city),
      'open': cells[7].findAll(text=True)[0],
      'close': cells[8].findAll(text=True)[0],
    }
    lunch = cells[9].findAll(text=True)[0]
    if lunch not in ('No', 'Yes'):
        market['lunch'] = lunch.replace(u'\u2013', '-')
    result.append(market)

result = sorted(result, key=lambda x: x['name'])

print json.dumps(result, indent=4, sort_keys=True)
