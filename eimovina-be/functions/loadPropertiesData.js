import AWS from "aws-sdk";

import fetch from "node-fetch";
import FormData from "form-data";

AWS.config.update({
  region: "eu-central-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const municipality = {
  id: 16,
  name: "PODGORICA",
  submunicipalityId: 55,
  submunicipalityName: "PODGORICA III",
};

export const main = async (event) => {
  const result = await scrapeData();
  const mappedData = mapData(result);
  putToDynamoDb(mappedData);
};

const putToDynamoDb = properties => {
  properties.forEach(async (property) => {
    await docClient.put(property, (err, data) => {
      if (err) {
        console.error("Unable to add property. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("PutItem succeeded ", property);
      }
    });
  });
};

const mapData = data => {
  const params = [];
  data.forEach(item => params.push(mapProperties(item.searchResult)));
  return params;
};

const mapProperties = data => {
  const {list, deloviParcela} = data;

  let plotPartsCount = 0;
  if (deloviParcela && deloviParcela.rows) {
    plotPartsCount = deloviParcela.rows.length;
  }

  let plotNumber = "";
  if (list.broj_parcele && list.broj_parcele.trim()) {
    plotNumber = list.broj_parcele.trim();
  } else if (!plotNumber && plotPartsCount > 0) {
    plotNumber = deloviParcela.rows[0].broj;
  }

  let address = "";
  if (plotPartsCount > 0) {
    address = deloviParcela.rows[0].adresa;
  }

  const municipalityId = list.poid || "";
  const submunicipalityId = list.koid || "";
  const realEstateListNumber = list.broj_lista || "";
  const id = `${municipalityId}/` +
  `${submunicipalityId}/` +
  `${realEstateListNumber}`;

  const params = {
    TableName: process.env.PROPERTIES_TABLE,
    Item: {
      id,
      realEstateListNumber,
      plotNumber: plotNumber || "",
      address: address || "",
      rightHolders: mapRightHolders(data.vlasniciZemljista.rows) || [],
      plotParts: mapPlotParts(deloviParcela.rows) || [],
      objects: mapObjects(data.objekti.rows) || [],
      loans: mapLoans(data.tereti.rows) || [],
      municipalityId,
      municipalityName: municipality.name || "",
      submunicipalityId,
      submunicipalityName: list.naziv_kat_opstine || "",
    }
  };

  return params;
};

const mapRightHolders = data => {
  const result = [];
  data.forEach(item => {
    result.push({
      name: item.imePrezime || "",
      rightsScope: item.udeo || "",
      rightsType: item.vrstaPrava || ""
    });
  });

  return result;
};

const mapPlotParts = data => {
  const result = [];
  data.forEach(item => {
    result.push({
      usagePurpose: item.nacinKoriscenja || "",
      address: item.address || "",
      area: item.povrsina || "",
      buildingNumber: item.broj || "",
      entryDate: item.regdate || "",
      basisOfAcquisition: item.osnov || "",
      income: item.prihod || "",
      plan: item.plan || "",
      sketch: item.skica || "",
    });
  });

  return result;
};

const mapObjects = data => {
  const result = [];
  data.forEach(item => {
    result.push({
      usagePurpose: item.nacinKoriscenja || "",
      objectNumber: item.pd || "",
      roomCount: item.soba || "",
      address: item.adresa || "",
      buildingNumber: item.redniBroj || "",
      area: item.povrsina || "",
      storey: item.spratnost || "",
      basisOfAcquisition: item.osnov || ""
    });
  });

  return result;
};

const mapLoans = data => {
  const result = [];
  data.forEach(item => {
    result.push({
      usagePurpose: item.nacinKoriscenja || "",
      loanNumber: item.brojTereta || "",
      buildingNumber: item.redniBroj || "",
      serialNumber: item.ns || "",
      description: item.opis || "",
    });
  });

  return result;
};

const scrapeData = async () => {
  const loginResp = await fetch("https://ekatastar.me/ekatastar-web/action/elogin", { method: 'GET'});
  const cookie = loginResp.headers.raw()['set-cookie'];

  const loginForm = new FormData();
  loginForm.append('username', 'KORISNIK');
  loginForm.append('password', 'KORISNIK');
  loginForm.append('opstinaSchema', 'KNZ_PODGORICA');
  loginForm.append('nazivIzabraneOpstine', 'Podgorica');

  await fetch(
    "https://ekatastar.me/ekatastar-web/action/login",
    {
      method: 'POST',
      body: loginForm,
      headers: {
        cookie
      },
    }
  );

  const searchResult = [];
  for (let plotNumber = 1000; plotNumber < 1003; plotNumber++) {
    try {
      const form = new FormData();
      form.append('opstinaId', municipality.id);
      form.append('nazivOpstine', municipality.name);
      form.append('katastarskaOpstinaId', municipality.submunicipalityId);
      form.append('nazivKatastarskeOpstine', municipality.submunicipalityName);
      form.append('searchCriteria', 1);
      form.append('list', plotNumber);
      const resp = await fetch(
        "https://ekatastar.me/ekatastar-web/action/search/ajax/katastarNepokretnosti",
        {
          method: 'POST',
          body: form,
          headers: {
            cookie
          },
        }
      );
      const data = await resp.json();
      searchResult.push(data);
    } catch(err) {
      console.log(err);
    }
  }

  return searchResult;
};
