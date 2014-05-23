using UnityEngine;

public class AutoTiling : MonoBehaviour
{
	void Start ()
	{
		float scaleX = transform.localScale.x;
		float scaleY = transform.localScale.y;
		renderer.material.SetTextureScale("_MainTex", new Vector2(scaleX, scaleY));
	}
}