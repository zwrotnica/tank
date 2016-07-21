/*
Randomizes size
Inits Ray, which runs from camera to the object
*/

#pragma strict


private var _initScale:Vector3 = Vector3.zero;

private var _initialFeedSize:float=0;
private var _feedSize:float=0;

private var _deceased = false;

var randomizeRotation : boolean = true;

var minScale :float=1;
var maxScale :float = 5;

private var _nutrotionalValue : NutritionalValue=null;

function Start () {
    Debug.Log(transform.position);
    Debug.Log(transform.eulerAngles);
    if (randomizeRotation ){
        transform.rotation = Random.rotation;
    }
    
    _initialFeedSize = _feedSize = Random.Range(minScale, maxScale);
    _initScale= transform.localScale;
//    Debug.Log("size: "+_feedSize);
    _nutrotionalValue = GetComponent.<NutritionalValue>();
}

function Update () {
    if (_deceased){
        Destroy(gameObject);
    }
    //Debug.DrawLine(Camera.main.transform.position,  transform.position, Color.blue);
    //Debug.DrawLine(rayBeam.origin, rayBeam.origin+(rayBeam.direction * 4), Color.green);
}



function GetBite(biteSize:float){
    _feedSize -= biteSize;
    if (_feedSize<=0){
        _deceased=true;
    }else{
        transform.localScale  = _initScale* (_feedSize / _initialFeedSize);
    }
    //return bite with nurishment
    return _nutrotionalValue.GetTastyBite(biteSize);
}
