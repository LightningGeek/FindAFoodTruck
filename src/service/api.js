import req from "../utils/request";

export function getFoodTruckList(url,method,data){
    return req({
        url: url,
        method: method,
        params: data,
    })
}