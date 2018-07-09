import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollReveal from 'scrollreveal';
let removebg, hidenav;



// Pace preloader

Pace.start();



// goToTarget

(function() {

    'use strict';

	const speed_calculate = function (target) {
    	let base_speed  = 50,
    		page_offset = window.pageYOffset || document.documentElement.scrollTop,
        	offset_diff = Math.abs(target - page_offset),
        	speed = ((offset_diff * base_speed) / 1000)/100;

    	return speed;
	};

	const clickAction = function(e) {
	
	    const that = e.currentTarget;

	    let src = that.getAttribute('href'),
	        window_pos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop, offset = 0, target = 0;

        if (src != null) {
        
    	    const obj = document.getElementById( src.slice(1, src.length) );
    	    
    	    offset = that.getAttribute('data-offset');
	    
	        target = window_pos + obj.getBoundingClientRect().top - offset;	        
        	 
	    }
	    
	    TweenLite.to(window, speed_calculate(target), {
    		scrollTo: {
    			y: target + offset,
    			autoKill: false
    		},
    		ease: Power1.easeOut
    	});
        
        if (window.e) {
            window.e.returnValue = false;
        }
        
	    e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
	};

	const btn = document.getElementsByClassName('js-goto');


    if (btn.length>0) {
    	for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', clickAction);
        }
    }

}).call(this);



// goTop icon

(function() {
    let scroll_pos = window.pageYOffset || window.scrollY,
        status = false;
    
    const el = document.getElementsByClassName('js-gotop')[0];
    
    if (el) {

        const action = function() {
    
            scroll_pos = window.pageYOffset || window.scrollY;
            
            if (scroll_pos > 200) {
                if (status === false) {
                    el.classList.add('is-visible');
                    status = true;
                }
            } else {
                if (status === true) {
                    el.classList.remove('is-visible');
                    status = false;
                }
            }
        }
        
        window.addEventListener('scroll', action);
    }
    
}).call(this);



// Open Contact form

const hideContact = function(e) {

    const contactform = document.getElementsByClassName('js-contactform')[0];
    
    contactform.classList.remove('is-visible');
    document.body.classList.remove('no-overflow');

//    e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
    
};

(function() {

    const el = document.getElementsByClassName('js-open-contactform');
    
    if (el.length>0) {
    
        const contactform = document.getElementsByClassName('js-contactform')[0],
              closeform = document.getElementsByClassName('js-close-contactform')[0],
              nav = document.getElementsByClassName('js-nav')[0];
    
        const showContact = function(e) {

            hideMenu();
            contactform.classList.add('is-visible');
            
            const event = function(e) {
                if (e.pseudoElement === "::before") {
                    document.body.classList.add('no-overflow');
                    nav.removeEventListener("transitionend", event);
                }
            }
            
            nav.addEventListener("transitionend", event, false);
        
            e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
        }
        
        
        for (let i = 0; i<el.length; i++) {
            
            el[i].addEventListener('click', showContact);
        }
        
        closeform.addEventListener('click', hideContact);
        
    }

}).call(this);



// Topbar

(function() {

    let scroll_pos = window.pageYOffset || window.scrollY,
        status = false;
    
    const el = document.getElementsByClassName('js-topbar')[0];

    const action = function() {
          scroll_pos = window.pageYOffset || window.scrollY;
        
        if (scroll_pos > 200) {
            if (status === false) {

                el.classList.add('is-visible');
                document.body.classList.add('topbar-fixed');
                status = true;
            }

        } else {
            if (status === true) {
            
                el.classList.remove('is-visible');
                document.body.classList.remove('topbar-fixed');
                status = false;
            }
        }
    }
    
    window.addEventListener('scroll', action);
    
}).call(this);



/*
 * Menu
 */

// Hide Menu

