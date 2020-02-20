$( document ).ready(function() {
    var myLife = 3;
    myTable = $('.myTable').find('td');
    console.log(myTable)
    myTable.each(function (index) {
        if($(this).data('value') === 3){
            $(this).toggleClass("info myCell");
        }
        if($(this).index() === 5){
            $(this).toggleClass('borderRight');
        }
        if(index >= 55 && index <= 65){
            $(this).toggleClass('borderBot');
        }
        blockDetermination(  $(this).index(), $(this).parent().index(), $(this).parent().find('td'));
    })

    $('.myCell').click(function () {
        if(myLife>0 && $(this).hasClass("myCell")){
       if($(this).data('value') !== 1){
           $(this).html("<img  width='100%' src='/redCross.png'>");
           $(this).removeClass("myCell");
           decrementLife();
       }else{
           $(this).removeClass("myCell");
           $(this).addClass("block");
       }
        }
    });
    $('.myCell').mousedown(function(event) {
       if(event.which === 2 && myLife > 0 && $(this).hasClass("myCell")) {
           if($(this).data('value') === 1 ){
               $(this).removeClass("myCell");
               $(this).addClass("bg-danger");
               decrementLife();
           }else{
               $(this).html("<img width='100%' src='/close.png'>");
               $(this).removeClass("myCell");
           }
       }
    });
    function blockDetermination(x , y, myLine){
        ///ROWs
        let myXDeterm = "";
        let tempBlock = 0;
        //console.log("test");
        for (let i = 1 ; i <= 10 ; ++i ){
            if(myLine.eq(i).data('value') == "1")++tempBlock;
            else if(tempBlock!=0){
                myXDeterm += " "+tempBlock;
                tempBlock = 0;
            }
        }
        if(tempBlock !=0 )myXDeterm += " "+tempBlock;
        myLine.eq(0).text(myXDeterm);
        //COLs
        tempBlock = 0;
        var myYDeterm = "";
        var myWay = $(".myTable").find('tr');
        //console.log(myWay.eq(1).find('td').eq(2).data('value'));
        for (let i = 1 ; i <= 10 ; ++i ){
            if(myWay.eq(i).find('td').eq(x).data('value') == "1")++tempBlock;
            else if(tempBlock != 0){
                myYDeterm += tempBlock+"\n";
                tempBlock = 0;
            }
        }
        if(tempBlock !=0 )myYDeterm += tempBlock;
        var obj = myWay.eq(0).find('td').eq(x).text(myYDeterm);
        obj.html(obj.html().replace(/\n/g,'<br/>'));
    }

    function decrementLife(){
        myLife--;
        var myStringContainerLife = '';
        for(let i = 0 ; i < myLife; ++i){
            myStringContainerLife +=  '<img width="80px" src="/heart.png">';
        }
        for(let i = myLife ; i < 3; ++i){
            myStringContainerLife +=  '<img width="80px" src="/noheart.png">';
        }
        $('.life').html(myStringContainerLife);
        if(myLife===0){
            $('.myInterface').append('<a style="margin-top: 50px" href="/nonoGramDetails/'+ $('.myTable').data('id') +'" class="btn btn-outline-danger btn-block">Retry</a>');
            $('.myCell').removeClass('myCell');
        }

    }
});