const body=document.querySelector('body')

/*******************************************
*
*
*		H E A D E R
*
*
***********************************************/
// si hace click en el logo del header 
header_logo.addEventListener('click', e =>{
	window.location.href='./' // redirecciona panel
})

const activePage=window.location.href
const links= document.querySelectorAll('.header-nav-ul li a')
// console.log(activePage)

// REMARCAR SECCION
links.forEach(item=>{
	if (item.href == activePage) {
		// obtiene el nombre de la  seccion 
		const sec = item.pathname.split('/')
		const subSecciones = []

		subSecciones.forEach( sub =>{
			// si esta en en una sub seccion
			if (sec[sec.length -1 ]== sub) {
				item.offsetParent.offsetParent.firstElementChild.style.fontWeight='bold'
			}	
		})

		item.style.fontWeight='bold'
	}
})

// console.log(window.innerWidth)
const btn_submenu = document.querySelectorAll('#btn_submenu')

if (btn_submenu) {
	btn_submenu.forEach( item => {
		// SUBMENU
		item.addEventListener('click', e=>{
			let alto='0'
			let rot='0'
			let m='0'
			if (item.nextElementSibling.clientHeight=='0'){
				alto=item.nextElementSibling.scrollHeight;
				rot='90'
				m='10'
			}
			item.lastElementChild.style.transform=`rotate(${rot}deg)`
			item.nextElementSibling.style.height=`${alto}px`
			if (window.innerWidth<700) {
				item.style.marginBottom=`${m}px`
			}
			
		})

		// Si hace click fuera del elmento
		document.addEventListener('mouseup', e=>{
			// si hace click fuera del elemento alerta_user
			if (!item.nextElementSibling.contains(e.target)) {
				let alto='0'
				let rot='0'
				let m='0'
				item.lastElementChild.style.transform=`rotate(${rot}deg)`
				item.nextElementSibling.style.height=`${alto}px`
			}
		})
	})
}

// MENU DESPLEGABLE
btn_menu_open.addEventListener('click', e=>{
	header_nav.style.width= `100vw`;
	body.classList.add('block-scroll')
})

btn_menu_close.addEventListener('click', e=>{
	header_nav.style.width= `0vw`;
	setTimeout(() => {
		header_nav.style="none"  
		body.classList.remove('block-scroll')
	}, 500);
})

// si hace click en el documento
document.addEventListener('mouseup', e => {
    // console.log(window.innerWidth)
    // si hace click fuera del menu desplegable
    if (window.innerWidth < 700) {
    	if (header_nav.clientWidth != "0") {
	    	if (!header_nav_ul.contains(e.target)) {
		    	header_nav.style.width= `0`;
				setTimeout(() => {
					header_nav.style.width="auto"  
				}, 600);
				body.classList.remove('block-scroll')
		    }	
    	}
    }
});