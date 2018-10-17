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