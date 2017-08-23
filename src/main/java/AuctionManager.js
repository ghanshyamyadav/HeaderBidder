moduleManager.addModule("AuctionManager",function (SlotAuction){

    var slotAuctions={};
    var config;
    var winnerBids={};


    function registerAuctions(configParameter) {

        config=configParameter;
        for(var i=0;i<config.adSlots.length;i++){

            if(config.adSlots[i].adID in slotAuctions)
            {
                continue;

            }
            slotAuctions[config.adSlots[i].adID]=SlotAuction();
            slotAuctions[config.adSlots[i].adID].registerAuction(config.adSlots[i].adID);


        }


    }

    function addBids(bidsDetail){


        var adIDs=Object.keys(bidsDetail);
        console.log(adIDs);
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





