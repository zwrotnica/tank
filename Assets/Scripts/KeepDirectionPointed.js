#pragma strict

private var _lastPosition :Vector3=Vector3.zero;

var _leftRotation : Vector3 = new Vector3(0, 180, 0);
var _rightRotation : Vector3 = new Vector3(0, 0, 0);

private var _leftRotationQuaternion:Quaternion;
private var _rightRotationQuaternion:Quaternion;

var smooth :float = 2.0F;

function Start () {
    _lastPosition = transform.position;

    _leftRotationQuaternion = Quaternion.Euler(_leftRotation.x, _leftRotation.y, _leftRotation.z);
    _rightRotationQuaternion = Quaternion.Euler(_rightRotation.x, _rightRotation.y, _rightRotation.z);
    KeepDirection();
}

function Update () {
}

function KeepDirection(){
    while(true){
        if (_lastPosition.x < gameObject.transform.position.x ){//&& !Mathf.Approximately(transform.eulerAngles.y,0)){
              transform.rotation =_rightRotationQuaternion;// Quaternion.Slerp(transform.rotation, _leftRotation, Time.deltaTime * smooth);
            //transform.rotation = Quaternion.Slerp(transform.rotation, _rightRotation, Time.deltaTime * smooth);
            //Debug.Log('obracam w lewo');
        }else{// if (!Mathf.Approximately(transform.eulerAngles.y,180)){
            //transform.rotation = Quaternion.Slerp(transform.rotation, _leftRotation, Time.deltaTime * smooth);
            transform.rotation = _leftRotationQuaternion;
            //    Debug.Log(transform.eulerAngles.y);
            //Debug.Log('obracam w prawo');
        }
        _lastPosition = transform.position;
        yield WaitForSeconds(1);
    }
}