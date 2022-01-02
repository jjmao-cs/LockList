function net153(){
  // Range in Sheet  // Modify if IP range changes
  var private = ['A:A','1:1']
  var snmg = ['B142:D151','B252:D253']
  var sysbio = []
  var circuit = []
  var solid = []
  var comm = ['B2:D141','B152:D251']
  var efive = []
  // End of Modify
  
  var ss = SpreadsheetApp.getActive().getSheetByName('153');
  
  // Protect IP addr column and 1st row
  Add_Protect(ss,private)
  
  // Add Snmg Auth
  Add_Snmg(ss,snmg)
    
  // Add Sysbio Auth
  Add_Sysbio(ss,sysbio)
  
  // Add Circuit Auth
  Add_Circuit(ss,circuit)
  
  // Add Comm Auth
  Add_Comm(ss,comm)
  
  // Add Solid Auth
  Add_Solid(ss,solid)
  
  // Add Efive Auth
  Add_Efive(ss,efive)
  
}