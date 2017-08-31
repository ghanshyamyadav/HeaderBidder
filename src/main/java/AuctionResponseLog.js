moduleManager.addModule("AuctionResponseLog",["LogModule"],function (logModule) {


    var logs=[];
    this.__proto__=logModule;

    function addAuctionLoserLog(bidDetails) {

        var log=createLogObject(bidDetails);
        log.winnerFlag=false;
        logs.push(log);

    }

    function addAuctionWinnerLog(bidDetails) {

        var log=createLogObject(bidDetails);
        log.winnerFlag=true;
        logs.push(log);


    }

    function createLogObject(bidDetails){

        var log={};
        log.adID=bidDetails.adID;
        log.prID=bidDetails.prID;
        log.bid=bidDetails.bid;
        log['timeStamp']=new Date().getTime();
        return log;
    }

    function getLogs(){

        return logs;
    }

    return{

        addAuctionLoserLog:addAuctionLoserLog,
        addAuctionWinnerLog:addAuctionWinnerLog,
        getLogs:getLogs

    }

});