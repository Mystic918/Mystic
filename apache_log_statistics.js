var fs = require('fs');
// 异步读取行文件
// var readline = require('readline');
// function readFileToArr(fReadName,callback){
//     var fRead = fs.createReadStream(fReadName);
//     var objReadline = readline.createInterface({
//         input:fRead
//     });
//    var arr = new Array();
//     objReadline.on('line',function (line) {
//         arr.push(line); 
//     });    
//     objReadline.on('close',function () { 
//         callback(arr);
//     });
// }
//////////////////////////////////////////////////////////////////////////////////  
// RmDuplicate2  相比  RmDuplicate  块  ，在结果为  96714 的情况下  RmDuplicate ： 17s ,RmDuplicate2: 11s
//去重   17
function RmDuplicate(arr){ 
	 var hash=[];
	 for(var i =0;i<arr.length;i++){
	 	// 判断是否存在  hash数组中  
	  if(hash.indexOf(arr[i])==-1){
      hash.push(arr[i]);
        }
	 }
	return hash;
}
// 中等     13s
function RmDuplicate1(arr) {
	// es6 新结构  Set 成员唯一性
    return Array.from(new Set([...arr]))
}
//高效去重  11s
function RmDuplicate2(arr){ 
	  //let arr = this.arr;
	  let result=[];
	  let obj ={}
	  for(let value of arr){
	  	if(!obj[value]){
	  		result.push(value);
	  		// 给对象设置一个key 唯一
	  		obj[value]=1;
	  	}
	  }
	  console.log(obj);	  
	  console.log(result);
	  return result;
}
 // 同步读取文件
function readFileLog(path){
	var data = fs.readFileSync(path);
	var content = data.toString();
	content= content.replace(/( - - )/g, "#!#").replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, "#!#").replace(/\s/g,"").replace(/\s/g,"");
	// console.log(content)
	var arr = content.split("#!#");
	var jsonarr = [];
	arr.forEach(function(value,index){
		if((index+2)%2==0){
			jsonarr.push(value);
		}
	});

	return RmDuplicate2(jsonarr).length;
}
//遍历目录下的的文件组成数组
function search(path){

	var arr = [];
	var list = fs.readdirSync(path);
	list.forEach(function(value,index){
		arr[index]=path+"/"+value;
	}); 
	return arr;
}
// 批量执行
function batch(arr){ 
	var number = 0 ;
  arr.forEach(function(value,index){
        number += readFileLog(value);  
  }); 
  console.log("规则：同一天IP只能出现一次。");
  console.log("访问量："+number+"条。")
}
// 调用方法
batch(search('./log'));
  
