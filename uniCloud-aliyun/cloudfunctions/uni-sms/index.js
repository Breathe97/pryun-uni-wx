exports.main = async (event) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:event`, event);
  const { mobiles = [], templateId = '11836', type, code, expMinute } = JSON.parse(event.body)
  try {
    const res = await uniCloud.sendSms({
      appid: '__UNI__4011BA1',
      phoneList: mobiles,
      templateId, // 请替换为自己申请的模板id
      data: {
        name: `pryun:${type}`,
        code,
        expMinute,
      }
    })
    // 调用成功，请注意这时不代表发送成功
    return res
  } catch (err) {
    // 调用失败
    return err
  }
};