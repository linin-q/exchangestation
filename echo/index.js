const cloud = require('wx-server-sdk')

exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  const wxContext = cloud.getWXContext()
  // event.userInfo 是已废弃的保留字段，在此不做展示
  // 获取 OPENID 等微信上下文请使用 cloud.getWXContext()
  return {event,
          openid:wxContext.OPEXID,
          appid:wxContext.APPID,
          unionid:wxContent.UNIONID}
}
