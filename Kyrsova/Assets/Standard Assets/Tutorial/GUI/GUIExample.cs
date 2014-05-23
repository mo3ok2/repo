using UnityEngine;
using System.Collections;
using System;

public class GUIExample : MonoBehaviour {

	public Texture2D tex;

	void OnGUI()
	{
		GUI.Label (new Rect (((Screen.width )/2)-(tex.width)/2+5,((Screen.height )/2)- (tex.height)/2+5, (tex.width), (tex.height)), tex);
	}
}
