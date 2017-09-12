// Validate the add blog fields
$("#add-blog").on("click", function(){
    $(".hideOnSubmit").remove();
    var ids = $('#addBlogForm input[id]').map(function() {
        return this.id;
      }).get();
    console.log(ids);
    ids.forEach(function(value, index){
        isEmpty(ids[index], event)
    });
});

function isEmpty(field, event) {
    if( !$("#" + field).val() || ($("#" + field).val().trim() === "") ) {
        $("#" + field + "Helper").append("<small class='hideOnSubmit'>This field is required.</small>")
        return event.preventDefault();;
    };
}