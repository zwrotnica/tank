//import  UnityEngine.SceneManagement;

#pragma strict

var levelName = "1";

var  async:AsyncOperation = null; // When assigned, load is in progress.

var fullProgressBar : RectTransform=null;
var loadingProgressBar : RectTransform=null;

function Start () {
	loadingProgressBar.sizeDelta = new Vector2(0, fullProgressBar.sizeDelta.y);
}

function Update () {

}


function StartGame(){
	LoadScene();
}

function LoadScene(){
     //async =  SceneManagement.SceneManager.LoadSceneAsync(levelName);
     
     async = Application.LoadLevelAsync(levelName);
     async.allowSceneActivation = true;
     while(!async.isDone){
     	loadingProgressBar.sizeDelta = new Vector2( async.progress * fullProgressBar.sizeDelta.x, loadingProgressBar.sizeDelta.y); 
     	//yield return async;
     //	Debug.Log(async.progress);
     	yield WaitForSeconds(0.1);
     }
     loadingProgressBar.sizeDelta = new Vector2( async.progress * fullProgressBar.sizeDelta.x, loadingProgressBar.sizeDelta.y); 
}
