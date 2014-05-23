function OnGUI () { 
 //GUI.Box (Rect (Screen.width/2 - 100,Screen.height/2 - 100,200,180), "Главное меню"); 
 if (GUI.Button (Rect (Screen.width/2 - 600,Screen.height/2 - 80,180,30), "Играть")) { 
             Application.LoadLevel ("1"); 
             } 
 if (GUI.Button (Rect (Screen.width/2 - 600,Screen.height/2 - 40,180,30), "Настройки")) { 
             } 
 if (GUI.Button (Rect (Screen.width/2 - 600,Screen.height/2 - 0,180,30), "Помощь")) { 
             } 
 if (GUI.Button (Rect (Screen.width/2 - 600,Screen.height/2 + 40,180,30), "Выход")) { 
             Application.Quit(); // выход 
             }} 