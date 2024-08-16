
























//PHONE MASK ====================================

! function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
  var b, c = navigator.userAgent,
    d = /iphone/i.test(c),
    e = /chrome/i.test(c),
    f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function (a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      })
    },
    unmask: function () {
      return this.trigger("unmask")
    },
    mask: function (c, g) {
      var h, i, j, k, l, m, n, o;
      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0
      }
      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
      }), this.trigger("unmask").each(function () {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++)
              if (j[a] && C[a] === p(a)) return;
            g.completed.call(B)
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
        }

        function q(a) {
          for (; ++a < n && !j[a];);
          return a
        }

        function r(a) {
          for (; --a >= 0 && !j[a];);
          return a
        }

        function s(a, b) {
          var c, d;
          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++)
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d)
              } z(), B.caret(Math.max(l, a))
          }
        }

        function t(a) {
          var b, c, d, e;
          for (b = a, c = p(a); n > b; b++)
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e
            }
        }

        function u() {
          var a = B.val(),
            b = B.caret();
          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
            if (0 === b.begin)
              for (; b.begin < l && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          }
          h()
        }

        function v() {
          A(), B.val() != E && B.change()
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b, c, e, f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c, d, e, g = b.which || b.keyCode,
              i = B.caret();
            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function () {
                    a.proxy(a.fn.caret, B, e)()
                  };
                  setTimeout(k, 0)
                } else B.caret(e);
                i.begin <= m && h()
              }
              b.preventDefault()
            }
          }
        }

        function y(a, b) {
          var c;
          for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
        }

        function z() {
          B.val(C.join(""))
        }

        function A(a) {
          var b, c, d, e = B.val(),
            f = -1;
          for (b = 0, d = 0; n > b; b++)
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;)
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break
                } if (d > e.length) {
                y(b + 1, n);
                break
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
        }
        var B = a(this),
          C = a.map(c.split(""), function (a, b) {
            return "?" != a ? i[a] ? p(b) : a : void 0
          }),
          D = C.join(""),
          E = B.val();
        B.data(a.mask.dataName, function () {
          return a.map(C, function (a, b) {
            return j[b] && a != p(b) ? a : null
          }).join("")
        }), B.one("unmask", function () {
          B.off(".mask").removeData(a.mask.dataName)
        }).on("focus.mask", function () {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function () {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
            }, 10)
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
          B.prop("readonly") || setTimeout(function () {
            var a = A(!0);
            B.caret(a), h()
          }, 0)
        }), e && f && B.off("input.mask").on("input.mask", u), A()
      })
    }
  })
});

$.fn.setCursorPosition = function (pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};


$(".phone__mask").click(function () {
  $(this).setCursorPosition(3);
}).mask("8 ( 999 ) 999-99-99");

//HEADER__MENU==============
body = document.querySelector('.body');


if (window.matchMedia("(max-width: 1024px)").matches) {

	const header = document.querySelector('.header'),
	topMenu = document.querySelector('.header__menuWrp ul'),
	menulink = document.querySelectorAll('.top__menuLnk'),
	burger = document.querySelector('.header__burger');
	
	
	burger.addEventListener('click', (event) => {
		event.preventDefault();
		burger.classList.toggle("active");
		header.classList.toggle("showPanel");
		body.classList.toggle("forMobModal");
	});
	
	topMenu.addEventListener('click', function (event) {
		const target = event.target;
		if (target && target.classList.contains('top__menuLnk')) {
			burger.classList.toggle("active");
			header.classList.toggle("active");
			body.classList.toggle("forMobModal");
		}
	});

	topMenu.addEventListener('click', (event) => {
    if (event.target && event.target.matches(".header__menuWrp > ul > li.menu-item-has-children > a")) {
      event.preventDefault();
      event.target.parentElement.classList.toggle("active");
      };
 });
	
	
	}







try {
  var main = new Splide( '.splide_doubleCar', {
		// perPage: 1,
    type   : 'loop',
    pagination : false,
    arrows     : true,
    autoHeight: true,
    breakpoints : {
      1024: {
				autoHeight: true,
      },
    },
    classes: {
      arrows: 'splide__arrows doubleCar__arrows',
      arrow : 'splide__arrow doubleCar__arrow',
      prev  : 'splide__arrow--prev doubleCar__arrow doubleCar__arrow_prev',
      next  : 'splide__arrow--next doubleCar__arrow doubleCar__arrow_next',
    },
  } );



  
  var thumbnails = new Splide( '.splide_doubleCar_thum', {
    arrows     : false,
    rewind          : true,
    // fixedWidth      : 150,
		autoWidth: true,
    fixedHeight     : 59,
    isNavigation    : true,
    // gap             : 12,
    // focus           : 'center',
    pagination      : false,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints : {
      1024: {
        gap: 15,
				perPage  : 1,
  focus    : 'center',
  trimSpace: false,
      },
    },
  } );
  
  
if (window.matchMedia("(max-width: 1024px)").matches) {
  main.on('active', function (e) {
    e.slide.parentElement.style.height = e.slide.offsetHeight + 'px';
});

}






main.sync( thumbnails );
main.mount();

  thumbnails.mount();

 
  
} catch (err) {

}


