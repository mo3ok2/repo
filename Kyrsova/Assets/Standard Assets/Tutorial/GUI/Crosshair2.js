var crosshairTexture : Texture2D; //силка на текстуру
var position : Rect;  // Прямокутник для текструи

function Start()
{//Наступний рядок задає параметри прямокутника
position = Rect((Screen.width - crosshairTexture.width)/2,(Screen.height - crosshairTexture.height)/2, crosshairTexture.width, crosshairTexture.height);
}
//Фунція промальовує прицел до центра екрану 
function OnGui()
{
GUI.DrawTexture(position, crosshairTexture);
}