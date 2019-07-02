/**
 * 时间格式
 * @param {*} fmt 
 *          YYYY-MM-DD HH:mm:ss - 0  
 *          YYYY-MM-DD HH:mm - 1  
 *          YYYY-MM-DD - 2
 *          YYYY-MM - 3
 *          HH:mm:ss - 5 
 *          HH:mm - 6
 */
function queryFormat (fmt = 'YYYY-MM-DD HH:mm:ss') {
  let re = 0

  switch (fmt) {
    case 'YYYY-MM-DD':
        re = 2
        
        break;
    

    case 'YYYY-MM-DD HH:mm':
        re = 1
        
        break;
      
    case 'YYYY-MM':
        re = 3
        
        break;
        
    case 'HH:mm:ss':
        re = 5
        
        break;
    case 'HH:mm':
        re = 6
        
        break;
                      
    default:
      re = 0
      break;
  }
  

  return re
}

export {
  queryFormat
}