
$(document).ready(function() {


    $("#adSlots").on("click", ".adSlotsList", (function (e) {

        $("#providersMap").show().siblings("div").hide();
        console.log($(this).parents("tr").find("td:first").text());

        var scriptElement = document.createElement('script');
        scriptElement.src = "http://localhost:5666/getProvidersMap?callback=displayProvidersMap&adID=" + $(this).parents("tr").find("td:first").text();
        document.head.appendChild(scriptElement);

    }));

    $("#adSlots").on("click",".editValues",(function (e) {

        //console.log($(this).parents("tr").find(".updateInput"));
        $("#adSlotsModal .adSlotID ").text($(this).parents("tr").find("td:first").text());
        $("#adSlotsModal .adSlotSizeHeight").attr('value',($(this).parents("tr").find('td:nth-child(3)').text()));
        $("#adSlotsModal .adSlotSizeWidth").attr('value',($(this).parents("tr").find('td:nth-child(4)').text()));
        $("#adSlotsModal .adSlotName").attr('value',($(this).parents("tr").find('td:nth-child(5)').text()));
        $("#adSlotsModal .adSlotDivID").attr('value',($(this).parents("tr").find('td:nth-child(6)').text()));



    }));
    $("#adSlotsModal .modal-body .btn").click(function (e) {

        var adSlot={'name':$("#adSlotsModal .adSlotName").val().toString(),'size_height':($("#adSlotsModal .adSlotSizeHeight").val().toString()),'adID':($("#adSlotsModal .adSlotID").text()),'size_width':($("#adSlotsModal .adSlotSizeWidth").val().toString()),'divID':($("#adSlotsModal .adSlotDivID").val().toString())};


        var scriptElement = document.createElement('script');
        scriptElement.src = "http://localhost:5666/updateAdSlot?callback=done&adSlots="+JSON.stringify(adSlot);
        document.head.appendChild(scriptElement);

    })

});

    function getAdSlots(publisherID){

        var scriptElement = document.createElement('script');
        scriptElement.src = "http://localhost:5666/getAdSlots?callback=displayAdSlots&publisherID="+publisherID;
        document.head.appendChild(scriptElement);


    }




    window.displayAdSlots=function(response){

        var trHTML = '';
        for(var f=0;f<response.length;f++) {
            trHTML += '<tr>' +
                '<td><strong>' + response[f]['adID']+'</strong></td>' +
                '<td>'+response[f]['publisherID'] +'</span></td>' +
                '<td>'+response[f]['size_height']+'</td>' +
                '<td>'+response[f]['size_width']+'</td>' +
                '<td>'+response[f]['name']+'</td>' +
                '<td>'+response[f]['divID']+'</td>' +
                '<td><a href="#" class="adSlotsList">Show providers</a></td>' +
                '<td><a href="#" class="editValues" data-toggle="modal" data-target="#adSlotsModal">edit</a></td>' +
                '</tr>';
        }
        console.log(response);
        $('#adSlots .table tbody').replaceWith(trHTML);
    }

