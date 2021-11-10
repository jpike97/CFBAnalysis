import requests as rs
import csv
import pandas as pd
import sys

csvUrlWeek10 = "https://docs.google.com/spreadsheets/u/1/d/1ASjhocYU2ElqS3ZwbWXZtaRp0M7GRi_AX3Jiq3hkC_w/export?format=csv&id=1ASjhocYU2ElqS3ZwbWXZtaRp0M7GRi_AX3Jiq3hkC_w&gid=1587350818"

csv_url= sys.argv[1]
res=rs.get(url=csv_url)
open('keeperLines.csv', 'wb').write(res.content)