// パッケージ群を読み込む
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// ポート番号を指定する
var port = process.env.PORT || 3000;

app.use('/static', express.static(__dirname + '/public'));

// クライアント側のリクエストに対して、画面(htmlファイル)を返す
app.get('/', function(req, res){
  res.sendFile(__dirname + '/vibration.html');
});

// httpサーバーを立てる
http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function(socket){
  // クライアント側にボタンが押されたこと(spk=true)送る（emit）
  socket.on('c2s-spk', function(spk) {
      io.emit('s2c-spk', spk);
  });

});
