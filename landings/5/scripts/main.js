!function a(e,o,n){function i(r,l){if(!o[r]){if(!e[r]){var s="function"==typeof require&&require;if(!l&&s)return s(r,!0);if(t)return t(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=o[r]={exports:{}};e[r][0].call(u.exports,function(a){var o=e[r][1][a];return i(o?o:a)},u,u.exports,a,e,o,n)}return o[r].exports}for(var t="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(a,e,o){$(window).load(function(){function a(){try{var a=ga.getAll()[0];return a.get("clientId")}catch(e){return console.log("Client ID Not Found"),""}}var e=$("#mainForm"),o=$("form").attr("action"),n="&Google_Analytics_Client_ID="+a();window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""));var i=o+"?Lead_Source_Query=Website Query&Region="+formRegion+"&";i+=getRequest+n,setCookieIsoft(getRequest),setCookieClientId(a()),e.attr("action",i)})},{}],2:[function(a,e,o){$(function(){var a;a=["United States","Canada","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Côte d’Ivoire","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong S.A.R., China","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao S.A.R., China","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Saint Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Vatican","Venezuela","Viet Nam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];var e=document.getElementById("countryData");for(i in a)e.options[e.options.length]=new Option(a[i],a[i])})},{}],3:[function(a,e,o){$("#mainForm").validate({rules:{First_Name:{required:!0},Last_Name:{required:!0},Phone:{required:!0},Company:{required:!0},Country:{required:!0},Email:{required:!0,email:!0},Please_describe_your_project:{required:!0,maxlength:65e3}},messages:{Email:{email:"Please enter a valid email address."}},submitHandler:function(a){var e=$("#mainForm").serialize(),o=$("#mainForm").attr("action");$.ajax({type:"POST",url:o,data:e,dataType:"json",encode:!0}).done(function(a){a.success||console.log("fail"),console.log(a)}),$("#mainForm").hide(),$(".contact__complete").show(),$("input,textarea").val(""),dataLayer.push({form:"mainForm",event:"formSubmit"})}})},{}],4:[function(a,e,o){function n(){try{var a=ga.getAll()[0];return a.get("clientId")}catch(e){return console.log("Error fetching clientId"),""}}a("./contact.js"),a("./country.js"),a("./form_validate.js");var i=window.fizzyUIUtils;$(function(){$("img, a").on("dragstart",function(a){a.preventDefault()});for(var a=document.querySelector(".cases__carousel"),e=new Flickity(a,{cellAlign:"center",contain:!0,pageDots:!0,loop:!0,arrowShape:{x0:15,x1:65,y1:45,x2:75,y2:45,x3:25}}),o=0;o<3;o++)document.querySelectorAll(".cases__slide")[o].classList.add("cases__slide--js");e.on("cellSelect",function(){for(var a=0;a<9;a++)document.querySelectorAll(".cases__slide")[a].classList.remove("cases__slide--js");var o=document.querySelectorAll(".cases__item")[e.selectedIndex].querySelectorAll(".cases__slide");console.log(o);for(var a=0;a<3;a++)o[a].classList.add("cases__slide--js")});for(var n=document.querySelector(".expertise__carousel"),t=(new Flickity(n,{cellAlign:"center",pageDots:!0,prevNextButtons:!1}),document.querySelector(".app__carousel")),r=new Flickity(t,{cellAlign:"center",prevNextButtons:!1}),l=document.querySelector(".app__tabs"),s=i.makeArray(l.querySelectorAll(".app__tab")),o=0;o<6;o++)document.querySelectorAll(".app__tab")[o].addEventListener("click",function(a){var e=i.indexOf(s,a.target);r.select(e)});r.on("cellSelect",function(){for(var a=0;a<6;a++)document.querySelectorAll(".app__tab")[a].classList.remove("app__tab--active");document.querySelectorAll(".app__tab")[r.selectedIndex].classList.add("app__tab--active")})}),$(document).ready(function(){function a(){$(".popup").css("height","100vh")}function e(){document.ontouchmove=function(a){a.preventDefault()}}function o(){document.ontouchmove=function(a){return!0}}function n(){window.onscroll=function(){if(window.innerWidth>300&&$(window).scrollTop()>5?document.querySelector(".promo__stick").classList.add("promo__stick--js"):document.querySelector(".promo__stick").classList.remove("promo__stick--js"),$(window).scrollTop()>400)for(var a=0;a<4;a++)document.querySelectorAll(".about__ring")[a].classList.add("about__ring--active")}}a(),n(),$(window).resize(function(){a(),n()}),$(".js__menu").click(function(){$(".popup").is(":visible")?($(".popup").fadeOut(600),$(".promo__menu").removeClass("active"),$(".promo__logo").removeClass("active"),o(),$("html").css("height","auto").css("overflow-y","scroll")):($(".popup").fadeIn(600),$(".promo__menu").addClass("active"),$(".promo__logo").addClass("active"),e(),$("html").css("height","100%").css("overflow-y","hidden"))}),$(".scrollto").click(function(){$("html, body").animate({scrollTop:$("#contact").offset().top-50},500)}),$(".promo__arrow a").click(function(){$("html, body").animate({scrollTop:$("#about").offset().top-50},500)}),$(".popup a").click(function(){var a=$(this).attr("href");$(".popup").fadeOut(600),$(".promo__menu").removeClass("active"),$(".promo__logo").removeClass("active"),$("html").css("height","auto").css("overflow-y","scroll"),o(),$("html, body").animate({scrollTop:$(a).offset().top-50},500)}),$(".promo__logo a").click(function(){$("html, body").animate({scrollTop:$(this).offset().top=0},500)}),$(".promo__navigation a").click(function(){var a=$(this).attr("href");$("html, body").animate({scrollTop:$(a).offset().top-50},500)}),n(),$(".app__content .js--open").click(function(){$(".app__content .js--open").toggleClass("opened"),$(".app__content .js--hide").toggle()}),$(".portfolio__test .js--open").click(function(){$(".portfolio__test .js--open").toggleClass("opened"),$(".portfolio__test .js--hide").toggle()})}),$(window).load(function(){n(),dataLayer.push({cid:n(),event:"сidReady"})})},{"./contact.js":1,"./country.js":2,"./form_validate.js":3}]},{},[4]);
//# sourceMappingURL=main.js.map