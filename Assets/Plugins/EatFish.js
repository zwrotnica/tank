#pragma strict

var attackDelay:float = 1.5f;
var damage:float=10;

var attackAnimation : Animation=null;

var misslePrototype : GameObject = null;

var myHead : Transform = null;
var missileAmount : int = 5;
var fishTag = 'Fish';

private var _someMissiles : GameObject[] =null;
private var _fishInArea = new Array();//GameObject[]=null;

function Start () {
	InitMissles();
	GatherFish();
    FindAndEat();
}

function InitMissles(){
	_someMissiles = new GameObject[missileAmount];
	for(var i=0;i<missileAmount; ++i){
		var newMissile = Instantiate(misslePrototype);
		newMissile.SetActive(false);
		newMissile.GetComponent(HomingFish).SetDamage(damage);
		_someMissiles[i] = newMissile;
	}
}


function GatherFish(){
	 _fishInArea = 	GameObject.FindGameObjectsWithTag(fishTag);
	 Debug.Log(_fishInArea);
}

function FindAndEat(){   
    yield WaitForSeconds(attackDelay);
    var fishi = GetNextFish();
    while(fishi!=null && fishi.activeInHierarchy){ 	
        //while(_fishi!=null && _fishi.activeInHierarchy){
        //yield GoAndKill();        
        //}
		SpawnMissle(fishi);    
        yield WaitForSeconds(attackDelay);        
        fishi = GetNextFish();
    };
}

function GetNextFish(){
	var fishObject : GameObject = null;
	do{
		var index = Random.Range(0, _fishInArea.length-1);
		fishObject = _fishInArea[index] as GameObject;
		if (fishObject==null || !fishObject.activeInHierarchy){
			//_fishInArea.splice(index,1);
			_fishInArea.RemoveAt(index);
			fishObject = null;
		}
	}while(fishObject==null && _fishInArea.length>0);
	return fishObject;
}


function SpawnMissle(fishi:GameObject){
	var missile = TakeFirstInactiveMissle();
	if (missile==null) return;
	if (attackAnimation!=null){
		attackAnimation.Play("Attack");
		attackAnimation.PlayQueued("Idle");
	}  
	yield WaitForSeconds(0.6);  
	missile.GetComponent(Transform).position = myHead.position;
	missile.GetComponent(HomingFish).SetTarget(fishi);	
	//missile.SetActive(true);
}

function TakeFirstInactiveMissle(){
	for(var i=0;i<_someMissiles.length; ++i){
		if (!_someMissiles[i].activeInHierarchy){
			return _someMissiles[i];
		}
	}
	return null;
}