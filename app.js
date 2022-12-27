//使用 require 載入 Express，執行後存成一個名為 app 的變數
const express = require('express')
const app = express()

//定義要使用連接埠號 (port number)  define server related variables
const port = 3000

// 設定在 Express 中使用的樣版引擎  require handlebars in the project
const exphbs = require('express-handlebars')

//將 JSON 檔案載入 Express 中
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定 Express 路由以提供靜態檔案  setting static files
app.use(express.static('public'))

//建立路由器  setting the route and corresponding response
app.get('/', (req, res) => {

  // 顯示動態資料 past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

//show頁面路由 抓不到id
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === req.params.id.toString())
  res.render('show', { restaurants: restaurant })
})


//search路由 
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//啟動並監聽伺服器 Listen the server when it started
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})