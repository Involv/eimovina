const AWS = require("aws-sdk")
const request = require("request-promise").defaults({
  jar: true,
  followAllRedirects: true
})

AWS.config.update({
  region: "eu-central-1",
})

const docClient = new AWS.DynamoDB.DocumentClient()

const municipality = {
  id: 16,
  name: "PODGORICA",
  submunicipalityId: 55,
  submunicipalityName: "PODGORICA III",
}

const main = async () => {
  const result = await scrapeData()
  const mappedData = mapData(result)
  putToDynamoDb(mappedData)
}

const putToDynamoDb = properties => {
  properties.forEach(async (property) => {
    await docClient.put(property, (err, data) => {
      if (err) {
        console.error("Unable to add property. Error JSON:", JSON.stringify(err, null, 2))
      } else {
        console.log("PutItem succeeded ", property)
      }
    })
  })
}

const mapData = data => {
  const params = []
  data.forEach(item => params.push(mapProperties(item.searchResult)))
  return params
}

const mapProperties = data => {
  const params = {
    TableName: "eimovina-be-dev-PropertyTable-3Q89I5IQCB3J",
    Item: {
      id: "",
      realEstateListNumber: "",
      plotNumber: "",
      address: "",
      rightHolders: [],
      plotParts: [],
      objects: [],
      loans: [],
      municipalityId: "",
      municipalityName: "",
      submunicipalityId: "",
      submunicipalityName: "",
    }
  }

  const {list, deloviParcela} = data

  let plotNumber = list.broj_parcele?.trim()
  if (!plotNumber && deloviParcela?.rows?.length > 0) {
    plotNumber = deloviParcela.rows[0].broj
  }

  let address = ""
  if (deloviParcela?.rows?.length > 0) {
    address = deloviParcela?.rows[0].adresa
  }

  params.Item.realEstateListNumber = list.broj_lista
  params.Item.plotNumber = plotNumber || ""
  params.Item.address = address
  params.Item.rightHolders = mapRightHolders(data.vlasniciZemljista.rows)
  params.Item.plotParts = mapPlotParts(deloviParcela.rows)
  params.Item.objects = mapObjects(data.objekti.rows)
  params.Item.loans = mapLoans(data.tereti.rows)
  params.Item.municipalityId = list.poid
  params.Item.municipalityName = municipality.name
  params.Item.submunicipalityId = list.koid
  params.Item.submunicipalityName = list.naziv_kat_opstine

  params.Item.id = `${params.Item.municipalityId}/` +
                    `${params.Item.submunicipalityId}/` +
                    `${params.Item.realEstateListNumber}`

  return params
}

const mapRightHolders = data => {
  result = []
  data.forEach(item => {
    result.push({
      name: item.imePrezime,
      rightsScope: item.udeo,
      rightsType: item.vrstaPrava
    })
  })

  return result
}

const mapPlotParts = data => {
  result = []
  data.forEach(item => {
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

const mapObjects = data => {
  result = []
  data.forEach(item => {
    result.push({
      usagePurpose: item.nacinKoriscenja,
      objectNumber: item.pd,
      roomCount: item.soba,
      address: item.adresa,
      buildingNumber: item.redniBroj,
      area: item.povrsina,
      storey: item.spratnost,
      basisOfAcquisition: item.osnov
    })
  })

  return result
}

const mapLoans = data => {
  result = []
  data.forEach(item => {
    result.push({
      usagePurpose: item.nacinKoriscenja,
      loanNumber: item.brojTereta,
      buildingNumber: item.redniBroj,
      serialNumber: item.ns,
      description: item.opis,
    })
  })

  return result
}

const scrapeData = async () => {
  const searchResult = []
  await request.get("https://ekatastar.me/ekatastar-web/action/elogin")
  await request.post(
    "https://ekatastar.me/ekatastar-web/action/login",
    {
      form: {
        username: "KORISNIK",
        password: "KORISNIK",
        opstinaSchema: "KNZ_PODGORICA",
        nazivIzabraneOpstine: "Podgorica"
      }
    }
  )

  for (let plotNumber = 1000; plotNumber < 1003; plotNumber++) {
    try {
      const resp = await request.post(
        "https://ekatastar.me/ekatastar-web/action/search/ajax/katastarNepokretnosti",
        {
          form: {
            opstinaId: municipality.id,
            nazivOpstine: municipality.name,
            katastarskaOpstinaId: municipality.submunicipalityId,
            nazivKatastarskeOpstine: municipality.submunicipalityName,
            searchCriteria: 1,
            list: plotNumber,
            brojParcele: null
          }
        }
      )
      searchResult.push(JSON.parse(resp))
    } catch(err) {
      console.log(err)
    }
  }

  return searchResult
}

main()
