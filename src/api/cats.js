const apiKey = "sbfHb94ZML5YXYHMl93ejA==wDBJDF3ENKztXz7z";
const url =`https://api.api-ninjas.com/v1/cats?min_weight=1`;
const fetchCats = async (name) => {
    try {
        let searchQuery = "";
        if(name){
            searchQuery += `&name=${name}`
        }
      const response = await fetch(
        url + searchQuery,
        {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result;
    } catch (error) {

      console.error("Error: ", error);
      return [];
    }
  };
export {fetchCats};