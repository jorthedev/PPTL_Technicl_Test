function searchJob() {
    var info = $("#search").val();
    info = addPlus(info);
    search(info)
}

function addPlus(info) {
    var addSign = '+';
    info = info.split(' ').join(addSign);
    return info;
}

function search(info) {
    $("#jobInfo").empty();

    var url = "https://jobs.search.gov/jobs/search.json?query=";
    var size = "&size=25";
    var fullSearchURL = "https://jobs.search.gov/jobs/search.json?query=" + info + size;

    $.get(fullSearchURL, function (data, status) {
        displyResults(data)
    });
}

function getSavedResults() {
    $.get("../dbConnectors/databaseScript.php", function (data, status) {
        if (Object.keys(data).length > 0) {
            displySavedResults(JSON.parse(data))
        }
        else {
            $("#noJob").append("<h2>You have not saved any jobs as yet!</h2>");
        }
    })
}

function money(amount, currency) {
    return currency + " " + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function displyResults(data) {
    var count = []
    c = 0
    for (i = 0; i < Object.keys(data).length; i++) {

        var address = checkLocation(data[i].locations)
        if (address == 0) {
            count[c] = c
            c = c + 1
        }
        else {

            address = "Avaliable in" + address
            var min = money(data[i].minimum, "$");
            var salary = "Starting at " + min;

            var kw1 = data[i].position_title
            var kw2 = data[i].position_title
            kw1 = kw1.toLowerCase()
            kw2 = kw2.toLowerCase()
            var specialist = kw1.match(/specialist/g)
            var prison = kw2.match(/prison/g)

            if (specialist != undefined) {
                var starred = "yes";

                $("#jobInfo").append('<div class="card border-primary mb-3"><a class="tooltip-test" title="Click to see details" style="padding-left:20px; padding-top:10px; padding-right:50px" id="url" href= ' + data[i].url + ' target="_blank"> <div><div class="starred"> <img src="images/star.png" alt="starred" height ="40px" width="40px"></div><div class="textCust"><h5 class="card-title textCust">' + data[i].position_title + '</h5></div></div>  <div class="card-text" style="padding-right:80px"> <span id="company">' + data[i].organization_name + '</span><span class="date" id="date">Apply by ' + data[i].end_date + '</span> <span class="salary">' + salary + '</span>   <br> <span id="address">' + address + '</span> </div> </a> <div class="save"> <button class="btn btn-primary btnCus" onclick="saveJob(\'' + data[i].position_title + '\',\'' + data[i].organization_name + '\',\'' + address + '\',\'' + salary + '\',\'' + data[i].end_date + '\',\'' + data[i].url + '\',\'' + starred + '\')"> Save</button></div> </div>')

            }

            if (prison == undefined && specialist == undefined) {
                var starred = "no";
                $("#jobInfo").append('<div class="card border-primary mb-3"><a class="tooltip-test" title="Click to see details" style="padding-left:20px; padding-top:10px; padding-right:50px" id="url" href= ' + data[i].url + ' target="_blank"> <div><div class="textCust"><h5 class="card-title textCust">' + data[i].position_title + '</h5></div></div>  <div class="card-text" style="padding-right:80px"> <span id="company">' + data[i].organization_name + '</span><span class="date" id="date">Apply by ' + data[i].end_date + '</span> <span class="salary">' + salary + '</span>   <br> <span id="address">' + address + '</span> </div> </a> <div class="save"><button class="btn btn-primary btnCus" onclick="saveJob(\'' + data[i].position_title + '\',\'' + data[i].organization_name + '\',\'' + address + '\',\'' + salary + '\',\'' + data[i].end_date + '\',\'' + data[i].url + '\',\'' + starred + '\')"> Save</button></div> </div>')
            }
        }
    }
    if (Object.keys(data).length == 0) {
        $("#jobInfo").append('<h2>No results found</h2>');
    }
    if (Object.keys(data).length == count.length && count.length != 0) {
        $("#jobInfo").append('<h2>Not avaliable in Florida, Texas or Boston</h2>');
    }
}

function displySavedResults(data) {
    for (i = 0; i < Object.keys(data).length; i++) {
        var starred = data[i].starred;
        if (starred == "yes") {
            $("#rjobInfo").append('<div class="card border-primary mb-3"><a class="tooltip-test" title="Click to see details" style="padding-left:20px; padding-top:10px; padding-right:50px" id="url" href= ' + data[i].url_link + ' target="_blank"> <div><div class="starred"> <img src="../images/star.png" alt="starred" height ="40px" width="40px"></div><div class="textCust"><h5 class="card-title textCust">' + data[i].job_title + '</h5></div></div>  <div class="card-text" style="padding-right:80px"> <span id="company">' + data[i].company + '</span><span class="date" id="date">Apply by ' + data[i].date + '</span> <span class="salary">' + data[i].salary_info + '</span>   <br> <span id="address">' + data[i].location + '</span> </div> </a></div>')
        } else {
            $("#rjobInfo").append('<div class="card border-primary mb-3"><a class="tooltip-test" title="Click to see details" style="padding-left:20px; padding-top:10px; padding-right:50px" id="url" href= ' + data[i].url_link + ' target="_blank"> <div><div class="textCust"><h5 class="card-title textCust">' + data[i].job_title + '</h5></div></div>  <div class="card-text" style="padding-right:80px"> <span id="company">' + data[i].company + '</span><span class="date" id="date">Apply by ' + data[i].date + '</span> <span class="salary">' + data[i].salary_info + '</span>   <br> <span id="address">' + data[i].location + '</span> </div> </a></div>')
        }
    }
}

function getLocation(data, exp) {
    var location = 0
    exp = new RegExp(exp, 'g')
    for (n = 0; n < Object.keys(data).length; n++) {
        var locate = data[n].match(exp)
        if (locate != undefined) {
            location = 1;
            break;
        }
    }
    return location;
}

function checkLocation(data) {
    var address = ""
    var FL = '\, FL'
    var TX = '\, TX'
    var Bos = '\Boston'
    var FL = getLocation(data, FL)
    var TX = getLocation(data, TX)
    var Bos = getLocation(data, Bos)

    if (FL == 1) { address = address + " Florida" }
    if (TX == 1) { address = address + " Texas" }
    if (Bos == 1) { address = address + " Boston" }
    if (address == "") { address = 0 }

    return address
}


function saveJob(position, company, address, salary, date, url, starred) {
    var option = "insertSaveJob";
    $.post("dbConnectors/databaseScript.php", {
        option: option,
        job_title: position,
        company: company,
        location: address,
        url: url,
        date: date,
        salary_info: salary,
        starred: starred
    }, function (data, status) {
        $('#myModal').modal('show')
    })
}