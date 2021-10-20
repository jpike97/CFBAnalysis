import csv
import json
import os

csvfile = open('keeperLines.csv', 'r')
jsonfile = open('predictions/keeperPredictions.json', 'w')
jsonfile.write('[')
fieldnames = ("EmptyCol", "Favorite","Underdog","spread","O/U")
reader = csv.DictReader(csvfile, fieldnames)

for row in reader:
    print (row)
    json.dump(row, jsonfile)
    jsonfile.write(',')

jsonfile.write('{}]')