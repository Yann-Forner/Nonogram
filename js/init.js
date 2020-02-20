$( document ).ready(function() {
   $(".myCell").click(function () {
       var myClickedCell = $(this);
       //console.log(  myClickedCell.index() + " " +myClickedCell.parent().data("row") );
       if(myClickedCell.data("value")=="0"){
           myClickedCell.data("value",1);
           myClickedCell.toggleClass("block");

       }else{

           myClickedCell.data("value",0);
           myClickedCell.toggleClass("block");

       }
       var myLine = myClickedCell.parent().find('td');
       //$('.myTable')[0].rows[0].cells[1].data('value')
       //console.log(myClickedCell.parent().find('.myCell').eq(0).data('value'));
       blockDetermination( myClickedCell.index(),myClickedCell.parent().data("row"),myLine);

   });

   $("#creationButton").click(function () {
        let myArray = [];
        let compteur  = 0;
        for(let i = 0 ; i < 10 ; ++i){
            myArray[i] = new Array(10);
            for (let j  = 0; j < 10 ; ++j){
                myArray[i][j] = $(".myCell").eq(compteur++).data('value');
            }
        }
        $.post("/importedNonoGram",{ "myArray": myArray, "nameNono" : $("#nameNono").val(), success : function () {
                return false;
            } });
       window.location = "/";
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
});