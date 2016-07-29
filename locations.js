
'use strict'

// data for optional find location extension to maps assignment
// x and y coordinates are for map-xl.gif, you should scale them
// in your program based on the current map resolution
var locationArray = new Array(
		{names: ["Gates"], x: 1558, y: 1461},
		{names: ["MemChu","Memorial Church"], x: 1845, y: 1883},
		{names: ["Tresidder Union", "Tresidder"], x: 1804, y: 2225},		
		{names: ["Florence Moore Hall", "Florence Moore", "FloMo"], x: 1705, y: 2496},
		{names: ["Bookstore", "Book Store"], x: 2022, y: 2144},
		{names: ["MemAud", "Memorial Auditorium", "Memorial Hall"], x: 2262, y: 1600},
		{names: ["Green Library", "Green"], x: 2173, y: 1898},
		{names: ["Meyer Library", "Meyer"], x: 2157, y: 2026}			
	);

var img = new Array(
    {
        name: 'xl',
        source: './img/map-xl.gif'
    },
    {
        name: 'l',
        source: './img/map-l.gif'
    },
    {
        name: 'm',
        source: './img/map-m.gif'
    },
    {
        name: 's',
        source: './img/map-s.gif'
    }
);

var mapSize = 0;

//zoom in and out by alternating between maps
//TODO fix zoom jump issue with one map ( believe is the second one)
function zoomout() {
    //switch maps 
    if (mapSize == 3) {
        alert("Maxium Zoom");
    } else {
        var mapOld = document.getElementById(img[mapSize].name).getBoundingClientRect();
        mapSize++;
        //hide all other maps 
        for (var i = 0; i < img.length; i++) {
        
            if (img[i].name != img[mapSize].name) {
                document.getElementById(img[i].name).style.visibility = "hidden";
            } else {
                var mapNew = document.getElementById(img[i].name).getBoundingClientRect();
                var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();

                var k_1 = (mapOld.right - mapOld.left)/(mapNew.right - mapNew.left);
                var k_2 = (mapOld.bottom - mapOld.top)/(mapNew.bottom - mapNew.top);

                var centerX = mapViewer.left + (mapViewer.right - mapViewer.left)/2;
                var centerY = mapViewer.top + (mapViewer.bottom - mapViewer.top)/2;

                var x = (centerX - mapOld.left)/k_1;
                var y = (centerY - mapOld.top)/k_2;

                var move_x = centerX - x;
                var move_y = centerY - y;

                document.getElementById(img[i].name).style.left = move_x + "px";
                document.getElementById(img[i].name).style.top = move_y + "px";
                document.getElementById(img[i].name).style.visibility = "visible";
            }   
        }
    }
}

function zoomin() {
    //switch maps 
    if (mapSize == 0) {
        alert("Minimum Zoom");
    } else {
        var mapOld = document.getElementById(img[mapSize].name).getBoundingClientRect();
        mapSize--;

        //hide all other maps 
        for (var i = 0; i < img.length; i++) {
        
            if (img[i].name != img[mapSize].name) {
                document.getElementById(img[i].name).style.visibility = "hidden";
            } else {
                //is the map
                var mapNew = document.getElementById(img[i].name).getBoundingClientRect();
                var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();

                var k_1 = (mapOld.right - mapOld.left)/(mapNew.right - mapNew.left);
                var k_2 = (mapOld.bottom - mapOld.top)/(mapNew.bottom - mapNew.top);

                var centerX = mapViewer.left + (mapViewer.right - mapViewer.left)/2;
                var centerY = mapViewer.top + (mapViewer.bottom - mapViewer.top)/2;

                var x = (centerX - mapOld.left)/k_1;
                var y = (centerY - mapOld.top)/k_2;

                var move_x = centerX - x;
                var move_y = centerY - y;

                document.getElementById(img[i].name).style.left = move_x + "px";
                document.getElementById(img[i].name).style.top = move_y + "px";
                document.getElementById(img[i].name).style.visibility = "visible";
            }   
        }
    }
}

// // position the map in the center at the start of loading
// function positionCenter(id ) {

