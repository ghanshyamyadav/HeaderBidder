$(document).ready(function() {

    $("#addProviders").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#providers").show().siblings("div").hide();
    });
    $("#showProviders").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#providers").show().siblings("div").hide();
    });
    $("#addPublishers").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#publishers").show().siblings("div").hide();
    });
    $("#showPublishers").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#publishers").show().siblings("div").hide();
        getPublishers();
    });

    $("#adminHome").click(function (e) {
//do what ever you want..
        //$("#home").hide();
        $("#home").show().siblings("div").hide();
    });



    function getPublishers() {


       /* $.get("http://localhost:5666/getPublishers",function (response) {
            response = JSON.parse(response);
            var trHTML = '';
            for(var f=0;f<response.length;f++) {
                trHTML += '<tr><td><strong>' + response[f]['id']+'</strong></td><td>'+response[f]['name'] +'</span></td><td>'+response[f]['isActive']+'</td></tr>';
            }
            console.log(response);
            $('#publishersTable').html(trHTML);

        });*/

        $.ajax({
            type: 'GET',
            url: "/getPublishers",
            dataType: 'jsonp/text',
           // data: JSON.stringify(),

            useDefaultXhrHeader: false,
            crossDomain: true,
            success: function (response) {
                response = JSON.parse(response);
                var trHTML = '';
                for(var f=0;f<response.length;f++) {
                    trHTML += '<tr><td><strong>' + response[f]['id']+'</strong></td><td>'+response[f]['name'] +'</span></td><td>'+response[f]['isActive']+'</td></tr>';
                }
                console.log(response);
                $('#publishersTable').html(trHTML);

            },
            error: function (xhr, status) {

                console.log(xhr);
            }
        });

    }


});