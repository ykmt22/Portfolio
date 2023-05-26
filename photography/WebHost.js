var filelinks = [];
var mimeTypes = ["image/png","image/jpeg","image/gif","image/bmp"];


function doGet(e) {
  var fid;
  if(e.parameters.fid==undefined){
    fid='1h-4dGD1Q3QjTbgIweDgjEO38X-wZmoKO';
  }
  else{
    fid = e.parameters.fid[0];
  }
  var data=imageItems(fid);
  return buildSuccessResponse(data, 1);
}

function imageItems(folderid){
  var folder = DriveApp.getFolderById(folderid);
  var files = folder.getFiles();

  while(files.hasNext()){
    var file = files.next();

    if(mimeTypes.indexOf(file.getMimeType())!=-1){
      var filelink = {};
      filelink['img_id'] = file.getId();
      filelink['name']=''
      filelink['folder_id']=folderid;
      console.log(filelink['img_id']+"---folder:"+filelink['folder_id']+"\n\n");
      filelinks.push(filelink);
    }
  }
  return filelinks;
}

function buildSuccessResponse(posts, pages){
  var output= JSON.stringify({
    status: 'success',
    data: posts,
    pages: pages
  });

  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}



// save and deply this as .gs file in GDrive