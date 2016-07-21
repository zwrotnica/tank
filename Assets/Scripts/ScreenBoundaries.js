#pragma strict

var RelativeBackgroundPosition : Transform=null;

private var _leftBorder:float;
private var _rightBorder:float;
private var _topBorder:float;
private var _bottomBorder:float;

function Start () {
    if (RelativeBackgroundPosition==null) return;
    Debug.Log("z pos: "+RelativeBackgroundPosition.position);
    Debug.Log("camera pos: "+Camera.main.transform.position);
    var dist = (RelativeBackgroundPosition.position - Camera.main.transform.position).z;
    Debug.Log("dist: "+dist);
    var distance = Camera.main.transform.InverseTransformPoint(RelativeBackgroundPosition.position).z;
    Debug.Log("distance: "+distance);
    Debug.Log("near plane : "+Camera.main.nearClipPlane);
    _leftBorder = Camera.main.ViewportToWorldPoint(Vector3(0, 0.5f, distance)).x+1;
    _rightBorder = Camera.main.ViewportToWorldPoint(Vector3(1, 0, distance)).x-1; 
    _bottomBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 0, distance)).y+1; 
    _topBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 1, distance)).y-1;

    Debug.Log("left border: "+_leftBorder);
    Debug.Log("right border: "+ _rightBorder);
    Debug.Log("top border: "+ _topBorder);
    Debug.Log("bottom border: "+ _bottomBorder);
}

function Update () {
    //Debug.DrawLine(Camera.main.ViewportToWorldPoint(new Vector2(1, 1)), Camera.main.ViewportToWorldPoint(new Vector2(0, 1)));//top    
    Debug.DrawLine (new Vector3(_leftBorder, _bottomBorder,RelativeBackgroundPosition.position.z), new Vector3(_leftBorder, _topBorder,RelativeBackgroundPosition.position.z),Color.red);
    Debug.DrawLine (new Vector3(_rightBorder, _bottomBorder,RelativeBackgroundPosition.position.z),new Vector3(_rightBorder, _topBorder,RelativeBackgroundPosition.position.z), Color.red);
    Debug.DrawLine (new Vector3(_leftBorder, _bottomBorder,RelativeBackgroundPosition.position.z),new Vector3(_rightBorder, _bottomBorder,RelativeBackgroundPosition.position.z), Color.red);
    Debug.DrawLine (new Vector3(_leftBorder, _topBorder ,RelativeBackgroundPosition.position.z),new Vector3(_rightBorder, _topBorder,RelativeBackgroundPosition.position.z), Color.red);
}

function OnDrawGizmosSelected() {
    //Debug.Log(RelativeBackgroundPosition.position.z);
    //Debug.DrawLine (new Vector3(_leftBorder, _bottomBorder,RelativeBackgroundPosition.position.z), new Vector3(_leftBorder, _topBorder,RelativeBackgroundPosition.position.z),Color.red);
    //Debug.DrawLine (new Vector3(_rightBorder, _bottomBorder,RelativeBackgroundPosition.position.z),new Vector3(_rightBorder, _topBorder,RelativeBackgroundPosition.position.z), Color.red);
}

function GetLeftBorder(){
    return _leftBorder;
}

function GetRightBorder(){
    return _rightBorder;
}

function GetTopBorder(){
    return _topBorder; 
}

function GetBottomBorder(){
    return _bottomBorder;
}