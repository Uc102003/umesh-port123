/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*==================== CONTACT FORM SUBMISSION ====================*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = form.querySelector('input[placeholder="Name"]').value.trim();
        const email = form.querySelector('input[placeholder="Email"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        try {
            const response = await fetch('https://umesh-port123-back.onrender.com//contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending the message.');
        }
    });
});

/*==================== EMAILJS CONTACT FORM ====================*/
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace this with your actual public key
})();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function(response) {
            alert('✅ Message sent successfully!');
            form.reset();
        }, function(error) {
            console.error('❌ EmailJS error:', error);
            alert('❌ Failed to send message. Please try again.');
        });
    });
});

