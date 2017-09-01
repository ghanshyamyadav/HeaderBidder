moduleManager.addModule("SlotAuction",["BidsResponseLog","AuctionResponseLog"], function(bidsResponseLog,auctionResponseLog){


    return (function() {
        var isAuctionClosed = true;
        var _timer = 0;
        var adID;
        var bidsReceived = 0;
        var bidsExpected;
        var bidsDetail = [];
        var winnerBidDetais = {};


        function registerAuction(adid) {

            adID = adid;
            bidsExpected=Object.keys(config.providersMap[adID]).length;
            _timer=setTimeout(closeAuction, 1000);
            isAuctionClosed = false;

        }


        function closeAuction() {

            isAuctionClosed = true;
            //bidsResponseLog.addLogToServer();
            performAuction();


        }

        function addBid(bidDetails) {

            if (!isAuctionClosed) {

                bidDetails.bid=parseInt(bidDetails.bid);

                if(bidsDetail["NO BID"] || bidDetails.bid<config.providersMap[bidDetails.adID][bidDetails.prID].floorPrice)
                {


                    bidsResponseLog.addAuctionNotParticipatedLog(bidDetails);
                    return;
                }
                bidDetails.bid=bidDetails.bid-(config.providersMap[bidDetails.adID][bidDetails.prID].revShare*bidDetails.bid);
                bidsDetail.push(bidDetails);

                console.log(bidDetails);
                if(bidsExpected==(++bidsReceived)){

                    clearTimeout(_timer);
                    closeAuction();
                }
                bidsResponseLog.addAuctionParticipatedLog(bidDetails);

            }
            else {


                bidsResponseLog.addAuctionNotParticipatedLog(bidDetails);
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
            auctionResponseLog.addAuctionWinnerLog(winnerBidDetais);

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