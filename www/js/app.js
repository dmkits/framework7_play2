
// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  theme: 'auto', // Automatic theme detection
  routes: routes
});

 //Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  domCache:true
});

//Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  if(!(username=="user" && password=='123') ){
    app.dialog.alert("Неверное имя или пароль","", function(){
      $$('#my-login-screen [name="username"]').val("");
      $$('#my-login-screen [name="password"]').val("");
    });
  }else
    mainView.router.navigate('/main_content/');
});


var rowNum=1;
function onkeypressFunction(keyCode){
  if(keyCode==13){
    createTableRow();
  }
}

function createTableRow(){
  var barcode=$$("#barCodeInput").val();
  if(document.getElementById(barcode)){
    document.getElementById(barcode).innerText=parseInt(document.getElementById(barcode).innerText)+1;
    document.getElementById("barCodeInput").value='';
    return;
  }
  var mainTable=document.getElementById('inventoryTable');
  var trHigher=document.createElement('tr');
  var tdRowNum=document.createElement('td');
  var tdProdName=document.createElement('td');

  tdRowNum.innerText=rowNum.toString();
  tdRowNum.className='text-centered';

  tdProdName.innerText="Товар со штрих-кодом "+barcode;
  tdProdName.className="blue-text";
  trHigher.appendChild(tdRowNum);
  trHigher.appendChild(tdProdName);

  var trLower=document.createElement('tr');
  var tdBarCode=document.createElement('td');
  var tdUm=document.createElement('td');
  var tdRef=document.createElement('td');
  var tdReal=document.createElement('td');
  tdReal.id=barcode;
  tdReal.onclick=  function(){
    showRealQtyFunction(this, this.innerText.trim(),tdProdName.innerText);
  };

  tdBarCode.innerText=barcode;
  tdUm.innerText='шт';
  tdRef.innerText='1';
  tdReal.innerText='1';

  tdUm.className='text-centered';
  tdRef.className='text-right';
  tdReal.className='text-right';

  trLower.appendChild(tdBarCode);
  trLower.appendChild(tdUm);
  trLower.appendChild(tdRef);
  trLower.appendChild(tdReal);

  mainTable.appendChild(trHigher);
  mainTable.appendChild(trLower);
  tdRowNum.rowSpan='2';
  tdProdName.colSpan='4';

  document.getElementById("barCodeInput").value='';
  rowNum++;
}

function showRealQtyFunction(cell,displayedQty, prodName){
  var el='<br><input id="inputRealQty" type="number" style="text-align:center" value="'+displayedQty+'"></<input>';
  var realQtyDialog=app.dialog.create({
    content:el,
    title: 'Фактический остаток',
    text:prodName,
    on:{
      open:function(){
        unfocusBarcodeInput()
      },
      close:function(){
        focusBarcodeInput()
      },
      opened:function(){
        document.getElementById("inputRealQty").focus();
      }
    },
    buttons:[
      {
        text:"ОТМЕНА",
        onClick:function(){
          realQtyDialog.close();
        }
      },
      {
        text:"ВВОД",
        keyCodes:[13],
        onClick:function(){
          cell.innerText=document.getElementById("inputRealQty").value.trim() || 0;
          realQtyDialog.close();
        }
      }
    ]
  });

  realQtyDialog.open('');
}
function unfocusBarcodeInput(){
  var barcodeInput=document.getElementById("barCodeInput");
  barcodeInput.onblur=function(){};
  barcodeInput.blur();
}
function focusBarcodeInput(){
  var barcodeInput=document.getElementById("barCodeInput");
  barcodeInput.onblur=barcodeInput.focus();
}