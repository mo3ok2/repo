var obj : GameObject; //Силка на префаб створюваного об*єкта
var readynow : boolean = true;
  
function Update () {
if(readynow)
{			   //Корутина це обєкт який може то використовуватись то ні,
			   //як пауза притому що він не заповільнює фпс в апдейті
			   
	MakeObj(); // В JS просто запускає корутину
}}

function MakeObj(){
readynow = false;
 Instantiate(obj, transform.position, transform.rotation); //створюєм об*єкт
 yield WaitForSeconds(Random.Range(10,250)); //Призупиняємо використання корутини на 2 сек
 readynow = true;
 }