let splideImgCarArr = [];

try {

	const portfCarousels = document.querySelectorAll('.tilesModalCar__carWrapper');

for (let i = 0; i < portfCarousels.length; i++) {

	let splide = new Splide( portfCarousels[i], {
  perPage: 1,
	perMove: 1,
	type   : 'loop',
	speed: 10,
	rewindSpeed: 1,
	pagination: false,
	classes: {
		arrows: 'splide__arrows tilesModalCar__arrows',
		arrow : 'splide__arrow tilesModalCar__arrow',
		prev  : 'splide__arrow--prev tilesModalCar__arrow tilesModalCar__arrow_prev',
		next  : 'splide__arrow--next tilesModalCar__arrow tilesModalCar__arrow_next',
	},
	// breakpoints : {
	// 	470: {
	// 		gap: 15,
	// 	},
	// },
} );

splide.mount();

splideImgCarArr.push(splide)

}

} catch (err) {
	console.log(err)
}



/*--------------------*/

const imgCars = document.querySelector('.tilesModalCar__carRow');
const imgCarsWrprs = document.querySelectorAll('.tilesModalCar__carWrapper')

try {



imgCars.addEventListener('click', function (event) {

	const target = event.target;

	if (target && target.classList.contains('tilesModalCar__img') || target && target.classList.contains('tilesModalCar__burger') || target && target.classList.contains('tilesModalCar__burgerLines')) {

		let elt = target.closest('.tilesModalCar__carWrapper');

		elt.classList.toggle("inModal");
		body.classList.toggle("forMobModal");


		// сброс отступов и размеров в текущей карусели

		let curImgCarWrpr = target.closest('.tilesModalCar__carWrapper');

		for (let d = 0; d < imgCarsWrprs.length; d++) {
			if (imgCarsWrprs[d] == curImgCarWrpr) {
				splideImgCarArr[d].refresh();
			}
		}

	}

});


} catch (err) {
	console.log(err)
}

const allObj = document.querySelectorAll('.tilesModalCar__tile_allPage');
const moreObjBtnWrp = document.querySelector('.tilesModalCar__bottomLnkWrp');
const moreObjBtn = document.querySelector('.moreObjcst');

try {
	

	objShowStep = 10;

	function showMoreObj(step) {
		let i = 0;

		for (let reviewNum in allObj) {
			let allActiveObj = document.querySelectorAll('.tilesModalCar__tile_allPage.active');

			if (allActiveObj.length == allObj.length) {
				break;
			}

			console.log(allObj[reviewNum].classList.contains('active'))
			if (allObj[reviewNum].classList.contains('active')) {
				continue;
			}		

			allObj[reviewNum].classList.add('active');

			i++;


			if (i == step) {
				break;
			}
		};
	}


	function hideMoreLink() {
		let allActiveObj = document.querySelectorAll('.tilesModalCar__tile_allPage.active');

		if (allActiveObj.length == allObj.length) {
			moreObjBtnWrp.classList.add('hide')
		}
	}


	function updateURL(paramNum) {
		if (history.pushState) {
				let baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
				let newUrl = baseUrl + '?page=' + paramNum;
				history.pushState(null, null, newUrl);
		}
		else {
				console.warn('History API не поддерживается');
		}
	}

	showMoreObj(objShowStep)

	moreObjBtn.addEventListener('click', function(event) {
		event.preventDefault();

		showMoreObj(objShowStep)

		let allActiveObj = document.querySelectorAll('.tilesModalCar__tile_allPage.active');

		updateURL(Math.ceil(allActiveObj.length / objShowStep))

		console.log(allActiveObj.length)
		console.log(allObj.length)

		if (allActiveObj.length == allObj.length) {
			moreObjBtnWrp.classList.add('hide')
		}

	})
	
	hideMoreLink()

} catch (err) {
}

