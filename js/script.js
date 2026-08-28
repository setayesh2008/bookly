
// RATING STARS
// =========================

const stars = document.querySelectorAll(".rating-stars button");
const ratingMessage = document.querySelector("#rating-message");

stars.forEach(function (star) {

    star.addEventListener("click", function () {

        const rating = Number(this.dataset.rating);

        stars.forEach(function (item, index) {

            if (index < rating) {
                item.style.color = "#b38336";
            } else {
                item.style.color = "#ccc";
            }

        });

        if (ratingMessage) {
            ratingMessage.textContent =
                "امتیاز شما: " + rating + " از ۵ ⭐";
        }

    });

});
// =========================
// FAVORITE BUTTON - BOOK DETAILS
// =========================

const favoriteBtn = document.querySelector("#favorite-btn");

if (favoriteBtn) {

    // اسم کتاب فعلی
    const currentBook = document.querySelector("h1");

    if (currentBook) {

        const bookTitle = currentBook.textContent.trim();

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];


        // بررسی می‌کنیم قبلاً به علاقه‌مندی اضافه شده یا نه
        if (favorites.includes(bookTitle)) {

            favoriteBtn.classList.add("active");

            favoriteBtn.textContent =
                "به علاقه‌مندی‌ها افزوده شد ❤️";

        }


        // کلیک روی دکمه
        favoriteBtn.addEventListener("click", function () {

            let favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];


            if (favorites.includes(bookTitle)) {

                // حذف از علاقه‌مندی
                favorites = favorites.filter(function (title) {
                    return title !== bookTitle;
                });

                favoriteBtn.classList.remove("active");

                favoriteBtn.textContent =
                    "♡ افزودن به علاقه‌مندی‌ها";


            } else {

                // اضافه کردن به علاقه‌مندی
                favorites.push(bookTitle);

                favoriteBtn.classList.add("active");

                favoriteBtn.textContent =
                    "به علاقه‌مندی‌ها افزوده شد ❤️";

            }


            // ذخیره وضعیت جدید
            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

        });

    }

}
// =========================
// COMMENTS - BOOK CARDS
// =========================
const commentSections =
    document.querySelectorAll(".comments-section");


commentSections.forEach(function(section) {

    const commentInput =
        section.querySelector("#comment-input");

    const commentBtn =
        section.querySelector("#comment-btn");

    const commentList =
        section.querySelector("#comment-list");

    const bookCard =
        section.closest(".book-card");


    if (
        !commentInput ||
        !commentBtn ||
        !commentList ||
        !bookCard
    ) {
        return;
    }


    // پیدا کردن نام کتاب
    const titleElement =
        bookCard.querySelector("h3");
        if (!titleElement) {
        return;
    }


    const bookTitle =
        titleElement.textContent.trim();


    // گرفتن کامنت‌های ذخیره‌شده
    let allComments =
        JSON.parse(
            localStorage.getItem("bookComments")
        ) || {};


    // نمایش کامنت‌های قبلی
    function showComments() {

        commentList.innerHTML = "";

        const comments =
            allComments[bookTitle] || [];


        comments.forEach(function(text, index) {

            const comment =
                document.createElement("div");

            comment.className = "comment";


            const paragraph =
                document.createElement("p");

            paragraph.textContent = text;


            const deleteBtn =
            document.createElement("button");

            deleteBtn.type = "button";
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "حذف";


            deleteBtn.addEventListener(
                "click",
                function() {

                    comments.splice(index, 1);

                    allComments[bookTitle] =
                        comments;


                    localStorage.setItem(
                        "bookComments",
                        JSON.stringify(allComments)
                    );


                    showComments();

                }
            );


            comment.appendChild(paragraph);
            comment.appendChild(deleteBtn);

            commentList.appendChild(comment);

        });

    }


    // نمایش کامنت‌های قبلی هنگام ورود
    showComments();


    // ثبت کامنت جدید
    commentBtn.addEventListener(
        "click",
        function() {

            const text =
                commentInput.value.trim();


            if (text === "") {

                alert(
                    "لطفاً نظر خود را بنویسید."
                );

                return;
            }


            if (!allComments[bookTitle]) {
                allComments[bookTitle] = [];
            }


            allComments[bookTitle].push(text);


            localStorage.setItem(
                "bookComments",
                JSON.stringify(allComments)
            );


            commentInput.value = "";


            showComments();

        }
    );

});
// =========================
// SEARCH & CATEGORY FILTER
// =========================

