#pragma strict

var initHealth:float=100;
private var _health:float=initHealth;

var yOffsetPosition:float=0.85;

private var healthBarObject : GameObject =null;
private var healthBar :UnityEngine.UI.Slider=null;

var worldSpaceCanvas:GameObject=null;
var healthBarPrefab : GameObject=null;

var barSpeedModifier:float = 1;

function Start () {
	_health=initHealth;
    if (worldSpaceCanvas==null){
        worldSpaceCanvas = GameObject.FindWithTag("WorldSpaceCanvas");
    }
    InitHealthBar();
    healthBar.value = CalculateBarHealth();
    FollowLife();
}

function Update () {

}

function InitHealthBar(){
    healthBarObject = Instantiate(healthBarPrefab, new Vector3(0,yOffsetPosition,0) + transform.position,  Quaternion.identity);
    healthBarObject.transform.SetParent ( worldSpaceCanvas.transform,true);
    healthBar = healthBarObject.GetComponent(UnityEngine.UI.Slider);
}

function FollowLife(){
    while(_health>0){
        //healthBar.value= _health;
        healthBarObject.transform.Translate((transform.position - healthBarObject.transform.position + new Vector3(0,yOffsetPosition,0))* Time.deltaTime*barSpeedModifier, Camera.main.transform);
        yield;// WaitForSeconds(0.2);
    }
    Destroy(gameObject);
    Destroy(healthBarObject);
}

function TakeLife(damage:float){
    //Debug.Log("Life!");
    _health -= damage;
    healthBar.value= CalculateBarHealth();
//    Debug.Log(healthBar.value);
}

function CalculateBarHealth(){
    return _health/initHealth;
}


function GainHealth(healthGain:float){
	_health += healthGain;
}
