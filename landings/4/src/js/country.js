$(function () {
    var countryList;
    countryList = [
        "United States",
        "United Kingdom",
        "Norway",
        "Sweden",
        "Finland",
        "Canada",
        "United Arab Emirates",
        "Australia",
        "Other",
    ];
    var select = document.getElementById("countryData");
    for (let i in countryList) {
        select.options[select.options.length] = new Option(countryList[i], countryList[i]);
    }
});