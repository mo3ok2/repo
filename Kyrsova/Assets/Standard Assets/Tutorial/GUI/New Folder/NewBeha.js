private var buttonName : String = "Play";
private var text : String;

function OnGUI() {

if(GUI.Button(new Rect(10,10,200,40), buttonName)) {

}

text = GUI.TextField(new Rect(10,100,200,40), text, 10);

if(GUI.Button(new Rect(10,200,200,40), "Apply")) {
buttonName = text;
}

}