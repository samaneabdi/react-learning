import axios from "axios";

const apiKey = "sbfHb94ZML5YXYHMl93ejA==wDBJDF3ENKztXz7z";

const client = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/cats",
  headers: {
    "X-Api-Key": apiKey,
    "Content-Type": "application/json",
  },
});
const fetchCats = async (name:string, offset:number) => {
    let searchQuery = "?min_weight=1";
    if (name) {
      searchQuery += `&name=${name}`;
    }
    searchQuery += `&offset=${offset}`;
    const response = await client.get(searchQuery);
    return response.data;
};
export { fetchCats };
