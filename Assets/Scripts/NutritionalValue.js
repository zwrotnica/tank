/*
stores information of food nutrition values in one bite, like:
calories, strength gain, speed gain, size gain etc
*/

#pragma strict


public class TastyBite{
    var calories:float=1;
    var strengthGain:float=1;
    var speedGain:float=1;
    var sizeGain:float=1;
    var healthGain:float=1;
    var healthRegenSpeedGain :float=1;
}

var calories:float=1;

var strengthGain:float=1;

var speedGain:float=1;

var sizeGain:float=1;

var healthGain:float=1;

var healthRegenSpeedGain :float=1;



function GetTastyBite(biteSize:float){    
    var newBite = new TastyBite();
    newBite.calories= calories*biteSize;
    newBite.strengthGain = strengthGain * biteSize;
    newBite.speedGain= speedGain *biteSize;
    newBite.sizeGain= sizeGain * biteSize;
    newBite.healthGain= healthGain * biteSize;
    newBite.healthRegenSpeedGain= healthRegenSpeedGain ;
    return  newBite;    
}