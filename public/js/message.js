/**
 * Created by Sehyeon on 2017-08-10.
 */
function postit(val) {
    var item={content:val.content.value, myname:val.myname.value, connum:val.connum.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/message/submit",
        data: item,
        success: function (data) {
            if (data == "clear")
                location.reload();
        }
    });
}
var serverURL = '192.168.0.5:3001';
var session  = $('#myname').val();
var connum = $('#connum').val();
$(document).ready(function()
{
    var item={msg_to:$('#msg_to').val(), connum:$('#connum').val()};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/message/msg_check",
        data: item,
        success: function (data) {
            if (data == "error")
                alert('메세지를 읽어오는 도중 오류가 발생했습니다.');
        }
    });
    var socket = io.connect(serverURL);
    socket.on('connection', function(data)
    {
        if(data.type === 'connected')
        {
            socket.emit('connection',
                {
                    type : 'join',
                    name : session,
                    room : connum
                });
        }
    });
    socket.on('message', function(data)
    {
        writeMessage('other', data.name, data.content);
    });
    $('#message-button').click(function()
    {
        var msg = $('#content').val();
        socket.emit('chat', { content:msg, myname:$('#myname').val(), connum:$('#connum').val(),msg_to:$('#msg_to').val()});
        writeMessage('me', session, msg);
        $('#content').val('');
    });
    function writeMessage(type, name, message)
    {
        var html = '<li class="you"><a rel="nofollow" href="#" class="user"><img alt="" src="../img/facebook_logo.png"/></a>' +
                    '<div class="date">2 minutes ago</div>' +
                    '<div class="message">' +
                    '<p>'+message+'</p>' +
                    '</div>' +
                    '</li>';
        if(type === 'me')
        {
            html='<li class="other"><a rel="nofollow" href="#" class="user"><img alt="" src="../img/google_logo.png"/></a>' +
                '<div class="date">2 minutes ago</div>' +
                '<div class="message">' +
                '<p>'+message+'</p>' +
                '</div>' +
                '</li>';
        }
        $(html).prependTo('.j-message');
    }
});