//     var map = document.getElementById(id).getBoundingClientRect();
//     var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();

//     var mapHeight = map.bottom - map.top;
//     var mapWidth = map.right - map.left;

//     var viwerHeight = mapViewer.bottom - mapViewer.top;
//     var viwerWidth = mapViewer.right - mapViewer.left;

//     //line div mid line with img mid line 
//     var mapX = mapViewer.left + viwerWidth/2 - mapWidth/2;
//     var mapY = mapViewer.top + viwerHeight/2 - mapHeight/2;

//     document.getElementById(id).style.left = mapX + "px";
//     document.getElementById(id).style.top = mapY + "px";

// }

//navigation functions 
function scrollup() {
    var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();
    var halfHeight = (mapViewer.bottom - mapViewer.top)/2;   
    var map = document.getElementById(img[mapSize].name).getBoundingClientRect();
    document.getElementById(img[mapSize].name).style.top = (map.top + halfHeight) + "px";   
}

function scrolldown() {
    var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();
    var halfHeight = (-1)*((mapViewer.bottom - mapViewer.top)/2);
    var map = document.getElementById(img[mapSize].name).getBoundingClientRect();
    document.getElementById(img[mapSize].name).style.top = (map.top + halfHeight) + "px";  
}

function scrollleft() {
    var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();
    var halfWidth = (mapViewer.right - mapViewer.left)/2;
    var map = document.getElementById(img[mapSize].name).getBoundingClientRect();
    document.getElementById(img[mapSize].name).style.left = (map.left + halfWidth) + "px";  
}

function scrollright() {
    var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();
    var halfWidth = (-1)*(mapViewer.right - mapViewer.left)/2;
    var map = document.getElementById(img[mapSize].name).getBoundingClientRect();
    document.getElementById(img[mapSize].name).style.left = (map.left + halfWidth) + "px";  
}

function lis(event) {
    handleMouseDown(event);
}

function l(event) {
    handleDblClick(event);
}
//listenrs
document.addEventListener("mousedown",lis,false); 
document.getElementById("mapViewer").addEventListener("dblclick",l,false); 

//handle drag movements by calling the mousemove listener and passing in parameters 
function handleMouseDown(event) {
    event.preventDefault();

    var map = document.getElementById(img[mapSize].name).getBoundingClientRect();

    var cursorX = event.screenX;
    var cursorY = event.screenY;

    //set cursor x y diff to transformed img x y
    var height = cursorY - (map.top);
    var width = cursorX - (map.left);

    function listener(event) {
        drag(width, height, event);
    }

    document.addEventListener("mousemove", listener, false); 

    document.addEventListener("mouseup",handleMouseUp,false);

    function handleMouseUp() {
        document.removeEventListener("mousemove", listener, false);
        document.getElementById("mapViewer").style.cursor = "default";
    }

    document.getElementById("mapViewer").style.cursor = "move";
}

//the actual drag function called by the mousemove listener
function drag(width, height, event) {
    event.preventDefault();
    var cursorX = event.clientX;
    var cursorY = event.clientY; 
    
    //TODO fix secondary dragging
    document.getElementById(img[mapSize].name).style.left = ((cursorX - width)) + "px";
    document.getElementById(img[mapSize].name).style.top = ((cursorY - height)) + "px";
}

//center map on doubleclicks
function handleDblClick(event) {
    var map = document.getElementById(img[mapSize].name).getBoundingClientRect();
    var mapViewer = document.getElementById("mapViewer").getBoundingClientRect();

    var centerY = mapViewer.top + (mapViewer.bottom - mapViewer.top)/2;
    var centerX = mapViewer.left + (mapViewer.right - mapViewer.left)/2;

    var cursorX = event.screenX;
    var cursorY = event.screenY; 

    //line div mid line with img mid line 
    var mapX = centerX - cursorX;
    var mapY = centerY - cursorY;

    document.getElementById(img[mapSize].name).style.left = (map.left + mapX) + "px";
    document.getElementById(img[mapSize].name).style.top = (map.top + mapY) + "px";
}