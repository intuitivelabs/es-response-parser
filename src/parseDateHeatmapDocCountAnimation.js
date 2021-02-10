/*
special parse function for dateheatmap (4 agg) chart with doc_count instead of value field
*/
export default function parseDateHeatmapDocCountAnimation(response) {

    if (response.aggregations && response.aggregations.agg && response.aggregations.agg.buckets && response.aggregations.agg.buckets) {
        var heatmapDataParse = response.aggregations.agg.buckets;
        var heatmapDataFinal = [];
        var heatmapDataInner = [];

        //make a list of all distinc values from attr1 and attr2
        var attr1List = [];
        var attr2List = [];
        for (var i = 0; i < heatmapDataParse.length; i++) {
            for (var j = 0; j < heatmapDataParse[i].agg.buckets.length; j++) {
                if(heatmapDataParse[i].agg.buckets[j].key){
                    if(!attr1List.includes(heatmapDataParse[i].agg.buckets[j].key)){
                        attr1List.push(heatmapDataParse[i].agg.buckets[j].key);
                    }
                }
                if(heatmapDataParse[i].agg.buckets[j].agg2.buckets[0] && heatmapDataParse[i].agg.buckets[j].agg2.buckets[0].key){
                    if(!attr2List.includes(heatmapDataParse[i].agg.buckets[j].agg2.buckets[0].key)){
                        attr2List.push(heatmapDataParse[i].agg.buckets[j].agg2.buckets[0].key);
                    }
                }
            }
        }
        //limit 15 values
        attr1List = attr1List.slice(0, 15);
        attr2List = attr2List.slice(0, 15);
        //create matrix with all empty values to keep the same order of attributes
        for (var l = 0; l < attr1List.length; l++) {
            for (var m = 0; m < attr2List.length; m++) {
                heatmapDataInner.push({
                    attr1: attr1List[l],
                    attr2: attr2List[m],
                    value: -1
                });
            }
        }

        var heatmapDataInnerEmpty = JSON.parse(JSON.stringify(heatmapDataInner));  
        //add real values
        for ( i = 0; i < heatmapDataParse.length; i++) {
            for ( j = 0; j < heatmapDataParse[i].agg.buckets.length; j++) {
                if(heatmapDataParse[i].agg.buckets[j].agg2.buckets.length > 0 && heatmapDataParse[i].agg.buckets[j].agg2.buckets[0].doc_count){
                    for (var k = 0; k < heatmapDataInner.length; k++) {
                        if(heatmapDataInner[k].attr1 === heatmapDataParse[i].agg.buckets[j].key && heatmapDataInner[k].attr2 === heatmapDataParse[i].agg.buckets[j].agg2.buckets[0].key){
                            heatmapDataInner[k].value = heatmapDataParse[i].agg.buckets[j].agg2.buckets[0].doc_count;
                            break;
                        }
                    }
                    
                }
                
            }
                    heatmapDataFinal.push({
                        time: heatmapDataParse[i].key,
                        data: heatmapDataInner
                    });
                    heatmapDataInner = JSON.parse(JSON.stringify(heatmapDataInnerEmpty));
        }
        return heatmapDataFinal;
    }
    return "";
}


