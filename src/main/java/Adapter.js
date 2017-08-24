moduleManager.addModule("Adapter",function(auctionManager){


    function getBids()
    {

        var bids= {

            "1":[
                {bid:5,"NO BID":false, adCode:"http://localhost:80/Server1/file1.jpg",EPC:1,size:{height:440,width:1284}, providerID: 1},
                {bid:7,"NO BID":false, adCode:"http://localhost/Server1/file1.jpg",EPC:2,size:{height:440,width:1284}, providerID: 2},
                 {bid:8,"NO BID":false, adCode:"http://localhost:80/Server1/file2.jpg",EPC:3,size:{height:440,width:1284}, providerID: 3},
                 {bid:7,"NO BID":false, adCode:"http://localhost/Server1/file1.jpg",EPC:4,size:{height:440,width:1284}, providerID: 4},
                ],
            "2":[
                {bid:5,"NO BID":false, adCode:"http://localhost/Server1/file2.jpg",EPC:1,size:{height:440,width:284}, providerID: 1},
                {bid:7,"NO BID":false, adCode:"http://localhost:80/Server1/file3.jpg",EPC:2,size:{height:440,width:284}, providerID: 2},
                {bid:6,"NO BID":false, adCode:"http://localhost/Server1/file2.jpg",EPC:3,size:{height:440,width:284}, providerID: 3},
                {bid:4,"NO BID":false, adCode:"http://localhost/Server1/file2.jpg",EPC:4,size:{height:440,width:284}, providerID: 4},
            ]

        };
        var requestData=[];
        var adSlotIDs=Object.keys(config.providersMap);
        for(var i=0,size=adSlotIDs.length;i<size;i++){

            var requestObject={};
            requestObject.adID=adSlotIDs[i];
            for(var j=0,arraySize=config.providersMap[adSlotIDs[i]].length;j<arraySize;j++){

                requestObject.epc=config.providersMap[adSlotIDs[i]][j].epc;
                requestObject.entryPoint=config.providers[adSlotIDs[i]].entryPoint;
                requestObject.size=config.adSlots[adSlotIDs[i]].adID;
            }
            requestData.push(requestObject);
        }
        var scriptElement=document.createElement('script');
        scriptElement.src="http://localhost:9666/getBids?config="+requestData;

        auctionManager.addBids(bids);

    }

    return{

        getBids:getBids
    }



});
var core=(moduleManager.getModule("Core"))(moduleManager.getModule("AuctionManager"),moduleManager.getModule("SlotAuction"),moduleManager.getModule("AdapterManager"),moduleManager.getModule("Adapter"));
core.execute();