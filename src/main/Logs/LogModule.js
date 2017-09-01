moduleManager.addModule("LogModule",[],function LogModule(){

    function createLogObject(bidDetails){

        var log={};
        log.adID=bidDetails.adID;
        log.prID=bidDetails.prID;
        log.bid=bidDetails.bid;
        log["NO BID"]=bidDetails["NO BID"];
        log['timeStamp']=new Date().getTime();
        return log;
    }

    return LogModule;


});