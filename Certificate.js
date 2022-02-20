function AwardsOperation(executionContext){
    var formContext = executionContext.getFormContext();

    formContext.getControl("hbz_student").setVisible(false);
    formContext.getControl("hbz_student_hbz_id").setVisible(false);
    formContext.getControl("hbz_student").setVisible(false);
    formContext.getControl("hbz_student_hbz_id").setVisible(false);
    formContext.getControl("hbz_student").setVisible(false);
    formContext.getControl("hbz_student_hbz_id").setVisible(false);


    if (formContext.getAttribute("hbz_award").getValue() == 1) {
        formContext.getControl("hbz_student").setVisible(true);
        formContext.getControl("hbz_student_hbz_id").setVisible(true);
        formContext.getControl("hbz_employee").setVisible(false);
        formContext.getControl("hbz_employee_hbz_id").setVisible(false);
        formContext.getControl("hbz_faculty").setVisible(false);
        formContext.getControl("hbz_faculty_hbz_id").setVisible(false);
    }
    else if (formContext.getAttribute("hbz_award").getValue() == 2){
        formContext.getControl("hbz_student").setVisible(false);
        formContext.getControl("hbz_student_hbz_id").setVisible(false);
        formContext.getControl("hbz_faculty").setVisible(true);
        formContext.getControl("hbz_faculty_hbz_id").setVisible(true);
        formContext.getControl("hbz_employee").setVisible(false);
        formContext.getControl("hbz_employee_hbz_id").setVisible(false);
    }
    else if (formContext.getAttribute("hbz_award").getValue() == 3){
        formContext.getControl("hbz_student").setVisible(false);
        formContext.getControl("hbz_student_hbz_id").setVisible(false);
        formContext.getControl("hbz_employee").setVisible(true);
        formContext.getControl("hbz_employee_hbz_id").setVisible(true);
        formContext.getControl("hbz_faculty").setVisible(false);
        formContext.getControl("hbz_faculty_hbz_id").setVisible(false);
    }
    }

    
function RetreiveID(executionContext){
    var formContext = executionContext.getFormContext();

    if(formContext.getAttribute("hbz_award").getValue()==2){
            var facultyObject = formContext.getAttribute("hbz_faculty").getValue();
            if(facultyObject != null){


              //   var facultyID = parse.facultyObject[0];
                var facultyID = facultyObject[0].id.replace('{', '').replace('}', '');
                Xrm.WebApi.retrieveRecord("hbz_faculty", facultyID, "?$select=hbz_faulty_hbz_id").then(successCallback, errorCallback);
              //  formContext.retrieveRecord("hbz_faculty", facultyID, "?$select=hbz_faulty_hbz_id").then(successCallback, errorCallback);
                function successCallback(result) {
                    // console.log(result);
                    if (result != null) {
                        formContext.getAttribute("hbz_faculty_hbz_id").setValue(result.hbz_faulty_hbz_id);
                    }
                       }
                function errorCallback(error) {
                    console.log(error);
                }
                    }
                }
        
                  else if( formContext.getAttribute("hbz_award").getValue()==1){
                           var studentObject = formContext.getAttribute("hbz_student").getValue();
                           if(studentObject != null){
                               var studentID = studentObject[0].id.replace('{', '').replace('}', '');
                               Xrm.WebApi.retrieveRecord("hbz_student", studentID, "?$select=hbz_student_hbz_id").then(successCallback, errorCallback);
                               function successCallback(result) {
                                   // console.log(result);
                                   if (result != null) {
                                       formContext.getAttribute("hbz_student_hbz_id").setValue(result.hbz_student_hbz_id);
                                   }
                                      }
                               function errorCallback(error) {
                                   console.log(error);
                 }
             }
        }  else if( formContext.getAttribute("hbz_award").getValue()==3){
            var employeeObject = formContext.getAttribute("hbz_employee").getValue();
            if(employeeObject != null){
                var employeeID = employeeObject[0].id.replace('{', '').replace('}', '');
                Xrm.WebApi.retrieveRecord("hbz_employee", employeeID, "?$select=hbz_employee_hbz_id").then(successCallback, errorCallback);
                function successCallback(result) {
                    // console.log(result);
                    if (result != null) {
                        formContext.getAttribute("hbz_employee_hbz_id").setValue(result.hbz_employee_hbz_id);
                                            }
                       }
                function errorCallback(error) {
                    console.log(error);
                }
            }
}
      }

 function AddFieldIntoEntity(executionContext){
  formContext = executionContext.getFormContext();

if( formContext.getAttribute("hbz_addnewfield").getValue() == 6){
        var studentData = {
        "hbz_name" : formContext.getAttribute("hbz_entername").getValue(),
        "hbz_student_hbz_id" : formContext.getAttribute("hbz_enterid").getValue()
            }

            if( studentData !== null)
            {
    Xrm.WebApi.createRecord("hbz_student", studentData).then(
        function success(result) {
            console.log("Account created with ID: " + result.id);
           alert(" Your Record has been Updated Sucessfully!!!!")
            
        },
        function (error) {
            console.log(error.message);
            
        }
    
    );
  }
 } else if( formContext.getAttribute("hbz_addnewfield").getValue() == 7){
    var facultyData = {
    "hbz_name" : formContext.getAttribute("hbz_entername").getValue(),
    "hbz_faulty_hbz_id" : formContext.getAttribute("hbz_enterid").getValue()
        }

        if( facultyData !== null)
        {
Xrm.WebApi.createRecord("hbz_faculty", facultyData).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
       alert(" Your Record has been Updated Sucessfully!!!!")
        
    },
    function (error) {
        console.log(error.message);
        
    }

);
}
}
}

 var fieldTobeDeleted = null;
