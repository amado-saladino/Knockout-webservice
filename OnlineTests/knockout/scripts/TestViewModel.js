function TestViewModel(){

    self=this;
    self.tests=ko.observableArray();
    self.currentContext=ko.observable("home");
    self.testToAdd=ko.observable({GUID:"",TestName:""});
    self.selectedTest=ko.observable();
    self.EnableButtonAdd=ko.observable(false);
    self.EnableButtonUpdate=ko.observable(true);
    self.isLoaded=ko.observable(false);
    self.baseUrl=ko.observable("http://192.168.1.5:7777/api/tests/");


    self.loadTests=function(){
        
        self.sendAjaxRequest("GET");       
    }

    //Operations
    self.viewAll=function(){
        
        $("#divLoader").show();
        self.loadTests();
        self.currentContext("all");
    }

    self.goHome=function(){

        self.currentContext("home");
    }


    self.openDetails=function(test)
	{
        self.currentContext("details");
        self.selectedTest(test);
	}


    self.openDeleteDialog=function(test){

        self.selectedTest(test);
    }


    //Validate Update button
    self.UpdateTestOnKeyDown=function(){
        
        self.EnableButtonUpdate( $.trim(self.selectedTest().GUID).length > 0 &&
        $.trim(self.selectedTest().TestName).length > 0  );
    }

    //validate input to add
    self.AddTestOnkeyDown=function(){        

        self.EnableButtonAdd (  $.trim( self.testToAdd().GUID ).length > 0
        && $.trim( self.testToAdd().TestName ).length > 0 ) ;
    }


    //on Add Button click event handler
    self.AddTest=function(){

        self.sendAjaxRequest("POST");           
    }

    self.Delete=function(){

        self.sendAjaxRequest("DELETE");
    }

    self.Update=function(){

        self.sendAjaxRequest("PUT");
    }

    
    self.sendAjaxRequest=function(method){
        
        dataToSend={};
        dataType="json";
        //url="http://localhost/OnlineTests/api/tests";
        url=self.baseUrl();

        success=function(data) 
        {            
            self.tests(data);
            $("#divLoader").hide();
			self.isLoaded(true);
        }


        successNonGET=function() {

                $("#success-alert").show().fadeTo(2000, 0).slideUp("slow",function(){
                    $("#success-alert").fadeTo(1000,1).hide();
                }  );

                self.loadTests();

            }


        if (method=="POST"){

            dataToSend=self.testToAdd();

            success=successNonGET;

        } 
        else if (method=="DELETE"){

            //url="http://localhost/OnlineTests/api/tests/" + self.selectedTest().GUID;
            url=self.baseUrl() + self.selectedTest().GUID;
            dataToSend=self.selectedTest();
            
            success=successNonGET;

        }
        else if (method=="PUT"){

            //url="http://localhost/OnlineTests/api/tests/" + self.selectedTest().GUID;
            url=self.baseUrl() + self.selectedTest().GUID;
            dataToSend=self.selectedTest();
            success=successNonGET;
        }
        


        $.ajax({
            url:url,
            type:method,
            dataType:dataType,
            data:dataToSend,
            success:success,
            error:function(data) { console.log(data);  }
        });

    }

}


var testViewModel=new TestViewModel();
ko.applyBindings(testViewModel,
    document.getElementById('divTests')
);