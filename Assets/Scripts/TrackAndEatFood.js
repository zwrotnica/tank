#pragma strict


//audio
var eatSound:AudioSource =null;


var jawSize:float = 0.04;//how big chunk of food can take
var eatingSpeed : float = 1;//frequency of biting, bites per second


var _floatingScript : Floating=null;
var _healthStateScript  : HealthState=null;

private var _pauseBetweenBites : float=-1;

private var _foodSearchDelay:float = 1.5;

private var _closestFood:GameObject=null;

private var FeedTag="Feed";


function Start () {
    eatSound = GetComponent(AudioSource);
    _pauseBetweenBites = 1/eatingSpeed ;
    LookForFood();
    TryEat();
}

function TryEat(){
    yield WaitForSeconds(Random.value * 2);
    while(_floatingScript.IsAlive()){
        var closestFood = _closestFood;
        if (closestFood!=null && _floatingScript.GetCurrentTarget() == closestFood && _floatingScript.IsInTargetRange() ){
            if (eatSound!=null && Random.value >0.7){
                eatSound.Play();
            }
            var foodBite = closestFood.GetComponent.<FeedInitialization>().GetBite(jawSize);
            DigestFood(foodBite);
           // Debug.Log(foodBite.calories);
        }
        yield WaitForSeconds(_pauseBetweenBites);
    }
}

function DigestFood(foodBite:TastyBite){
	if (_healthStateScript==null) return;
	_healthStateScript.GainHealth(foodBite.healthGain);
}

function LookForFood(){
    while(_floatingScript.IsAlive()){
        FindClosestFood();
        yield WaitForSeconds(_foodSearchDelay);
    }
}

function FindClosestFood(){
    var minDistance :float= float.MaxValue;
    _closestFood = null;

    var feedInTank = GameObject.FindGameObjectsWithTag(FeedTag);
    for (var feed: GameObject in    feedInTank) {
		if ((transform.position - feed.transform.position).magnitude < minDistance){
            minDistance = (transform.position - feed.transform.position).magnitude;
            _closestFood = feed;
    }
}
_floatingScript.SetTarget(_closestFood);        

}


