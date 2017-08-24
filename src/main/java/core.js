moduleManager.addModule("Core",function(AuctionManager,SlotAuction,AdapterManager,Adapter){



    var winnersDetail={};
    function execute(){

        var auctionManager=AuctionManager(SlotAuction);
        auctionManager.registerAuctions(config);
        var adapterManager=AdapterManager(auctionManager,Adapter);
        adapterManager.execute();

        setTimeout(displayAds,1000,auctionManager);


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
           // destination.contentWindow.document.getElementsByTagName("body")[0].appendChild(winnersDetail[i].url);

        }




    }

    return{

        execute:execute
    }








});
