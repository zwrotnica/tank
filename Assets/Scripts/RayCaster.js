#pragma strict

private var rayBeam : Ray=new Ray();

var realTimeUpdate:boolean=false;

function Start () {
    rayBeam = new Ray(Camera.main.transform.position,  transform.position-Camera.main.transform.position );
}

function GetRay(){
    return rayBeam;
}
