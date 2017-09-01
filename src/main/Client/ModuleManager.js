var moduleManager= (function ModuleManager(){

    var _modules={};

    function getModule(moduleName){

       return _modules[moduleName];

    }

    function addModule(moduleName,dependencies,functionBody) {

        for (var i = 0; i < dependencies.length; i++) {
            dependencies[i] = _modules[dependencies[i]];
        }


        _modules[moduleName] = functionBody.apply(functionBody,dependencies);
    }

    /*function setModule(moduleName,dependencies,functionBody){

        for(var i=0;i<dependencies.length;i++)
        {
            dependencies[i]=_modules[dependencies[i]];

        }
        _modules[moduleName]=functionBody.apply(functionBody,dependencies);
    }*/

    return{

        addModule: addModule,
        getModule: getModule
    }
})();

