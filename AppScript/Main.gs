function Modify(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var target = [70,71,72,73,152,153,154,158]
  ss.toast('使用管理者功能.誤觸請來信.', "管理者模式", -1);
  
  getMember()
  for ( var i=0; i<target.length; i++){
    remove_user(target[i].toString())
    run_function(target[i])
  }
  ss.toast('使用前請參照"說明"頁面.', "歡迎使用LOCK LIST", -1);
}