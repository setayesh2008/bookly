const editProfileBtn = document.querySelector("#edit-profile-btn");
const editProfileForm = document.querySelector("#edit-profile-form");
const saveProfileBtn = document.querySelector("#save-profile-btn");

const profileName = document.querySelector(".profile-info h1");
const profileBio = document.querySelector(".profile-info p");

const nameInput = document.querySelector("#profile-name");
const bioInput = document.querySelector("#profile-bio");


// نمایش اطلاعات ذخیره‌شده هنگام باز شدن صفحه
const savedName = localStorage.getItem("profileName");
const savedBio = localStorage.getItem("profileBio");

if (savedName) {
    profileName.textContent = savedName;
}

if (savedBio) {
    profileBio.textContent = savedBio;
}


// باز کردن فرم ویرایش
if (editProfileBtn) {

    editProfileBtn.addEventListener("click", function () {

        editProfileForm.style.display = "block";

        nameInput.value = profileName.textContent;
        bioInput.value = profileBio.textContent;

    });

}


// ذخیره تغییرات
if (saveProfileBtn) {

    saveProfileBtn.addEventListener("click", function () {

        const newName = nameInput.value.trim();
        const newBio = bioInput.value.trim();

        if (newName !== "") {
            profileName.textContent = newName;
            localStorage.setItem("profileName", newName);
        }

        if (newBio !== "") {
            profileBio.textContent = newBio;
            localStorage.setItem("profileBio", newBio);
        }

        editProfileForm.style.display = "none";

    });

}

const favoriteSection = document.querySelector(".profile-books");

const favoriteCountElement =
    document.querySelector("#favorite-count");

const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

if (favoriteCountElement) {
    favoriteCountElement.textContent = favorites.length;
}

const books = {

    "شازده کوچولو": {
        image: "images/books/book1.jpg",
        author: "آنتوان دو سنت‌اگزوپری"
    },

    "بیگانه": {
        image: "images/books/book2.jpg",
        author: "آلبر کامو"
    },

    "جنایات و مکافات": {
        image: "images/books/book3.jpg",
        author: "فئودور داستایفسکی"
    },

    "صد سال تنهایی": {
        image: "images/books/book4.jpg",
        author: "گابریل گارسیا مارکز"
    },

    "انسان در جست‌وجوی معنا": {
        image: "images/books/book5.jpg",
        author: "ویکتور فرانکل"
    },

    "قلعه حیوانات": {
        image: "images/books/book6.jpg",
        author: "جورج اورول"
    }

};


if (favoriteSection) {

    favoriteSection.innerHTML = "";

    favorites.forEach(function (title) {

        if (books[title]) {

            const article =
                document.createElement("article");

            article.className = "profile-book";


            const img =
                document.createElement("img");

            img.src = books[title].image;
            img.alt = title;


            const h3 =
                document.createElement("h3");

            h3.textContent = title;


            const p =
                document.createElement("p");

            p.textContent = books[title].author;


            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            favoriteSection.appendChild(article);

        }

    });

}

if (favoriteSection) {

    favoriteSection.innerHTML = "";

    favorites.forEach(function (title) {

        if (books[title]) {

            favoriteSection.innerHTML += `
                <article class="profile-book">

                    <img
                        src="${books[title].image}"
                        alt="${title}"
                    >

                    <h3>${title}</h3>

                    <p>${books[title].author}</p>

                </article>
           ` ;
        }

    });

}
// تعداد نظرات ثبت‌شده
const commentCountElement =
    document.querySelector("#comment-count");

if (commentCountElement) {

    const allComments =
        JSON.parse(
            localStorage.getItem("bookComments")
        ) || {};

    let totalComments = 0;

    Object.values(allComments).forEach(function(comments) {

        totalComments += comments.length;

    });

    commentCountElement.textContent =
        totalComments;
}
// تعداد کتاب‌های خوانده‌شده
const readCountElement =
    document.querySelector("#read-count");

if (readCountElement) {

    const readBooks =
        JSON.parse(
            localStorage.getItem("readBooks")
        ) || [];

    readCountElement.textContent =
        readBooks.length;
}
const createProfileSection =
    document.querySelector("#create-profile-section");

const registerBtn =
    document.querySelector("#register-btn");

const registerName =
    document.querySelector("#register-name");

const registerEmail =
    document.querySelector("#register-email");

const registerPassword =
    document.querySelector("#register-password");




if (
    createProfileSection &&
    registerBtn &&
    registerName &&
    registerEmail &&
    registerPassword
) {

    registerBtn.addEventListener("click", function () {

        const name =
            registerName.value.trim();

        const email =
            registerEmail.value.trim();

        const password =
            registerPassword.value.trim();


        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {
            alert("لطفاً همه اطلاعات را وارد کنید.");
            return;
        }


        // ذخیره اطلاعات
        localStorage.setItem(
            "profileName",
            name
        );

        localStorage.setItem(
            "profileEmail",
            email
        );


        // نمایش نام در پروفایل
        if (profileName) {
            profileName.textContent = name;
        }


        // مخفی کردن فرم
        createProfileSection.style.display =
            "none";


        alert("پروفایل شما با موفقیت ایجاد شد.");

    });

}