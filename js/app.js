//TODO: search(info) is not returning the correct results. find a way to fix this.


function searchJob() {
    var info = $("#search").val();
    info = addPlus(info);
    console.log("Search: " + info);
    search(info)
}

function addPlus(info) {
    var addSign = '+';
    info = info.split(' ').join(addSign);
    return info;
}

function search(info) {
    // Enter the search information 
    var organization_id = "&organization_id=MA";
    var url = "https://jobs.search.gov/jobs/search.json?query=";
    var size = "&size=10";
    var fullSearchURL = "https://jobs.search.gov/jobs/search.json?query=" + info + organization_id + size;

    $.get(fullSearchURL, function (data, status) {
        console.log(data[0]);
        console.log("Click the link for details " + data[0].url);
        console.log(Object.keys(data).length);
        displyResults(data)
        
    });

}

function money(amount, currency) {
    return currency + " " + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function displyResults(data) {
    for (i = 0; i < Object.keys(data).length; i++) {
        var min = money(data[i].minimum, "$");
        var salary = "Starting at " + min;
       // var sdate = new Date(data[i].start_date) - use jquery ui to achieve the desired look
        $("#jobInfo").append('<a href= '+ data[i].url +' target="_blank"><div><div> <span id="jobTitle">' + data[i].position_title + '</span> <br> <span id="company">'+ data[i].organization_name+'</span> <br> <span id="address">Address</span> </div> <span id="date">'+salary+'</span> <span id="date">Apply by '+data[i].start_date+'</span> <button onclick="saveJob()"> Save</button></div></a>')
    }
}