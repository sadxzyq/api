const axios = require('axios'), cheerio = require('cheerio')

 function tiktokStalk(user) {
    return new Promise(async (resolve, reject) => {
    try {
  const { data } = await axios.get(`https://urlebird.com/user/${user}/`)
  
  let $ = cheerio.load(data), result = {}
  
  result.pp_user = $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src')
  result.name = $('h1.user').text().trim()
  result.username = $('div.content > h5').text().trim()
  result.followers = $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1]
  result.following = $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1]
  result.description = $('div.content > p').text().trim()
      
  resolve({creator: global.creator, status: true, result})
      
  } catch (e) {
  resolve(e)
  }
})
}

function igStalk(user) {
  return new Promise(async (resolve, reject) => {
    try {
const { data } = await axios.get(`https://instasupersave.com/api/ig/userInfoByUsername/${user}`)
      
        const res = data.result.user
        
        const result = {
         Username :  res.username, 
         Fullname :  res.full_name, 
         Post_count :  res.media_count, 
         Followers :  res.follower_count, 
         Following :  res.following_count,
         Verifed :  res.is_verified,
         Private :  res.is_private,
         external_url :  res.external_url, 
         Biography :  res.biography,
         thumbnail: res.hd_profile_pic_url_info.url
        }
      
        resolve({creator: global.creator, status: true, result})
      
        } catch (e) {
        resolve(e)
        }
        })
}

exports.igStalk = igStalk
exports.tiktokStalk = tiktokStalk