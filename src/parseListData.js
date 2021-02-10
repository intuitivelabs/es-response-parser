export default function parseListData(response){
    if (response.aggregations && response.aggregations.agg && response.aggregations.agg.buckets && response.aggregations.nested) {
        return [response.aggregations.agg.buckets, response.aggregations.nested.value];
    }
    return ["", ""];
}

function parseIp(response) {
    return parseListData(reponse);
}
