moduleManager.addModule("Adapter",["AuctionManager"],function(auctionManager){

    var adSlotIDs;
    function getBids()
    {


        var requestData={};
        adSlotIDs=Object.keys(config.providersMap);
        console.log(adSlotIDs);
        console.log('you');
        var requestArray=[];
        for(var i=0,size=adSlotIDs.length;i<size;i++){


            var providerIDs=Object.keys(config.providersMap[adSlotIDs[i]]);
            for(var j=0,arraySize=providerIDs.length;j<arraySize;j++){

                var requestObject={};
                requestObject.adID=adSlotIDs[i];
                requestObject.epc=config.providersMap[adSlotIDs[i]][providerIDs[j]].epc;
                requestObject.entryPoint=config.providers[adSlotIDs[i]].entryPoint;
                console.log(config.adSlots[adSlotIDs[i]]);
                console.log((config.adSlots[adSlotIDs[i]]).size_height);
                requestObject.size_height=(config.adSlots[adSlotIDs[i]]).size_height;

                requestArray.push(requestObject);
            }


        }
        console.log(requestArray);
        requestData['config']=requestArray;
        requestData['callback']='moduleManager.getModule("Adapter").handleResponse';
        var scriptElement=document.createElement('script');
        scriptElement.src="http://localhost:9666/getBids?config="+JSON.stringify(requestData);
        //scriptElement.textContent=auctionManager.addBids(bidsData);
        document.head.appendChild(scriptElement);


    }

    function handleResponse(response){

        console.log(response);
        var bidsDetail={};
        for(var i=0,size=response.length;i<size;i++){

            if(!(response[i].adID in bidsDetail)){

                bidsDetail[response[i].adID]=[];

            }
            //response[i].
            bidsDetail[response[i].adID].push(response[i]);


        }
        auctionManager.addBids(bidsDetail);



    }

    return{

        getBids:getBids,
        handleResponse: handleResponse
    }



});
