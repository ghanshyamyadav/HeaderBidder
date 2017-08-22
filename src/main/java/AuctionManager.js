moduleManager.addModule("AuctionManager",function (slotAuction){

    var slotAuctions={};
    var config;



    function registerAuctions(configParameter) {

        config=configParameter;
        for(var i=0;i<config.adSlots.length;i++){

            if(!(config.adSlots.adID in slotAuctions))
            {
                slotAuctions[config.adSlots[i].adID]=slotAuction();

            }

            slotAuctions[config.adSlots[i].adID].registerAuction(adID);
        }


    }

    function addBids(bidsDetail){


        for(var i=0;i<bidsDetail.length;i++){

            slotAuctions[bidsDetail[i].adID].addBid(bidsDetail[i]);
        }


    }


    function returnWinners(){


        for(var i=0;i<config.adSlots.length;i++){

            slotAuctions[config.adSlots[i].adID].getWinnerBid();


        }

    }


    return {

        registerAuctions: registerAuctions,
        addBids: addBids,
        returnWinners: returnWinners

    }
});





