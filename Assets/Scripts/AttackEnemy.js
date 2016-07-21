#pragma strict

var attackSpeed :float = 2;
private var _attackDelay:float = 1;
private var _setEnemyTargetDelay:float = 2;
private var _damage:float=1;

private var _floatingScript : Floating=null;

var _enemyTargetTag = 'EnemyTargetSpot';

private var _enemy :GameObject=null;
private var _enemyScript :HealthState=null;
private var _isInRangeToAttack : boolean = false;

function Start () {
    _attackDelay = 1/attackSpeed;
    _isInRangeToAttack=false;
    _floatingScript = gameObject.GetComponent(Floating);
    WaitForEnemy();
}


function WaitForEnemy(){
    while(_enemy==null){
        _enemy = GameObject.FindWithTag(_enemyTargetTag);
        yield WaitForSeconds(_attackDelay);
    } 
    _enemyScript = _enemy.transform.root.GetComponent(HealthState);
    ProceedTargetCoroutine();
    StrikeCoroutine();
}

function ProceedTargetCoroutine(){
    while(!_enemyScript.enabled){
   		yield WaitForSeconds(_setEnemyTargetDelay);
	}
	while(true){
    	if (_floatingScript.GetCurrentTarget() != _enemy ){
        	_floatingScript.SetTarget(_enemy);        
        }
    	yield WaitForSeconds(_setEnemyTargetDelay);
    }
}

function StrikeCoroutine(){
	while(!_enemyScript.enabled){
   		yield WaitForSeconds(_attackDelay);
	}
    	
    while(true){    	
        if(IsInAttackRange()){
            Strike();
        }
        yield WaitForSeconds(_attackDelay);
    }
}

function IsInAttackRange(){
	return (_floatingScript.GetCurrentTarget() == _enemy && _floatingScript.IsInTargetRange());
}

function Strike(){
    _enemyScript.TakeLife(_damage);
}

