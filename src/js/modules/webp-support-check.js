export const isWebp = () => {
	const testWebP = (callback) => {
		let webP = new Image()
		webP.onload = webP.onerror = function () {
			callback(webP.height === 2)
		}
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	}

	const setBodyClass = (support) => {
		const body = document.querySelector('body')
		if (body) {
			body.classList.add(support ? 'webp' : 'no-webp')
		} else {
			console.error('Body tag not found')
		}
	}

	testWebP(setBodyClass)
}
