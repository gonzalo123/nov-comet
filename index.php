<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Comet Test</title>
    </head>
    <body>
        <p><a class='customAlert' href="#">publish customAlert</a></p>
        <p><a class='customAlert2' href="#">publish customAlert2</a></p>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js" type="text/javascript"></script>
        <script src="NovComet.js" type="text/javascript"></script>
        <script type="text/javascript">
NovComet.subscribe('customAlert', function(data){
    console.log('customAlert');
    //console.log(data);
}).subscribe('customAlert2', function(data){
    console.log('customAlert2');
    //console.log(data);
});

$(document).ready(function() {
    $("a.customAlert").click(function(event) {
        NovComet.publish('customAlert');
    });
    
    $("a.customAlert2").click(function(event) {
        NovComet.publish('customAlert2');
    });
    
    NovComet.run();
    
});
        </script>

    </body>
</html>