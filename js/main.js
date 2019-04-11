var toDoListData = [];
var bookmarkList = [[],[]];
var removeToggler = 0;
var addToggler = 0;
var zoomToggler = 0;
var weeklyToggler = 0;
var settingsToggler = 0;
var editToggler = 0;
var weekOffset = 0;
var todayHighlighted = 0;

var birthMonth = 9;
var birthDay = 17;

function change_css(id, css, value) {
    $(id).css(css,value);
}

function open_up(id) {
    change_css(id+" li", "width", "160px")
    change_css(id+" li", "height", "60px")
    change_css(id+" li", "opacity", "1")
    change_css(id+" >a", "font-size", "0px")
    change_css(id+" >a", "height", "0px")
    change_css(id+" >a", "opacity", "0")    
    change_css(id+" li>a", "width", "160px")
    change_css(id+" li>a", "height", "60px")    
    change_css(id+" li>a", "line-height", "60px")
    change_css(id+" li>a", "font-size", "16px")    
}

function close_down(id) {
    change_css(id+" li", "width", "0px")
    change_css(id+" li", "height", "0px")
    change_css(id+" li", "opacity", "0")
    change_css(id+" >a", "font-size", "15px")
    change_css(id+" >a", "height", "40px")   
    change_css(id+" >a", "opacity", "1")      
    change_css(id+" li>a", "width", "0px")
    change_css(id+" li>a", "height", "0px")      
    change_css(id+" li>a", "line-height", "0px")
    change_css(id+" li>a", "font-size", "0px")         
}

function dateInfo() {
    
    var d = new Date();
    if (d.getMinutes() < 10){
        if(d.getHours() < 10){
            document.getElementById("time").innerHTML = "0" + d.getHours() + ":0" +  d.getMinutes()
        }
        else{
            document.getElementById("time").innerHTML = d.getHours() + ":0" +  d.getMinutes()
        }
    } else{
        if(d.getHours() < 10){
            document.getElementById("time").innerHTML = "0" + d.getHours() + ":" +  d.getMinutes()
        }
        else{
            document.getElementById("time").innerHTML = d.getHours() + ":" +  d.getMinutes()
        }
    }
        
    document.getElementById("day").innerHTML = d.getDate()
    //month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()]
    //month = ['january','february','march','april','may','jun','july','august','september','october','november','december'][d.getMonth()]
    month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][d.getMonth()]
    document.getElementById("month").innerHTML = month
	var t = setTimeout(function(){dateInfo()},500)
}

function setBookmarks() {
    for (var i = 0; i < 2; i++) {
        
        for (var j = 0; j < 9; j++) {
            var editId = "edit_" + (i + 1) + "-" + (j + 1)
            var label = document.getElementById(editId + "a").value
            var url = document.getElementById(editId + "b").value
            if (!label || !url) {
                label = null
                url = null
            }
            if (bookmarkList[i].length >= j + 1) {
                bookmarkList[i][j] = {
                    "label": label,
                    "url": url
                }
            } else {
                bookmarkList[i].push({
                    "label": label,
                    "url": url
                })
            }
        }
    }
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    getBookmarks();
    alert("Successfully updated bookmarks");
}

function getBookmarks() {
    var count1 = 0;
    var count2 = 0;
    var data = JSON.parse(localStorage.getItem("bookmarkList"));
    if (data != null) bookmarkList = data;
    document.getElementById("section1").innerHTML = "";
    document.getElementById("section2").innerHTML = "";
    
    for (var i = 0; i < bookmarkList.length; i++){
        
        for (var j = 0; j < bookmarkList[i].length; j++){
            
            var sectionId = "section" + (i + 1);
            var label = bookmarkList[i][j]['label']
            var url = bookmarkList[i][j]['url'];
            if (label != null) {
                var yo = '<li><a href="' + url + '"> ' + label + ' </a></li>';
                document.getElementById(sectionId).innerHTML += yo;
            }
                
            var editId = ""
            if (i + 1 == 1) {
                count1 += 1;
                editId = "edit_1-" + count1
            }
            if (i + 1 == 2) {
                count2 += 1;
                editId = "edit_2-" + count2
            }
            document.getElementById(editId + "a").value = label;
            document.getElementById(editId + "b").value = url;
            
        }   
    }

}

