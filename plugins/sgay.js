const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  await m.reply(global.wait)
try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada foto'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let url = await uploadImage(img)
  let gay = `https://some-random-api.ml/canvas/gay?avatar=${url}`
  let stiker = await sticker(null, gay, 'Rainbow', '©AdiOfficial')
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
} catch (e) {
  m.reply('Conversion Failed')
  }
}

handler.help = ['sgay (reply)']
handler.tags = ['sticker']
handler.command = /^(sgay)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler
