$(document).ready(function() {


    $("#providersMap").on("click",".editValues",(function (e) {

        //console.log($(this).parents("tr").find(".updateInput"));
        $("#providersMapModal .providersMapID ").text($(this).parents("tr").find("td:nth-child(6)").text());
        $("#providersMapModal .providersMapRevShare").attr('value',($(this).parents("tr").find('td:nth-child(3)').text()));
        $("#providersMapModal .providersMapEpc").attr('value',($(this).parents("tr").find('td:nth-child(4)').text()));
        $("#providersMapModal .providersMapFloorPrice").attr('value',($(this).parents("tr").find('td:nth-child(5)').text()));



    }));
    $("#providersMapModal .modal-body .btn").click(function (e) {

        var providersMap={'revShare':$("#providersMapModal .providersMapRevShare").val().toString(),'epc':($("#providersMapModal .providersMapEpc").val().toString()),'id':($("#providersMapModal .providersMapID ").text()),'floorPrice':($("#providersMapModal .providersMapFloorPrice").val().toString())};


        var scriptElement = document.createElement('script');
        scriptElement.src = "http://localhost:5666/updateProvidersMap?callback=done&providersMap="+JSON.stringify(providersMap);
        document.head.appendChild(scriptElement);

    })
});


    window.displayProvidersMap=function(response){

    var trHTML = '';
    for(var f=0;f<response.length;f++) {
        trHTML += '<tr>' +
            '<td><strong>' + response[f]['adID']+'</strong></td>' +
            '<td>'+response[f]['prID'] +'</span></td><td>'+response[f]['revShare']+'</td>' +
            '<td>'+response[f]['epc']+'</td>' +
            '<td>'+response[f]['floorPrice']+'</td>' +
            '<td>'+response[f]['id']+'</td>' +
            '<td><a href="#" class="providersMapList"></a></td>' +
            '<td><a href="#" class="editValues" data-toggle="modal" data-target="#providersMapModal">edit</a></td>' +
            '</tr>';
    }
    console.log(response);
    $('#providersMap .table tbody').replaceWith(trHTML);
}