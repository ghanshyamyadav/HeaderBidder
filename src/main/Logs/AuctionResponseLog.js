moduleManager.addModule("AuctionResponseLog",["LogModule"],function (logModule) {


    var logs=[];

    function addAuctionTimeoutFlag(bidDetails) {
        var log=createLogObject(bidDetails);
        log.statusFlag=1;
        logs.push(log);
    }

    function addAuctionParticipatedLog(bidDetails) {


        var log=createLogObject(bidDetails);
        log.statusFlag=2;
        logs.push(log);


    }

    function addAuctionWinnerLog(bidDetails) {

        var log=createLogObject(bidDetails);
        log.statusFlag=3;
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

        addAuctionTimeoutLog:addAuctionTimeoutFlag,
        addAuctionParticipatedLog:addAuctionParticipatedLog,
        addAuctionWinnerLog:addAuctionWinnerLog,
        getLogs:getLogs

    }

});