
var $salesforce = {
	items : [],
	category : [],
	newItem : function(Name,Default_Category__c,Default_Price__c,Remarks__c){
		/* {	"attributes"	:	{"type":"Item__c","url":"/services/data/v34.0/sobjects/Item__c/a0L28000000JXrjEAG"},
		 * 	"Name"		:	"Tea",
		 * 	"Default_Category__c":	"a0O28000000IOc5EAG",
		 * 	"Default_Price__c":12,
		 * 	"Remarks__c":"",
		 * 	"Id":"a0L28000000JXrjEAG"
		 * }*/
		var new_item  = {};
		new_item.attributes = {type:"Item__c"};
		new_item.Name = Name;
		new_item.Default_Category__c = Default_Category__c;
		new_item.Default_Price__c = Default_Price__c;
		new_item.Remarks__c = Remarks__c;
		return new_item;
	},
	newCategory : function(Name){
		/* {	"attributes"	:	{"type":"Expense_Category__c",
		 * 				"url":"/services/data/v34.0/sobjects/Expense_Category__c/a0O28000000IOc5EAG"},
		 * 	"Name"		:	"Food",
		 * 	"Id"		:	"a0O28000000IOc5EAG"}
		 */
		var new_cat = {};
		new_cat.attributes = {type:"Expense_Category__c"};
		new_cat.Name = Name;
		return new_cat;
	},
	newCategoryMethod : function(Name){
		new_cat = $salesforce.newCategory(Name);
		$("#NEC_add").html("Please Wait");
		Visualforce.remoting.Manager.invokeAction('newDailyExpenseControllerClass.newExpenseCategory',
							  JSON.stringify(new_cat),
							  function(result,event){
								  $("#NEC_add").html("Add");
								  if(event.status){
									  $("#newExpenseCategoryDB").modal('hide');
								  }
								  else { alert('Error : Failed Insertion. Retry.');
								  }
							  });
	},
	newItemMethod : function(Name,Default_Category__c,Default_Price__c,Remarks__c){
		new_item = $salesforce.newItem(Name,Default_Category__c,Default_Price__c,Remarks__c);
		$("#NI_add").html("Please Wait");
		Visualforce.remoting.Manager.invokeAction('newDailyExpenseControllerClass.newItem',
							  JSON.stringify(new_item),
							  function(result,event){
								  $("#NI_add").html("Add");
								  if(event.status){
									  $("#newItemDB").modal('hide');
								  }
								  else { alert('Error : Failed Insertion. Retry.');
								  }
							  });
	}
};