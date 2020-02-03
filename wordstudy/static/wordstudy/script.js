// let navbar = document.querySelector('.my-navbar-nav');
// let toggler = document.querySelector('.my-navbar-toggler');

let showAlert = (message, theme, duration) => {
    if (document.querySelector('.message-box')){
        document.body.removeChild(document.querySelector('.message-box')); // this is to clear the container of the 
        // message per time and that is the body, before rendering another
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-${theme} text-white text-center message-box`;
        document.body.appendChild(div);
        document.documentElement.scrollTo(0,0);
        setTimeout(() => { div.remove(); }, duration);
    }else{
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-${theme} text-white text-center message-box`;
        document.body.appendChild(div);
        document.documentElement.scrollTo(0,0);
        setTimeout(() => { div.remove(); }, duration);
    }
    
    
}


document.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop >= 1200){
        if (document.querySelector('.scroll-top-btn')){
            document.body.removeChild(document.querySelector('.scroll-top-btn'));
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top-btn';
            scrollTopBtn.onclick = () => { document.documentElement.scrollTo(0,0) };
            btnIcon = document.createElement('i');
            btnIcon.className = 'fas fa-arrow-up';
            scrollTopBtn.appendChild(btnIcon);
            document.body.appendChild(scrollTopBtn);
        }else{
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top-btn';
            scrollTopBtn.onclick = () => { document.documentElement.scrollTo(0,0) };
            btnIcon = document.createElement('i');
            btnIcon.className = 'fas fa-arrow-up';
            scrollTopBtn.appendChild(btnIcon);
            document.body.appendChild(scrollTopBtn);
        }
    }else{
        if (document.querySelector('.scroll-top-btn'))
            document.body.removeChild(document.querySelector('.scroll-top-btn'));
    }
});

/* for my nav bar responsiveness */
// toggler.addEventListener('click', function(){
//     navbar.classList.toggle('reveal');

// });