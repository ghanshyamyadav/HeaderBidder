moduleManager.addModule("Core",["AuctionManager","SlotAuction","AdapterManager","Adapter","LogManager","RenderedAdLog"],function(auctionManager,slotAuction,adapterManager,adapter,logManager,renderedAdLog){



    var winnersDetail={};
    function execute(){

        //var auctionManager=AuctionManager(SlotAuction);
        auctionManager.registerAuctions(config);
        //var adapterManager=AdapterManager(auctionManager,Adapter);
        adapterManager.execute();


        setTimeout(displayAds,1000,auctionManager);
        setTimeout(logManager.addLogToServer,2000);


    }

    function displayAds(auctionManager){

        winnersDetail=auctionManager.returnWinners();
        var adIDs=Object.keys(winnersDetail);
       // console.log(adIDs);
        for(var i=0;i<adIDs.length;i++)
        {

            var destination=window.document.getElementById(adIDs[i]);
          //  console.log(destination);
            console.log(winnersDetail[adIDs[i]].adCode);
            destination.src=winnersDetail[adIDs[i]].adCode;
            console.log(destination.src);
            renderedAdLog.addRenderedAdLog(winnersDetail[adIDs[i]]);
           // destination.contentWindow.document.getElementsByTagName("body")[0].appendChild(winnersDetail[i].url);

        }




    }

    return{

        execute:execute,
        //displayAds:displayAds
    }








});
var core=(moduleManager.getModule("Core"));//(moduleManager.getModule("AuctionManager"),moduleManager.getModule("SlotAuction"),moduleManager.getModule("AdapterManager"),moduleManager.getModule("Adapter"));
core.execute();
