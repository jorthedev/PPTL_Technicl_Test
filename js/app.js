function searchJob() {
    var info = $("#search").val();
    info = addPlus(info);
    console.log("Search: " + info);

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
    var size = "&size=100";
    var fullSearchURL = "https://jobs.search.gov/jobs/search.json?query=" + info + organization_id + size;

    

}

function displyResults(results) {

}