try {

	var main = new Splide( '.tilesCar__container', {
  // type   : 'loop',
	rewind: true,
  perPage: 3,
	autoplay: true,
	interval: 2000,
	pauseOnHover: true,
	perMove: 1,
	speed: 1000,
	pagination: false,
	gap: 29,
	trimSpace: true,
	classes: {
		arrows: 'splide__arrows tilesCar__arrows',
		arrow : 'splide__arrow tilesCar__arrow',
		prev  : 'splide__arrow--prev tilesCar__arrow tilesCar__arrow_prev',
		next  : 'splide__arrow--next tilesCar__arrow tilesCar__arrow_next',
	},
	breakpoints : {
		1366: {
			gap: 24,
		},
		1024: {
			gap: 15,
			fixedWidth: 260,
			arrows: false,
			perPage: 1,
		},
	},
} );


main.mount();

} catch (err) {
}
try {

	var main = new Splide( '.videoTilesCar__carCont', {
  // type   : 'loop',
	rewind: true,
  perPage: 3,
	// autoplay: true,
	interval: 2000,
	pauseOnHover: true,
	perMove: 1,
	speed: 1000,
	pagination: false,
	gap: 29,
	trimSpace: true,
	classes: {
		arrows: 'splide__arrows videoTilesCar__arrows',
		arrow : 'splide__arrow videoTilesCar__arrow',
		prev  : 'splide__arrow--prev videoTilesCar__arrow videoTilesCar__arrow_prev',
		next  : 'splide__arrow--next videoTilesCar__arrow videoTilesCar__arrow_next',
	},
	breakpoints : {
		1366: {
			gap: 24,
		},
		1024: {
			gap: 15,
			fixedWidth: 260,
			arrows: false,
			perPage: 1,
		},
	},
} );


main.mount();

} catch (err) {
}


if (window.matchMedia("(max-width: 768px)").matches) {

try {

	const revTiles = document.querySelectorAll('.videoTilesCar__itm'),
	revTilesOpenLinks = document.querySelectorAll('.videoTilesCar__itmMore'),
	revTilesOpenLink = document.querySelector('.videoTilesCar__itmMore');

	for (let itm = 0; itm < revTiles.length; itm++) {
		let itmHeight = revTiles[itm].clientHeight;

		if (itmHeight > 289) {


			revTilesOpenLinks[itm].classList.add('active');
			revTiles[itm].classList.add('hide');


			revTilesOpenLinks[itm].addEventListener('click', (event) => {
				event.preventDefault();
				revTiles[itm].classList.toggle("show");
				revTilesOpenLinks[itm].classList.toggle('show');
			})


		}
	}

} catch (err) {
}

}

try {
	const allReviews = document.querySelectorAll('.videoTilesCar__itm_allPage');
	const moreRevBtnWrp = document.querySelector('.videoTilesCar__bottomLnkWrp');
	const moreRevBtn = document.querySelector('.moreRev');

	revShowStep = 6;

	function showMoreRev(step) {
		let i = 0;

		for (let reviewNum in allReviews) {
			let allActiveReviews = document.querySelectorAll('.videoTilesCar__itm_allPage.active');

			if (allActiveReviews.length == allReviews.length) {
				break;
			}

			console.log(allReviews[reviewNum].classList.contains('active'))
			if (allReviews[reviewNum].classList.contains('active')) {
				continue;
			}		

			allReviews[reviewNum].classList.add('active');

			i++;


			if (i == step) {
				break;
			}
		};
	}


	function updateURL(paramNum) {
		if (history.pushState) {
				let baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
				let newUrl = baseUrl + '?page=' + paramNum;
				history.pushState(null, null, newUrl);
		}
		else {
				console.warn('History API не поддерживается');
		}
	}

	// let params = (new URL(document.location)).searchParams; 
	// console.log(params.get("page"));

	showMoreRev(revShowStep)

	moreRevBtn.addEventListener('click', function(event) {
		event.preventDefault();

		showMoreRev(revShowStep)

		let allActiveReviews = document.querySelectorAll('.videoTilesCar__itm_allPage.active');

		updateURL(Math.ceil(allActiveReviews.length / revShowStep))

		if (allActiveReviews.length == allReviews.length) {
			moreRevBtnWrp.classList.add('hide')
		}

	})
	


} catch (err) {
}



  // SPOILERS =============================
  const spoilersWrp = document.querySelectorAll('.spForm__spoilers');
  const spoilersAllWrps = document.querySelectorAll('.spForm__spItm');

  try {
    spoilersWrp.forEach((wrapper) => {
      wrapper.addEventListener('click', function (event) {
      const target = event.target;

      if (target && target.classList.contains('spForm__spCaptionItm') || target && target.classList.contains('spForm__spMarker') || target && target.classList.contains('spForm__spMarkerLine')) {
        
        // находим родителя, класс .active которого надо тоглить
        parentEl = target.parentNode;
        
        // закрытие всех открытых блоков
        spoilersAllWrps.forEach(function(item){
          if (item != parentEl) {
            item.classList.remove('active');
          }
        })

        // открытие / закрытие блока, по которому клик
        parentEl.classList.toggle('active');
      
      }
      });
    });


} catch (e) {
	console.log(e)
}


