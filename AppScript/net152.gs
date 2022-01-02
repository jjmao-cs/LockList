function net152(){
  // Range in Sheet  // Modify if IP range changes
  var private = ['A:A','1:1'];
  var snmg = ['B2:D17','B252:D253'];
  var sysbio = [];
  var circuit = [];
  var solid = [];
  var comm = ['B18:D48','B64:D80','B107:D131','B152:D168','B187:D201','B205:D215','B217:D241'];
  var efive = ['B49:D63','B81:D106','B132:D151','B169:D186','B202:D204','B216:D216','B242:D251'];
  // End of Modify
  
  var ss = SpreadsheetApp.getActive().getSheetByName('152');
  
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