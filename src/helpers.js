export const formatDate = (date) => {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
};

export const checkFieldsInObject = (object, array) =>
  array.every((item) => {
    let flag = true;

    if (item === 'date') {
      flag = object[item] === "";
    }
    if (item === 'supervisor') {

      flag = object[item] === '';
    }
    
    if (item === 'merchandiser') {
     
      flag = object[item].length === 0;
    }
   
    
   
    if (item === 'project') {
      
      flag = object[item] === '';
    }
    return flag;
  });
