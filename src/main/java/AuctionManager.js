moduleManager.addModule("AuctionManager",["SlotAuction"],function (SlotAuction){

    var slotAuctions={};
    var config;
    var winnerBids={};


    function registerAuctions(configParameter) {

        config=configParameter;
        var adSlots=Object.keys(config.adSlots);
        console.log((adSlots));
        console.log("hi");
        for(var i=0;i<adSlots.length;i++){

            if(config.adSlots[adSlots[i]].adID in slotAuctions)
            {
                continue;

            }
            slotAuctions[adSlots[i]]=SlotAuction();
            slotAuctions[adSlots[i]].registerAuction(adSlots[i]);


        }


    }

    function addBids(bidsDetail){


        var adIDs=Object.keys(bidsDetail);
        console.log(adIDs);
        console.log("hiii");
        for(var i=0;i<adIDs.length;i++){

            for(var j=0;j<bidsDetail[adIDs[i]].length;j++){

                slotAuctions[adIDs[i]].addBid(bidsDetail[adIDs[i]][j]);
                //console.log(bidsDetail[adIDs[i]][j]);

            }

        }


    }


    function returnWinners(){


        var adIDs=Object.keys(slotAuctions);
        console.log(adIDs);
        for(var i=0;i<adIDs.length;i++){

            winnerBids[adIDs[i]]=slotAuctions[adIDs[i]].getWinnerBidDetails();
            console.log(winnerBids[adIDs[i]]);


        }
        return winnerBids;

    }


    return {

        registerAuctions: registerAuctions,
        addBids: addBids,
        returnWinners: returnWinners

    }
});





