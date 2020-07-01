$(document).ready(function() {
	console.log("in doc ready");

	$.ajax({
		type: "GET", url: "https://www.duotuan.ca/data/dgLogOut.php", dataType: "json", success: getLogData
	});



});

function getLogData(data) {
	if(data.success !== "success") {
		$(".logDetails").html("<p>Data not found.</p>");
		return;
	}


	createLogTable();
	createLogTableContent(data);
}

function createLogTable() {
	$("#logHeader").append(`<th>Time</th><th>URLs</th>`);
}

function createLogTableContent(data) {
	let timeRecord = new Array();
	for (let item of data.data) {
		if (!timeRecord.includes(item.epochSec)) {
			timeRecord.push(item.epochSec);
			var d = new Date(0);
			d.setUTCSeconds(item.epochSec);
			let fixedMin = d.getMinutes() <= 9? "0" + d.getMinutes(): d.getMinutes();
			$("#logTable").append(`<tr id=${item.epochSec}><td>${d.getMonth()}.${d.getDate()} ${d.getHours()}:${fixedMin}</td><td class="logUrl"></td></tr>`);
			$(`#${item.epochSec}`).click(function () {
				selectTime(item.epochSec);
			});
		}
	}

	for (let item of data.data) {
		$(`#${item.epochSec} .logUrl`).append(`${item.primaryURL}<br>`);
	}
}

function selectTime(epoch) {
	localStorage.setItem("epoch", epoch);
	window.location.href = "pages/items.html";
}
