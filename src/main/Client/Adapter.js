moduleManager.addModule("Adapter",["AuctionManager","BidsResponseLog"],function(auctionManager,bidsResponseLog){

    var adSlotIDs;
    function getBids()
    {


        var requestData={};
        try {


            adSlotIDs = Object.keys(config.providersMap);
            //console.log(adSlotIDs);
            //console.log('you');
            var requestArray = [];
            for (var i = 0, size = adSlotIDs.length; i < size; i++) {


                var providerIDs = Object.keys(config.providersMap[adSlotIDs[i]]);
                for (var j = 0, arraySize = providerIDs.length; j < arraySize; j++) {

                    var requestObject = {};
                    requestObject.adID = adSlotIDs[i];
                    requestObject.epc = config.providersMap[adSlotIDs[i]][providerIDs[j]].epc;
                    requestObject.entryPoint = config.providers[providerIDs[j]].entryPoint;
                    requestObject.prID = config.providers[providerIDs[j]].id;
                    //console.log(config.adSlots[adSlotIDs[i]]);
                    //console.log((config.adSlots[adSlotIDs[i]]).size_height);
                    requestObject.size_height = (config.adSlots[adSlotIDs[i]]).size_height;

                    requestArray.push(requestObject);
                }


            }
            // console.log(requestArray);
            requestData['config'] = requestArray;
            requestData['callback'] = 'moduleManager.getModule("Adapter").handleResponse';
            var scriptElement = document.createElement('script');
            scriptElement.src = "http://localhost:9666/getBids?config=" + JSON.stringify(requestData);
            //scriptElement.textContent=auctionManager.addBids(bidsData);
            document.head.appendChild(scriptElement);
        }
        catch(err){

        }


    }

    function handleResponse(response){

        console.log(response);
        var bidsDetail={};
        for(var i=0,size=response.length;i<size;i++){

            if(!(response[i].adID in bidsDetail)){

                bidsDetail[response[i].adID]=[];

            }
            //console.log(config.providersMap[response[i].adID][response[i].prID].revShare);

           // console.log(response[i].bid);
            //response[i].bid=response[i].bid-(config.providersMap[response[i].adID][response[i].prID].revShare*response[i].bid);
            bidsDetail[response[i].adID].push(response[i]);


        }
        auctionManager.addBids(bidsDetail);



    }

    return{

        getBids:getBids,
        handleResponse: handleResponse
    }



});