const searchInput =
    document.getElementById("book-search");

const searchButton =
    document.querySelector(".search-box button");

const bookCards =
    document.querySelectorAll(".book-card");

const categoryButtons =
    document.querySelectorAll(".category");


function filterBooks() {

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value.trim();

    const activeCategoryButton =
        document.querySelector(".category.active");

    const activeCategory =
        activeCategoryButton
            ? activeCategoryButton.dataset.category
            : "همه";

    bookCards.forEach(function (card) {

        const titleElement =
            card.querySelector("h3");

        const authorElement =
            card.querySelector("p");

        const title =
            titleElement
                ? titleElement.textContent
                : "";

        const author =
            authorElement
                ? authorElement.textContent
                : "";

        const category =
            card.dataset.category;

        const matchesSearch =
            searchText === "" ||
            title.includes(searchText) ||
            author.includes(searchText);

        const matchesCategory =
            activeCategory === "همه" ||
            category === activeCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}
if (searchButton && searchInput) {

    searchButton.addEventListener(
        "click",
        filterBooks
    );

    searchInput.addEventListener(
        "keyup",
        function (event) {

            if (event.key === "Enter") {
                filterBooks();
            }

        }
    );

}


categoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            filterBooks();

        }
    );

});
// =========================
// FAVORITE BUTTONS - BOOK CARDS
// =========================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(function (button) {

    const bookCard =
        button.closest(".book-card");

    if (!bookCard) {
        return;
    }

    const titleElement =
        bookCard.querySelector("h3");

    if (!titleElement) {
        return;
    }
    const bookTitle =
        titleElement.textContent.trim();

    let favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];


    if (favorites.includes(bookTitle)) {

        button.classList.add("active");
        button.textContent = "♥";

    }


    button.addEventListener(
        "click",
        function () {

            let favorites =
                JSON.parse(
                    localStorage.getItem("favorites")
                ) || [];


            if (favorites.includes(bookTitle)) {

                favorites =
                    favorites.filter(function (title) {
                        return title !== bookTitle;
                    });

                button.classList.remove("active");
                button.textContent = "♡";

            } else {

                favorites.push(bookTitle);

                button.classList.add("active");
                button.textContent = "♥";

            }


            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

        }
    );

});
// =========================
// COMMENTS - BOOK DETAILS
// =========================
const detailCommentInput =
    document.querySelector("#comment-input");

const detailCommentSubmit =
    document.querySelector("#comment-submit");

const detailCommentList =
    document.querySelector(".comment-list");


