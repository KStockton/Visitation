/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const BASE_URL = "https://api.teleport.org/api/urban_areas/";
const serviceAccount = require("./serviceAccountKey.json");
const URBAN_AREAS_KEY = require("./constants");
const crypto = require("crypto");
const cors = require("cors")({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://visitation-37a9b-default-rtdb.firebaseio.com",
});

const db = admin.database();

exports.setupServer = functions.https.onRequest((req, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Credentials", "true");
  cors(req, response, async () => {
    const cleanUrbanAreaList = (list) => {
      return list.slice(0, 30).map((city) => {
        const hyphen = "-";
        if (city.name.includes(",")) {
          const splitCityName = city.name.split(",").join("");
          city.name = splitCityName.replace(" ", hyphen);
        }
        if (city.name.includes(" ")) {
          city.name = city.name.replace(" ", hyphen);
        }
        const lowerCaseCityName = city.name.toLowerCase();
        return lowerCaseCityName;
      });
    };

    const combineUrbanAreaData = (urbanImages, urbanAreas) => {
      return urbanImages.reduce((acc, urbanImage) => {
        urbanAreas.forEach((urbanArea) => {
          const urbanImageSelfLink = urbanImage.data._links["self"].href
            .split("/images")
            .join("");

          if (urbanImageSelfLink === urbanArea.data._links["self"].href) {
            acc.push({
              id: crypto.randomUUID(),
              name: urbanArea.data.name,
              country: urbanArea.data._links["ua:countries"][0].name,
              visited: false,
              image: urbanImage.data.photos[0].image.web,
            });
          }
        });
        return acc;
      }, []);
    };

    try {
      const urbanAreaListResponse = await axios.get(BASE_URL);
      const urbanAreaList = cleanUrbanAreaList(
        urbanAreaListResponse.data._links[URBAN_AREAS_KEY]
      );
      // seperated for readability
      const urbanAreaDataResponse = await Promise.all(
        urbanAreaList.map((city) => axios.get(`${BASE_URL}/slug:${city}/`))
      );

      Promise.all(
        urbanAreaDataResponse.map((city) =>
          axios.get(`${BASE_URL}teleport:${city.data.ua_id}/images`)
        )
      ).then((urbanAreaImagesResponse) => {
        const combinedData = combineUrbanAreaData(
          urbanAreaImagesResponse,
          urbanAreaDataResponse
        );
        const ref = db.ref("cities/");
        combinedData.forEach((city) => {
          const cityRef = ref.child(`${city.id}`);
          cityRef.set({ ...city, timestamp: new Date().toISOString() });
        });
      });
      response.status(200).sendText("success");
    } catch (err) {
      if (err.response) {
        const { status, statusText } = err.response;
        response.status(status).send(statusText);
      }
    }
  });
});
