/* Angular JS Controller
 * 
 * 
 * To Remove Element From Array use  arrayName.splice(index,howmany);
 */
var app = angular.module('App', []);
app.controller('AppController', function($scope) {
    //Scope Variables
    $scope.todaysDate = new Date();
    $scope.day = $scope.todaysDate.getDay();
    $scope.plist = [];
    $scope.ShoppingList = [new NewShoppingList(0,'Generic List','',0)];
    $scope.list = [{id : 0,active : true}];
    $scope.NumberOfShoppingList = 1;
    $scope.UniqueID = 0;
    $scope.ActiveShoppingListId = 0;
    $scope.ItemListView = [];
    $scope.ItemList = [];
    $scope.cartSize = 0;
    $scope.TotalDailyAmount = 0;
    
    //Scope Dynamic Variables
    $scope.dayname = function(){
	    day = $scope.todaysDate.getDay();
	    switch(day) {
		case 1 : return "Monday" ;
		case 2 : return "Tuesday" ;
		case 3 : return "Wednesday" ;
		case 4 : return "Thursday" ;
		case 5 : return "Friday" ;
		case 6 : return "Saturday" ;
		case 0 : return "Sunday" ;
	    }
    };
    $scope.datename = function(){
		mon = $scope.todaysDate.getMonth();
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		var n = month[mon];
		var dat = $scope.todaysDate.getDate();
		var year = $scope.todaysDate.getFullYear();
		return n + " " + dat + ", " + year;
		
    };
    $scope.TotalDailyAmount = function(){
	    total = 0;
	    for(i=0;i<$scope.ShoppingList.length;i++){
		    total = total + $scope.ShoppingList[i].Amount;
	    }
	    return total;
    };
    
    //Scope Method - Add Methods
    $scope.addShoppingList = function(){
		$scope.UniqueID = $scope.UniqueID + 1;
		$scope.ShoppingList.push(new NewShoppingList($scope.UniqueID,$scope.shoppingListName,$scope.expenseCategory,0));
		$scope.NumberOfShoppingList = $scope.ShoppingList.length;
		$scope.list.push({id:$scope.UniqueID,active:false});
		$scope.changeActiveShoppingList($scope.list.length-1);
		$scope.ActiveShoppingListId = $scope.UniqueID;
    };
    $scope.addItem = function(){
	    newItem = new AddItem($scope.newPLitemName,$scope.newPLprice,$scope.newPLcategory,$scope.newQuantity,$scope.ActiveShoppingListId);
	    $scope.ItemListView.push(newItem);
	    $scope.ItemList.push(newItem);
	    $scope.cartSize = $scope.ItemListView.length;
	    $scope.updateTotalShoppingAmount($scope.ActiveShoppingListId);
	    //$scope.TotalDailyAmount();
    };
	

    //Scope Method - Clear Methods
    $scope.clearNewShoppingList = function(){
	    $scope.shoppingListName = '';
	    $scope.expenseCategory = '';
    };
    $scope.clearAddItem = function(){
	    $scope.newPLitemName = '';
	    $scope.newPLprice = 0;
	    $scope.newPLcategory = '';
	    $scope.newQuantity = 1;
    };
    $scope.clearNewItem = function() {};
    $scope.clearNewExpenseCategory = function() {};

    //Scope Method - New Methods
    //Scope Method - Update Methods
    $scope.changeActiveShoppingList = function(id){
	    for(i=0;i<$scope.list.length;i++)
	    {
		    if($scope.list[i].id == $scope.ActiveShoppingListId)
		    {
			    $scope.list[i].active=false;
		    }
	    }
	    $scope.ActiveShoppingListId = $scope.list[id].id;
	    console.log(id);
	    console.log($scope.ActiveShoppingListId);
	    $scope.list[id].active = true;
	    $scope.updateItemListView();
    };
    $scope.updateItemListView = function(){
	    id = $scope.ActiveShoppingListId;
	    $scope.ItemListView = [];
	    for(i=0;i<$scope.ItemList.length;i++)
	    {
		if($scope.ItemList[i].shoppingListId == id){
			$scope.ItemListView.push($scope.ItemList[i]);
		}
	    }
	    $scope.cartSize = $scope.ItemListView.length;
    };    
    $scope.updateTotalShoppingAmount = function(id){
	    Amount = 0;
	    for(i=0;i<$scope.ItemListView.length;i++)
	    {
		Amount += $scope.ItemListView[i].Total;
	    }
	    for(i=0;i<$scope.NumberOfShoppingList;i++)
	    {
		if($scope.ShoppingList[i].Id == id){
			$scope.ShoppingList[i].Amount = Amount;
		}
	    }
	    console.log($scope.NumberOfShoppingList);
    };
    
    //Scope Method - Remove Methods
    $scope.removeActiveShoppingList = function(){
	    if($scope.ActiveShoppingListId == 0) {
		alert('Cannot remove Generic List');
		return false;
	    }
	    else {
		for(i=0;i<$scope.ShoppingList.length;i++)
		{
			if($scope.ShoppingList[i].Id==$scope.ActiveShoppingListId)
			{
				$scope.ShoppingList.splice(i,1);
				$scope.list.splice(i,1);
				break;
			}
		}
		$scope.ActiveShoppingListId = 0;
		$scope.changeActiveShoppingList($scope.ActiveShoppingListId);
	    }
	    $scope.NumberOfShoppingList = $scope.ShoppingList.length;
    };
    $scope.removeSelectedItem = function(){
	    $scope.NotAvailable();
    };
    $scope.removeAllItemFromList = function(){
	    for(i=0;i<$scope.ItemList.length;i++)
	    {
		    if($scope.ItemList[i].shoppingListId == $scope.ActiveShoppingListId) {
			    $scope.ItemList.splice(i,1);
			    i = i-1;
			    continue;
		    }
	    }
	    $scope.updateItemListView();
	    $scope.updateTotalShoppingAmount($scope.ActiveShoppingListId);
    };
    
    //Scope Method - Global Action
    $scope.quicksave = function() {$scope.NotAvailable();};
    $scope.save = function() {$scope.NotAvailable();};
    $scope.cancle = function() {location.href="https://ap2.salesforce.com/";};
    $scope.NotAvailable = function() {alert("Feature Not Available");};
    
    //Scope Method - RemoteAction Methods
    $scope.notifySalesforce = {
	    newExpenseCategory : function() {
			n = $salesforce.newCategoryMethod($scope.newCategoryName);
	    },
	    newItem : function() {
			n = $salesforce.newItemMethod($scope.newItemName,$scope.newItemCategory,$scope.newItemPrice,$scope.newItemRemarks);
	    }
	    
    };
    
});

function NewShoppingList(Id,Name,ExpenseCategoryId,Amount) {
	this.Id = Id;
	this.Name = Name;
	this.ExpenseCategoryId = ExpenseCategoryId;
	this.Amount = Amount;
	return this;
}

function AddItem(itemName,price,category,Quantity,Id) {
	this.Name = itemName;
	this.Price = price;
	this.Category = category;
	this.Quantity = Quantity;
	this.Total = price*Quantity;
	this.shoppingListId = Id;
	return this;	
}
