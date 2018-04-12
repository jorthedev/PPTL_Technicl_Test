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
    $("#jobInfo").empty();
    // Enter the search information 
    var organization_id = "&organization_id=MA";
    var url = "https://jobs.search.gov/jobs/search.json?query=";
    var size = "&size=5";
    var fullSearchURL = "https://jobs.search.gov/jobs/search.json?query=" + info + organization_id + size;

    $.get(fullSearchURL, function (data, status) {
        displyResults(data)
    });

}

function getSavedResults() {
    $.get("../dbConnectors/databaseScript.php", function (data, status) {
        console.log(status)
        console.log(JSON.parse(data))
        var test = []
        typeof (data);

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
            // var sdate = new Date(data[i].start_date) - use jquery ui to achieve the desired look
            var kw1 = data[i].position_title
            var kw2 = data[i].position_title
            kw1 = kw1.toLowerCase()
            kw2 = kw2.toLowerCase()
            var specialist = kw1.match(/specialist/g)
            var prison = kw2.match(/prison/g)

            if (specialist != undefined) {
                var starred = "yes";
                $("#jobInfo").append('<div><a id="url" href= ' + data[i].url + ' target="_blank"><div> <span id="jobTitle" name="job" >' + data[i].position_title + '</span> <br> <span id="company">' + data[i].organization_name + '</span> <br> <span id="address">' + address + '</span> </div> <span id="salary">' + salary + '</span> <span id="date">Apply by ' + data[i].start_date + '</span></a> <button onclick="saveJob(\'' + data[i].position_title + '\',\'' + data[i].organization_name + '\',\'' + address + '\',\'' + salary + '\',\'' + data[i].start_date + '\',\'' + data[i].url + '\',\'' + starred + '\')"> Save</button><div> <img src="../images/star.png" alt="starred"></div></div>')

            }

            if (prison == undefined && specialist == undefined) {
                var starred = "no";
                $("#jobInfo").append('<div><a id="url" href= ' + data[i].url + ' target="_blank"><div> <span id="jobTitle" name="job" >' + data[i].position_title + '</span> <br> <span id="company">' + data[i].organization_name + '</span> <br> <span id="address">' + address + '</span> </div> <span id="salary">' + salary + '</span> <span id="date">Apply by ' + data[i].start_date + '</span></a> <button onclick="saveJob(\'' + data[i].position_title + '\',\'' + data[i].organization_name + '\',\'' + address + '\',\'' + salary + '\',\'' + data[i].start_date + '\',\'' + data[i].url + '\',\'' + starred + '\')"> Save</button></div>')
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
            $("#rjobInfo").append('<div><a id="url" href= ' + data[i].url_link + ' target="_blank"><div> <span id="jobTitle" name="job" >' + data[i].job_title + '</span> <br> <span id="company">' + data[i].company + '</span> <br> <span id="address">Address</span> </div> <span id="salary">' + data[i].salary_info + '</span> <span id="date">Apply by ' + data[i].date + '</span></a><div> <img src="../images/star.png" alt="starred"></div></div>')
        } else {
            $("#rjobInfo").append('<div><a id="url" href= ' + data[i].url_link + ' target="_blank"><div> <span>' + data[i].job_title + '</span> <br> <span id="company">' + data[i].company + '</span> <br> <span id="address">Address</span> </div> <span id="salary">' + data[i].salary_info + '</span> <span id="date">Apply by ' + data[i].date + '</span></a></div>')
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
    var Bos = '\, Boston'
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
    $.post("../dbConnectors/databaseScript.php", {
        option: option,
        job_title: position,
        company: company,
        location: address,
        url: url,
        date: date,
        salary_info: salary,
        starred: starred
    }, function (data, status) {
        
        alert("Job has been saved!");
        //alert the user that the job has been saved

        // do the same thing you did with the job posting generate the information - that is for retrieving the info for the saved jobs
    })
}