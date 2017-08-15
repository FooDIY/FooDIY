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
var serverURL = '210.125.146.143:3001';
var session  = $('#myname').val();
var connum = $('#connum').val();
$(document).ready(function()
{

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
        socket.emit('chat', { content:msg, myname:$('#myname').val(), connum:$('#connum').val()});
        writeMessage('me', session, msg);
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
        $(html).appendTo('.j-message');
    }
});

