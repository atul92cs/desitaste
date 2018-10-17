$('#updatemodal').on('show.bs.modal',function(e){
       var row=$(e.relatedTarget);
       var cursor=row.closest('tr');
       var id=cursor.find('td:eq(0)').text();
       var name=cursor.find('td:eq(1)').text();
       var price=cursor.find('td:eq(2)').text();
       var category=cursor.find('td:eq(3)').text();
         $(this).find(".j-id").val(id);
         $(this).find(".j-name").val(name);
         $(this).find(".j-category").val(category);
         $(this).find(".j-price").val(price);
      }); 
$('#updateeqmodal').on('show.bs.modal',function(e){
    var row=$(e.relatedTarget);
    var cursor=row.closest('tr');
    var id=cursor.find('td:eq(0)').text();
    var name=cursor.find('td:eq(1)').text();
    var phone=cursor.find('td:eq(2)').text();
    var email=cursor.find('td:eq(3)').text();
    var query=cursor.find('td:eq(4)').text();
    var status=cursor.find('td:eq(5)').text();
    $(this).find(".j-id").val(id);
    $(this).find(".j-name").val(name);
    $(this).find(".j-phone").val(phone);
    $(this).find(".j-email").val(email);
    $(this).find(".j-query").val(query);
    $(this).find(".j-status").val(status);
});