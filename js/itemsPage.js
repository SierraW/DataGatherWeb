
$(document).ready(function() {
    console.log("in doc ready");

    let epoch = localStorage.getItem('epoch');
    var d = new Date(0);
    d.setUTCSeconds(epoch);
    $("#dateTime").html(`<h3>record: ${d}</h3>`)

    $.ajax({
        type: "GET", url: `https://www.duotuan.ca/data/dgDataOut.php?epoch=${epoch}`, dataType: "json", success: loadData
    });



});

function loadData(data) {
    let sessions = [];
    for (let item of data.data) {
        if (!sessions.includes(item.session)) {
            sessions.push(item.session);
            $("#itemContent").append(`<div id="${item.session}" class="contentRow"><h3>${item.primaryURL}</h3></div>`);
        }
        $(`#${item.session}`).append(
            `
            <div class="cell">
            <h4>${item.name}</h4>
            <h5>价格：${item.price}</h5>
            <p>销量：${item.salesRecord}</p>
            </div>
            `
        );
    }
}
