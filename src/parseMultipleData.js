/*
data: 
[ 
[name, value1, value2, value3],
[name2, value1, value2, value3],
]

*/
export default function parseMultipleData(response) {
    if (response && response.aggregations && response.aggregations.agg && response.aggregations.agg.buckets) {
        var dataParse = response.aggregations.agg.buckets;
        var dataFinal = [];

        for (var j = 0; j < dataParse.length; j++) {
            let values = [];
            if (dataParse[j].agg.value) {
                values.push({ value0: dataParse[j].agg.value });
            }
            if (dataParse[j].agg2 ) {
                values.push({ value1: dataParse[j].agg2.value })
            }
            if (dataParse[j].agg3) {
                values.push({ value2: dataParse[j].agg3.value })
            }
            if (dataParse[j].agg4 ) {
                values.push({ value3: dataParse[j].agg4.value })
            }
            if (dataParse[j].agg6 ) {
                values.push({ value4: dataParse[j].agg6.value / 100 })
            }
            dataFinal.push({
                name: dataParse[j].key,
                value0: dataParse[j].agg.value,
                value1: dataParse[j].agg2.value,
                value2: dataParse[j].agg3.value,
                value3: dataParse[j].agg4.value,
                value4: dataParse[j].agg6.value/100
            });
        }
        return dataFinal;
    }
    return "";
}


