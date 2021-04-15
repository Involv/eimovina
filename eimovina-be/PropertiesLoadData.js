var AWS = require("aws-sdk");
const request = require("request-promise").defaults({
  jar: true,
  followAllRedirects: true
})

AWS.config.update({
  region: "eu-central-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

async function main() {
  const result = await scrapeData()

  let mappedData = mapData(result)

  putToDynamoDb(mappedData)
}

function putToDynamoDb(properties) {
  properties.forEach(function (property) {
    docClient.put(property, function (err, data) {
      if (err) {
        console.error("Unable to add property. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("PutItem succeeded");
      }
    });
  });
}

function mapData(data) {
  let params = []
  data.forEach(function (item) {
    params.push(mapProperties(item.searchResult))
  });

  return params
}

function mapProperties(data) {
  let params = {
    TableName: "eimovina-be-dev-PropertyTable-13945OFDRGG8G",
    Item: {
      id: String(Date.now()),
      realEstateListNumber: "",
      plotNumber: "",
      address: "",
      rightHolders: [],
      plotParts: [],
      objects: [],
      loans: [],
      municipalityId: "",
      submunicipalityId: ""
    }
  }
  for (const property in data) {
    params.Item.realEstateListNumber = data["list"].broj_lista,
    params.Item.plotNumber = data["list"].broj_parcele || "",
    params.Item.address = data["deloviParcela"].rows[0].adresa,
    params.Item.rightHolders = mapRightHolders(data["vlasniciZemljista"].rows),
    params.Item.plotParts = mapPlotParts(data["deloviParcela"].rows),
    params.Item.objects = mapObjects(data["objekti"].rows),
    params.Item.loans = mapLoans(data["tereti"].rows),
    params.Item.municipalityId = data["list"].oznaka_kat_opstine,
    params.Item.submunicipalityId = data["list"].oznaka_kat_opstine
  }

  return params
}

function mapRightHolders(data) {
  result = []
  data.forEach(function (item) {
    result.push({
      name: item.imePrezime,
      rightsScope: item.udeo,
      rightsType: item.vrstaPrava
    })
  })

  return result
}

function mapPlotParts(data) {
  result = []
  data.forEach(function (item) {
    result.push({
      usagePurpose: item.nacinKoriscenja,
      address: item.address,
      area: item.povrsina,
      buildingNumber: item.broj,
      entryDate: item.regdate,
      basisOfAcquisition: item.osnov,
      income: item.prihod,
      plan: item.plan,
      sketch: item.skica
    })
  })

  return result
}

function mapObjects(data) {
  result = []
  data.forEach(function (item) {
    result.push({
      usagePurpose: item.nacinKoriscenja,
      objectNumber: item.broj,
      roomCount: item.soba,
      address: item.adresa,
      buildingNumber: item.buildingid,
      area: item.povrsina,
      storey: item.spratnost,
      basisOfAcquisition: item.osnov
    })
  })

  return result
}

function mapLoans(data) {
  result = []
  data.forEach(function (item) {
    result.push({
      usagePurpose: item.nacinKoriscenja,
      loanNumber: item.brojTereta,
      buildingNumber: item.buildingid,
      serialNumber: item.nss,
      description: "",
    })
  })

  return result
}

async function scrapeData() {
  let searchResult = []
  await request.get('https://ekatastar.me/ekatastar-web/action/elogin')
  await request.post(
    'https://ekatastar.me/ekatastar-web/action/login',
    {
      form: {
        username: 'KORISNIK',
        password: 'KORISNIK',
        opstinaSchema: 'KNZ_PODGORICA',
        nazivIzabraneOpstine: 'Podgorica'
      }
    }
  )

  for (let plotNumber = 1000; plotNumber < 1003; plotNumber++) {
    await request.post(
      'https://ekatastar.me/ekatastar-web/action/search/ajax/katastarNepokretnosti',
      {
        form: {
          opstinaId: 16,
          nazivOpstine: 'PODGORICA',
          katastarskaOpstinaId: 55,
          nazivKatastarskeOpstine: 'PODGORICA III',
          searchCriteria: 1,
          list: plotNumber,
          brojParcele: null
        }
      })
      .then((res) => {
        searchResult.push(JSON.parse(res))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return searchResult
}

main()