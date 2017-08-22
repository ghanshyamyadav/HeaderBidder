moduleManager.addModule("SlotAuction", function(){

    var isAuctionClosed = true;
    var _timer = 0;
    var adID;
    var bidReceived = 0;
    this.bidsDetail = [];
    this.winnerBid={};



    function registerAuction(adid) {

        adID=adid;
        setTimeout(closeAuction,10000);
        isAuctionClosed=false;

    }


    function closeAuction() {

        isAuctionClosed=true;
        performAuction();

    }

    function addBid(bid) {

        bidsDetail.push(bid);
        bidReceived++;

    }

    var performAuction = function () {


        //this.winnerBid=

    }

    function getWinnerBid(){



    }

    return{

        registerAuction:registerAuction,
        addBid: addBid,
        getWinnerBid: getWinnerBid

    }


});