function getCurrentDay() {
    let d = new Date();
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    document.getElementById("title_text").innerHTML = " " + days[d.getDay()] + " ";
}

function writeCalendarData() {
    localStorage.setItem("calendarData", JSON.stringify(toDoListData));
}

function ShowCalenderData(idString, is_tdl, offset) {
    let data = toDoListData;
    let numLoaded = 0;
    document.getElementById(idString).innerHTML = "";
    if (data) {
        for(let i = 0; i < data.length; i++){ 
            let d = new Date();
            d.setDate(d.getDate() + offset);
            let dateString = data[i].substring(0,10);
            if ( dateString.substring(0,2) == d.getDate() && 
                 dateString.substring(3,5) == d.getMonth() + 1 && 
                 dateString.substring(6,10) == d.getFullYear() ) {
                numLoaded += 1;
                if (removeToggler) {
                    var yo = '<li class="remove"><a class="listy">❤️</a><a>' + data[i].substring(11, data[i].length) + '</a></li>';
                } else {
                    var yo = '<li><a class="listy">❤️</a><a>' + data[i].substring(11, data[i].length) + '</a></li>';
                }
                document.getElementById(idString).innerHTML += yo;  
            }
        }
    }
    $('#' + idString + '>li').click(function(){
        if(removeToggler) {
            let htmly = this.innerHTML;
            let dateString = getCurrentDateString(0);
            if (String(this.parentElement.parentElement.id).indexOf("day") >= 0){
                let dayVal = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(this.parentElement.parentElement.childNodes[0].innerHTML);
                let d = new Date();
                let offset = 0 + dayVal + (7 * weekOffset) - d.getDay();
                if (dayVal == 0) offset = 7 + (7 * weekOffset) - d.getDay();
                dateString = getCurrentDateString(offset);
            }
            htmly = htmly.substring(htmly.indexOf("<a>") + 3, htmly.length);
            htmly = htmly.substring(0, htmly.indexOf("</a>"));
            toDoListData.splice(toDoListData.indexOf(dateString + ":" + htmly), 1);
            writeCalendarData();
            readCalendarData();
            ShowCalenderData('tdl_current_day', true, 0);
            ShowWeeklyData();
        }
        
    });
    if (numLoaded == 0) {
        if (is_tdl) {
            document.getElementById(idString).innerHTML += '<a id="free_text"> looks like you\'re free for today! feel free to check out the rest of your week, or add something new to your list below.</a>';  
        } else {
            document.getElementById(idString).innerHTML += '<a class="free_day"></a>';  
        }
    }
}

function ShowWeeklyData(blink) {
    if (blink) change_css("#weeks_view", "opacity", "0");
    let delay = 0;
    if (blink) delay = 200;
    setTimeout(function(){
        if (blink) change_css("#weeks_view", "opacity", "1");
        let startingDay = 0;
        let d = new Date();
        if (d.getDay() == 0) {
            startingDay = -6 + (7 * weekOffset);
        } else {
            startingDay = 1 - d.getDay() + (7 * weekOffset);
        }
        let rangeList = [startingDay, startingDay + 1, startingDay + 2, startingDay + 3, startingDay + 4, startingDay + 5, startingDay + 6];

        let today = new Date();
        for(var i = 0; i < 7; i++){ 
            d = new Date();
            d.setDate(d.getDate() + rangeList[i]);
            if (todayHighlighted == 1) {
                let idstring = "div#day" + d.getDay(); 
                if(d.getDay() == 0) idstring = "div#day7";
                $(idstring).toggleClass("today");
            }
            if (todayHighlighted > 0) {
                todayHighlighted--;
            }
            if (today.getDate() == d.getDate() && today.getMonth() == d.getMonth()) {
                let idstring = "div#day" + d.getDay(); 
                if(d.getDay() == 0) idstring = "div#day7";
                $(idstring).toggleClass("today");
                todayHighlighted = 7;
            }
            ShowCalenderData("day" + (i + 1) + "ul", false, rangeList[i]);
            document.getElementById("day" + (i + 1) + "date").innerHTML = d.getDate() + " ";
            document.getElementById("day" + (i + 1) + "date").innerHTML += ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][d.getMonth()];
            document.getElementById("day" + (i + 1) + "date").name = d.getTime();
        }
    }, delay);
}

