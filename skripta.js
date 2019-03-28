$(document).ready(function () {

	var container = $("#uplate");
	var containerTroskovi = $("#troskovi");
	var containerDobavljaci=$("#container-dobavljaci");

	const formatter = new Intl.NumberFormat('sr-SR', {
		style: 'currency',
		currency: 'RSD',
		minimumFractionDigits: 2
	})


	$.ajax({

			url: 'getLastDate.php',

			type: 'GET',

		})

		.done(function (msg) {

			console.log(msg);
			if (msg === 'false') {
				container.empty();
				containerTroskovi.empty();
				$("#greskaContainer").html('<div  class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Nema podataka za izabrani datum!</span></div>')

			} else {
				createTable(msg);
			}

		})

		.fail(function () {

			alert("Desila se greska!");

		})

		//Placanja po dobavljacima
		$.ajax({

			url: 'placanjaDobavljaciLast.php',

			type: 'GET',

		})

		.done(function (msg) {

			console.log(msg);
			if (msg === 'false') {				
				containerDobavljaci.empty();
				
			} else {
				createTableDobavljaci(msg);
			}

		})

		.fail(function () {

			alert("Desila se greska!");

		})


	$('#prikazi').on('click', function (e) {

		e.preventDefault();

		containerDobavljaci.empty();
		$("#poslednjiUnos").hide();
		$("#greskaContainer").empty();
		

		var datum = $('#datum').val();

		$.ajax({

				url: 'view_finansijski.php',

				type: 'POST',

				data: {
					'datum': datum
				}

			})

			.done(function (msg) {

				console.log(msg);
				if (msg === 'false') {
					container.empty();
					containerTroskovi.empty();
					$("#greskaContainer").html('<div  class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Nema podataka za izabrani datum!</span></div>')

				} else {
					createTable(msg);
				}


			})

			.fail(function () {

				alert("Desila se greska!");

			})


			$.ajax({

				url: 'placanjaDobavljaci.php',
	
				type: 'POST',

				data: {
					'datum': datum
				}
	
			})
	
			.done(function (msg) {
	
				console.log(msg);
				if (msg === 'false') {				
					containerDobavljaci.empty();
					
				} else {
					createTableDobavljaci(msg);
				}
	
			})
	
			.fail(function () {
	
				alert("Desila se greska!");
	
			})


	});

	function createTable(data) {

		$('#datum').val('');
		obj = JSON.parse(data)

		console.log(obj.stanje);

		container.empty();
		containerTroskovi.empty();


		var table = $("<table/>").addClass("table table-bordered table-striped");

		var tableHeader = $("<thead><tr class='table- warning'><th colspan='2'>Uplate za " + extractDate(obj.datum) + " </th></tr><thead>");

		var tableBody = $("<tbody/>");

		table.append(tableHeader);


		tableBody.append("<tr><td class='col-md-3'>Predhodno stanje </td><td>" + formatter.format(obj.stanje) + "</td></tr>");
		tableBody.append("<tr><td class='col-md-3'>Priliv od RFZO </td><td class='col-md-2'>" + formatter.format(obj.uplateRFZO) + "</td></tr>");
		tableBody.append("<tr><td class='col-md-3'>Priliv od participacije </td><td class='col-md-2'>" + formatter.format(obj.participacija) + "</td></tr>");
		tableBody.append("<tr><td class='col-md-3'>Ostali prilivi </td><td class='col-md-2'>" + formatter.format(obj.ostaleUplate) + "</td></tr>");
		tableBody.append("<tr><td class='col-md-3'>Prenos za platu </td><td class='col-md-2'>" + formatter.format(obj.prenosPlate) + "</td></tr>");
		
		var tableTroskovi = $("<table/>").addClass("table table-bordered table-striped");

		var troskoviHeader = $("<thead><tr class='table- warning'><th colspan='2'>Plaćanja za " + extractDate(obj.datum) + " </th></tr><thead>");

		var troskoviBody = $("<tbody/>");

		tableTroskovi.append(troskoviHeader);

		troskoviBody.append("<tr><td class='col-md-3'>Plate </td><td class='col-md-2'>" + formatter.format(obj.plate) + "</td></tr>");
		troskoviBody.append("<tr><td class='col-md-3'>Jubilarne nagrade </td><td class='col-md-2'>" + formatter.format(obj.jubilarne) + "</td></tr>");
		troskoviBody.append("<tr><td class='col-md-3'>Otpremnine </td><td class='col-md-2'>" + formatter.format(obj.otpremnine) + "</td></tr>");
		troskoviBody.append("<tr><td class='col-md-3'>Povrat više trebovanih sredstava za plate </td><td class='col-md-2'>" + formatter.format(obj.povratPlate) + "</td></tr>");
		troskoviBody.append("<tr><td class='col-md-3'>Bolovanje </td><td class='col-md-2'>" + formatter.format(obj.bolovanje) + "</td></tr>");
		


		table.append(tableBody);
		tableTroskovi.append(troskoviBody);	
		container.append(table);		
		containerTroskovi.append(tableTroskovi);

	}

	function createTableDobavljaci(data) {

		containerDobavljaci.empty();
		var arrayOfObjects = eval(data);
		
		var table = $("<table/>").addClass("table table-bordered table-striped");

		var tableHeader = $("<thead><tr class='table- warning'><th>Namena</th><th>Dobavljač</th><th>Iznos</th><th>Datum</th></tr><thead>");
		var tableBody = $("<tbody/>");

		table.append(tableHeader);

		for (let i = 0; i < arrayOfObjects.length; i++) {
			
			tableBody.append("<tr><td class='col-md-4'>" + arrayOfObjects[i].tip + "</td><td class='col-md-4'>" + arrayOfObjects[i].dobavljac + "</td><td class='col-md-2'>" + formatter.format(arrayOfObjects[i].iznos) + "</td><td class='col-md-2'>" + extractDate(arrayOfObjects[i].datum) + "</td></tr>");
			table.append(tableBody);
		}

		
		containerDobavljaci.append(table);		
		

	}



	function extractDate(a) {
		"use strict";
		var input, day, month, year;		
		input = a.split("-");
		day = input[2];
		month = input[1];
		year = input[0];

		return (day + "." + month + "." + year);
	}

});