const hideMenu = function() {

    const hamburger = document.getElementsByClassName('js-hamburger'),
          nav = document.getElementsByClassName('js-nav')[0],
          topbar = document.getElementsByClassName('js-topbarNormal')[0]; 
     
    nav.classList.remove('is-content');
    nav.classList.add('reset-delay');

    removebg = setTimeout(function() {
        nav.classList.remove('is-bg');
//        topbar.classList.remove('is-shadow');
    }, 600);

    hidenav = setTimeout(function() {
        nav.classList.remove('is-visible');
         
    }, 2000);
    
    const event = function(e) {
        if (e.pseudoElement === "::before") {
            document.body.classList.remove('no-overflow');
            document.body.classList.remove('menu-opened');    
            nav.removeEventListener("transitionend", event);
        }
    }

    nav.addEventListener("transitionend", event, false);

    for (let i = 0; i < hamburger.length; i ++) {
        hamburger[i].classList.remove('is-active');
        
    }      
};


(function() {
    
    const hamburger = document.getElementsByClassName('js-hamburger');
    

    if (hamburger.length>0) {
    
        const nav = document.getElementsByClassName('js-nav')[0],
              topbar = document.getElementsByClassName('js-topbarNormal')[0];
            
        const showMenu = function(e) {  

            let scroll_pos = window.pageYOffset || window.scrollY,
                ww = window.innerWidth;
        
            
            // Menu is open
            if (e.currentTarget.classList.contains('is-active')) {
                
                hideMenu();
                
            } else {
                
                if (removebg != undefined) {
                    clearTimeout(removebg);
                    nav.classList.remove('is-bg');
                }
            
                if (hidenav != undefined) {
                    clearTimeout(hidenav);
                    nav.classList.remove('is-visible');
                }
                
                nav.classList.remove('reset-delay');
                nav.classList.add('is-visible');
                nav.classList.add('is-content');
                nav.classList.add('is-bg');
                
                if (scroll_pos <= 200 && ww <= 768) {
//                    topbar.classList.add('is-shadow');
                }
                
                document.body.classList.add('no-overflow');
                document.body.classList.add('menu-opened');
                
                nav.scroll(0, 0);
                
                e.currentTarget.classList.add('is-active');
            }

            
            e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
        }

        for (let i = 0; i < hamburger.length; i ++) {
            hamburger[i].addEventListener('click', showMenu);
        }
     
     
        // Hide menu on ESC
        
        document.addEventListener('keydown', function(evt) {
           // evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                hideMenu();
                hideContact();
            }
        });
       
    }
    
}).call(this);



// Full height

(function() {
	const fullHeight = document.getElementsByClassName('js-fullHeight'),
          action = function() {
              let windowHeight = window.innerHeight + 'px';

              for (let i = 0; i < fullHeight.length; i++) {
                  fullHeight[i].style.minHeight = windowHeight;
              }

          };

	if (fullHeight.length > 0) {
	    action();
    	window.addEventListener( 'resize', action );
    }

}).call(this);




// isMobile

(function() {
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
		document.getElementsByTagName('html')[0].className += ' mobile';
	} else {
	    document.getElementsByTagName('html')[0].className += ' desktop';
	}
}).call(this);



// Lang

(function() {
    const el = document.getElementsByClassName('js-lang')[0];
    
    if (el) {
        const choice = el.getElementsByClassName('js-lang__choice')[0],
              current = el.getElementsByClassName('js-lang__current')[0];
        
        const hideLangs = function(e) {
            if(!e.target.parentNode.classList.contains('js-lang')) {
                el.classList.remove('is-visible');
                document.removeEventListener('click', hideLangs);
            }
        }
        
        const action = function(e) {
          el.classList.toggle('is-visible');
          document.addEventListener('click', hideLangs);

          e.preventDefault() ? e.preventDefault() : e.preventDefault = false;  
        };
        
        current.addEventListener('click', action); 
        
    }

}).call(this);




Pace.on('done', function() {   

    let element = document.getElementById("cover");

    if (element) {

        element.addEventListener("transitionend", function(event) {
            
            document.getElementById('cover').remove();            
            document.body.removeAttribute('style');
        
        }, false);
    
        document.getElementsByClassName('pace')[0].remove();
        
        window.sr = new ScrollReveal(config)
        
        var config = {
            scale: 1
        }
        
        sr.reveal(".anim", config)
    }      
});

