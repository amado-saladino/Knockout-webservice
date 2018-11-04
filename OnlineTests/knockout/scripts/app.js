$(document).ready(function () {

$.ajaxPrefilter(function( options, original_Options, jqXHR ) {
    options.async = true;
});

    $("#success-alert").hide();
    $("#divLoader").hide();


$("#btnCustomers").click( function(){

    loadpage("customerView.html");    
} );


$("#btnTests").click( function(){

    loadpage("testView.html");
} );

loadpage=function(page){


    $.ajax({            
			url:"html/" + page,			
            method:"GET",            
            success:function(data){
                $("#divLoad").html(data);               
            },
            error:function(data) { console.log(data);  }
        })

}


})