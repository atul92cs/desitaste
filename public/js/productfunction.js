$(document).ready(function(){
     
    $('.deletebutton').on('click',function(e){
        $target=$(e.target);
        var row=$target.closest('tr');
        var id=row.find('td:eq(0)').text();
       $.ajax({
          
           type:'DELETE',
           url:'/delete/product/'+id,
           success:function(response){
               window.location.href='/panel';
           },
           err:function(err){
               console.log(err);
               window.location.href='/panel';
           }
           
       });
    });
    
});
