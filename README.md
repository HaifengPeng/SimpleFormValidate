SimpleFormValidate
==================

a jquery plugin for form validation


usage
$("#sample-form").SimpleFormValidate();
or if you like config the rule like this:
$("#sample-form").SimpleFormValidate({password : {rule:/^([\w]){4,}$/,warning:'应为4位以上的数字或字母'}});
