tizen.power.request("CPU","CPU_AWAKE");var id_interval=0;var status=0;var host="";var port=6547;var delay=500;var HR=-1;function onchangedCB(a){HR=a.heartRate;$("#HR_TEXT").text("BPM : "+HR);}function getHR(){var a=new Date();var b=a.toLocaleTimeString();$.ajax({type:"POST",url:"http://"+host+":"+port+"/",data:{rate:HR},success:function(){$("#HR_LAST_UPDATE").text(b);$("#HR_ERROR").text("");},error:function(){$("#HR_ERROR").text("Oops");},dataType:"text"});}function start(){try{tizen.humanactivitymonitor.start("HRM",onchangedCB);}catch(a){console.log(a);$("#HR_ERROR").text(a);}id_interval=setInterval(getHR,delay);}function end(){try{tizen.humanactivitymonitor.stop("HRM");}catch(a){console.log(a);$("#HR_ERROR").text(a);}clearInterval(id_interval);}$(document).ready(function(){$("#HR_BUTTON").on("click",function(){if(status==1){$("#HR_STATUS").text("OFF");$("#HR_BUTTON").text("START");status=0;end();}else{if(status==0){status=1;$("#HR_STATUS").text("ON");$("#HR_BUTTON").text("STOP");host=$("#HR_IP_HOST").val();port=$("#HR_PORT_HOST").val();delay=$("#HR_DELAY").val();start();}}});});