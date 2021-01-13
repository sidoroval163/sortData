export const checkFieldsInObject = (object, array) =>
  array.every((item) => {
    let flag;

    if (item === 'date') {
      flag = !object[item];
    }
    if (item === 'supervisor') {

      flag = !object[item];
    }

    if (item === 'merchandiser') {

      flag = !object[item].length;
    }

    if (item === 'project') {

      flag = !object[item];
    }
    return flag;
  });
