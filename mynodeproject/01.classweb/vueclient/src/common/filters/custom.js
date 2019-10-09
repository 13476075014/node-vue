 /*这个文件夹是来做全局的过滤器*/
 
 let dateServer = (value,dd) => {
  //return value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
  return value + dd;
}
 
 
 //搜索的过滤器
 let dateServer2 = (value,s2) => {
 	
 	var result = [];
	if(!searchString) {
		return value;
	}

	searchString = searchString.trim().toLowerCase();
	result = value.filter(function(item) {
		if(item.title.toLowerCase().indexOf(searchString) !== -1) {
			return item;
		}
	});

	return result;
 }
 
 

 
 
export { dateServer }
