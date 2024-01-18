__path = process.cwd()

let express = require('express'), router = express.Router(), yt = require('../lib/yt'), ytdl = require('../lib/ytdl'), ai = require('../lib/Ai'), buffer = require('../lib/function'), fs = require('fs'), dl = require('../lib/downloader'), gem = require('../lib/gemini'), stalk = require('../lib/tools')

router.get('/remini', async (req, res) => {
  let link = req.query.link
  let apikey = req.query.apikey
  if (!link) return res.json(global.status.link)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let buff = await buffer.getBuffer(link)
  let result = await ai.remini(buff)
  await fs.writeFileSync(__path +'/tmp/remini.jpg', result)
  await res.sendFile(__path +'/tmp/remini.jpg')
})

/*
Ai
*/
router.get('/aoi', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  ai.aoi(text).then(_ => {

  fs.writeFileSync(__path + '/tmp/aoi.mp3', _)
  })
  res.sendFile(__path + '/tmp/aoi.mp3')
 
})

router.get('/botika', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ai.botika(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/bard', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ai.bard(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/gptz', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ai.gptz(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/palm', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ai.palm(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/blackbox', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ai.blackbox(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/geminiAi', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await gem.geminiAi(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/bing-img', async (req, res) => {
  let text = req.query.text
  let apikey = req.query.apikey
  if (!text) return res.json(global.status.text)
    if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ai.bingimg(text)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})


/*
Downloader
*/

router.get('/spotify/search', async (req, res) => {
  let q = req.query.q
  let apikey = req.query.apikey
  if (!q) return res.json(global.status.query)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await dl.searching(q)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/spotify/dl', async (req, res) => {
  let link = req.query.link
  let apikey = req.query.apikey
  if (!link) return res.json(global.status.link)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await dl.spotifydl(link)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/video', async (req, res) => {
  let q = req.query.q
  let apikey = req.query.apikey
  if (!q) return res.json(global.status.query)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ytdl.video(q)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/yta', async (req, res) => {
  let url = req.query.url
  let apikey = req.query.apikey
  if (!url) return res.json(global.status.url)
  if (!url.match('youtu.be') && !url.match('youtube.com')) return res.json(global.status.invalidURL)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ytdl.ytmp3(url)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/spotify/dl', async (req, res) => {
  let link = req.query.link
  let apikey = req.query.apikey
  if (!link) return res.json(global.status.link)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await dl.spotifydl(link)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/tiktok', async (req, res) => {
  let link = req.query.link
  let apikey = req.query.apikey
  if (!link) return res.json(global.status.link)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await dl.tiktok(link)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/tiktok-search', async (req, res) => {
  let query = req.query.q
  let apikey = req.query.apikey
  if (!query) return res.json(global.status.query)
   if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await dl.tiktokS(query)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/ytv', async (req, res) => {
  let url = req.query.url
  let apikey = req.query.apikey
  if (!url) return res.json(global.status.url)
  if (!url.match('youtu.be') && !url.match('youtube.com')) return res.json(global.status.invalidURL)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await ytdl.ytmp4(url)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/yts', async (req, res) => {
  let q = req.query.q
  let apikey = req.query.apikey
  if (!q) return res.json(handle.query)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await yt.search(q)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

/*
stalker
*/
router.get('/tiktok-stalk', async (req, res) => {
  let q = req.query.q
  let apikey = req.query.apikey
  if (!q) return res.json(handle.query)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await stalk.tiktokStalk(q)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/instagram-stalk', async (req, res) => {
  let q = req.query.q
  let apikey = req.query.apikey
  if (!q) return res.json(handle.query)
  if (!apikey) return res.json(global.status.apikey)
  if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
  let result = await stalk.igStalk(q)
  res.header('Content-Type: application/json')
  res.type('json').send(JSON.stringify(result, null, 2))
  
})

module.exports = router