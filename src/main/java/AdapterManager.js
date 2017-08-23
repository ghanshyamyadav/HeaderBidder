moduleManager.addModule("AdapterManager",function(auctionManager,Adapter){


    function execute() {

        var adapter = Adapter(auctionManager);
        adapter.getBids();



    }

    return{
        execute: execute
    }


});
