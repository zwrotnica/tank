#pragma strict

var yForceModifier = 5;
var xForceModifier = 3;

private var _moveVector :Vector3=Vector3.zero;
var yVectorModifier=5;
var xVectorModifier=5;


private var _currentTarget:GameObject= null;
private var _hasTarget:boolean=false;

private var _isInMoveState :boolean = false; //states of fish: moves or stops

private var _leftBorder:float;
private var _rightBorder:float;
private var _topBorder:float;
private var _bottomBorder:float;

/*delays*/
private var _stateChangeDelay= 1;

var _liveDelay: float=0.2;
var _collisionDelay=0.2;


var maxVelocity = 5;

/*target variables*/
private var _destinationPosition:Vector3=Vector3.zero;
private var _destinationPositionOnPlaneZ:Vector3=Vector3.zero; //position of food on same Z plane as fish


//flags
private var _isAlive:boolean=true;
private var _isInTargetRange=false;

private var FeedTag="Feed";


function Start () {
    InitBoundaries();  
   
    // Debug.Log('_pauseBetweenBites: '+_pauseBetweenBites);
    ChangeState();
    RunBehaviour();   
    CheckCollisionHit();
    //  SwimtAndEat();
    //Test();
}

function Test(){
    while(true){
        Debug.Log('test1: '+Time.time);
        yield Test2();
        yield Test3();
        Test4();
        yield WaitForSeconds(3.5);
    }
}

function Test2(){
    Debug.Log("test2: "+Time.time);
    yield;
}

function Test3(){
    Debug.Log("test3: "+Time.time);
    yield;
}
function Test4(){
    Debug.Log("test4: "+Time.time);
    yield;
}

function Update () {
    //if (fishIsNotMoving){
    //RunBehaviour();
    //}    
    DrawDebug();
}

function DrawDebug(){
    if (_hasTarget){
        Debug.DrawLine(transform.position, _destinationPosition, Color.red);
    }
}

function InitBoundaries(){
    //Debug.Log("z pos: "+RelativeBackgroundPosition.position);
    //Debug.Log("camera pos: "+Camera.main.transform.position);
    //var dist = (transform.position - Camera.main.transform.position).z;
    //  Debug.Log("dist: "+dist);
    var topPanel = GameObject.FindWithTag("TopPanel");
    var topScreenBorder = topPanel!=null? topPanel.GetComponent(RectTransform).anchorMin.y : 1;

    var distance = Camera.main.transform.InverseTransformPoint(transform.position).z;
    //    Debug.Log("distance: "+distance);
    //    Debug.Log("near plane : "+Camera.main.nearClipPlane);
    _leftBorder = Camera.main.ViewportToWorldPoint(Vector3(0, 0.5f, distance)).x+1;
    _rightBorder = Camera.main.ViewportToWorldPoint(Vector3(1, 0, distance)).x-1; 
    _bottomBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 0, distance)).y+1; 
    _topBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, topScreenBorder, distance)).y-1;

    //   Debug.Log("left border: "+_leftBorder);
    //    Debug.Log("right border: "+ _rightBorder);
    //    Debug.Log("top border: "+ _topBorder);
    //    Debug.Log("bottom border: "+ _bottomBorder);
}

function RunBehaviour(){
    while(_isAlive){
        //Debug.Log('RunBehaviour');      
        if (_hasTarget){
            CalculateVectorToTarget();
        }
        yield Float();        
        yield WaitForSeconds(_liveDelay);
    }
}

function Float(){
    if (_hasTarget && (_currentTarget==null || !_currentTarget.activeInHierarchy)){
        _hasTarget = false;
}
    if(_hasTarget || _isInMoveState){
        //Debug.Log('IdleFloat');
        yield Swim();
    }
    }


function  Swim(){
    // Debug.Log('max velo: '+gameObject.GetComponent(Rigidbody).velocity.magnitude);  
    //    Debug.Log("dot: "+Vector3.Dot(gameObject.GetComponent(Rigidbody).velocity.normalized, moveVector.normalized));
    // Debug.Log(Time.deltaTime);
    if (gameObject.GetComponent(Rigidbody).velocity.magnitude < maxVelocity  ||  Vector3.Dot(gameObject.GetComponent(Rigidbody).velocity.normalized, _moveVector.normalized) < 0.99)
        gameObject.GetComponent(Rigidbody).AddForce(_moveVector*_liveDelay);// * Time.deltaTime/4);//,ForceMode.Impulse );
    yield;
    //gameObject.transform.Translate(moveVector * Time.deltaTime, Space.World)   ; 
}


    function CheckCollisionHit(){
        while(_isAlive){
            if (        (transform.position.x <= _leftBorder) && GetComponent.<Rigidbody>().velocity.x < 0f){
                GetComponent.<Rigidbody>().velocity = new Vector3(0,GetComponent.<Rigidbody>().velocity.y/2,0); // Vector3.zero;//(-rigidbody.velocity.x, rigidbody.velocity.y, 0);
                    //  _wallHit=3;
                    //rigidbody.velocity = new Vector3(-rigidbody.velocity.x, rigidbody.velocity.y, 0);
                }else if (        (transform.position.x >= _rightBorder) && GetComponent.<Rigidbody>().velocity.x > 0f) {
                    GetComponent.<Rigidbody>().velocity = new Vector3(0,GetComponent.<Rigidbody>().velocity.y/2,0); //Vector3.zero;
            // _wallHit=2;
        }else if (        (transform.position.y <= _bottomBorder) && GetComponent.<Rigidbody>().velocity.y < 0f){
            GetComponent.<Rigidbody>().velocity =new Vector3(GetComponent.<Rigidbody>().velocity.x/2,0,0); // Vector3.zero;
        //  _wallHit=2;
    }else if (        (transform.position.y >= _topBorder) && GetComponent.<Rigidbody>().velocity.y > 0f){
        GetComponent.<Rigidbody>().velocity =new Vector3(GetComponent.<Rigidbody>().velocity.x/2,0,0); // Vector3.zero;
//   _wallHit=0;
}
//  _wallHit=-1;
if (_hasTarget){
    CheckTargetCollision();
}
yield WaitForSeconds(_collisionDelay);
}
}

