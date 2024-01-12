const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const getHtml = async() => {
    try{
        const html = await axios.get("https://school.koreacharts.com/school/meals/B000011300/202401.html")
        let ulList = []
        const $ = cheerio.load(html.data)
        const bodyList = $("table.table-bordered tbody tr")
        const days = document.querySelector(".days")
        const button = document.querySelectorAll("button")
        
        bodyList.map((i, element) => {
          const idx = i + 1
          const day = $(element).find("td.text-center:nth-child(1)").text().replace(/\s/g, " ")
          const week = $(element).find("td.text-center:nth-child(2)").text().replace(/\s/g, " ")
          const menu = $(element).find("td.text-center p").text().replace(/\s/g, " ")
          ulList[i] = {
            idx: idx,
            day: day,
            week: week,
            menu: menu
          }
          if(idx>18){
            button.forEach((e, idx)=>{
              if(idx=0){
                e.addEventListener("click", ()=>{
                  days.appendChild(`${day}일 ${week}`)
                })
              }
              if(idx=1){

              }
            })
            console.log(`test=> number:${idx} / ${day}일 ${week} | 메뉴: ${menu}`)
          }
        })
        // console.log("Meals Menu : ", ulList[idx])
    }catch(error){
        console.error(error)
        return null
    }
}
getHtml()

// function addItem (){
//   const days = document.querySelector(".days")
//   let getDate1 = document.createElement("div")
//   getDate1.classList.add('pushDay')
//   const getDate2 = document.createElement("div")
// }

app.listen(3000, function(){
    console.log('test')
})

app.get('/test', function(req, res){
    res.send('민트초코맛있어민트초코맛있어민트초코맛있어')
})
app.get('/', function(req, res){
    res.sendFile(__dirname+'/html/index.html')
})
app.get('/signUp.html', function(req, res){
  res.sendFile(__dirname+'/html/signUp.html')
})
app.get('/signIn.html', function(req, res){
  res.sendFile(__dirname+'/html/signIn.html')
})
app.get('/insert.html', function(req, res){
  res.sendFile(__dirname+'/html/insert.html')
})
app.get('/update.html', function(req, res){
  res.sendFile(__dirname+'/html/update.html')
})
app.get('/delete.html', function(req, res){
  res.sendFile(__dirname+'/html/delete.html')
})
app.get('/select.html', function(req, res){
  res.sendFile(__dirname+'/html/select.html')
})