function readCalendarData() {
    let data = JSON.parse(localStorage.getItem("calendarData"));
    if (data != null) toDoListData = data;
    ShowCalenderData('tdl_current_day', true, 0);
}

function toggleRemove() {
    removeToggler = 1 - removeToggler;
    $("ul#tdl_current_day>li").toggleClass("remove");
    $("ul.daylist>li").toggleClass("remove");
    $("#tdl_remove").toggleClass("selected");
    $("#weeks_remove").toggleClass("selected");
}

function toggleAdd() {
    addToggler = 1 - addToggler;
    $("#tdl_add").toggleClass("selected");
    $("#weeks_add").toggleClass("selected");
    if (addToggler) {
        change_css("#add_dialogue_container", "left", "0vw");
        change_css(".holder", "pointer-events", "none");
    } else {
        change_css("#add_dialogue_container", "left", "100vw");
        change_css(".holder", "pointer-events", "all");
    }
}

function toggleWeekly() {
    weeklyToggler = 1 - weeklyToggler;
    if (weeklyToggler) {
        change_css("#weeks_container", "top", "0vh");
    } else {
        change_css("#weeks_container", "top", "-100vh");
    }
}

function toggleSettings() {
    settingsToggler = 1 - settingsToggler;
    if (settingsToggler) {
        change_css("#settings_container", "left", "0vw");
        change_css(".holder", "pointer-events", "none");
    } else {
        change_css("#settings_container", "left", "100vw");
        change_css(".holder", "pointer-events", "all");
    }
}

function importData() {
    let fileList =  document.getElementById('importFile').files;
    let reader = new FileReader();
    let listy = {};
    reader.onload = (function(reader)
        {
            return function()
            {
                let output = [];
                let str = "";
                try {
                    listy = JSON.parse(reader.result);
                }
                catch(err) {
                    console.log(err)
                    alert("Incorrect file type");
                    location.reload();
                }
                for (var i = 0; i < 0 /*listy.bookmarkList.length*/; i++) {
                    for (var j = 0; j < listy.bookmarkList[i].length; j++) {
                        if (!listy.bookmarkList[i][j].label || !listy.bookmarkList[i][j].url) {
                            alert("Incorrect JSON formatting (bookmarks)");
                            location.reload();
                        }
                    }
                }
                for (var i = 0; i < listy.calendarData.length; i++) {
                    if (!listy.calendarData[i].date || !listy.calendarData[i].event) {
                        alert("Incorrect JSON formatting (calendar)");
                        location.reload();
                    }
                    output.push(listy.calendarData[i].date + ":" + listy.calendarData[i].event);
                }
                toDoListData = output;
                writeCalendarData();
                readCalendarData();  
                ShowWeeklyData();
                localStorage.setItem("bookmarkList", JSON.stringify(listy.bookmarkList));
                getBookmarks();
                getBookmarks();
                alert("Successfully imported data!");
            }
        })(reader);
    reader.readAsText(fileList[0]);
}

function exportData() {
    var element = document.createElement('a');
    let filename = "userData (" + getCurrentDateString(0) + ").json";
    let listy = [];
    let str = "";
    for (let i = 0; i < toDoListData.length; i++) {
        str = toDoListData[i];
        listy.push({"date": str.substring(0,10), "event": str.substring(11)});
    }
    let output = {
        "bookmarkList": bookmarkList,
        "calendarData": listy
    }
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( JSON.stringify(output, null, 4)) );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function toggleEdit() {
    editToggler = 1 - editToggler;
    if (editToggler) {
        change_css("#edit_container", "left", "0vw");
    } else {
        change_css("#edit_container", "left", "100vw");
    }
}

function setInputDate() {
    let dateString = getCurrentDateString(0);
    dateString = dateString.substring(6, 10) + "-" + dateString.substring(3, 5) + "-" + dateString.substring(0, 2);
    document.getElementById('tdlDateInput').min = dateString;
    document.getElementById('tdlDateInput').value = dateString;
}

