/*const BASE_URL = "https://ufoodapi.herokuapp.com/unsecure/restaurants/";
    

export async function getRestaurants() {
    const response = await fetch(BASE_URL);
    const json = await response.json();

   // .then((value) => value);
    //console.log("json:" + json);
    return json;
    /*return {
        restaurants : json.items.map(item => ({
         id : item.id,
         name : item.name,
         address: item.address,
         phone : item.tel,
         open_hours : item.opening_hours,
         photos : item.pictures,
         price_min: 0,
         price_max: 0,
         rating: 0,
         visited: 0
       })),
    }
    

}
*/
