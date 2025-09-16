    let bookmarksD = document.querySelector(".bookmarksLinks");
    let categoryButtonsTDiv = document.querySelector(".categoryD-buttonsT div");
    let categoryButtonsBDiv = document.querySelector(".categoryD-buttonsB div");
    let categoryText = document.querySelector(".categoryText");
    let categoryDButtonsBottom = document.querySelector(".categoryD-buttonsB");
    let btnShowAll = document.querySelector(".showAllBtn");

    localStorage.removeItem("set-category"); // مشان لما اعمل ريلود للصفحة مايتم اكتف ع زر يلي موجودين تحت

    btnShowAll.addEventListener("click",function() {
        dispalyBookmarks();
        document.querySelectorAll(".categoryD-buttonsB div span").forEach((btn)=> {btn.classList.remove("set");});
        localStorage.removeItem("set-category"); // وقت اكبس ع شو اولل يقيم الاكتف من عزرار كمان
    })



    function saveBokmark() {
        let title = document.querySelector(".title").value.trim();
        let url = document.querySelector(".url").value.trim();
        let categorie = document.querySelector(".categoryText").value.trim();
        // يعني عكس القيمة مافي قيمة
        if(!title || !url || !categorie) { // يعني ازا وحدة من القيم فاضية مارح يصير شي
            alert("Please Fill all Fildes")
            return;
        }


        let allBokmarks = JSON.parse(localStorage.getItem("bookmarks")) || {}

    if(!allBokmarks[categorie]) allBokmarks[categorie] = []; // في حال هاد القسم ما كان موجود جيبو وخلي يساوي مصفوفة  

        allBokmarks[categorie].push({title,url});  

        localStorage.setItem("bookmarks",JSON.stringify(allBokmarks));

        // مشان فضي الحقول وقت يكبس ع زر الاضافة
        document.querySelectorAll("input").forEach((inpo) => {inpo.value= ""});


        dispalyBookmarks();
        displayCategoreBtnsT();
        displayCategoreBtnsB();
    }


    function dispalyBookmarks() {
        bookmarksD.innerHTML = ""; // Empty the Container

        
        let allBokmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
        
        for(let cat in allBokmarks) {
                // console.log(cat); // لاتربيوت تبع الاوبجكت يلي هنن الاقسام
                let categoriesArrs = allBokmarks[cat]; // المصفوفات تبع الاقسام
                // console.log(categoriesArrs)
                categoriesArrs.forEach((bookmark, index) => {
                    // console.log(bookmark);
                    let bookmarkDcreat = document.createElement("div");
                    bookmarkDcreat.innerHTML = `
                    <div class="cat">${cat}</div>
                    <div class="link"><a href= "${bookmark.url}" target="_blank">${bookmark.title}</a></div>
                    <button onclick="deletBokmark('${cat}', ${index})">Delet</button>
                    `;
                    bookmarksD.appendChild(bookmarkDcreat); // كل مرة ضيف الديف الجديدة 
                });

        }
    }


    function filterBookmarksByCategory(cat) {
        
        let allBokmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
        let categoriesArrs = allBokmarks[cat];
        
        bookmarksD.innerHTML = ""; // Empty the Container
        
        categoriesArrs.forEach((bookmark, index) => {
            // console.log(bookmark);
            let bookmarkDcreat = document.createElement("div");
            bookmarkDcreat.innerHTML = `
            <span class="num">${index + 1}</span>
            <div class="link"><a href= "${bookmark.url}" target="_blank">${bookmark.title}</a></div>
            <button onclick="deletBokmark('${cat}', ${index})">Delet</button>
            `;
            bookmarksD.appendChild(bookmarkDcreat); // كل مرة ضيف الديف الجديدة 
                });
    }






    function displayCategoreBtnsT() {
        let allBokmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
        let categoriesArr = Object.keys(allBokmarks); // بجبلك الاتربيوتز تبع الاوبجتكتات يلي عندك بمصفوفة
        // console.log(allBokmarks);
        // console.log(categories)
        categoryButtonsTDiv.innerHTML = "";

        categoriesArr.forEach((catN)=> {
            let spancreat = document.createElement("span")
            spancreat.textContent = catN;
            spancreat.addEventListener("click",() => {categoryText.value = catN});
            categoryButtonsTDiv.appendChild(spancreat);
        })

    }



   function displayCategoreBtnsB() {
        let allBokmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
        let categoriesArr = Object.keys(allBokmarks); // بجبلك الاتربيوتز تبع الاوبجتكتات يلي عندك بمصفوفة
        // console.log(allBokmarks);
        // console.log(categories)
        categoryButtonsBDiv.innerHTML = "";

        categoriesArr.forEach((catN)=> {
            let spancreat = document.createElement("span");
            spancreat.textContent = catN;

            spancreat.addEventListener("click",(ev) => {
                // باختصار وقت عم اكبس ع اي سبان عم قلو عطيني الكاتن تبعو....
                // الفلترة عحسب الزر يلي انضغط عليه
                filterBookmarksByCategory(catN); // ✅ الجواب:
                //  catN هو اسم من كل الأقسام، لكن انت عم تستخدمه داخل حلقة (forEach)، يعني:
                // الكود عم يمر على كل قسم، واحد واحد، ويعمل لكل واحد زر، وكل زر مربوط بـ catN الخاص فيه.
                // خلاصة :: وقت المستخدم يكبس على زر من هل ازرار رح يجيب الكاتن لخاص فيه لانو الكاتن موزعة ع جميع الازرار

                // بدي ثبت الاكتيف مشان وقت اخزف تم فيه 
                // 🔚 خلاصة
                // استخدام localStorage هون:
                // لحفظ اسم القسم اللي كان مستخدمه نشط عليه (active).

                localStorage.setItem("active-category", catN)

                //  Remove Active class From All btns
                let categoryBtns = document.querySelectorAll(".categoryD-buttonsB div span");
                // console.log(categoryBtns);
                categoryBtns.forEach((btn)=> {btn.classList.remove("active");});
                //Add active Class to Clicked btn
                ev.target.classList.add("active");;  

            });

            let activeCategorie = localStorage.getItem("active-category"); // هي يعني فحاص ازا القسم يلي بل لوكل ستورج بساوي لقسم يلي دايس علي خليك حاطط علي اكتيف
                if(activeCategorie === catN) spancreat.classList.add("active")

            categoryButtonsBDiv.appendChild(spancreat);
        })

    }




    function deletBokmark(categorie, index) {
        let allBokmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
        allBokmarks[categorie].splice(index, 1);

        // If the category Empty Remove it
        if(allBokmarks[categorie].length === 0) delete allBokmarks[categorie]; // تستخدم ديليت لحزف مفاتيح من الاوبجت

        localStorage.setItem("bookmarks",JSON.stringify(allBokmarks));


// ✅ إذا القسم يلي عم نحذف منه لسا موجود
// ✅ والمستخدم حالياً عامل فلترة على قسم (يعني بدو يشوف بس هالقسم)
        if(allBokmarks[categorie] && localStorage.getItem("set-category")) { // يعني القسم موجود و المستخدم مختارو 
            filterBookmarksByCategory(categorie);
        } else {
            dispalyBookmarks(); // هون مشان تجديد البوكماركس عند الحزف
        }


        displayCategoreBtnsB(); // هون مشان تجديد البتنز يلي تحت عند الحزف
        displayCategoreBtnsT(); // هون مشان تجديد البتنز يلي فوق عند الحزف

    }






    // مشان يورجيني لمواقع
    dispalyBookmarks();

    // مشان يورجيني ازرار الاقسام تبع توب
    displayCategoreBtnsT();

    // مشان يورجيني ازرار الاقسام تبع البوتوم
    displayCategoreBtnsB();