  
'use strict';


var storesArray = []; 

var limaStore = {
  minCustomers : 2,
  maxCustomers : 16,
  averageCookiePerCustomer : 4.6,
  cookieArray : [],

  produceRandomCustomersPerHour : function(){
    var myRandomNum = getRandomIntInclusive(this.minCustomers, this.maxCustomers);
    return myRandomNum;
  },

  produceCookiesSoldAllDay : function(){
    for(var i = 0; i < 14; i++){
      var cookiesSoldThisHour = this.produceRandomCustomersPerHour() * this.averageCookiePerCustomer;
      var roundedCookies = Math.floor(cookiesSoldThisHour);

      this.cookieArray[i] = roundedCookies;
    }
  },


};

limaStore.produceCookiesSoldAllDay();



// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}


function CookieStore(min,max,avg,name) {
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.name = name;
  this.cookiesPerHourArray = [];
  this.total = 0;

  storesArray.push(this)
}

CookieStore.prototype.calculateCookiesSold = function(){
  return Math.ceil( (Math.random() * (this.max - this.min + 1) + this.min) * this.avg);
}

CookieStore.prototype.calculateHourlySales = function(){
for(var i = 0; i < 13; i++){
    var cookies = this.calculateCookiesSold();
    this.cookiesPerHourArray.push(cookies);
  }
}

CookieStore.prototype.calculateTotalCookiesPerStore = function(){
  for(var i = 0; i < 13; i++){
    this.total += this.cookiesPerHourArray[i];
  }
}

CookieStore.prototype.renderAsTable = function(){
  var tableElement = document.getElementById('stores');
  var rowElement = document.createElement('tr');
  var titleCellElement = document.createElement('th');
  titleCellElement.textContent = this.name;
  this.calculateHourlySales();
  tableElement.appendChild(titleCellElement);
  tableElement.appendChild(rowElement);
  rowElement.appendChild(titleCellElement);

  for(var i = 0; i < 13; i++){
    var hourlyCookieCellElement = document.createElement('td');
    hourlyCookieCellElement.textContent = this.cookiesPerHourArray[i];
    rowElement.appendChild(hourlyCookieCellElement);

  }
  var totalCellElement = document.createElement('td');
  this.calculateTotalCookiesPerStore();
  totalCellElement.textContent =this.total;
  rowElement.appendChild(totalCellElement);
  
};

function renderTotalRow(){
  var tableElement = document.getElementById('stores');
  var totalRow = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'total';
  totalRow.appendChild(thElement);

  for(var hour = 0; hour < 14; hour++){
  var totalForOnePm = 0;
  for(var storeIndex = 0; storeIndex < storeIndex.length; storeIndex++){
    totalForOnePm += storesArray[storeIndex].cookiesPerHourArray[0];
  }
}
  var hourlyTotalCell = document.createElement('td');
  hourlyTotalCell.textContent = totalForOnePm;
  totalRow.appendChild(hourlyTotalCell);

  var totalTotal = 0;
  for(var i = 0; i < storesArray.length; i++){
    totalTotal + storesArray[i].total;
  }
  var totalTotalCellElement = document.createElement('td');
  totalTotalCellElement.textContent = totalTotal;
  totalRow.appendChild(totalTotalCellElement);
  tableElement.appendChild(totalRow);


}

new CookieStore (23, 65, 6.3, 'Seattle');
new CookieStore (2, 16, 4.6, 'Lima');
new CookieStore (20, 38, 2.3, 'Paris');
new CookieStore (11, 38, 3.7, 'Dubai');
new CookieStore (3, 24, 1.2, 'Tokyo');

console.log(storesArray)

for(var i = 0; i < storesArray.length; i++){
storesArray[i].renderAsTable();
}

renderTotalRow();