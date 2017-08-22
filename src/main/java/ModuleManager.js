var moduleManager= (function ModuleManager(){

    var _modules={};

    function getModule(moduleName){

       return _modules[moduleName];

    }

    function setModule(moduleName,functionBody) {

        _modules[moduleName] = functionBody;
    }

    /*function setModule(moduleName,dependencies,functionBody){

        for(var i=0;i<dependencies.length;i++)
        {
            dependencies[i]=_modules[dependencies[i]];

        }
        _modules[moduleName]=functionBody.apply(functionBody,dependencies);
    }*/

    return{

        setModule: setModule,
        getModule: getModule
    }
})();