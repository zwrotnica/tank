#pragma strict

var Feeds:GameObject[];
var zMinBoundary:float;
var zMaxBoundary:float;

function Start () {
    //object pooling
}

function Update () {
     if (!UnityEngine.EventSystems.EventSystem.current.IsPointerOverGameObject() && Input.GetMouseButtonDown(0)) //if left mouse button click
   // if (Input.GetButtonDown("Fire1"))   
        SpawnFeed();    
}

function SpawnFeed(){
    if (Feeds.length<=0){
        return;
    }
    var objectToSpawn= PickObjectToSpawn();
    if(objectToSpawn==null){
        return;
    }
    var positionToSpawn = GeneratePositionToSpawn();
    //Debug.Log(positionToSpawn);
    Instantiate(objectToSpawn, positionToSpawn, objectToSpawn.transform.rotation);
}


function PickObjectToSpawn(){
    var index = Mathf.Round(Random.Range(0, Feeds.length-1));    
    return Feeds[index];
}

function GeneratePositionToSpawn(){
    var zPos = Random.Range(zMinBoundary, zMaxBoundary);
    //Debug.Log("zpos: "+zPos);
    var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);    
    var point : Vector3 = ray.origin + (ray.direction * zPos);    
    return point;
}


function SetFood(newFood:GameObject){
    Feeds[0] = newFood;
}