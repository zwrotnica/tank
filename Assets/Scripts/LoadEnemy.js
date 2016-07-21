#pragma strict

var enemyObject:GameObject=null;

var waitTime:float=2;

var backgroundMusic :GameObject=null;

function Start () {
    LoadEnemy();
}

function Update () {

}

function LoadEnemy(){
    yield WaitForSeconds(waitTime);
    backgroundMusic.SetActive(false);
   var enemy = Instantiate(enemyObject);
   enemy.SetActive(true);
}