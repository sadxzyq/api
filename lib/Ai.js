const fetch = require('node-fetch'), axios = require('axios'), FormData = require('form-data'), fs = require('fs'), { BingImageCreator } = require('./bing-img')


function aoi(Query) {
  return new Promise(async(resolve, reject) => {
    try {
    const formData = new FormData();
    formData.append("locale", 'id-ID');
    formData.append("content", `<voice name="ja-JP-AoiNeural">${Query}</voice>`);
    formData.append("ip", '38.46.219.162');
    const response = await fetch('https://app.micmonster.com/restapi/create', {
        method: 'POST',
        body: formData
    });
    resolve(Buffer.from(('data:audio/mpeg;base64,' + await response.text()).split(',')[1], 'base64'));
        
  } catch (error) {
  resolve({creator: global.creator, status: false, mssg: 'error bang'})
}
  })
}

function botika(value) {
	return new Promise(async(resolve, reject) => {
	
  const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const currentTime = new Date();
  const webhookUrl = 'https://webhook.botika.online/webhook/';
  const payload = {
    app: {
      id: "blaael9y3cu1684390361270",
      time: currentTime,
      data: {
        sender: {
          id: randomId
        },
        message: [
          {
            id: randomId,
            time: currentTime,
            type: "text",
            value: value,
          }
        ]
      }
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8'
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const webhookResponse = await response.json();

    if (webhookResponse) {
      const messages = webhookResponse.app.data.message;

      if (Array.isArray(messages)) {
        const responseMessages = messages.map((message) => message.value);
        const message = responseMessages.join('\n\n').replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
        resolve({creator: global.creator, status: true, message})
      }
    } else {
      console.error('Webhook error:', webhookResponse.error);
      return null;
    }
    
  } catch (error) {
            resolve({creator: global.creator, status: false})

    return null;
  }
  })
};

async function blackbox(text) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post('https://www.useblackbox.io/chat-request-v4', {
                text: text,
                allMessages: [{
                    user: text
                }],
                stream: '',
                clickedContinue: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux x86_64) Gecko/20130401 Firefox/71.3',
                }
            });
          let message = data.response[0][0]
          resolve({creator: global.creator, status: true, message});
        } catch (e) {
          resolve({creator: global.creator, status: false})
        }
    })
}

function remini(urlPath) {
  return new Promise(async (resolve, reject) => {
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/enhance";
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/enhance",
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data))
          });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}

    

function palm(text) {
  return new Promise(async(resolve, reject) => {
  try {
  const response = await axios.post('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDR-Vh4DcRCWg2MVgPmXSh-mBZKzO-DSJw', {
            prompt: {
                text: text
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

const result = response.data.candidates[0]
  function generateRandomIP() {
      const octet = () => Math.floor(Math.random() * 256);
      return `${octet()}.${octet()}.${octet()}.${octet()}`;
  }

  } catch (e) {
    resolve(e)
  }
  })
}

function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

async function gptz(content) {
  return new Promise(async (resolve, reject) => {
    
    
    const url = 'http://5awm.gpt.zw7.lol/chat.php';

    const data = {
        id: '3.5',
        web: '1',
        key: '',
        role: '',
        title: [{
                role: 'user',
                content: content
            },
            {
                role: 'assistant',
                content: 'You are a helpful assistant.'
            }
        ],
        text: content,
        stream: '0'
    };
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3',
                'Referer': 'http://5awm.gpt.zw7.lol/',
                'X-Forwarded-For': generateRandomIP(),
            }
        });
        let result = response.data;
      resolve({creator: global.creator, status: true, result});
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  })
}

function bard(query) {
  return new Promise(async (resolve, reject) => {
    try {
  const COOKIE_KEY = "fQg7UbP7XRbwK1_K0XJIQknqx9Xq1-lE9ne1B8URpw5-855XP5ftSo25aaI8UlMluVYqpw.";
  const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;
  const headers = {
    "Host": "bard.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://bard.google.com",
    "Referer": "https://bard.google.com",
    'Cookie': psidCookie
  };

  const bardRes = await fetch("https://bard.google.com/", { method: 'get', headers });
  const bardText = await bardRes.text();

  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];

  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, { method: 'post', headers, body: bodyData });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];

  let result = answer[0]
      resolve({creator: global.creator, status: true, result});
        
    } catch (e) {
resolve(e)
    }
  })
}

function bingimg(text) {
return new Promise(async (resolve, reject) => {
try {
		const res = new BingImageCreator({ cookie: "1RLnB0911LVIaji5bCpSsiULgVtZFe7hlsbpUQQX5Qlf933-oldaKK18GPuekDC5BtOBC8ozQukHiI5_c8MexLsYVu7JUUNi90erhRlE__KGJyTf6xLavagJrrLvTb7ouDlKKQ1iQnAE8vqbiFPHXGaclb67Ea6e0Yz7sBbchU_671dnZ-NAUsas89yYo3JunRFUPBoiBzseMpbPKIoXQWQ" });
		
		const data = await res.createImage(text);
  if (data.length > 0) {
    
		resolve({creator: global.creator, status: true, data})
  } else {
    resolve('prompt tidak dapat ditemukan ')
  }
		} catch (e) {
		resolve(e)
		}
})
}

exports.bingimg = bingimg
exports.gptz = gptz
exports.bard = bard
exports.palm = palm
exports.aoi = aoi
exports.remini = remini
exports.blackbox = blackbox
exports.botika = botika