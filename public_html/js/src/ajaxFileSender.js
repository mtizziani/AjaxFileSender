/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 // init the ids
var formId = '#sampleForm';
var inputFileFieldId = '#fileField';
var btnSendFormId = '#btnSendForm';

/**
 * eventHandler for a button click
 * @returns {undefined}
 */
function eventBtnClickSendForm(){
    console.log('... triggerde button click for submit the form');
    var button = $(this);
    var buttonType = button.attr('type');
    
    // if the button is no submit button you need to submit the form
    if(buttonType !== undefined && buttonType !== 'submit')
    {
        $('form').submit();
    }
    return;
    
}

/**
 * validate the file, check if the fileType is accepted
 * @param {File} file
 * @returns {Boolean}
 */
function validateFileType(file){
    // set the accepted types
    var accepedFileTypes = [
        'image/jpeg',
        'image/gif'
    ];
    
    //TODO: dont forget to validate the files server sided too for real security
    
    // check if the file is an accepted type
    for(var n = 0; n < accepedFileTypes.length; n++){
        if(file.type === accepedFileTypes[n]){
            return true;
        }
    }
    return false;
}

/**
 * eventHandler for sumbitting a form with files
 * @param {Event} e
 * @returns {undefined}
 */
function submitFileDataForm(e){
    e.preventDefault(); // stop html submit
    console.log('... submit data forced');
    
    // create an empty FormData object
    var data = new FormData();
    
    // add a sample text filed for the post array
    data.append('someTextSample', 'myText');
    
    // fetch the files from the form
    var fileList = this[0].files;
    
    // try to validate the files and push it to the FormData object if file is ok
    for( var i = 0; i < fileList.length; i++ ){
        if(validateFileType(fileList[i])){
            data.append('files[]', fileList[i]);
        } else {
            console.error('FAILURE, ' + fileList[i].name + ' is not supported for Upload!');
        }
    }
    
    // initialize the ajax request
    $.ajax({
        url: 'php/reciever/',
        type: 'POST',
        processData: false,
        contentType: false,
        data: data,
        success: requestSuccess,
        error: requestError
    });
    
    return;
};

/**
 * eventHandler for a successfull request
 * @param {type} result
 * @return {undefined}
 */
function requestSuccess(result){
    console.log('... request successed');
    console.log('result:\n'+result);
    alert("Ihre Dateien wurden erfolgreich an den Server übermittelt.\nDas Formular wird automatisch zurückgesetzt.");
    $(formId)[0].reset();
    return;
};

/**
 * event handler for a request error
 * @param {type} result
 * @returns {undefined}
 */
function requestError(result){
    console.error('... request failed');
    console.error('result:\n'+result);
    
    return;
}

/**
 * starting on document ready, initialize jquery
 */
$(document).ready(function(){
    console.log('... document is ready');
    console.log('... jquery is ready');
    
    // bind functions to nodes
    $(btnSendFormId).click(eventBtnClickSendForm);
    $(formId).submit(submitFileDataForm); 
    
    return;
});

