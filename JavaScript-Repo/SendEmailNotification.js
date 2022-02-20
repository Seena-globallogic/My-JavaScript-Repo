function updateContactVerified(executionContext) {
    var formContext = executionContext.getFormContext();

    var fieldcontactVerified = formContext.getControl("new_contactverified");
    var uniqueIdParam;

    if (formContext.data.attributes.parameter_verificationcode != null && formContext.data.attributes.parameter_verificationcode != undefined) {
        uniqueIdParam = formContext.data.attributes.parameter_verificationcode;
    }
    if (uniqueIdParam != undefined && uniqueIdParam != null) {
        formContext.getAttribute("new_contactverified").setValue("Yes");
    }
}
function setContactVerified(executionContext) {
    var formContext = executionContext.getFormContext();

    var fieldcontactVerified = formContext.getControl("cnu_contactuniquecode");
    var yesorNo = formContext.getControl("new_contactverified").getValue();

    if (fieldcontactVerified != undefined && fieldcontactVerified != null) {
        var formatedid = formContext.data.entity.getId().replace('{', '').replace('}', '');
        if (fieldcontactVerified.getValue() == formatedid.toLowerCase() && yesorNo !== "Yes") {
            formContext.getAttribute("new_contactverified").setValue("Yes");
        }
    }
}
function OnLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var formType = formContext.ui.getFormType();
    if (formType == 1) {
        formContext.getAttribute("new_contactverified").setValue("No");

    }

}
function onsave(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("new_contactverified").setValue("Yes");
}