//MODALS & FORMS====================

$(document).ready(function () {
  const overlay = $('.overlay');
  const openModal = $('.openModal');
  const closeModal = $('.closeModal, .overlay');
  const closeModalBtn = $('.itsModal_thanks_close');
  const modal = $('.itsModalWrp');
  const modalth = $('.itsModal_thanksWrp');
  const body = $('.body');
  const openVideoModal = document.querySelectorAll('.openVideoModal');
  const videoModal = document.querySelector('.videoModal');
  const closeVideoModal = document.querySelector('.closeModal__video');
  const videoOverlay = document.querySelector('.overlay__video');

  function addCurVideo(container, video_id) {
    containerChild = container.querySelector('.itsModal');
    containerChild.insertAdjacentHTML('beforeend', '<iframe class="ytFrame" width="100%" height="100%" src="https://www.youtube.com/embed/' + video_id + '?html5=1&&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  }

  function removeCurVideo(container) {
    containerChild = container.querySelector('.itsModal');

    let iframe = containerChild.querySelector("iframe")

    iframe.remove();

  }


  // openVideoModal.addEventListener('click', function (event) {
  //   event.preventDefault();

  //   videoModal.classList.add('active');
  //   videoOverlay.classList.add('active');

  //   addCurVideo(videoModal, 'ymUPuB5Fyps')

  // })

  openVideoModal.forEach(function(opn) {
    opn.addEventListener('click', function (event) {
      event.preventDefault();
  
      videoModal.classList.add('active');
      videoOverlay.classList.add('active');
  
      addCurVideo(videoModal, this.getAttribute('data'))
  
    })
  })


  closeVideoModal.addEventListener('click', function (event) {
    event.preventDefault();

    videoModal.classList.remove('active');
    videoOverlay.classList.remove('active');

    removeCurVideo(videoModal)

  })


  openModal.click(function (event) {
    event.preventDefault();
    var modal = $(this).attr('data-modal');
    console.log(modal)
    overlay.addClass('active');
    $(modal).addClass('active');
    body.addClass('forMobModal');
  });

  closeModal.click(function (event) { // лoвим клик пo крестику или oверлэю
    event.preventDefault();
    $(modal).removeClass('active');
    overlay.removeClass('active');
    modalth.removeClass('active');
    body.removeClass('forMobModal');
  });

  closeModalBtn.click(function (event) { // лoвим клик пo крестику или oверлэю
    event.preventDefault();
    $(modal).removeClass('active');
    overlay.removeClass('active');
    modalth.removeClass('active');
    body.removeClass('forMobModal');
  });

  //E-mail Ajax Send
  $(".txtForm__form, .calc__resForm").submit(function () { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "/wp-content/themes/cleanon_theme/scripts/submit.php", //Change
      data: th.serialize()
    }).done(function () {
      $(modal).removeClass('active');
      let targetName = th[0].dataset.metrika;
      ym(69040678, 'reachGoal', targetName);
      document.location.href = '/thank-you-page/';
    });
    return false;

  });

});

try {

const tableShowLink =  document.querySelectorAll('.tables__showTable'),
			bottomTableWrapper = document.querySelectorAll('.tables__tableWrp_bottom');

tableShowLink.forEach((element, number) => {
	element.addEventListener('click', (event) => {
		event.preventDefault();
		
		element.classList.toggle("show");
		bottomTableWrapper[number].classList.toggle("show");
	});
});


}

catch(e) {

}


const calcDataSource = {
	roomsSup: {
		one: [1860, 150],
		two: [3060, 210],
		three: [4260, 270],
		four: [6060, 300],
		five: [60, 10],
	},
	roomsGen: {
		one: [3600, 250],
		two: [6120, 350],
		three: [8520, 380],
		four: [12120, 400],
		five: [120, 20],
	},
	roomsAR: {
		one: [4200, 320],
		two: [7140, 280],
		three: [9940, 360],
		four: [14140, 400],
		five: [140, 30],
	},
	options: {
		special: [350, 30],
		ovenWash: [500, 30],
		svhWash: [300, 30],
		frzWash: [500, 30],
		winWash: [250, 30],
		lusWash: [300, 30],
		ironing: [250, 30],
		chanBel: [150, 30],
		balClean: [600, 30],
		parogen: [500, 30],
		
		specEq: [1300, 0],
		keys: [500, 0],
		wcWash: [600, 0],
		ecoMode: [15, 0],
	},
}

