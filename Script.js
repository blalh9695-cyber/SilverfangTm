// تعريف أزرار القائمة
const homeBtn = document.getElementById('homeBtn');
const browseBtn = document.getElementById('browseBtn');
const addMangaBtn = document.getElementById('addMangaBtn');

// تعريف الصفحات
const homePage = document.getElementById('homePage');
const browsePage = document.getElementById('browsePage');
const addMangaPage = document.getElementById('addMangaPage');

// تعريف عناصر إضافة وعرض المانجا
const addMangaForm = document.getElementById('addMangaForm');
const mangaGrid = document.getElementById('mangaGrid');
const browseMangaGrid = document.getElementById('browseMangaGrid');

// 1. دالة التنقل بين الصفحات
function showPage(pageToShow, btnToActivate) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // إزالة التفعيل من جميع الأزرار
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // إظهار الصفحة المطلوبة وتفعيل الزر الخاص بها
    pageToShow.classList.add('active');
    btnToActivate.classList.add('active');
}

// أحداث الضغط على أزرار القائمة
homeBtn.addEventListener('click', () => showPage(homePage, homeBtn));
browseBtn.addEventListener('click', () => showPage(browsePage, browseBtn));
addMangaBtn.addEventListener('click', () => showPage(addMangaPage, addMangaBtn));

// --------------------------------------------------------

// 2. نظام إضافة وعرض المانجا

// جلب البيانات المحفوظة مسبقاً، أو إنشاء مصفوفة فارغة
let mangas = JSON.parse(localStorage.getItem('silverFangMangas')) || [];

// دالة عرض المانجا في الشبكة (Grid)
function displayMangas() {
    // تفريغ الشبكات قبل إضافة العناصر حتى لا تتكرر
    mangaGrid.innerHTML = '';
    browseMangaGrid.innerHTML = '';

    if (mangas.length === 0) {
        const emptyMessage = '<p style="text-align:center; width:100%; color:#aaa; grid-column: 1 / -1;">لا توجد مانجا مضافة حالياً.</p>';
        mangaGrid.innerHTML = emptyMessage;
        browseMangaGrid.innerHTML = emptyMessage;
        return;
    }

    mangas.forEach(manga => {
        const cardHTML = `
            <div class="manga-card" data-id="${manga.id}">
                <img src="${manga.cover}" alt="${manga.title}" class="manga-card-img" onerror="this.src='https://via.placeholder.com/200x250?text=No+Cover'">
                <div class="manga-card-content">
                    <div class="manga-card-title">${manga.title}</div>
                    <div class="manga-card-author">${manga.author}</div>
                    <div class="manga-card-genre">${manga.genre}</div>
                    <div class="manga-card-status">${manga.status}</div>
                </div>
            </div>
        `;
        // إضافة البطاقة للصفحة الرئيسية وصفحة التصفح
        mangaGrid.innerHTML += cardHTML;
        browseMangaGrid.innerHTML += cardHTML;
    });
}

// حدث تقديم نموذج إضافة مانجا
addMangaForm.addEventListener('submit', function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    // تجهيز كائن (Object) يحتوي على بيانات المانجا الجديدة
    const newManga = {
        id: Date.now(), // إنشاء رقم تعريفي فريد باستخدام الوقت
        title: document.getElementById('mangaTitle').value,
        author: document.getElementById('mangaAuthor').value,
        genre: document.getElementById('mangaGenre').value,
        description: document.getElementById('mangaDescription').value,
        cover: document.getElementById('mangaCover').value,
        status: document.getElementById('mangaStatus').value
    };

    // إضافة المانجا الجديدة للمصفوفة
    mangas.push(newManga);

    // تحديث قاعدة البيانات المحلية (LocalStorage)
    localStorage.setItem('silverFangMangas', JSON.stringify(mangas));

    // تفريغ الخانات وإظهار رسالة نجاح
    addMangaForm.reset();
    alert('تم إضافة المانجا بنجاح لـ Silver Fang!');

    // تحديث العرض والعودة للصفحة الرئيسية
    displayMangas();
    showPage(homePage, homeBtn);
});

// عرض المانجا عند تحميل الصفحة لأول مرة
displayMangas();
mangaGrid.
