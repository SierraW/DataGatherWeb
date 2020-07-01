$(document).ready(function() {
  console.log("in doc ready");

  let epoch = localStorage.getItem('epoch');
  var d = new Date(0);
  d.setUTCSeconds(epoch);
  $("#dateTime").html(`<h3>Record: ${d}</h3>`)

  $.ajax({
    type: "GET",
    url: `https://www.duotuan.ca/data/dgDataOut.php?epoch=${epoch}`,
    dataType: "json",
    success: loadData
  });



});


function loadData(data) {
  let sessions = [];
  for (let item of data.data) {
    if (!sessions.includes(item.session)) {
      let name = item.primaryURL;
      if (name.includes("duotuan")) {
        sessions.push(item.session);
        $("#itemContent").append(`
              <div id="${item.session}" class="item-column col-lg-4 col-md-6">

                  <div class="card-header">
                    <h3>多团生鲜</h3>
                  </div>

              </div>
              `);

      } else if (name.includes("hellotomato")) {
        sessions.push(item.session);
        $("#itemContent").append(`
              <div id="${item.session}" class="item-column col-lg-4 col-md-6">

                  <div class="card-header">
                    <h3>番茄生鲜</h3>
                  </div>

              </div>
              `);

      } else if (name.includes("dapengge")) {
        sessions.push(item.session);
        $("#itemContent").append(`
              <div id="${item.session}" class="item-column col-lg-4 col-md-6">

                  <div class="card-header">
                    <h3>大棚哥生鲜</h3>
                  </div>
                
              </div>
              `);
      }

    }
    $(`#${item.session}`).append(
      `
        <div class="card-body">
          <h4 class="item-text">${item.name}</h2>
          <p>价格：${item.price}</p>
          <p>销量：${item.salesRecord}</p>
        </div>
        <hr>
        `
    );
  };
}

//<div id="${item.session}" class="pricing-column contentRow col-lg-4 col-md-4"><h3>${item.primaryURL}</h3></div>

// <div class="cell">
// <h4>${item.name}</h4>
// <h5>价格：${item.price}</h5>
// <p>销量：${item.salesRecord}</p>
// </div>
