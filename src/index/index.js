(function(){
    var global = this;
    var aa = 1;
    var cc = 2;
    document.querySelector('p').style.backgroundColor = 'lightblue';
    $.ajax({
        url:'/api/models',
        method:'get',
        dataType:'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){

    }).always(function(){

    });
})();