function CheckTargetCollision(){
    //if ((_destinationPosition - transform.position).magnitude <= 2){     //in range to eat
    if ((_destinationPositionOnPlaneZ- transform.position).magnitude <= 2){     //in range to eat or attack    
        _isInTargetRange = true;
        var currentVelocity = GetComponent.<Rigidbody>().velocity ;
        if (currentVelocity.magnitude > 0.001){
            // Debug.Log(currentVelocity);
            GetComponent.<Rigidbody>().velocity = 0.85 * currentVelocity;// new Vector3(currentVelocity.x/1.5,currentVelocity.y/1.5,0); // Vector3.zero;
            //        Debug.Log("new velo: "+ GetComponent.<Rigidbody>().velocity.magnitude );
        }else{
            GetComponent.<Rigidbody>().velocity =Vector3.zero;
        }
    }else{
        _isInTargetRange = false;
    }
    }



function ChangeState(){
    while(_isAlive){
        //Debug.Log('ChangeState');
        if (!_hasTarget){
            _isInMoveState =  Random.value >=0.5;
            if (_isInMoveState){
                SetNewVector();         
            }
            _stateChangeDelay = Random.value * 5;
        }
        yield WaitForSeconds(_stateChangeDelay);
    }
    }


function SetNewVector(){
    var xmultiplier=2;var xsubstractier=1;var ymultiplier=2;var  ysubstractier=1;
    if (transform.position.y >= _topBorder){
        //   Debug.Log('top');
        ymultiplier = 1;
    }    else if (transform.position.y <= _bottomBorder){
        //   Debug.Log('bottom');
        ymultiplier = 1;
        ysubstractier = 0;
    }
    
    if (transform.position.x <= _leftBorder){
        //    Debug.Log('left');
        xmultiplier=1;
        xsubstractier=0;
    }else if (transform.position.x >= _rightBorder){
        //    Debug.Log('right');
        xmultiplier=1;
    }
    //  Debug.Log('xmulti: '+xmultiplier);
    _moveVector = new Vector3(((Random.value *xmultiplier)-xsubstractier) * xVectorModifier,((Random.value*ymultiplier) -ysubstractier) * yVectorModifier, 0);
    //  Debug.Log('move vec: '+moveVector);
    // _wallHitted=-1;
}


function SetTarget(newTarget: GameObject){
    if (newTarget!=null && newTarget!=_currentTarget && (newTarget.tag == FeedTag || !_hasTarget)){
        _currentTarget = newTarget; 
        _hasTarget = true;
        CalculateDestinationPosition();
    }
    }

    function CalculateDestinationPosition(){
        if (!_hasTarget || _currentTarget==null) {
        return;
        }
    _destinationPosition= _currentTarget.GetComponent.<RayCaster>().GetRay().GetPoint(transform.position.z-_currentTarget.GetComponent.<RayCaster>().GetRay().origin.z);

_destinationPositionOnPlaneZ= new Vector3(_destinationPosition.x,_destinationPosition.y,transform.position.z);
    } 

function CalculateVectorToTarget(){

//Debug.Log(( destinationPosition - transform.position).magnitude);
//  Debug.Log((new Vector3(destinationPosition.x,destinationPosition.y,transform.position.z) - transform.position).magnitude);
//if ((destinationPosition - transform.position).magnitude <= 3){
//    moveVector=Vector3.zero;
//}else{
// Debug.Log("dest: "+destinationPosition);
_moveVector = (_destinationPosition -transform.position).normalized;
_moveVector = new Vector3(_moveVector.x  * xVectorModifier, _moveVector.y * yVectorModifier, 0);
//moveVector = new Vector3((destinationPosition.x-transform.position.x) * xVectorModifier, (destinationPosition.y -transform.position.y)* yVectorModifier, 0);
//  }

// Debug.DrawLine(closestFood.GetComponent.<FeedInitialization>().GetRay().origin, destinationPosition, Color.black);
}



function GetCurrentTarget(){
	return _currentTarget;
}

function IsInTargetRange(){
    return _isInTargetRange;
}

function IsAlive(){
    return _isAlive;
}

