$(document).ready(function () {

    $("#containerTip").css("display","none");
    var tempDatum;

    $.ajax({

            url: 'getTip.php',

            type: 'GET',

        })

        .done(function (msg) {

            if (msg === 'false') {

                alert('Doslo je do greske!')

            } else {
                var arrayOfObjects = eval(msg);
                var select = $("#tip");
                for (let i = 0; i < arrayOfObjects.length; i++) {
                    select.append("<option value = " + arrayOfObjects[i].id + ">" + arrayOfObjects[i].tip + "</option>");
                }
            }

        })

        .fail(function () {

            alert("Desila se greska!");

        })



    $("#unosForma").submit(function (event) {

        event.preventDefault();

        $('#greska').empty();
        $('#potvrda').empty();

        var datum = $('#datum').val();
        tempDatum = $('#datum').val();
        var form = this;
        var json = $(form).serializeArray();

        var returnjson = {};

        $.each(json, function () {
            returnjson[this.name] = this.value;
        });

        proveriDatum(returnjson, datum, getData, potvrda);

    });



    function potvrda(data) {

        if (data === "ok") {

            window.scrollTo(0, 0);

            $('#potvrda').empty()

            $('#potvrda').html('<div  class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>Uspešno kreiran finansijski izveštaj</span></div>');


        } else {

            window.scrollTo(0, 0);

            $('#greska').empty()

            $('#greska').html('<div  class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Došlo je do greške!</span></div>');


        }

    }


    function proveriDatum(returnjson, datum, getData, potvrda) {

        $.ajax({
                url: 'view_finansijski.php',
                type: 'POST',
                data: {
                    'datum': datum
                }
            })
            .done(function (msg) {

                if (msg === 'false') {

                    getData(returnjson, potvrda)
                } else {

                    window.scrollTo(0, 0);

                    $('#greska').empty()

                    $('#greska').html('<div  class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Već postoji izveštaj za izabrani datum!</span></div>');
                }


            })
            .fail(function () {
                alert("Desila se greska!");
            });
    }

    function getData(returnjson, potvrda) {
        $.ajax({
                url: 'create.php',
                type: 'POST',
                data: returnjson
            })
            .done(function (data) {
                potvrda(data);
                $('#unosForma')[0].reset();
                $("#containerTip").css("display","block");
                $("#container-uplate").css("display","none");
                $("#container-placanja").css("display","none");

            })
            .fail(function () {
                alert("Desila se greska!");
            });
    }


    $("#unosTipa").submit(function (event) {

        event.preventDefault();

        var tip = $('#tip').val();
        var dobavljac = $('#dobavljac').val();
        var iznos = $('#iznos').val();
        

        sendData = {

            Dobavljac : dobavljac,
            Iznos : iznos,
            Datum :tempDatum,
            Tip_utroska : tip

        };

        console.log(sendData);

        $.ajax({
            url: 'createTip.php',
            type: 'POST',
            data: sendData
        })
        .done(function (data) {
            potvrda(data);
            $('#dobavljac').val('');
            $('#iznos').val('');
        })
        .fail(function () {
            alert("Desila se greska!");
        });


    })

});