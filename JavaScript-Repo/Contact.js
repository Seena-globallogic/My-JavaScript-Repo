function StudentCountInContact(executionContext){

    var formContext = executionContext.getFormContext();
    
         Xrm.WebApi.retrieveMultipleRecords("new_student","?$select=new_name,_ch_contact_value&$filter=_ch_contact_value eq 862c7f0c-41d4-eb11-bacc-002248210631").then(
         function success(result) {
             if(result != null )
         
                 //console.log(result.value.length);
                 formContext.getAttribute("ch_count").setValue(result.value.length);
             },                  
             
         
         function (error) {
             console.log(error.message);
             
         }
     );}


