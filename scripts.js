function showLightbox(id) {
    document.getElementById(id).classList.add('show');
}

function hideLightbox(id) {
    document.getElementById(id).classList.remove('show');
}

const text = "Ryan's Portfolio🐄🐄";

function typeWriter() {
    let index = 0; // Move index inside the function to prevent conflict
    function typeNextChar() {
        if (index < text.length) {
            document.querySelector('h1').textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, 100); // 控制打字速度
        }
    }

    typeNextChar();
}

// 等页面加载完毕后开始打字
window.onload = function () {
    document.querySelector('h1').textContent = ''; // 清除初始内容
    typeWriter();
};

// Close lightbox on outside click
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('lightbox')) {
        hideLightbox(event.target.id);
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox.show');
        if (lightbox) {
            hideLightbox(lightbox.id);
        }
    }
});

// Add this to scripts.js
function filterGallery(category) {
    const items = document.getElementsByClassName('gallery-item');

    for (let i = 0; i < items.length; i++) {
        if (category === 'all') {
            items[i].style.display = 'block'; // 显示所有项目
        } else {
            if (items[i].classList.contains(category)) {
                items[i].style.display = 'block'; // 显示匹配分类的项目
            } else {
                items[i].style.display = 'none'; // 隐藏不匹配的项目
            }
        }
    }
}