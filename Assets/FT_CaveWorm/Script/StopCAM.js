var myCheck : boolean = true;
var camAnim : Animation;

function OnMouseDown () {
    if(myCheck == true){
        camAnim.GetComponent(Animation).Stop ();
        myCheck = false;
        return myCheck;}else {
        camAnim.GetComponent(Animation).Play ();
        myCheck = true;
        return myCheck;
    }
}

