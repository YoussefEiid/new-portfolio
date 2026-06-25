document.addEventListener("DOMContentLoaded", () => {
    
    // 1. القائمة المتجاوبة للهواتف (Mobile Menu Toggle)
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            mobileMenuBtn.classList.toggle("open");
        });
    }

    // 2. تفعيل التلوين التلقائي للروابط عند التمرير (Active Link on Scroll)
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href").slice(1) === current) {
                item.classList.add("active");
            }
        });

        // 3. إظهار / إخفاء زر الصعود لأعلى
        const scrollTopBtn = document.getElementById("scrollTopBtn");
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        }
    });

    // تشغيل زر الصعود عند الضغط عليه
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 4. نظام فلترة المشاريع (Projects Interactive Filter)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // إزالة التفعيل عن البقية وإضافته للزر الحالي
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 10);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.8)";
                    setTimeout(() => { card.style.display = "none"; }, 300);
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // مصفوفة الكلمات التي تريدها أن تتغير بشكل مستمر
    const words = ["scalable, robust web architectures", "modern full-stack solutions", "fast, beautiful web applications"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const dynamicTextSpan = document.querySelector(".dynamic-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // طرح حرف عند المسح
            charIndex--;
        } else {
            // إضافة حرف عند الكتابة
            charIndex++;
        }

        // طباعة الجزء المقطوع من الكلمة داخل الـ Span
        dynamicTextSpan.textContent = currentWord.substring(0, charIndex);

        // تحديد السرعة: المسح يكون أسرع من الكتابة ليعطي انطباعاً أفضل
        let typeSpeed = isDeleting ? 50 : 100;

        // إذا اكتملت الكلمة تماماً
        if (!isDeleting && charIndex === currentWord.length) {
            // انتظر ثانيتين (2000 ملي ثانية) قبل أن تبدأ في المسح
            typeSpeed = 2000;
            isDeleting = true;
        } 
        // إذا تم مسح الكلمة تماماً
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // الانتقال للكلمة التالية في المصفوفة
            wordIndex = (wordIndex + 1) % words.length;
            // انتظر نصف ثانية قبل بدء كتابة الكلمة الجديدة
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // انطلاق التأثير فور تحميل الصفحة
    if (dynamicTextSpan) {
        typeEffect();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const speed = 15; // كلما قل الرقم زادت قوة الحركة (15 هو الرقم المثالي لحركة بسيطة ولطيفة)
    const tags = document.querySelectorAll(".skill-tag");

    tags.forEach(tag => {
        tag.addEventListener("mousemove", (e) => {
            const { offsetWidth: width, offsetHeight: height } = tag;
            const { offsetX: x, offsetY: y } = e;

            // حساب المسافة بين الماوس ومركز الكبسولة
            const xMove = ((x / width) - 0.5) * speed;
            const yMove = ((y / height) - 0.5) * speed;

            // تحريك الكبسولة في اتجاه الماوس مع ميلان خفيف (Tilt)
            tag.style.transform = `translate(${xMove}px, ${yMove}px) rotateX(${-yMove}deg) rotateY(${xMove}deg)`;
        });

        // إرجاع الكبسولة لمكانها الطبيعي بسلاسة عند خروج الماوس
        tag.addEventListener("mouseleave", () => {
            tag.style.transform = "translate(0px, 0px) rotateX(0deg) rotateY(0deg)";
            tag.style.transition = "transform 0.5s ease";
        });

        // إعادة تصفير الأنميشن السريع عند الدخول مجدداً
        tag.addEventListener("mouseenter", () => {
            tag.style.transition = "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        const siteUrl = card.getAttribute("data-site");
        const imgName = card.getAttribute("data-img");
        const imgContainer = card.querySelector(".screenshot-img");

        // تركيب الصورة المحلية تلقائياً إذا كانت موجودة في الـ HTML
        if (imgName && imgContainer) {
            imgContainer.style.backgroundImage = `url('${imgName}')`;
        }

        // فتح رابط المشروع في صفحة جديدة عند الضغط على الكارت
        card.addEventListener("click", () => {
            if (siteUrl) {
                window.open(siteUrl, "_blank");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const magneticItems = document.querySelectorAll(".magnetic-item");

    magneticItems.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            
            // حساب مركز الكارت الفعلي على الشاشة
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // حساب المسافة بين مؤشر الماوس والمركز
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // قوة السحب المغناطيسي (0.4 تعطي حركة واسعة وحرة جداً مع اتجاه الماوس)
            const magneticPull = 0.4; 

            const moveX = distanceX * magneticPull;
            const moveY = distanceY * magneticPull;

            // تطبيق الإزاحة والميلان الخفيف ليعطي حركة مرنة متكاملة
            item.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });

        // تأثير مطاطي رائع (Elastic Snap Back) عند خروج الماوس يعود الكارت لمكانه تدريجياً
        item.addEventListener("mouseleave", () => {
            item.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
            item.style.transform = "translate(0px, 0px) scale(1)";
        });

        // تصفير الأنميشن الانتقالي عند الدخول مجدداً للاستجابة اللحظية
        item.addEventListener("mouseenter", () => {
            item.style.transition = "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const skillTags = document.querySelectorAll(".magnetic-skill");

    skillTags.forEach(tag => {
        tag.addEventListener("mousemove", (e) => {
            const rect = tag.getBoundingClientRect();
            
            // حساب المركز الفعلي للكبسولة الصغيرة
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // حساب مسافة الماوس عن المركز
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // قوة السحب المغناطيسي الحر والواسع (0.4 ليعطي نفس الحركة الكبيرة الممتعة للـ Contact)
            const pullStrength = 0.4; 

            const moveX = distanceX * pullStrength;
            const moveY = distanceY * pullStrength;

            // تطبيق الحركة مع تكبير خفيف
            tag.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
        });

        // تأثير مطاطي مرن عند خروج الماوس يعود الكارت لمكانه الطبيعي
        tag.addEventListener("mouseleave", () => {
            tag.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
            tag.style.transform = "translate(0px, 0px) scale(1)";
        });

        // تصفير ترانزيشن الحركة اللحظية عند الدخول مجدداً
        tag.addEventListener("mouseenter", () => {
            tag.style.transition = "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // كود مراقبة العناصر أثناء الـ Scroll
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // إذا ظهر 15% من العنصر داخل الشاشة
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // إلغاء المراقبة للعنصر بعد ظهوره لكي لا يتكرر الأنميشن ويبقى ثابتاً
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // نسبة ظهور العنصر المطلوبة لبدء الحركة
    });

    // تشغيل المراقبة على كل العناصر التي تحمل كلاس reveal
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        // تم زيادة النسبة لضمان دخول القسم داخل الشاشة أولاً قبل بدء التحميل
        threshold: 0.30 
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
});