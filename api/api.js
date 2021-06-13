// 封装常用的功能
const db = wx.cloud.database();  //获取到云平台上的数据库
const _=db.command;
// 封装1 用来查询数据库的数据
// collectionName 集合名称
// where  查询条件
// skip  跳过几条
// limit 限制多少条
const find=function(collectionName,where={},skip=0,limit=20,targetType="click",sort="desc"){
  return new Promise((resolve,reject)=>{
    db.collection(collectionName).where(where).skip(skip).limit(limit).orderBy(targetType,sort).get().then(res=>{
      resolve(res);
    })
    .catch(err=>{
      reject(err);
    })
  })
}

// 封装云函数的调用方法
// name云函数名
// data要传递给云函数的数据
const callfun=function(name,data={}){
  return new Promise((resolve,reject)=>{
    wx.cloud.callFunction({
      name,
      data
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err);
    })
  })
}

// 封装2 图片上传 转码base64
const tobase64=function(imageList){
  return new Promise((resolve,reject)=>{
    let base64Arr=[];  //装转码成base64之后的图片路径
    if(imageList.length){
      //开始转码
      imageList.forEach(item=>{
      wx.getFileSystemManager().readFile({
        filePath:item ,     //选择图片的地址
        encoding:"base64", //转码格式
        success:(res)=>{
          base64Arr.push(res.data); 
          if(base64Arr.length>=imageList.length){
            resolve(base64Arr);
          }
        }
      })
    })

    }else{
      wx.showToast({
        title:'请选择图片',
       })
       return ;
    }
  })
}
  
//上传文件到云存储
const uploadCloud=function (base64Arr){
  return new Promise((resolve,reject)=>{
    let fileID=[]; //用来装云存储返回的fileID
    base64Arr.forEach(item=>{
      callfun("uploadFile",{
        base64Data:item
      })
      .then(res=>{
        // res就是图片上传成功后云函数返回的fileID
        fileID.push(res.result.fileID);
        if(fileID.length>=base64Arr.length){
          resolve(fileID);
        }
      })
    })
  })

}


// 暴露(导出)
module.exports={
  find,
  _,
  callfun,
  tobase64,
  uploadCloud
}
