// Validate the add blog fields
$("#add-blog").on("click", function(){
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
        $("#" + field + "Helper").append("<small class='hideOnSubmit'>This field is required.</small>")
        return event.preventDefault();;
    };
};

