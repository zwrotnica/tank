#pragma strict

var hitThreshold : float = 0.2;

var animationDelay:float = 0.1;
var speed:float = 0.05;


private var _targetFish : GameObject = null;
private var _healthState:HealthState = null;
private var _damage :float= 6;

function Start () {

}

function FollowTarget(){
	while(gameObject.activeInHierarchy && _targetFish !=null && _targetFish.activeInHierarchy){
		transform.position =Vector3.MoveTowards(transform.position, _targetFish.transform.position, speed);
		
		if ((transform.position - _targetFish.transform.position).magnitude < hitThreshold){
			_healthState.TakeLife(_damage);
			break;
		}
		yield WaitForSeconds(animationDelay);
	}
	gameObject.SetActive(false);
}

function SetDamage(newValue:float){
	_damage = newValue;
}

function SetTarget(newTarget:GameObject){
	if (newTarget==null || !newTarget.activeInHierarchy){
		return;
	}
	_healthState = newTarget.GetComponent.<HealthState>();
	_targetFish = newTarget;
	gameObject.SetActive(true);
	FollowTarget();
}
