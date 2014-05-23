var horizontalSpeed = 2.0;
//var verticalSpeed = 2.0;
var speed = 2.0;
function Update ()
{
var rotation = Input.GetAxis ("Horizontal") * horizontalSpeed;
 var h = horizontalSpeed * Input.GetAxis ("Mouse X");
//    var v = verticalSpeed * Input.GetAxis ("Mouse Y");

if(Input.GetButton("Horizontal")){
    transform.Rotate (0, (h+rotation)/2, 0);
 }   
/* if(Input.GetButton("")){
    transform.Rotate (0, -(h+speed), 0);
 } */}  
/*
var translation = Input.GetAxis ("Vertical") * speed;
    var rotation = Input.GetAxis ("Horizontal") * rotationSpeed;
*/