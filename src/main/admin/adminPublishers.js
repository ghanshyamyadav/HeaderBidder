
$(document).ready(function() {
$("#addPublishers").click(function (e) {
//do what ever you want..
    //$("#home").hide();
    $("#newPublisher").show().siblings("div").hide();

});
$("#showPublishers").click(function (e) {
//do what ever you want..
    //$("#home").hide();
    $("#publishers").show().siblings("div").hide();
    getPublishers();
});


$("#newPublisher").find(".btn").click(function (e) {

    addPublisher();

});


$("#publishers").on("click",".publishersList",(function (e) {

    $("#adSlots").show().siblings("div").hide();
    console.log($(this).parents("tr").find("td:first").text());

    var scriptElement = document.createElement('script');
    scriptElement.src = "http://localhost:5666/getAdSlots?callback=displayAdSlots&publisherID="+$(this).parents("tr").find("td:first").text();
    document.head.appendChild(scriptElement);

}));
$("#publishers").on("click",".editValues",(function (e) {

    //console.log($(this).parents("tr").find(".updateInput"));
    $("#publishersModal .publisherID ").text($(this).parents("tr").find("td:first").text());
    $("#publishersModal .publisherName").attr('value',($(this).parents("tr").find('td:nth-child(2)').text()));
    $("#publishersModal .publisherisActive").attr('value',($(this).parents("tr").find('td:nth-child(3)').text()));


}));


$("#publishersModal .modal-body .btn").click(function (e) {

    var publisher={'name':$("#publishersModal .publisherName").val().toString(),'isActive':($("#publishersModal .publisherIsActive").is(':checked') || 0),'id':($("#publishersModal .publisherID").text())};
    console.log($("#publishersModal .publisherID").text);

    var scriptElement = document.createElement('script');
    scriptElement.src = "http://localhost:5666/updatePublisher?callback=done&publisher="+JSON.stringify(publisher);
    document.head.appendChild(scriptElement);

});


});

function getPublishers() {



    var scriptElement = document.createElement('script');
    scriptElement.src = "http://localhost:5666/getPublishers?callback=displayPublishers";
    document.head.appendChild(scriptElement);



}
function addPublisher() {

    var scriptElement = document.createElement('script');

    var publisher={'name':$("#newPublisher .publisherName").val().toString(),'isActive':($("#newPublisher .publisherIsActive").is(':checked') || 0)};
    console.log(publisher);
    scriptElement.src = "http://localhost:5666/addPublisher?callback=done&publisher="+JSON.stringify(publisher);
    document.head.appendChild(scriptElement);

}

window.displayPublishers=function(response) {

    var trHTML = '';
    for(var f=0;f<response.length;f++) {
        trHTML += '<tr>' +
            '<td><strong>' + response[f]['id']+'</strong></td>' +
            '<td><input value="" class="updateInput">'+response[f]['name'] +'</td>' +
            '<td><input value="" class="updateInput">'+response[f]['isActive']+'</td>' +
            '<td>'+response[f]['divID']+'</td>' +
            '<td><a href="#" class="publishersList">Show adSlots</a></td>' +
            '<td><a href="#" class="editValues" data-toggle="modal" data-target="#publishersModal">edit</a></td>' +
            '</tr>';
    }
    console.log(response);
    $('#publishers .table tbody').html(trHTML);
    $(".updateInput").css("display","none");


}