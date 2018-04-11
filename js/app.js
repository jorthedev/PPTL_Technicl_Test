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
    $( "#jobInfo" ).empty();
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

function getSavedResults(){   
   
    $.get("../dbConnectors/databaseScript.php", function(data, status){
        console.log(status)
        console.log(JSON.parse(data))
        var test = []
        typeof(data);
        if(Object.keys(data).length > 0){            
            displySavedResults(JSON.parse(data))            
        }
        else{
            $("#noJob").append("<h2>You have not saved any jobs as yet!</h2>");
        }
    })
}

function money(amount, currency) {
    return currency + " " + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function displyResults(data) {
    for (i = 0; i < Object.keys(data).length; i++) {
        var min = money(data[i].minimum, "$");
        var salary = "Starting at " + min;
        var address = "address"
        //var address = interestedState(data[i].locations)
        // typeof(data[i].locations)
        //console.log(data[i].locations)

        // var sdate = new Date(data[i].start_date) - use jquery ui to achieve the desired look
        var kw1 = data[i].position_title
        var kw2 = data[i].position_title
        kw1 = kw1.toLowerCase()
        kw2 = kw2.toLowerCase()
        var specialist = kw1.match(/specialist/g)
        var prison = kw2.match(/prison/g)
      
        if (specialist != undefined) {
            var starred = "yes";
            $("#jobInfo").append('<div><a id="url" href= ' + data[i].url + ' target="_blank"><div> <span id="jobTitle" name="job" >' + data[i].position_title + '</span> <br> <span id="company">' + data[i].organization_name + '</span> <br> <span id="address">Address</span> </div> <span id="salary">' + salary + '</span> <span id="date">Apply by ' + data[i].start_date + '</span></a> <button onclick="saveJob(\'' + data[i].position_title + '\',\'' + data[i].organization_name + '\',\'' + address + '\',\'' + salary + '\',\'' + data[i].start_date + '\',\'' + data[i].url + '\',\'' + starred + '\')"> Save</button><div> <img src="../images/star.png" alt="starred"></div></div>')

        }

        if ( prison == undefined && specialist == undefined) { 
            var starred = "no";
            $("#jobInfo").append('<div><a id="url" href= ' + data[i].url + ' target="_blank"><div> <span id="jobTitle" name="job" >' + data[i].position_title + '</span> <br> <span id="company">' + data[i].organization_name + '</span> <br> <span id="address">Address</span> </div> <span id="salary">' + salary + '</span> <span id="date">Apply by ' + data[i].start_date + '</span></a> <button onclick="saveJob(\'' + data[i].position_title + '\',\'' + data[i].organization_name + '\',\'' + address + '\',\'' + salary + '\',\'' + data[i].start_date + '\',\'' + data[i].url + '\',\'' + starred + '\')"> Save</button></div>')
        }
    }
}

function displySavedResults(data) {
    for (i = 0; i < Object.keys(data).length; i++) {
        //var address = interestedState(data[i].locations)
        // typeof(data[i].locations)
        //console.log(data[i].locations)

        // var sdate = new Date(data[i].start_date) - use jquery ui to achieve the desired look
        
        var starred = data[i].starred;
      
        if (starred == "yes") {            
            $("#rjobInfo").append('<div><a id="url" href= ' + data[i].url_link + ' target="_blank"><div> <span id="jobTitle" name="job" >' + data[i].job_title + '</span> <br> <span id="company">' + data[i].company + '</span> <br> <span id="address">Address</span> </div> <span id="salary">' + data[i].salary_info + '</span> <span id="date">Apply by ' + data[i].date + '</span></a><div> <img src="../images/star.png" alt="starred"></div></div>')

        }else{
            $("#rjobInfo").append('<div><a id="url" href= ' + data[i].url_link + ' target="_blank"><div> <span>' + data[i].job_title + '</span> <br> <span id="company">' + data[i].company + '</span> <br> <span id="address">Address</span> </div> <span id="salary">' + data[i].salary_info + '</span> <span id="date">Apply by ' + data[i].date + '</span></a></div>')
        }
    }
}

function getLocation(data) {
    //this process only one location array
    for (i = 0; i < 10; i++) {
        var locate = data[i].split(",")
        location[i] = locate[1];
    }
    return location;
}

//locationArray.length
function checkLocation(location, locationArray) {
    for (i = 0; i < 10; i++) {
        if (location == locationArray[i]) {
            return 1
            break
        }
    }
    //If location is not found
    return 0;
}


//issue with function needs to be fixed - work on retriving the information for the saved jobs and sending the saved jobs information to the database
function interestedState(data) {
    var address = "";
    var locationArray = getLocation(data);
    var flResult = checkLocation("FL", locationArray);
    var txResult = checkLocation("TX", locationArray);
    if (flResult == 1)
        address = "Florida "
    if (txResult == 1)
        address = "Texas "
    console.log("address: " + address)
    return address;

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
        console.log(data)
        console.log(status)
        alert("Job has been saved!");
        //alert the user that the job has been saved

        // do the same thing you did with the job posting generate the information - that is for retrieving the info for the saved jobs
    })
}