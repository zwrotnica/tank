#pragma strict

var verticalAlignment: Quaternion;

function Start () {
    verticalAlignment = gameObject.transform.rotation;
}

function Update () {
    gameObject.transform.rotation=verticalAlignment;
}