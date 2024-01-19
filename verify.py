import json

o = 'marketplace_old.json'
n = 'marketplace_new.json'

odata = []
ndata = []
integris_count = 0

def search(ins_id, name, data):
  return [element for element in data if element['id'] == ins_id and element['meta']['name'] == name]

with open(o, 'r') as file:
  odata = json.load(file)

with open(n, 'r') as file:
  ndata = json.load(file)
  
for datapoint in odata:
  result = search(datapoint['id'], datapoint['meta']['name'], ndata)
  if len(result) == 1:
    #print('Verified '+datapoint['id'])
    integris_count+=1
  else:
    print(f'Unaccounted {datapoint["meta"]["name"]} {datapoint["id"]}')

print('')
print(f'Old data inscriptions: {len(odata)}')
print(f'New data matched: {integris_count}')
print(f'New data total inscriptions: {len(ndata)}')

if (len(odata) == integris_count):
  print(f'New data is good, added inscriptions: {(len(ndata)-len(odata))}')