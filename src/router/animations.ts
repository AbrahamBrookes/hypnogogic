import { Animation, createAnimation } from '@ionic/vue';

interface AnimationOptions {
	enteringEl: HTMLElement;
	leavingEl: HTMLElement;
}

export const pageSlideAnimation = (baseEl: HTMLElement, opts: AnimationOptions): Animation => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
    .fromTo('opacity', 0.01, 1);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo('transform', 'translateX(0%)', 'translateX(-100%)')
    .fromTo('opacity', 1, 0.01)
	// hide when animation is done
	.afterStyles({ display: 'none' });

  // This will animate both the entering and leaving elements
  return createAnimation()
    .duration(750) // Set the duration of the animation (in milliseconds)
    .easing('ease-out') // Customize the easing function
    .addAnimation([enteringAnimation, leavingAnimation]);
};