function addNewEvent(){
    let date = document.getElementById('tdlDateInput').value;
    let descr = document.getElementById('tdlTextInput').value;
    if (!descr) {
        if (document.getElementById('tdlTextInput').classList[0] != "angry") {
            $("#tdlTextInput").toggleClass("angry");
        }
        document.getElementById('tdlTextInput').placeholder = "u actly have to type something here u kno";
        return null;
    }
    date = date.substring(8, 10) + "-" + date.substring(5, 7) + "-" + date.substring(0, 4);
    toDoListData.push(date + ":" + descr);
    writeCalendarData();
    ShowCalenderData('tdl_current_day', true, 0);
    ShowWeeklyData();
    document.getElementById('tdlTextInput').value = "";
    document.getElementById('tdlTextInput').placeholder = "added new event!";
}

function getCurrentDateString(offset) {
    let d = new Date();
    d.setDate(d.getDate() + offset);
    let day = String(d.getDate());
    let month = String(d.getMonth() + 1);
    let year = String(d.getFullYear());
        if (day.length == 1) day = "0" + day;
        if (month.length == 1) month = "0" + month;
    let dateString = day + "-" + month + "-" + year;
    return dateString;
}

var bubbleList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var usedBubbles = [];
var bubbleText = ["eep~", "owie~", "hey~", "ouch~", "ooh~", "ah~", "stop that~", "that tickles~", "im ticklish~"];

function melodyClick() {
    if (bubbleList.length > 0) {
        var num = bubbleList[Math.floor(Math.random() * bubbleList.length)];
        usedBubbles.push(num);
        bubbleList.splice(bubbleList.indexOf(num), 1);
        setTimeout(function(){
            change_css("#bubble" + num, "display", "none");
            usedBubbles.splice(usedBubbles.indexOf(num), 1);
            bubbleList.push(num);
        }, 1500);
        var zIndex = Math.floor((Math.random() * 9) + 2);
        var topMargin = Math.floor((Math.random() * 150) + 230);
        var leftMargin = Math.floor((Math.random() * 80) + 260);
        change_css("#bubble" + num, "display", "block");
        change_css("#bubble" + num, "z-index", zIndex);
        change_css("#bubble" + num, "top", topMargin + "px");
        change_css("#bubble" + num, "left", leftMargin + "px");
    }
}

function testData() {
    let dateString = getCurrentDateString(0);
    data = [
        dateString + ":" + "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        dateString + ":" + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        dateString + ":" + "Ut enim ad minim veniam, quis nostrud"
    ];
    
    toDoListData = data;
    writeCalendarData();
}




window.onload = function () {
//        change_css("main", "margin-top", "0px")
    change_css("main", "opacity", "1")
    //testData();
    setInputDate();

}