const resultData = {
	rooms: 0,
	baseResult: [0,0],
	options: {
		special: [0,0,''],
		ovenWash: [0,0,''],
		svhWash: [0,0,''],
		frzWash: [0,0,''],
		winWash: [0,0,''],
		lusWash: [0,0,''],
		ironing: [0,0,''],
		chanBel: [0,0,''],
		balClean: [0,0,''],
		parogen: [0,0,''],

		specEq: [0,0,''],
		keys: [0,0,''],
		wcWash: [0,0,''],
		ecoMode: [0,0,''],
	}
}

currentWorkType = 'roomsSup';

const calcContainer = document.querySelector('.calc__container');

const roomsBtnsWrp = document.querySelector('.calc__radioWrp');
const roomsBtns = document.querySelectorAll('.calc__radioBtn');

const fiveRoomsSqWrp = document.querySelector('.calc__forFive');

const totalCostBlock = document.querySelector('.calc__resTotalPriceDig');
const totalHoursBlock = document.querySelector('.calc__resTotalTimeH');
const totalMinutesBlock = document.querySelector('.calc__resTotalTimeМ');
const totalInputSumm = document.querySelector('.calc__resTotalSumm');
const totalInputPage = document.querySelector('.calc__resPage');
const totalInputService = document.querySelector('.calc__resService');
const totalInputType = document.querySelector('.calc__resType');

const calcCarPrev = document.querySelector('.calc__carPrev');
const calcCarNext = document.querySelector('.calc__carNext');

const calcCar = document.querySelector('.calc__carousel');
const calcCarItms = document.querySelectorAll('.calc__carItm');

const calcMtrs = document.querySelector('.calc__forFiveInp');

const calcOptionsWrp = document.querySelector('.calc__optionsList');
const calcOptionsList = document.querySelectorAll('.calc__optionsItmData');

const calcOptionAmountMinus = document.querySelector('.calc__othersItmAmountMinus');
const calcOptionAmountPlus = document.querySelector('.calc__othersItmAmountPlus');

const optionsCheckbox = document.querySelector('.calc__optionsYesNo_reg');
const ecoCheckbox = document.querySelector('.calc__optionsYesNo_eco');

const resultList = document.querySelector('.calc__resList');
const resultDelItm = document.querySelector('.calc__resItmDelete');


const resultForm = document.querySelector('.calc__resFormAddedFlds');


const resultH = document.querySelector('.calc__resH');
const resultHRooms = document.querySelector('.calc__resHRooms');
const resultHWC = document.querySelector('.calc__resHWC');
const resultHAnd = document.querySelector('.calc__resHAnd');
const resultHWith = document.querySelector('.calc__resHWith');




/* ----------- functions ----------- */



function calculateData(data) {
	optionsCost = 0;
	for (key in data['options']) {
		optionsCost += data['options'][key][0]
	}

	optionsTime = 0;
	for (key in data['options']) {
		optionsTime += data['options'][key][1]
	}

	let totalCost = data['baseResult'][0] + optionsCost;
	totalCost = totalCost + totalCost/100*data['options']['ecoMode'][0];
	let totalMinutes = data['baseResult'][1] + optionsTime;

	totalHours = Math.floor(totalMinutes / 60);
	remMinutes = totalMinutes % 60;

	return [totalCost, totalHours, remMinutes]
}


function moveCarousel(step, carItms){
	activeItm = 0;

	carItms.forEach(function(item, i){
		if (item.classList.contains('active')) {
			activeItm = i;
		}
	})

	if (activeItm == carItms.length - 1 && step > 0) {
		carItms[activeItm].classList.remove('active');
		activeItm = 0;
		carItms[activeItm].classList.add('active');
	} else if (activeItm == 0 && step < 0) {
		carItms[activeItm].classList.remove('active');
		activeItm = carItms.length - 1;
		carItms[activeItm].classList.add('active');
	}
	 else {
		carItms[activeItm].classList.remove('active');
		activeItm = activeItm + step
		carItms[activeItm].classList.add('active');
	}

	totalInputType.value = carItms[activeItm].innerText;
	
	return carItms[activeItm].getAttribute('data');
}


