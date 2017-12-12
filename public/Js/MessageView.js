var serverURL = '192.168.0.24:3002';
var session  = $('#myname').val();
var connum = $('#connum').val();
$(document).ready(function()
{
    $("#chatList").scrollTop($("#chatList")[0].scrollHeight);


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
        //메세지 보낸 시간 실시간변동
        var html =  '<div class="media"><div class="media-left media-bottom"><a href="#">'+
                    '<img src="../img/defaultProfile.png" alt="Avatar" class="right">'+
                    '</a>'+
                    '</div>'+
                    '<div class="media-body leftMessage">'+
                    '<div class="arrow_box">'+
                    '<p>'+message+'</p>'+
                    '<p class="date">2분전</p>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
        if(type === 'me')
        {
            html=   '<div class="media"><div class="media-body rightMessage"><div class="arrow_box">'+
                    '<p>'+message+'</p>'+
                    '<p class="date">2분전</p>'+
                    '</div>'+
                    '</div>'+
                    '<div class="media-right media-bottom">'+
                    '<a href="#">'+
                    '<img src="../img/defaultProfile.png" alt="Avatar" class="right">'+
                    '</a>'+
                    '</div>'+
                    '</div>';
        }
        $(html).appendTo('.messageDiv');
        $("#chatList").scrollTop($("#chatList")[0].scrollHeight);
    }
});
