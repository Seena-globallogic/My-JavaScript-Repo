Constants = {
    formContext : null
}

function OnLoad(executionContext){
    Constants.formContext = executionContext.getFormContext();
    IsTutionNeeded();
    StudentCountInContact();
    UpdateCountOfStudentInOrderEntity();
    UpdateCountOfStudentInAccountEntity();
    StudentEmailFromContact();
    SwitchBPFForStudent();

}

function OnSave(executionContext){
    Constants.formContext = executionContext.getFormContext();
    
}

/*********Is Tutuion Needed Function****************************************** */
function IsTutionNeeded(){
     var formContext = Constants.formContext;
    // formContext.getAttribute("reddy_tutions").setRequiredLevel("none");
    if(formContext.getAttribute("reddy_percentage").getValue()<=50){
        formContext.getAttribute("reddy_tutions").setRequiredLevel("required");
     formContext.getControl("reddy_applysc").setVisible(false);
    }
    else {formContext.getAttribute("reddy_tutions").setRequiredLevel("none");
    formContext.getControl("reddy_applysc").setVisible(true);}
}
/* Function to update the Contact Entity  *****************************************************************/
function StudentCountInContact(){
    formContext = Constants.formContext;
    var contactLookUp = formContext.getAttribute("ch_contact").getValue();
if(contactLookUp != null){
   var contactId = contactLookUp[0].id.replace('{','').replace('}','');
    Xrm.WebApi.retrieveMultipleRecords("new_student","?$select=_ch_contact_value&$filter=_ch_contact_value eq " + contactId).then(
        function success(result) {
            if(result != null){
                var data = {
                    "ch_numberofstudents" : result.entities.length
                        }
                formContext.getAttribute("ch_count").setValue(result.entities.length);
                Xrm.WebApi.updateRecord("contact" ,contactId,data).then(
                function success(){
                        console.log("Record Updated");
                },
                function (error){
                    console.log(error.message);
                }
            
            );
            }
        },
        function (error) {
            console.log(error.message);
           
        }
    );}
}

/* Function to update the Order Entity  *****************************************************************/
function UpdateCountOfStudentInOrderEntity()
{
formContext = Constants.formContext;
var orderLookup = formContext.getAttribute("reddy_order_new").getValue();
if(orderLookup != null){
    var orderID = orderLookup[0].id.replace('{','').replace('}','');
    Xrm.WebApi.retrieveMultipleRecords("new_student","?$select=_reddy_order_new_value&$filter=_reddy_order_new_value eq " + orderID).then(
        function success(result) {
            if(result!=null)
            {
                var orderData = {
                    "reddy_countofstudent" : result.entities.length
                }

                Xrm.WebApi.updateRecord("salesorder", orderID, orderData).then(
                    function success(result) {
                        console.log("Account updated");
                        
                    },
                    function (error) {
                        console.log(error.message);
                        
                    }
                );

            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

}
}
/* Function to update the Account Entity  *****************************************************************/
function UpdateCountOfStudentInAccountEntity()
{
formContext = Constants.formContext;
var accountLookup = formContext.getAttribute("reddy_accounts").getValue();
if(accountLookup != null){
    var accountID = accountLookup[0].id.replace('{','').replace('}','');
    Xrm.WebApi.retrieveMultipleRecords("new_student","?$select=_reddy_accounts_value&$filter=_reddy_accounts_value eq " + accountID).then(
        function success(result) {
            if(result!=null)
            {
                var accountData = {
                    "reddy_noofstudents" : result.entities.length
                }
                formContext.getAttribute("reddy_studentcount").setValue(result.entities.length)
                Xrm.WebApi.updateRecord("account", accountID, accountData).then(
                    function success(result) {
                        console.log("Account updated");
                        
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

}
}
/*********** Populate the Email ID from contact Entity into Student************** */
function StudentEmailFromContact(){
    formContext= Constants.formContext;

    var contactForEmailLookup = formContext.getAttribute("ch_contact").getValue();
    if(contactForEmailLookup!= null)
    {
    var contactIDFOrEmail = contactForEmailLookup[0].id.replace('{','').replace('}','');
    Xrm.WebApi.retrieveRecord("contact", contactIDFOrEmail, "?$select=emailaddress1").then(
        function success(result) {
            if(result!= null){
            console.log(" Email of the Student" + result.emailaddress1);
            formContext.getAttribute("ch_email").setValue(result.emailaddress1);
                       }
        },
        function (error) {
            console.log(error.message);
                  }
    );
    }
}

/*******Switching BPF On Student Entity ON a Condition of Percentage  */

function SwitchBPFForStudent(){
    formContext = Constants.formContext;

    var percentage = formContext.getAttribute("hbz_percentage").getValue();

   // var BPFId1 = b935CFBE8-4D53-4D1B-96C4-BAFA67381ECC

    if(percentage > 50)
    {
        formContext.data.process.setActiveProcess("7508BE1D-4E05-465B-A736-BF202ADF527B");
    }
    else{
        formContext.data.process.setActiveProcess("935CFBE8-4D53-4D1B-96C4-BAFA67381ECC");
    }

}