if (
    detailCommentInput &&
    detailCommentSubmit &&
    detailCommentList
) {

    // پیدا کردن اسم کتاب از h1
const titleElement =
    document.querySelector("h1");

const bookTitle =
    titleElement
        ? titleElement.textContent.trim()
        : "";


    // دریافت کامنت‌های ذخیره‌شده
    let allComments =
        JSON.parse(
            localStorage.getItem("bookComments")
        ) || {};


    // نمایش کامنت‌های ذخیره‌شده
    function showComments() {

        const savedComments =
            allComments[bookTitle] || [];


        savedComments.forEach(function(text) {

            const commentElement =
                document.createElement("div");

            commentElement.className = "comment";


            const textElement =
                document.createElement("span");

            textElement.textContent = text;


            const deleteButton =
                document.createElement("button");

            deleteButton.className = "delete-btn";
            deleteButton.textContent = "حذف";
            deleteButton.type = "button";


            deleteButton.addEventListener(
                "click",
                function() {

                    const index =
                        allComments[bookTitle].indexOf(text);
                        if (index !== -1) {
                        allComments[bookTitle].splice(index, 1);
                    }


                    localStorage.setItem(
                        "bookComments",
                        JSON.stringify(allComments)
                    );


                    commentElement.remove();

                }
            );


            commentElement.appendChild(textElement);
            commentElement.appendChild(deleteButton);

            detailCommentList.appendChild(
                commentElement
            );

        });

    }


    // نمایش کامنت‌های قبلی
    showComments();


    // ثبت نظر جدید
    detailCommentSubmit.addEventListener(
        "click",
        function() {

            const text =
                detailCommentInput.value.trim();


            if (text === "") {

                alert(
                    "لطفاً ابتدا نظر خود را بنویسید."
                );

                return;
            }


            if (!allComments[bookTitle]) {
                allComments[bookTitle] = [];
            }


            allComments[bookTitle].push(text);


            localStorage.setItem(
                "bookComments",
                JSON.stringify(allComments)
            );
            // نمایش نظر جدید
            const commentElement =
                document.createElement("div");

            commentElement.className = "comment";


            const textElement =
                document.createElement("span");

            textElement.textContent = text;


            const deleteButton =
                document.createElement("button");

            deleteButton.className = "delete-btn";
            deleteButton.textContent = "حذف";
            deleteButton.type = "button";


            deleteButton.addEventListener(
                "click",
                function() {

                    const index =
                        allComments[bookTitle].indexOf(text);

                    if (index !== -1) {
                        allComments[bookTitle].splice(index, 1);
                    }


                    localStorage.setItem(
                        "bookComments",
                        JSON.stringify(allComments)
                    );


                    commentElement.remove();

                }
            );


            commentElement.appendChild(textElement);
            commentElement.appendChild(deleteButton);

            detailCommentList.appendChild(
                commentElement
            );


            detailCommentInput.value = "";

        }
    );

}
// =========================
// COMMUNITY - DISCUSSIONS
// =========================

const discussionInput =
    document.querySelector("#discussion-input");

const discussionBtn =
    document.querySelector("#discussion-btn");

const discussionList =
    document.querySelector("#discussion-list");


if (
    discussionInput &&
    discussionBtn &&
    discussionList
) {

    let discussions =
        JSON.parse(
            localStorage.getItem("discussions")
        ) || [];


    function showDiscussions() {

        discussionList.innerHTML = "";
        discussions.forEach(
            function (text, index) {

                const comment =
                    document.createElement("div");

                comment.className = "comment";


                const content =
                    document.createElement("p");

                content.textContent = text;


                const deleteButton =
                    document.createElement("button");

                deleteButton.className = "delete-btn";
                deleteButton.textContent = "حذف";
                deleteButton.type = "button";


                deleteButton.addEventListener(
                    "click",
                    function () {

                        discussions.splice(index, 1);


                        localStorage.setItem(
                            "discussions",
                            JSON.stringify(discussions)
                        );
                        showDiscussions();

                    }
                );


                comment.appendChild(content);
                comment.appendChild(deleteButton);

                discussionList.appendChild(comment);

            }
        );

    }


    showDiscussions();


    discussionBtn.addEventListener(
        "click",
        function () {

            const text =
                discussionInput.value.trim();


            if (text === "") {
                alert(
                    "لطفاً ابتدا دیدگاه خود را بنویسید."
                );
                return;
            }
            discussions.push(text);


            localStorage.setItem(
                "discussions",
                JSON.stringify(discussions)
            );


            discussionInput.value = "";

            showDiscussions();

        }
    );

}
// =========================
// COMMUNITY - INTRODUCE BOOK
// =========================

const bookNameInput =
    document.querySelector("#book-name-input");

const bookIntroInput =
    document.querySelector("#book-intro-input");

const bookIntroBtn =
    document.querySelector("#book-intro-btn");

