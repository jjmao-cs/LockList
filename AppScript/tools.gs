function onOpen() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var menuEntries = [{
            name: "更新網管權限",
            functionName: "Modify"
        }
    ];
    ss.addMenu("LOCK LIST", menuEntries);
    ss.toast('使用前請參照"說明"頁面.', "歡迎使用LOCK LIST", -1);
}

function run_function(num){
  switch(num){
    case 70: net70(); break;
    case 71: net71(); break;
    case 72: net72(); break;
    case 73: net73(); break;
    case 152: net152(); break;
    case 153: net153(); break;
    case 154: net154(); break;
    case 157: net157(); break;
    case 158: net158(); break;
  }
}

function Add_Efive(ss,efive){
  for(var i=0; i<efive.length; i++){
    var range = ss.getRange(efive[i]);
    var protection = range.protect().setDescription('工五館_' + (i+1));
    protection.removeEditors(protection.getEditors());
    protection.addEditors(PYTHON);
    protection.addEditors(SNMG);
    protection.addEditors(EFIVE);
  } 
}

function Add_Comm(ss,comm){
  for(var i=0; i<comm.length; i++){
    var range = ss.getRange(comm[i]);
    var protection = range.protect().setDescription('通訊系_' + (i+1));
    protection.removeEditors(protection.getEditors());
    protection.addEditors(PYTHON);
    protection.addEditors(SNMG);
    protection.addEditors(COMM);
  } 
}

function Add_Solid(ss,solid){
  for(var i=0; i<solid.length; i++){
    var range = ss.getRange(solid[i]);
    var protection = range.protect().setDescription('固電組_' + (i+1));
    protection.removeEditors(protection.getEditors())
    protection.addEditors(PYTHON)
    protection.addEditors(SNMG)
    protection.addEditors(SOLID)
  } 
}

function Add_Circuit(ss,circuit){
  for(var i=0; i<circuit.length; i++){
    var range = ss.getRange(circuit[i]);
    var protection = range.protect().setDescription('電子組_' + (i+1));
    protection.removeEditors(protection.getEditors())
    protection.addEditors(PYTHON)
    protection.addEditors(SNMG)
    protection.addEditors(CIRCUIT)
  }  
}

function Add_Sysbio(ss,sysbio){
    for(var i=0; i<sysbio.length; i++){
    var range = ss.getRange(sysbio[i]);
    var protection = range.protect().setDescription('系生組_' + (i+1));
    protection.removeEditors(protection.getEditors())
    protection.addEditors(PYTHON)
    protection.addEditors(SNMG)
    protection.addEditors(SYSBIO)
    }
}

function Add_Snmg(ss,snmg){
  for(var i=0; i<snmg.length; i++){
    var range = ss.getRange(snmg[i]);
    var protection = range.protect().setDescription('Snmg_' + (i+1));
    protection.removeEditors(protection.getEditors())
    protection.addEditors(PYTHON)
    protection.addEditors(SNMG)
  }
}

function Add_Protect(ss,private){
  for(var i=0; i<private.length; i++){
    var range = ss.getRange(private[i]);
    var protection = range.protect().setDescription('Private_' + (i+1));
    protection.removeEditors(protection.getEditors())
    protection.addEditors(PYTHON)
  } 
}

function remove_user(subnet) {
  // Remove editor by sheet
  var ss = SpreadsheetApp.getActive().getSheetByName(subnet)
  
  var protections = ss.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (var i = 0; i < protections.length; i++) {
    var protection = protections[i];
    if (protection.canEdit()) {
      protection.remove();
    }
  }  
}

function remove_all_user(){
  // Remove all editor
  var ss = SpreadsheetApp.getActive();  
  
  var protections = ss.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (var i = 0; i < protections.length; i++) {
    var protection = protections[i];
    if (protection.canEdit()) {
      protection.remove();
    }
  }
}

