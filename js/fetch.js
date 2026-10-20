const url = "https://dog.ceo/api/breeds/image/random";


export const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};