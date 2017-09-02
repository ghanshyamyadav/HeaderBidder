moduleManager.addModule("BidsResponseLog",["LogModule"],function func(logModule) {


    var logs=[];



    function  addLog(bidsDetail){

        var log=createLogObject(bidsDetail);
        logs.push(log);
    }

    function createLogObject(bidDetails){

        var log={};
        log.adID=bidDetails.adID;
        log.prID=bidDetails.prID;
        log.bid=bidDetails.bid;
        log["NO BID"]=bidDetails["NO BID"];
        log['timeStamp']=new Date().getTime();
        return log;
    }


    function getLogs(){

        return (logs) ;
    }

    return{


        getLogs:getLogs,
        addLog:addLog

    }

});