
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
  cors(req, response, async () => {
    const cleanUrbanAreaList = (list) => {
      return list.slice(0, 30).map((city) => {
        const name = city.name
          .replace(/,/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase();
        return name;
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
      const { data } = await axios.get(BASE_URL);
      console.log("data", data);
      const urbanAreaList = cleanUrbanAreaList(data._links[URBAN_AREAS_KEY]);

      const urbanAreaDataResponse = await Promise.all(
        urbanAreaList.map((city) => axios.get(`${BASE_URL}/slug:${city}/`))
      );

      const urbanAreaImagesResponse = await Promise.all(
        urbanAreaDataResponse.map((city) =>
          axios.get(`${BASE_URL}teleport:${city.data.ua_id}/images`)
        )
      );

      const combinedData = combineUrbanAreaData(
        urbanAreaImagesResponse,
        urbanAreaDataResponse
      );

      const citiesRef = db.ref("cities/");
      combinedData.forEach((city) => {
        const cityRef = citiesRef.child(`${city.id}`);
        cityRef.set({ ...city, timestamp: new Date().toISOString() });
      });

      response.status(200).sendText("success");
    } catch (error) {
      if (error.response) {
        const { status, statusText } = error.response;
        response.status(status).send(statusText);
      }
    }
  });
});
