import axios from "axios";

const apiKey = "sbfHb94ZML5YXYHMl93ejA==wDBJDF3ENKztXz7z";

const client = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/cats?min_weight=1",
  headers: {
    "X-Api-Key": apiKey,
    "Content-Type": "application/json",
  },
});
const fetchCats = async (name) => {
    let searchQuery = "";
    if (name) {
      searchQuery += `&name=${name}`;
    }
    const response = await client.get(searchQuery);
    return response.data;
};
export { fetchCats };