function showTotalHeadingFL() {

	WCCount = resultData['options']['wcWash'][0] / calcDataSource['options']['wcWash'][0]

	roomsCount = resultData['rooms']

	if (roomsCount == 1) {
		resultHRooms.innerText = 'одной комнатой';
	} else {
		resultHRooms.innerText = roomsCount + ' комнатами';
	}

	if (WCCount == 1) {
		resultHWC.innerText = 'одним санузлом';
	} else if (WCCount > 1) {
		resultHWC.innerHTML = WCCount + ' санузлами';
	}

	if (roomsCount == 1 || WCCount == 1) {
		resultHWith.innerText = ' c';
	}

	if (roomsCount >= 1 && WCCount >= 1) {
		resultHAnd.innerText = ' и';
	}

	if (WCCount < 1) {
		resultHWC.innerHTML = '';
		resultHAnd.innerText = '';
	}

	totalInputService.value = resultH.innerText;
}


function showTotalList(data, totalCost) {
	resultList.innerHTML = '';

	resultForm.innerHTML = '';

	curData = data['options'];

	for (key in curData) {

		if (curData[key][0]) {
			if (key == 'ecoMode') {
				itmCost = Math.ceil(totalCost * 0.3)
			} else {
				itmCost = curData[key][0]
			}

			resultList.innerHTML = resultList.innerHTML + '<div class="calc__resItm"><div class="calc__resItmName">' + curData[key][2] + '</div><div class="calc__resItmPrice"><span class="calc__resItmPriceDig">' + itmCost + '</span>тнг</div><div class="calc__resItmDelete" data="' + key + '"></div></div>';

			resultForm.innerHTML = resultForm.innerHTML + '<input type="hidden" name="' + curData[key][2] + '" value="' + (curData[key][0] / calcDataSource['options'][key][0]) + '"></input>';
		}
	}

	if (calcMtrs.value > 0) {
		console.log(calcMtrs.value);
		resultForm.innerHTML = resultForm.innerHTML + '<input type="hidden" name="Метраж" value="' + calcMtrs.value + '"></input>';
	}
}


// function showTotal(cost, hours, minutes) {
// 	totalCostBlock.innerText = cost;
// 	totalHoursBlock.innerText = hours;
// 	totalMinutesBlock.innerText = minutes;
// }


function showTotal(cost) {
	totalCostBlock.innerText = cost;
	totalInputSumm.value = cost;
}


function clearOptListItm(optList, itmId) {
	optList.forEach(function(item){
		itemName = item.getAttribute('data') || item.value

		if (itemName == itmId) {
			if (item.checked) {
				item.checked = false;
				item.closest('.calc__optionsItm').classList.remove('active');
			}

			if (Number(item.innerText) > 0) {
				item.innerText = 0;
				item.closest('.calc__optionsItm').classList.remove('active');
			}
		}

	})
}



/* ----------- event listeners ----------- */

