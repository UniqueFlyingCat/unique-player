var mList = [{
        id: '0',
        wyid: '452613551',
        type: 'mp3',
        name: 'Despacito',
        artist: 'Luis Fonsi/Daddy Yankee'
    }, {
        id: '1',
        wyid: '34040716',
        type: 'mp3',
        name: 'Visions',
        artist: 'Acreix'
    }, {
        id: '2',
        wyid: '29717271',
        type: 'mp3',
        name: 'Go_Time',
        artist: 'Mark_Petrie'
    }, {
        id: '3',
        wyid:'26289183',
        type: 'mp3',
        name: '加州旅馆',
        artist: 'Eagles'
    }, {
        id: '4',
        wyid:'27566759',
        type: 'mp3',
        name: '闷',
        artist: '王菲'
    }, ]
var music = function(mList, button) {
    $('#id-BGM')[0].pause()
    $(mList).each(function(i, e) {
            var src = `http://music.163.com/song/media/outer/url?id=${e.wyid}.${e.type}`
            var name = `${e.name} - ${e.artist}`
            var temp = `<div><music data-id=${e.id} data-src=${src} >${name}</music></div>`
            $('#id-BGM-mList').append(temp)
        })
    // 初始化 歌单
    $('#id-BGM').on('pause', function() {
        var play = $($('#id-BGM-play').children()[0])
        play.removeClass("fa-pause-circle")
        play.addClass("fa-play-circle")
        var home = $('#id-player')
        home.removeClass("fa-pause")
        home.addClass("fa-play")
    })
    $('#id-BGM').on('play', function() {
        var play = $($('#id-BGM-play').children()[0])
        play.removeClass("fa-play-circle")
        play.addClass("fa-pause-circle")
        var home = $('#id-player')
        home.removeClass("fa-play")
        home.addClass("fa-pause")
    })
    // 绑定 BGM 开关
    $('#id-BGM').on('playing', function(event) {
        var chang = $('#id-BGM')[0].duration
        $("#id-BGM-range").slider({ max: chang })
        var m = String(Math.floor(chang / 60))
        var s = String(Math.floor(chang % 60))
        if (m.length === 1) {
            m = '0' + m
        }
        if (s.length === 1) {
            s = '0' + s
        }
        $('#id-BGM-end').text(`${m}:${s}`)
        var id = event.target.dataset.id
        $('music').each( function(i, e) {
            if (e.dataset.id === id) {
                $(e).addClass('playing')
            } else {
                $(e).removeClass('playing')
            }
        })
    })
    // 当音乐开始播放 设置进度条最大长度 最大时间 和 当前播放CSS
    $('#id-BGM').on('timeupdate', function() {
             var now = event.target.currentTime
             var m = String(Math.floor(now / 60))
             var s = String(Math.floor(now % 60))
             if (m.length === 1) {
                 m = '0' + m
             }
             if (s.length === 1) {
                 s = '0' + s
             }
             $('#id-BGM-now').text(`${m}:${s}`)
             $("#id-BGM-range").slider({ value: now })
         })
    // 进度条
    $(".BGM").on('mousedown', function() {
       $('#id-BGM').off('timeupdate')
    })
    // 停止 进度条
    $("#id-BGM-range").on('mouseup', function() {
        var range = $("#id-BGM-range").slider("value")
        $('#id-BGM')[0].currentTime = range
    })
    // 跳转 进度
    $(".BGM").on('mouseup', function() {
        var volume = $("#id-BGM-volume").slider("value") / 100
        $('#id-BGM')[0].volume = volume
        $('#id-BGM').on('timeupdate', function() {
                 var now = event.target.currentTime
                 var m = String(Math.floor(now / 60))
                 var s = String(Math.floor(now % 60))
                 if (m.length === 1) {
                     m = '0' + m
                 }
                 if (s.length === 1) {
                     s = '0' + s
                 }
                 $('#id-BGM-now').text(`${m}:${s}`)
                 $("#id-BGM-range").slider({ value: now })
             })
        // 进度条
    })
    // 跳转 音量
    $("#id-BGM-mList").on('click', 'music', function(event) {
        var id  = event.target.dataset.id
        var src = event.target.dataset.src
        var player = $("#id-BGM")[0]
        player.src = src
        player.dataset.id  = id
        $(mList).each( function(i ,e) {
            if (e.id == id) {
                $('#id-BGM-name').text(e.name)
                $('#id-BGM-artist').text(e.artist)
            }
        })
    })
    // 歌单 点击 切歌
    $('#id-BGM-play').on('click', function(event) {
        var music = document.querySelector('#id-BGM')
        var bo = $('#id-BGM-play').children()
        if (music.paused) {
            music.play()
        } else {
            music.pause()
        }
    })
    // 播放 按钮
    $('#id-BGM-next').on('click', function(event) {
        var all = mList.length
        var old = Number($('#id-BGM')[0].dataset.id) + all
        var id = (old + 1) % all
        $(mList).each( function(i ,e) {
            if (Number(e.id) === id) {
                var player = $("#id-BGM")[0]
                player.src = `http://music.163.com/song/media/outer/url?id=${e.wyid}.${e.type}`
                player.dataset.id = id
            }
        })
        $(mList).each( function(i ,e) {
            if (e.id == id) {
                $('#id-BGM-name').text(e.name)
                $('#id-BGM-artist').text(e.artist)
            }
        })
    })
    // 播放 下一曲
    $('#id-BGM-last').on('click', function(event) {
        var all = mList.length
        var old = Number($('#id-BGM')[0].dataset.id) + all
        var id = (old - 1) % all
        $(mList).each( function(i ,e) {
            if (Number(e.id) === id) {
                var player = $("#id-BGM")[0]
                player.src = `http://music.163.com/song/media/outer/url?id=${e.wyid}.${e.type}`
                player.dataset.id = id
            }
        })
        $(mList).each( function(i ,e) {
            if (e.id == id) {
                $('#id-BGM-name').text(e.name)
                $('#id-BGM-artist').text(e.artist)
            }
        })
    })
    // 播放 上一曲
    $('#id-BGM-random').on('click', function(){
         var obj1 = $("#id-BGM-random-how")[0]
         obj1.setAttribute("style","color:#2FBAC0")
         var obj2 = $("#id-BGM-order-how")[0]
         obj2.setAttribute("style","")
    })
    $('#id-BGM-order').on('click', function(){
        var obj1 = $("#id-BGM-order-how")[0]
        obj1.setAttribute("style","color:#2FBAC0")
        var obj2 = $("#id-BGM-random-how")[0]
        obj2.setAttribute("style","")
    })
    //切换顺序按钮
        $('#id-BGM').on('ended', function(event , index) {
            var player = $("#id-BGM")[0]
            var all = mList.length
            var obj1 = $("#id-BGM-random-how")[0]
            if (obj1.style.color === "rgb(47, 186, 192)") {
                var old = player.dataset.id
                var id  = Math.floor(Math.random() * mList.length)
                // 随机播放
            }else {
                var old = Number(player.dataset.id) + all
                var id  = (old + 1) % all
                // 循环播放
            }
            $(mList).each( function(i ,e) {
                if (Number(e.id) === id) {
                    player.src = `http://music.163.com/song/media/outer/url?id=${e.wyid}.${e.type}`
                    player.dataset.id = id
                    $('#id-BGM-name').text(e.name)
                    $('#id-BGM-artist').text(e.artist)
                }
            })
        })
        //判断随机播放或者顺序播放
        $( document ).ready(function() {
          function createHoverState (myobject){
            myobject.hover(function() {
              $(this).prev().toggleClass('hilite');
            });
            myobject.mousedown(function() {
              $(this).prev().addClass('dragging');
              $("*").mouseup(function() {
                $(myobject).prev().removeClass('dragging');
              });
            });
          }
          $(".slider").slider({
            orientation: "horizontal",
            range: "min",
            max: 100,
            value: 0,
            animate: 1300
          })
          createHoverState($(".slider a.ui-slider-handle"))
          $("#id-BGM-volume").slider("value", 25)
        })
        //进度条滑动样式

}
music(mList, '#id-home')
