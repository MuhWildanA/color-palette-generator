const generateBtn = document.querySelector('.generate-btn')
const paletteContainer = document.querySelector('.palette-container')
const colorBoxes = document.querySelectorAll('.color-box')

generateBtn.addEventListener('click', generatePalette)

paletteContainer.addEventListener('click',(e) => {
    if(e.target.classList.contains('copy-btn')){
        const hexValue = e.target.previousElementSibling.textContent
        navigator.clipboard.writeText(hexValue)
        .then(() =>{
            showCopySuccesed(e.target,hexValue)
        })
        .catch(err => {console.log(err)})
    }else if(e.target.classList.contains('color')){
        const hexValue = e.target.nextElementSibling.querySelector('.hex-value').textContent
        navigator.clipboard.writeText(hexValue)
        .then(() =>{
            showCopySuccesed(e.target.nextElementSibling.querySelector('.copy-btn'),hexValue)
        })
    }else if(e.target.classList.contains('hex-value')){
        const hexValue = e.target.textContent
        navigator.clipboard.writeText(hexValue)
        .then(() => {
            showCopySuccesed(e.target.nextElementSibling,hexValue)
        })
    }
})

function showCopySuccesed(btn,hexValue){
    btn.classList.remove('fa-copy')
    btn.classList.add('fa-check')
    btn.style.color = hexValue
    btn.previousElementSibling.textContent = 'copied!'
    setTimeout(()=>{
        btn.classList.remove('fa-check')
        btn.classList.add('fa-copy')
        btn.style.color = ''
        btn.previousElementSibling.textContent = hexValue
    },1000)
    
}

function generatePalette() {
    const colors = []

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor())
    }

    updatePaletteDisplay(colors)
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }

    return color
}

function updatePaletteDisplay(colors) {
    colorBoxes.forEach((box,i) => {
        const colorBox = box.querySelector('.color') 
        const hexValue = box.querySelector('.hex-value')

        colorBox.style.backgroundColor = colors[i]
        hexValue.textContent = colors[i]
    })
}
