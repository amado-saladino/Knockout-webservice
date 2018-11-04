function CustomerViewModel(){


    self=this;
    self.PostHeader="application/x-www-form-urlencoded";
    self.customers=ko.observableArray();
    self.currentContext=ko.observable("home");
    self.customerToAdd=ko.observable("");
    self.EnableButtonAdd=ko.observable(false);
	self.isLoaded=ko.observable(false);

    self.selectedCustomer=ko.observable();

    //Operations
    self.viewAll=function(){
        self.currentContext("all");
        self.loadCustomers();
    }

    self.goHome=function(){

        self.currentContext("home");
    }
	
	self.openDetails=function(customer)
	{
        self.currentContext("details");
        self.selectedCustomer(customer);
	}


    self.openDeleteDialog=function(customer){

        self.selectedCustomer(customer);        
    }


    //validate input to add
    self.AddCustomerOnkeyDown=function(){        

        self.EnableButtonAdd (  $.trim( self.customerToAdd() ).length > 0 ? true : false  ) ;
    }


    self.sendXMLHttpReq=function(method){

        dataToSend="";
        xmlhttp=new XMLHttpRequest();

        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {                
                console.log(xmlhttp.responseText);
                $("#success-alert").show().fadeTo(2000, 0).slideUp("slow",function(){
                    $("#success-alert").fadeTo(1000,1).hide();
                }  );
                
                self.loadCustomers();
                if (method=="POST")
                    $("#txtAdd").val("");          
            }
            
        }

        xmlhttp.open(method,"http://localhost:8000/crud/HeroesWebservice/heroesOnline.php",true);

        if (method=="POST"){
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            dataToSend="name=" + self.customerToAdd();
        } 
        else if (method=="PUT")
            dataToSend="id=" + self.selectedCustomer().id + "&name=" + self.selectedCustomer().name;
        else if (method=="DELETE")
            dataToSend="id=" + self.selectedCustomer().id;
        
        xmlhttp.send(dataToSend);
    }


    //on Add Button click event handler
    self.AddCustomer=function(){

        self.sendXMLHttpReq("POST");
    }


    self.Update=function(){

        self.sendXMLHttpReq("PUT");
    }


    self.Delete=function(){

        self.sendXMLHttpReq("DELETE");
    }


    self.sendAjaxRequest=function(method){
        
        dataToSend="";
        dataType="json";
        success=function(data) 
        {            
            self.customers(data);
			self.isLoaded(true);
        }


        $.ajax({
            url:"http://localhost:8000/crud/HeroesWebservice/heroesOnline.php",
            type:method,
            dataType:dataType,
            data:dataToSend,
            success:success,
            error:function(data) { console.log(data);  }
        });

    }

    self.loadCustomers=function(){ 

        self.sendAjaxRequest("GET");       
    }


}


var customerViewModel=new CustomerViewModel();
ko.applyBindings(customerViewModel,
    document.getElementById('divCustomer')
);