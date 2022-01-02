function net158(){
  // Range in Sheet  // Modify if IP range changes
  var private = ['A:A','1:1','B182:D253']
  var snmg = ['B252:D253']
  var sysbio = ['B32:D61','B132:D146']
  var circuit = ['B2:D31','B62:D71','B102:D111','B147:D159']
  var solid = []
  var comm = ['B72:D101','B112:D131','B160:D181']
  var efive = []
  // End of Modify
  
  var ss = SpreadsheetApp.getActive().getSheetByName('158');
  
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