using UnityEngine;
using System.Collections;
using System;

public class EnemyArrived : StateMachineBehaviour
{
	
	// OnStateEnter is called when a transition starts and the state machine starts to evaluate this state
	override public void OnStateEnter (Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
	{
		StopWorm (animator);
		ActivateScripts (animator);
	}

	private void ActivateScripts (Animator animator)
	{
		animator.gameObject.GetComponent<EatFish> ().enabled = true;
		animator.gameObject.GetComponent<HealthState> ().enabled = true;
	}
    

	private void StopWorm (Animator animator)
	{
		//var worm= animator.gameObject.GetComponent<WormHolder>().worm;
		var worm = animator.gameObject.transform.GetChild (0);// GetComponent<WormHolder>().worm;
		if (worm == null)
			return;
		var wormAnimation = worm.GetComponent<Animation> ();
		if (wormAnimation == null)
			return;

		var animationName = "Idle";
		
		wormAnimation ["Walk"].enabled = false;
		wormAnimation.Stop ();
		wormAnimation.clip = wormAnimation [animationName].clip;		
		wormAnimation.Play (animationName);
		wormAnimation [animationName].wrapMode = WrapMode.Loop;// time = 1.0f;
		// wormAnimation["Attack"].pl enabled = true;
		//wormAnimation.playAutomatically = true;
	}

	// OnStateUpdate is called on each Update frame between OnStateEnter and OnStateExit callbacks
	//override public void OnStateUpdate(Animator animator, AnimatorStateInfo stateInfo, int layerIndex) {
	//
	//}

	// OnStateExit is called when a transition ends and the state machine finishes evaluating this state
	//override public void OnStateExit(Animator animator, AnimatorStateInfo stateInfo, int layerIndex) {
	//
	//}

	// OnStateMove is called right after Animator.OnAnimatorMove(). Code that processes and affects root motion should be implemented here
	//override public void OnStateMove(Animator animator, AnimatorStateInfo stateInfo, int layerIndex) {
	//
	//}

	// OnStateIK is called right after Animator.OnAnimatorIK(). Code that sets up animation IK (inverse kinematics) should be implemented here.
	//override public void OnStateIK(Animator animator, AnimatorStateInfo stateInfo, int layerIndex) {
	//
	//}
}
