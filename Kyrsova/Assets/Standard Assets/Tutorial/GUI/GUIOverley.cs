using UnityEngine;
using System.Collections;
using System;

public class GUIOverley : MonoBehaviour {
	
	public Texture2D TexOverley;
	public Texture2D TexBullet;
	
	void OnGUI()
	{
		GUI.Label (new Rect (0,Screen.height - 100 , (TexOverley.width), (TexOverley.height)), TexOverley);
	}
}
