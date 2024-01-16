// Paste this code in console
// Run in browser

const provenanceUrl = 'https://ordinals.com/content/510943bf4a282e3100a50b6030324d0cf763d49b2b0d195708259bb5fbaaaf39i0'
const baseUrl = 'https://brc20-api.luminex.io/ordinals/hash?payload_hash='

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
  await new Promise(resolve => setTimeout(resolve, 1000))
  const r = await verify(collection[i].sha256_hash)
  if (r.data.ids.length > 0) {
    marketplace.push({
      id: r.data.ids[0],
      meta: {
        name: collection[i].name
      }
    })
  }
}

downloadJsonFile(marketplace, `marketplace.json`)