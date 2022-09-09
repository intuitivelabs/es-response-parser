/*
response2 is events rate that is from collectd index and can't be in one query

*/
export default function parseMultipleDataDomains(response, response2, countEvents, hours) {
    if (response && response.aggregations && response.aggregations.agg && response.aggregations.agg.buckets) {
        var dataParse = response.aggregations.agg.buckets;
        var dataParse2 = response2.aggregations.agg.buckets;
        var dataFinal = [];

        for (var j = 0; j < dataParse.length; j++) {
            for (var i = 0; i < dataParse2.length; i++) {
                var rate = 0;
                if(dataParse[j].key === dataParse2[i].key){
                    if (countEvents.hits && countEvents.hits.total && countEvents.hits.total.value && dataParse2[i].agg && dataParse2[i].agg.value) {

                        let total = countEvents.hits.total.value;
                        let contacts = dataParse2[i].agg.value;
                        hours = Math.round(hours * 100) / 100;
                        rate = (total / contacts) / hours;
                    }
                }
            }

            dataFinal.push({
                name: dataParse[j].key,
                value0: rate,
                value1: dataParse[j].agg3.value,
                value2: dataParse[j].agg4.value,
                value3: dataParse[j].agg5.value,
                value5: dataParse[j].agg6.value
            });
        }
        return dataFinal;
    }
    return "";
}


