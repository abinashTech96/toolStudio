// core/themes · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="core/themes";
export function register(__studio33){
__studio33.u20Animated = __studio33.$fn((function u20Animated(){return ['pearl','graphite'].includes(__studio33.u19Root.dataset.theme)&&__studio33.u19Motion()==='full'}),"function u20Animated(){return ['pearl','graphite'].includes(u19Root.dataset.theme)&&u19Motion()==='full'}","u20Animated");

__studio33.u20MotionLabel = __studio33.$fn((function u20MotionLabel(){const motion=__studio33.u19Motion();__studio33.u20MotionStatus.textContent=motion==='full'?'Animated · ambient light + interactive effects':motion==='off'?'Motion off · enable Animated in settings':matchMedia('(prefers-reduced-motion:reduce)').matches?'Reduced · system accessibility preference':__studio33.u19State.motion==='auto'&&__studio33.u19Layout==='tv'?'Reduced on TV · choose Animated for full effects':'Reduced · static theme design';__studio33.u19DeviceStatus.textContent=__studio33.u19DeviceStatus.textContent.replace(/ Motion:.*$/,'')+' Motion: '+(motion==='full'?'Animated':motion==='off'?'Off':'Reduced')+'.';}),"function u20MotionLabel(){const motion=u19Motion();u20MotionStatus.textContent=motion==='full'?'Animated · ambient light + interactive effects':motion==='off'?'Motion off · enable Animated in settings':matchMedia('(prefers-reduced-motion:reduce)').matches?'Reduced · system accessibility preference':u19State.motion==='auto'&&u19Layout==='tv'?'Reduced on TV · choose Animated for full effects':'Reduced · static theme design';u19DeviceStatus.textContent=u19DeviceStatus.textContent.replace(/ Motion:.*$/,'')+' Motion: '+(motion==='full'?'Animated':motion==='off'?'Off':'Reduced')+'.';}","u20MotionLabel");

__studio33.u20Feedback = __studio33.$fn((function u20Feedback(button,event){if(!__studio33.u20Animated()||!button||button.disabled)return;button.classList.add('u20-tap-glow','u20-interactive');const r=button.getBoundingClientRect(),ripple=__studio33.csText('span','','u20-ripple');ripple.setAttribute('aria-hidden','true');const pointer=event&&Number.isFinite(event.clientX)&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;ripple.style.left=(pointer?event.clientX-r.left:r.width/2)+'px';ripple.style.top=(pointer?event.clientY-r.top:r.height/2)+'px';button.append(ripple);setTimeout(()=>{ripple.remove();button.classList.remove('u20-tap-glow','u20-interactive')},600)}),"function u20Feedback(button,event){if(!u20Animated()||!button||button.disabled)return;button.classList.add('u20-tap-glow','u20-interactive');const r=button.getBoundingClientRect(),ripple=csText('span','','u20-ripple');ripple.setAttribute('aria-hidden','true');const pointer=event&&Number.isFinite(event.clientX)&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;ripple.style.left=(pointer?event.clientX-r.left:r.width/2)+'px';ripple.style.top=(pointer?event.clientY-r.top:r.height/2)+'px';button.append(ripple);setTimeout(()=>{ripple.remove();button.classList.remove('u20-tap-glow','u20-interactive')},600)}","u20Feedback");
}
export const steps=[
[2596,function initialize_2596(__studio33){
__studio33.u20MotionFooter = __studio33.csText('div','','u20-motion-footer');
__studio33.u20MotionStatus = __studio33.csText('span','');

}],
[2599,function initialize_2599(__studio33){
__studio33.u20MotionButton = __studio33.u19Button('Animation settings',__studio33.$fn(()=>{__studio33.themeOpen(false);__studio33.u19OpenSettings();__studio33.u19MotionPicker.focus()},"()=>{themeOpen(false);u19OpenSettings();u19MotionPicker.focus()}",""),'u20MotionSettings');

}],
[2604,function initialize_2604(__studio33){
__studio33.u20ApplyPrevious = __studio33.u19Apply;

}],
[2606,function initialize_2606(__studio33){
__studio33.u20SetThemePrevious = __studio33.setTheme;

}],
[2608,function initialize_2608(__studio33){
__studio33.u20PointerFrame = 0;
__studio33.u20PointerPoint = null;

}],
[2615,function initialize_2615(__studio33){
__studio33.u20VisibilityChanged = __studio33.$fn(()=>{__studio33.u19Root.dataset.themePaused=document.hidden?'true':'false'},"()=>{u19Root.dataset.themePaused=document.hidden?'true':'false'}","u20VisibilityChanged");

}]
];
