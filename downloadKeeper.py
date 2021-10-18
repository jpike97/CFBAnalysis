import requests as rs
import csv
import pandas as pd
import sys

csvUrlWeek7 = "https://docs.google.com/spreadsheets/u/1/d/1dHc0i6CSE8WLt0gszO49nsPGfaluquV3aUd1SE0L8Bw/export?format=csv&id=1dHc0i6CSE8WLt0gszO49nsPGfaluquV3aUd1SE0L8Bw&gid=1120809762"

csv_url= sys.argv[1]
res=rs.get(url=csv_url)
open('keeperLines.csv', 'wb').write(res.content)