function SelectTheEntityToDelete(executionContext){
    
    
    formContext = executionContext.getFormContext();
    if(formContext.getAttribute("hbz_delete").getValue() == 16 ){
        formContext.getControl("hbz_selectstudent").setVisible(true);
        formContext.getControl("hbz_selectfaculty").setVisible(false);
        formContext.getControl("hbz_selectemployee").setVisible(false);
         fieldTobeDeleted = formContext.getAttribute("hbz_selectstudent").getValue ;

    }
else if(formContext.getAttribute("hbz_delete").getValue() == 15){
    formContext.getControl("hbz_selectfaculty").setVisible(true);
        formContext.getControl("hbz_selectstudent").setVisible(false);
        formContext.getControl("hbz_selectemployee").setVisible(false);
        fieldTobeDeleted = formContext.getAttribute("hbz_selectfaculty").getValue ;
}
else if(formContext.getAttribute("hbz_delete").getValue() == 17){
    formContext.getControl("hbz_selectstudent").setVisible(false);
        formContext.getControl("hbz_selectfaculty").setVisible(false);
        formContext.getControl("hbz_selectemployee").setVisible(true);
        fieldTobeDeleted = formContext.getAttribute("hbz_selectemployee").getValue ;
}}

 
function OperateDeleteFunction(executionContext){
            formContext = executionContext.getFormContext();


            
    
    if(formContext.getAttribute("hbz_confirmdelete").getValue() == true){
        var fieldTobeDeleted = formContext.getAttribute("hbz_selectstudent").getValue();
            if(fieldTobeDeleted != null){
            var fieldID = fieldTobeDeleted[0].id.replace('{', '').replace('}', '');
            Xrm.WebApi.deleteRecord("hbz_student", fieldID).then(
    function success() {
        console.log("Account deleted");
        formContext.getControl("hbz_selectstudent").setVisible(false);
        // perform operations on record deletion
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);
            }


    alert("This might be working!!!!!! you want to delete")

}
else  alert(" you have not deleted any record !!!!!")}


function RetrieveMultipleRecords(executionContext){
var formContext = executionContext.getFormContext();
Xrm.WebApi.retrieveMultipleRecords(hbz_student, "$expand=hbz_student", 10).then(successCallback, errorCallback);



}