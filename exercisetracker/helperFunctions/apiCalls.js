const axios = require("axios");

export async function getFilteredExercises(bodyParts, equipment) {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI,
      "X-RapidAPI-Host": NEXT_PUBLIC_EXERCISEHOST,
    },
  };

  let data = undefined;
  let returnData = [];

  axios
    .request(options)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      return error;
    });
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 100; j++) {
      if (data[i][j] === undefined) {
        break;
      }
      if (
        bodyParts.includes(data[i][j].bodyPart) &&
        equipment.includes(data[i][j].equipment)
      ) {
        returnData.push(data[i][j]);
      }
    }
  }
  return returnData;
}


