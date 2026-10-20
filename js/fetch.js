const url = "https://dog.ceo/api/breeds/image/random";


export const fetchData = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP-fejl: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Kunne ikke hente data:", error);
        return null;
    }
};