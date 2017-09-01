


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