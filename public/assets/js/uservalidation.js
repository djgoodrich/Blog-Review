/**********************************************
USER VALIDATION
**********************************************/

// Validate the add blog form
$("#add-blog").on("click", function(event){
    $(".hideOnSubmit").remove();
    // Gets the ids of all the form inputs
    var ids = $('#addBlogForm input[id]').map(function() {
        return this.id;
      }).get();

    ids.forEach(function(value, index){
        isEmpty(ids[index], event)
    });
});

// Checks that each form value is not empty
function isEmpty(field, event) {
    if( !$("#" + field).val() || ($("#" + field).val().trim() === "") ) {
        $("#" + field + "Helper").append("<small class='hideOnSubmit'>This field is required.</small>");
        return event.preventDefault();
    };
};


// Validate the write/edit review forms
$(document).on("click", "#submit-review-btn", function(event){
    $(".hideOnSubmit").remove();
    if (!$("input[type=radio]:checked")[0]) {
        $("#ratingHelper").append("<small class='hideOnSubmit'>This field is required.</small>");
        event.preventDefault();
    }
    if($("#reviewBody").val()){
        console.log("Review body value: " + $("#reviewBody").val())
    }
    if($("#reviewTitle").val()){
        console.log("Review title value: " + $("#reviewTitle").val())
    }
    $("#reviewTitle").val().trim()
    $("#reviewBody").val().trim()
    if( !$("#reviewTitle").val() && $("#reviewBody").val()) {
        $("#errorMessage").append("<small class='hideOnSubmit'>Please give your review a title (or delete the body).</small><br class='hideOnSubmit'>");
        event.preventDefault();
    };
    if( !$("#reviewBody").val() && $("#reviewTitle").val()) {
        $("#errorMessage").append("<small class='hideOnSubmit'>Please fill out your review with a body (or delete the title).</small><br class='hideOnSubmit'>");
        event.preventDefault();
    };
});