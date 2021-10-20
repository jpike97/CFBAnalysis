import csv
import json
import os

csvfile = open('dpdRankings.csv', 'r')
jsonfile = open('predictions/dpdRankings.json', 'w')
jsonfile.write('[')
fieldnames = ("Ranking", "Team", "Score")
reader = csv.DictReader(csvfile, fieldnames)

for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',')

jsonfile.write('{}]')