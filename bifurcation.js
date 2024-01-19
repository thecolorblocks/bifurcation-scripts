// Paste this code in console
// Run in browser

const provenanceUrl = 'https://ordinals.com/content/510943bf4a282e3100a50b6030324d0cf763d49b2b0d195708259bb5fbaaaf39i0'
const baseUrlOptions = {
  'luminex': 'https://brc20-api.luminex.io/ordinals/hash?payload_hash=',
  'ordinalsbot': 'https://api.ordinalsbot.com/search?hash='
}
const provider = 'ordinalsbot'
const baseUrl = baseUrlOptions[provider]

const problematics = [
  '4191cdb4677658c97cbfb77819a1ac4e6435066994b6dcee9907d14e8c2f51b3i0'
]

const verify = async (hash) => {
  console.log('verifying '+hash)
  return await (await window.fetch(baseUrl+hash)).json()
}

function downloadJsonFile(data, filename) {
  var jsonData = JSON.stringify(data, null, 2);
  var blob = new Blob([jsonData], { type: 'application/json' });
  var a = document.createElement('a');
  a.download = filename || 'download.json';
  a.href = window.URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

let marketplace = []

const provenance = await (await window.fetch(provenanceUrl)).json()
const collection = provenance.collection

for (let i = 0; i < collection.length; i++){
  //if (i > 1) break
  await new Promise(resolve => setTimeout(resolve, 1000))
  const r = await verify(collection[i].sha256_hash)
  console.log(r)
  if (provider == 'luminex') {
    if (r.data.ids.length > 0) {
      marketplace.push({
        id: r.data.ids[0],
        meta: {
          name: collection[i].name
        }
      })
    }
  }
  if (provider == 'ordinalsbot') {
    if (r.results.length > 0) {
      if (!r.results[0].inscriptionnumber) {
        marketplace.push({
          id: r.results[0].txid+'i0',
          meta: {
            name: collection[i].name
          }
        })
      } else {
        marketplace.push({
          id: r.results[0].inscriptionid,
          meta: {
            name: collection[i].name
          }
        })
      }
    }
  }
}

// Check for ordinalsbot un-indexed inscriptions


downloadJsonFile(marketplace, `marketplace.json`)