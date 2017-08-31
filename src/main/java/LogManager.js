moduleManager.addModule("LogManager",["BidsResponseLog","AuctionResponseLog","RenderedAdLog"],function(bidsResponseLog,auctionResponseLog,renderedAdLog){


    var log={};
    function addLogToServer() {

       log["bidsResponseLog"]=bidsResponseLog.getLogs();
       log["auctionResponseLog"]=auctionResponseLog.getLogs();
       log["renderedAdLog"]=renderedAdLog.getLogs();

       sendLogs();

   }

   function sendLogs(){

       var scriptElement = document.createElement('script');
       scriptElement.src = "http://localhost:5666/addLogs?log=" + JSON.stringify(log);
       console.log(JSON.stringify(log));
       //scriptElement.textContent=auctionManager.addBids(bidsData);
       document.head.appendChild(scriptElement);
       console.log('done');
       log={};

   }

   return{

        addLogToServer:addLogToServer
   }

});