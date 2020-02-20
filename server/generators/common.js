var fs = require('fs');

/*

*/
app.getTab = function(count){
	let space = "";
	for(let i =0; i<count;i++){
		space+="  "
	}
	return space;
}

/*

*/
app.writeFile = function(rootDir,fileName,fileExt,fileContent){
	fs.writeFile( rootDir + fileName + fileExt, fileContent, function(err, data){
	    if (err) console.log(err);
	    console.log( " File Written " + rootDir + fileName + fileExt);
	});
}

app.createDirSync = function(rootDir){
	let dirs = rootDir.split("/");
	let coreDir = dirs[0];
	$.each(dirs,function(index,item){
		coreDir+= "/" + item ;
		if(!fs.existsSync(coreDir))
			fs.mkdirSync(coreDir);	
	}) 
}