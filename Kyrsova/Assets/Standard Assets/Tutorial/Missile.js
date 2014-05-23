var projectile : Rigidbody;
var speed = 20;

function Update(){
if (Input.GetButtonDown("Fire1")){

var instantiatedProjecile : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
instantiatedProjecile.velocity = transform.TransformDirection(Vector3(0,0,speed));
Physics.IgnoreCollision( instantiatedProjecile.collider, transform.root.collider);
}}
