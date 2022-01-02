var areaName = [];  // WITHOUT PYTHON SCRIPT
var SNMG = []
var SYSBIO = []
var CIRCUIT = []
var SOLID = []
var COMM = []
var EFIVE = []
var PYTHON = ['python@quick-country-232516.iam.gserviceaccount.com']


function getMember(){
  areaHandler()
  for(var i=0; i<areaName.length; i++){
    eval(areaName[i]+"= getMail(areaName[i])")
  }
}


function areaHandler(){
  var data = SpreadsheetApp.getActive().getSheetByName("member").getRange("B:B").getValues();
  for(var i=1; i<data.length; i++){
    if(data[i][0] != ""){
      var duplicate = false;
      for(var j=0; j<areaName.length; j++){
        if(areaName[j] == data[i][0]){
          duplicate = true;
        }
      }
      if (!duplicate){
        areaName.push(data[i][0])
      }
    }else{
      break
    }    
  }
}


function getMail(name){
  var sheet = SpreadsheetApp.getActive().getSheetByName("member");
  var data = sheet.getDataRange().getValues();
  var tmp = []
  for(var i = 0; i<data.length;i++){
    if(data[i][1] == name){
      tmp.push(data[i][2])
    }
  }
  return tmp
}
