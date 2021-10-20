from bs4 import BeautifulSoup
import requests
import json
import csv

dpdDogsPage = requests.get("http://dpdsdogs.com/ncaa/fbsrank.htm")
dpdDogsHTML = dpdDogsPage.content
soup = BeautifulSoup(dpdDogsHTML, 'html.parser')
data = []
table = soup.find('table')
rows = table.find_all('tr')
jsonfile = open('predictions/dpdRankings.json', 'w')

for row in rows:
    cols = row.find_all('td')
    cols = [ele.text.strip() for ele in cols]
    data.append([ele for ele in cols if ele])


with open("dpdRankings.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(data)