$(document).ready(function(){
    
    dateInfo();
    getCurrentDay();
    readCalendarData();  
    getBookmarks();
    ShowWeeklyData();
    
    var TitleList = ["💕 hey gorgeous 💕", "💕 hello sexy 💕", "💕 hi my baby 💕", "💕 you're pretty 💕", "💕 you a snacc 💕", "💕 who's sexy? u are 💕", "💕 me plus you 💕"]
    
    document.title = TitleList[Math.floor(Math.random() * TitleList.length)]
    
    if (d.getDate() == birthDay && d.getMonth() == birthMonth - 1) {
        document.getElementById("birthday").innerHTML = "<img src='../img/cake.gif' alt='Birthday Cake' height='400' width='400'> <audio autoplay loop id='music'> <source src='../audio/birthday.mp3' type='audio/mpeg'> </audio>";
        document.getElementById("music").volume = 0.1;
        document.title = "🍰 happy bday! 🍰"
    }
    
    $('#tdl_add').click(function(){
        toggleAdd();
    });
    
    $('#weeks_add').click(function(){
        toggleAdd();
    });
    
    $('#tdlExitButton').click(function(){
        toggleAdd();
    });
    
    $('#tdl_remove').click(function(){
        toggleRemove();
    });
    
    $('#weeks_remove').click(function(){
        toggleRemove();
    });
    
    $('#weeks_left').click(function(){
        weekOffset--;
        ShowWeeklyData(true);
    });
    
    $('#weeks_right').click(function(){
        weekOffset++;
        ShowWeeklyData(true);
    });
    
    $('#tdlTextInput').click(function(){
        $("#tdlTextInput.angry").toggleClass("angry");
        document.getElementById('tdlTextInput').placeholder = "";
    });
    
    $('#tdlAcceptButton').click(function(){
        addNewEvent();
    });
    
    $("#tdlTextInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
        addNewEvent();
    }
    });
    
    $('#tdl_zoom').click(function(){
        if(removeToggler) toggleRemove();
        if(addToggler) toggleAdd();
        if(settingsToggler) toggleSettings();
        toggleWeekly();
    });
    
    $('#weeks_zoom').click(function(){
        if(removeToggler) toggleRemove();
        if(addToggler) toggleAdd();
        toggleWeekly();
    });
    
    $('#weeks_container').click(function(){
        if(removeToggler) toggleRemove();
        if(addToggler) toggleAdd();
        if(weeklyToggler) toggleWeekly();
    }).children().click(function(e) {
        return false;
    });;
    
    for(var i = 1; i < 8; i++){ 
        $("#day" + i + "").click(function(){
            let d = new Date(parseInt(document.getElementById($(this).attr('id') + "date").name));
            let day = String(d.getDate());
            let month = String(d.getMonth() + 1);
            let year = String(d.getFullYear());
            if (day.length == 1) day = "0" + day;
            if (month.length == 1) month = "0" + month;
            let dateString = day + "-" + month + "-" + year;
            dateString = dateString.substring(6, 10) + "-" + dateString.substring(3, 5) + "-" + dateString.substring(0, 2);
            document.getElementById('tdlDateInput').value = dateString;
        });;
    }
    
    
    
    $('#display').click(function(){
        if(removeToggler) toggleRemove();
        if(addToggler) toggleAdd();
        toggleSettings();
    });;
    
    $('#settingsExitButton').click(function(){
        toggleSettings();
    });
    
    $('#settings_container').click(function(e){
        if(e.target !== this) return;
        if(settingsToggler) toggleSettings();
    });
    
    $('#exportButton').click(function(){
        exportData();
    });
    
    $('#importFile').change(function(){
        importData();
    });
    
    $('#bookmarkEdit').click(function(){
        toggleEdit();
    });
    
    $('#bookmarkSubmit').click(function(){
        setBookmarks();
    });
    
    $('#edit_container').click(function(){
        if(editToggler) toggleEdit();
    }).children().click(function(e) {
        return false;
    });;
    
    $('#current_tdl').click(function(){
        if(!removeToggler){
            let dateString = getCurrentDateString(0);
            dateString = dateString.substring(6, 10) + "-" + dateString.substring(3, 5) + "-" + dateString.substring(0, 2);
            document.getElementById('tdlDateInput').value = dateString;
        }
    });;
    
    
    
    
    $('#melody').mousedown(function(){
        $(this).toggleClass("owie")
        melodyClick();
    });
    
    $('#melody').mouseup(function(){
        $(this).toggleClass("owie")
    });
    
    $('#holder1').hover(function(){ // mouse is over the div
    
        id = '#holder1'
        open_up(id)
        
        change_css("#holder1", "margin", "40px auto auto auto")
        change_css("#holder2", "margin", "40px auto auto auto")
        
        },function(){ // mouse is no longer over the div
        
        close_down(id)        
        
        change_css("#holder1", "margin", "110px auto auto auto")
        change_css("#holder2", "margin", "110px auto auto auto")

    });

    $('#holder2').hover(function(){ // mouse is over the div
    
        id = '#holder2'
        open_up(id)
        
        change_css("#holder2", "margin", "40px auto auto auto")
        change_css("#holder3", "margin", "40px auto auto auto")
        
        },function(){ // mouse is no longer over the div
        
        close_down(id)        
        
        change_css("#holder2", "margin", "110px auto auto auto")
        change_css("#holder3", "margin", "110px auto auto auto")

    });      
    
    
     
});




