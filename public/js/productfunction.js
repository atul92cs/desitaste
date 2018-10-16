$(document).ready(function(){
    $('.addbutton').on('click',function(){
       $.ajax({
           type:'POST',
           url:'/add/product',
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