const bookIntroList =
    document.querySelector("#book-intro-list");


if (
    bookNameInput &&
    bookIntroInput &&
    bookIntroBtn &&
    bookIntroList
) {

    let introducedBooks =
        JSON.parse(
            localStorage.getItem("introducedBooks")
        ) || [];


    function showIntroducedBooks() {

        bookIntroList.innerHTML = "";


        introducedBooks.forEach(
            function (book, index) {

                const post =
                    document.createElement("div");

                post.className = "community-post";
                const title =
                    document.createElement("strong");

                title.textContent = book.name;


                const intro =
                    document.createElement("p");

                intro.textContent = book.intro;


                const deleteButton =
                    document.createElement("button");

                deleteButton.className = "delete-btn";
                deleteButton.textContent = "حذف";
                deleteButton.type = "button";


                deleteButton.addEventListener(
                    "click",
                    function () {

                        introducedBooks.splice(
                            index,
                            1
                        );


                        localStorage.setItem(
                            "introducedBooks",
                            JSON.stringify(introducedBooks)
                        );


                        showIntroducedBooks();

                    }
                );
                post.appendChild(title);
                post.appendChild(intro);
                post.appendChild(deleteButton);

                bookIntroList.appendChild(post);

            }
        );

    }


    showIntroducedBooks();


    bookIntroBtn.addEventListener(
        "click",
        function () {

            const name =
                bookNameInput.value.trim();

            const intro =
                bookIntroInput.value.trim();


            if (name === "" || intro === "") {

                alert(
                    "لطفاً نام کتاب و معرفی آن را وارد کنید."
                );

                return;
            }


            introducedBooks.push({
                name: name,
                intro: intro
            });
            localStorage.setItem(
                "introducedBooks",
                JSON.stringify(introducedBooks)
            );


            bookNameInput.value = "";
            bookIntroInput.value = "";

            showIntroducedBooks();

        }
    );

}
const commentsections = document.querySelectorAll(".comment-section");

commentSections.forEach(function(section) {

    const commentInput = section.querySelector("#comment-input");
    const commentBtn = section.querySelector("#comment-btn");
    const commentList = section.querySelector("#comment-list");

    commentBtn.addEventListener("click", function() {

        const text = commentInput.value.trim();

        if (text === "") {
            alert("لطفاً نظر خود را بنویسید.");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment";

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "حذف";

        deleteBtn.addEventListener("click", function() {
            comment.remove();
        });

        comment.appendChild(paragraph);
        comment.appendChild(deleteBtn);

        commentList.appendChild(comment);

        commentInput.value = "";

    });

});
const readBtn =
    document.querySelector("#read-btn");

if (readBtn) {

    // اسم کتاب از h1 صفحه
    const titleElement =
        document.querySelector("h1");

    const bookTitle =
        titleElement
            ? titleElement.textContent.trim()
            : "";


    // کتاب‌های خوانده‌شده
    let readBooks =
        JSON.parse(
            localStorage.getItem("readBooks")
        ) || [];


    // بررسی وضعیت قبلی
    if (readBooks.includes(bookTitle)) {

        readBtn.classList.add("active");

        readBtn.textContent =
            "✓ این کتاب خوانده شده است";

    }


    // کلیک روی دکمه
    readBtn.addEventListener(
        "click",
        function () {

            if (readBooks.includes(bookTitle)) {

                // برداشتن از کتاب‌های خوانده‌شده
                readBooks =
                    readBooks.filter(function(title) {
                        return title !== bookTitle;
                    });

                readBtn.classList.remove("active");

                readBtn.textContent =
                    "✓ این کتاب را خوانده‌ام";

            } else {

                // اضافه کردن کتاب
                readBooks.push(bookTitle);

                readBtn.classList.add("active");

                readBtn.textContent =
                    "✓ این کتاب خوانده شده است";
            }


            // ذخیره
            localStorage.setItem(
                "readBooks",
                JSON.stringify(readBooks)
            );

        }
    );

}

