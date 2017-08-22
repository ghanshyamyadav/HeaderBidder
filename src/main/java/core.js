moduleManager.addModule("Core",function(AuctionManager,AdapterManager,SlotAuction,Adapter){




    function execute(){

        var auctionManager=AuctionManager(SlotAuction);
        auctionManager.registerAuctions(config);

    }








});
