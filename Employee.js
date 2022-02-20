function selectOptiononEntitlementType(executionContext){

    var formContext = executionContext.getFormContext();

    var canBeUsed = formContext.getAttributes("hbz_canbeused").getValue();

    if(canBeUsed == true)
    {
        Xrm.WebApi.retrieveMultipleRecords("hbz_entitlementtype", "?$select=hbz_canbeused &$filter= hbz_canbeused eq "+true).then(successCallback, errorCallback);

            function successCallback(result) {
                // console.log(result);
                if (result != null) {
                   
                }
               
            }
            function errorCallback(error) {
                console.log(error);
            }

        }

    }  
    
