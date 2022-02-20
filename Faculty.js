function DisplayContactType(executionContext){
    var formContext = executionContext.getFormContext();

    var contactOnFaculty = formContext.getAttribute("hbz_contact_faculty").getValue();
    if (contactOnFaculty != null){
        var IdOnContact= contactOnFaculty[0].id.replace('{','').replace("}",'');
        Xrm.WebApi.retrieveRecord("contact", IdOnContact,"?$select=hbz_type").then(
        function success(result) {
            if(result != null)
            {
           var typeoFContact = result.hbz_type;
           if(typeoFContact != null && typeoFContact == 1)
           {
            formContext.getAttribute("hbz_contacttype").setValue(1);

           }
           else if(typeoFContact != null && typeoFContact==2)
           {
            formContext.getAttribute("hbz_contacttype").setValue(2);

           }
           else if(typeoFContact != null && typeoFContact==3)
           {
            formContext.getAttribute("hbz_contacttype").setValue(3);
           }
           else {
            formContext.getAttribute("hbz_contacttype").setValue(null);
           }
        }

        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    }
}

function OnClickCertRibbonButton(primaryControl){

    var formContext = primaryControl;

    var facultyName = formContext.getAttribute("hbz_name").getValue();
    var facultyId = formContext.data.entity.getId().replace('{','').replace('}','');

   
    
        
    /*var data =
    {
        "hbz_name": facultyName,
        "hbz_award": 2,
        "hbz_entername": facultyName,
        "hbz_faculty@odata.bind" : "/hbz_faculty(" + facultyId + ")"
        
    }*/

    var entity = {};
    entity["hbz_Faculty@odata.bind"] = "/hbz_faculties("+ facultyId +")";
    entity.hbz_award = 2;
    entity.hbz_name = facultyName;
    
    Xrm.WebApi.online.createRecord("hbz_certificate", entity).then(
        function success(result) {
            var newEntityId = result.id;
            Xrm.Utility.alertDialog("Certificate has been Created Successfully!!!!");
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );

/*Xrm.WebApi.createRecord("hbz_certificate", data).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
        alert("Update Successsfull")
            },
    function (error) {
        console.log(error.message);
        }
);*/

}

function ChangeFacultyStatus(executionContext){
    var formContext = executionContext.getFormContext();
    var startDate = formContext.getAttribute("hbz_startdate").getValue();
    var endDate = formContext.getAttribute("hbz_enddate").getValue();

    var presentDate = new Date();

    if(startDate < presentDate && endDate < presentDate)
    {
        formContext.getAttribute("statecode").setValue(1);
    }
    }
