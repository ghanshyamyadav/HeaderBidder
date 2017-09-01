moduleManager.addModule("RenderedAdLog",["LogModule"],function (logModule) {


    var logs=[];
    this.__proto__=logModule;

    function addRenderedAdLog(bidDetails) {


        var log={};
        log.adID=bidDetails.adID;
        log.prID=bidDetails.prID;
        log.bid=bidDetails.bid;
        log['timeStamp']=new Date().getTime();
        logs.push(log);

    }




    function getLogs(){

        return logs;
    }

    return{

        addRenderedAdLog:addRenderedAdLog,
        getLogs:getLogs

    }

});