try{

roomsBtnsWrp.addEventListener('click', function (event) {
	const target = event.target;
	if (target && target.classList.contains('calc__radioLbl')) {
		roomsValue = target.previousElementSibling.value;

		if (roomsValue == 'five') {
			fiveRoomsSqWrp.classList.add('active');

			resultData['baseResult'][0] = calcMtrs.value * calcDataSource[currentWorkType][roomsValue][0]

			resultData['baseResult'][1] = calcMtrs.value * calcDataSource[currentWorkType][roomsValue][1]

			resultData['rooms'] = '5+'
		} else {
			fiveRoomsSqWrp.classList.remove('active');

			calcMtrs.value = '';

			resultData['baseResult'][0] = calcDataSource[currentWorkType][roomsValue][0]

			resultData['baseResult'][1] = calcDataSource[currentWorkType][roomsValue][1]

			if (roomsValue == 'one') {
				resultData['rooms'] = 1;
			} else if (roomsValue == 'two') {
				resultData['rooms'] = 2;
			} else if (roomsValue == 'three') {
				resultData['rooms'] = 3;
			} else if (roomsValue == 'four') {
				resultData['rooms'] = 4;
			}
			
		}

		priceHourMin = calculateData(resultData)

		showTotal(priceHourMin[0])

		showTotalList(resultData, priceHourMin[0])

		showTotalHeadingFL()
	}
});



calcCarPrev.addEventListener('click', function (event) {
	event.preventDefault;
	currentWorkType = moveCarousel(-1, calcCarItms);

	checkedItm = 'one';
	roomsBtns.forEach(function(item){
		if (item.checked) {
			checkedItm = item.value;
		}
	})

	if (checkedItm == 'five') {
		fiveRoomsSqWrp.classList.add('active');

		resultData['baseResult'][0] = calcMtrs.value * calcDataSource[currentWorkType][checkedItm][0]

		resultData['baseResult'][1] = calcMtrs.value * calcDataSource[currentWorkType][checkedItm][1]
	} else {

	resultData['baseResult'][0] = calcDataSource[currentWorkType][checkedItm][0]

	resultData['baseResult'][1] = calcDataSource[currentWorkType][checkedItm][1]

	}

	priceHourMin = calculateData(resultData)
resultData['baseResult'][1]
	showTotal(priceHourMin[0])
	});



calcCarNext.addEventListener('click', function (event) {
	event.preventDefault;

	currentWorkType = moveCarousel(1, calcCarItms);
	
	checkedItm = 'one';
	roomsBtns.forEach(function(item){
		if (item.checked) {
			checkedItm = item.value;
		}
	})

	if (checkedItm == 'five') {
		fiveRoomsSqWrp.classList.add('active');

		resultData['baseResult'][0] = calcMtrs.value * calcDataSource[currentWorkType][checkedItm][0]

		resultData['baseResult'][1] = calcMtrs.value * calcDataSource[currentWorkType][checkedItm][1]
	} else {

	resultData['baseResult'][0] = calcDataSource[currentWorkType][checkedItm][0]

	resultData['baseResult'][1] = calcDataSource[currentWorkType][checkedItm][1]

	}

	priceHourMin = calculateData(resultData)

	showTotal(priceHourMin[0])

	});

calcMtrs.addEventListener('input', function(event) {

	if (typeof roomsValue != "undefined") {
		resultData['baseResult'][0] = calcMtrs.value * calcDataSource[currentWorkType][roomsValue][0]

		resultData['baseResult'][1] = calcMtrs.value * calcDataSource[currentWorkType][roomsValue][1]
	}

	priceHourMin = calculateData(resultData)

	showTotal(priceHourMin[0])

	showTotalList(resultData, priceHourMin[0])

});



calcOptionsWrp.addEventListener('click', function (event) {
	const target = event.target;

	if (target && target.classList.contains('calc__optionsItmAmountMinus')) {
		optionValue = Number(target.nextElementSibling.innerText);

		if (optionValue > 0) {
			target.nextElementSibling.innerText = optionValue - 1

			currentTarget = target.nextElementSibling.getAttribute('data')

			resultData['options'][currentTarget][0] = resultData['options'][currentTarget][0] - calcDataSource['options'][currentTarget][0]

			resultData['options'][currentTarget][1] = resultData['options'][currentTarget][1] - calcDataSource['options'][currentTarget][1]

			resultData['options'][currentTarget][2] = target.nextElementSibling.getAttribute('name')
		}

		if (optionValue == 1) {
			target.closest('.calc__optionsItm').classList.remove('active');
		}

	}


	if (target && target.classList.contains('calc__optionsItmAmountPlus')) {
		optionValue = Number(target.previousElementSibling.innerText);

		target.previousElementSibling.innerText = optionValue + 1

		currentTarget = target.previousElementSibling.getAttribute('data')

		resultData['options'][currentTarget][0] = resultData['options'][currentTarget][0] + calcDataSource['options'][currentTarget][0]

		resultData['options'][currentTarget][1] = resultData['options'][currentTarget][1] + calcDataSource['options'][currentTarget][1]

		resultData['options'][currentTarget][2] = target.previousElementSibling.getAttribute('name')

		target.closest('.calc__optionsItm').classList.add('active');

	}

	priceHourMin = calculateData(resultData)

	showTotalList(resultData, priceHourMin[0])

	showTotal(priceHourMin[0])

	showTotalHeadingFL()

});


calcOptionsWrp.addEventListener('change', function (event) {
	const target = event.target;
	
	if (target && target.classList.contains('calc__optionsYesNo_eco')) {
		if (target.checked) {
			resultData['options']['ecoMode'][0] = calcDataSource['options']['ecoMode'][0]
			resultData['options']['ecoMode'][1] = calcDataSource['options']['ecoMode'][1]
			resultData['options']['ecoMode'][2] = target.name

			target.closest('.calc__optionsItm').classList.add('active');
		} else {
			resultData['options']['ecoMode'][0] = 0
			resultData['options']['ecoMode'][1] = 0
			resultData['options']['ecoMode'][2] = ''

			target.closest('.calc__optionsItm').classList.remove('active');
		}
	} else if (target && target.classList.contains('calc__optionsYesNo_reg')) {
		if (target.checked) {
			resultData['options'][target.value][0] += calcDataSource['options'][target.value][0]
			resultData['options'][target.value][1] += calcDataSource['options'][target.value][1]
			resultData['options'][target.value][2] = target.name
			
			target.closest('.calc__optionsItm').classList.add('active');
		} else {
			resultData['options'][target.value][0] = 0
			resultData['options'][target.value][1] = 0
			resultData['options'][target.value][2] = ''

			target.closest('.calc__optionsItm').classList.remove('active');
		}
	}

	priceHourMin = calculateData(resultData)

	showTotalList(resultData, priceHourMin[0])

	showTotal(priceHourMin[0])

});


resultList.addEventListener('click', function (event) {
	const target = event.target;

	if (target && target.classList.contains('calc__resItmDelete')) {

		currentTarget = target.getAttribute('data')

		resultData['options'][currentTarget][0] = 0

		priceHourMin = calculateData(resultData)

		showTotalList(resultData, priceHourMin[0])

		showTotal(priceHourMin[0])

		clearOptListItm(calcOptionsList, currentTarget)

		showTotalHeadingFL()

	}

});



/* ----------- set default results ----------- */

resultData['rooms'] = 1

resultData['baseResult'][0] = calcDataSource['roomsSup']['one'][0]

resultData['baseResult'][1] = calcDataSource['roomsSup']['one'][1]


/* ----------- show default results ----------- */


showTotalHeadingFL()


priceHourMin = calculateData(resultData)

showTotalList(resultData, priceHourMin[0])

showTotal(priceHourMin[0])

totalInputPage.value = calcContainer.dataset.pagename;

} 
catch(e) {
	console.log(e)
}
try {

	var main = new Splide( '.videoTilesCar__carCont', {
  // type   : 'loop',
	rewind: true,
  perPage: 3,
	// autoplay: true,
	interval: 2000,
	pauseOnHover: true,
	perMove: 1,
	speed: 1000,
	pagination: false,
	gap: 29,
	trimSpace: true,
	classes: {
		arrows: 'splide__arrows videoTilesCar__arrows',
		arrow : 'splide__arrow videoTilesCar__arrow',
		prev  : 'splide__arrow--prev videoTilesCar__arrow videoTilesCar__arrow_prev',
		next  : 'splide__arrow--next videoTilesCar__arrow videoTilesCar__arrow_next',
	},
	breakpoints : {
		1366: {
			gap: 24,
		},
		1024: {
			gap: 15,
			fixedWidth: 260,
			arrows: false,
			perPage: 1,
		},
	},
} );


main.mount();

} catch (err) {
}


