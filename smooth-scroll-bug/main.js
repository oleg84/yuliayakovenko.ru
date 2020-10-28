function makelist() {
  let container = document.getElementById("container");
  for (let i = 0; i < 30; ++i) {
    let item = document.createElement("div");
    let class_index = Math.floor(Math.random() * 4);
    item.classList.add("item-"+class_index.toString());
    item.innerHTML = "ITEM#"+i.toString();
    container.appendChild(item);
  }
}

function wait_for(timeout) {
  let start = Date.now();
  while(Date.now() - start < timeout){
  }
}

var need_scroll_update = true;
var scroll_step = 900;

// requestAnimationFrame used to place the delay exactly when cc commits changes
// This done to reproduce the issue more often
function callback_request_animation_frame() {
    if (need_scroll_update) {
      wait_for(50);           // Emulate long keydown event processing + commit time
      need_scroll_update = false;
      let container = document.getElementById("container");
      let scroll_target = container.scrollTop + scroll_step;
      let scroll_target_max = container.scrollHeight - container.clientHeight;
      if (scroll_target > scroll_target_max || scroll_target < 0) {
        scroll_step = -scroll_step;
        scroll_target += 2*scroll_step;
      }
      container.scrollTo({top: scroll_target, left: 0, behavior: 'smooth'});
    }
    window.requestAnimationFrame(callback_request_animation_frame);
}

function callback_need_update_scroll() {
  need_scroll_update = true;
}


window.onload = makelist;
window.requestAnimationFrame(callback_request_animation_frame);
//Update scroll when previus scroll animation is still playing, interval should be short
setInterval(callback_need_update_scroll, 200);

