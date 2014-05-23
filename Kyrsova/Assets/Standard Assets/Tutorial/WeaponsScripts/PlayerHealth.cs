using UnityEngine;
using System.Collections;

public class PlayerHealth : MonoBehaviour {
	

	public int myHealth = 100;
	private bool IsLife = true;
	
	
	
	void Start () {		
		if (myHealth < 10)
		myHealth = 10;
		}
	
	public void adjustHealth(int _health)
	{
		myHealth += _health;
		if (myHealth < 0)		
			myHealth = 0;
		
		if (myHealth == 0)
		{
			IsLife = false;
			Time.timeScale = 0;
			MouseLook _ml = GameObject.Find("Main Camera").GetComponent<MouseLook>();
			MouseLook _cl = GameObject.FindGameObjectWithTag("Player").GetComponent<MouseLook>();
			_ml.enabled = false;
			_cl.enabled = false;
			
		}
		
	}
	
	
	
}