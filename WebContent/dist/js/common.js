//var address = "http://192.168.0.15:8080/pm";
var address = "http://pm.goldbutton.com";
var getVerificationCode = address +"/DriverServiceCtl/getVerificationCode.do";
var active = address +"/DriverServiceCtl/active.do";
var getNearbyParks = address +"/DriverServiceCtl/getNearbyParks.do";
var startParking = address +"/DriverServiceCtl/startParking.do";
var stopParking = address +"/DriverServiceCtl/stopParking.do";
var getParkingCars = address +"/DriverServiceCtl/getParkingCars.do";
var saveCar = address +"/DriverServiceCtl/saveCar.do";
var getCars = address +"/DriverServiceCtl/getCars.do";
var wxPay = address +"/DriverServiceCtl/wxPay.do";
var getParkRecord = address +"/DriverServiceCtl/getParkRecord.do";

$.config = {
		router: false,
		showPageLoadingIndicator:true
	  }


Date.prototype.pattern=function(fmt) {           
    var o = {           
    "M+" : this.getMonth()+1, //月份           
    "d+" : this.getDate(), //日           
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
    "H+" : this.getHours(), //小时           
    "m+" : this.getMinutes(), //分           
    "s+" : this.getSeconds(), //秒           
    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
    "S" : this.getMilliseconds() //毫秒           
    };           
    var week = {           
    "0" : "/u65e5",           
    "1" : "/u4e00",           
    "2" : "/u4e8c",           
    "3" : "/u4e09",           
    "4" : "/u56db",           
    "5" : "/u4e94",           
    "6" : "/u516d"          
    };           
    if(/(y+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
    }           
    if(/(E+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
    }           
    for(var k in o){           
        if(new RegExp("("+ k +")").test(fmt)){           
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
        }           
    }           
    return fmt;           
}         
    

$(document).on("click", "#openMenu", function() {
	if(getUser()){
		$.openPanel("#menuPanel");
	}
});

function getUser(){
	var user = getCookie("user");
	if(null == user || "" == user){
		var readPhoneNum ;
		//readPhoneNum = locationLink.readPhoneNum();
		if(null == readPhoneNum || "" == readPhoneNum){
			window.location.href = "activate.html";
			return false;
		}else{
			setCookie("user",readPhoneNum);
		}
	}
	return true;
}

// 写cookies
function setCookie(name, value) {
	 localStorage.setItem(name, value);
}

function getCookie(name) {
	return localStorage.getItem(name);
}

function delCookie(name){
	localStorage.removeItem(name);
}