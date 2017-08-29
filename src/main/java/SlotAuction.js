moduleManager.addModule("SlotAuction",[], function(){


    return (function() {
        var isAuctionClosed = true;
        var _timer = 0;
        var adID;
        var bidReceived = 0;
        var bidsDetail = [];
        var winnerBidDetais = {};


        function registerAuction(adid) {

            adID = adid;
            setTimeout(closeAuction, 900);
            isAuctionClosed = false;

        }


        function closeAuction() {

            isAuctionClosed = true;
            performAuction();

        }

        function addBid(bidDetails) {

            if (!isAuctionClosed) {

                bidDetails.bid=parseInt(bidDetails.bid);

                if(bidsDetail["NO BID"] || bidDetails.bid<config.providersMap[bidDetails.adID][bidDetails.prID].floorPrice)
                {

                    return;
                }
                bidDetails.bid=bidDetails.bid-(config.providersMap[bidDetails.adID][bidDetails.prID].revShare*bidDetails.bid);
                bidsDetail.push(bidDetails);

                console.log(bidDetails);
                bidReceived++;
            }


        }

        var performAuction = function () {


            //this.winnerBid=
            var maxBid = {};

            if (bidsDetail.length > 0) {
                maxBid = bidsDetail[0];
                //maxBid.bid=0;
                for (var i = 0; i < bidsDetail.length; i++) {
                    maxBid = (maxBid.bid > bidsDetail[i].bid) ? maxBid : bidsDetail[i];
                    //console.log(bidsDetail[i]);
                }
            }
            winnerBidDetais = maxBid;

        }

        function getWinnerBidDetails() {

            return winnerBidDetais;

        }

        return {

            registerAuction: registerAuction,
            addBid: addBid,
            getWinnerBidDetails: getWinnerBidDetails

        }
    });


});