if (window.matchMedia("(max-width: 768px)").matches) {

try {

	const revTiles = document.querySelectorAll('.videoTilesCar__itm'),
	revTilesOpenLinks = document.querySelectorAll('.videoTilesCar__itmMore'),
	revTilesOpenLink = document.querySelector('.videoTilesCar__itmMore');

	for (let itm = 0; itm < revTiles.length; itm++) {
		let itmHeight = revTiles[itm].clientHeight;

		if (itmHeight > 289) {


			revTilesOpenLinks[itm].classList.add('active');
			revTiles[itm].classList.add('hide');


			revTilesOpenLinks[itm].addEventListener('click', (event) => {
				event.preventDefault();
				revTiles[itm].classList.toggle("show");
				revTilesOpenLinks[itm].classList.toggle('show');
			})


		}
	}

} catch (err) {
}

}

try {
	const allReviews = document.querySelectorAll('.videoTilesCar__itm_allPage');
	const moreRevBtnWrp = document.querySelector('.videoTilesCar__bottomLnkWrp');
	const moreRevBtn = document.querySelector('.moreRev');

	revShowStep = 6;

	function showMoreRev(step) {
		let i = 0;

		for (let reviewNum in allReviews) {
			let allActiveReviews = document.querySelectorAll('.videoTilesCar__itm_allPage.active');

			if (allActiveReviews.length == allReviews.length) {
				break;
			}

			console.log(allReviews[reviewNum].classList.contains('active'))
			if (allReviews[reviewNum].classList.contains('active')) {
				continue;
			}		

			allReviews[reviewNum].classList.add('active');

			i++;


			if (i == step) {
				break;
			}
		};
	}


	function updateURL(paramNum) {
		if (history.pushState) {
				let baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
				let newUrl = baseUrl + '?page=' + paramNum;
				history.pushState(null, null, newUrl);
		}
		else {
				console.warn('History API не поддерживается');
		}
	}

	// let params = (new URL(document.location)).searchParams; 
	// console.log(params.get("page"));

	showMoreRev(revShowStep)

	moreRevBtn.addEventListener('click', function(event) {
		event.preventDefault();

		showMoreRev(revShowStep)

		let allActiveReviews = document.querySelectorAll('.videoTilesCar__itm_allPage.active');

		updateURL(Math.ceil(allActiveReviews.length / revShowStep))

		if (allActiveReviews.length == allReviews.length) {
			moreRevBtnWrp.classList.add('hide')
		}

	})
	


} catch (err) {
}