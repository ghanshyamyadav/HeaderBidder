
$(document).ready(function() {


    $("#addProviders").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#newProvider").show().siblings("div").hide();

    });
    $("#showProviders").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#providers").show().siblings("div").hide();
        getProviders();
    });
    $("#newProvider").find(".btn").click(function (e) {

        addProvider();

    });

    $("#providers").on("click",".editValues",(function (e) {

        //console.log($(this).parents("tr").find(".updateInput"));
        $("#providersModal .providerID ").text($(this).parents("tr").find("td:first").text());
        $("#providersModal .providerName").attr('value',($(this).parents("tr").find('td:nth-child(2)').text()));
        $("#providersModal .providerEntryPoint").attr('value',($(this).parents("tr").find('td:nth-child(3)').text()));


    }));
    $("#providersModal .modal-body .btn").click(function (e) {

        var provider={'name':$("#providersModal .providerName").val().toString(),'entryPoint':($("#providersModal .providerEntryPoint").val().toString()),'id':($("#providersModal .providerID").text())};


        var scriptElement = document.createElement('script');
        scriptElement.src = "http://localhost:5666/updateProvider?callback=done&provider="+JSON.stringify(provider);
        document.head.appendChild(scriptElement);

    })

});
    function getProviders(){

    var scriptElement = document.createElement('script');
    scriptElement.src = "http://localhost:5666/getProviders?callback=displayProviders";
    document.head.appendChild(scriptElement);


}

function addProvider() {
    console.log("hi");
    var scriptElement = document.createElement('script');

    var provider={'name':$("#newProvider .providerName").val().toString(),'entryPoint':($("#newProvider .providerEntryPoint").val())};
    console.log(provider);
    scriptElement.src = "http://localhost:5666/addProvider?callback=done&provider="+JSON.stringify(provider);
    document.head.appendChild(scriptElement);

}

window.displayProviders=function(response){

    var trHTML = '';
    for(var f=0;f<response.length;f++) {
        trHTML += '<tr>' +
            '<td><strong>' + response[f]['id']+'</strong></td>' +
            '<td>'+response[f]['name'] +'</span></td>' +
            '<td>'+response[f]['entryPoint']+'</td>' +
            //'<td><a href="#" class="providersList">S</a></td>' +
            '<td><a href="#" class="editValues" data-toggle="modal" data-target="#providersModal">edit</a></td>' +
            '</tr>';
    }
    console.log(response);
    $('#providers .table tbody').html(trHTML);
}
