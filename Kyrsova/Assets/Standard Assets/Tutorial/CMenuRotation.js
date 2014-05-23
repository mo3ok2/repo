
//var y = position.y;
//var quaternionAngle = GameObject.transform.rotation;
var myTimer  = 5.0;
function Update () {
var Menu = GameObject.Find("Cylinder");
var rota = Menu.transform.rotation; 
while(Input.GetButtonDown("Fire1")){
Menu.transform.Rotate(Vector3.up *300);
}
while(Input.GetButtonDown("Fire2")){
Menu.transform.Rotate(Vector3.down *300);
}

 
//GameObject.transform.Rotate(Vector3.left * Time.deltaTime);
}



