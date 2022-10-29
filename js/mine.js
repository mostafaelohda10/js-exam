let meals;
let mealDescription;
let Category;
let selectedCat;
let area;
let selector =true;
let areaInCharge;
let ingrdiants;
let selectedIngrediants;
let letterMeals;
let searchregex = /^[a-zA-Z]{1}$/;
let phoneRegex = /^(01)[0125]{1}[0-9]{8}$/;
let passRegex =/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
let ageRegex = /^[0-9]{1,2}$/;
async function getMeals (search="")
{
    let file = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    meals = await file.json();
    meals = meals.meals;
}
getMeals().then(function()
{
    homeFiller(meals , "home");
})
function homeFiller(arr ,sec)
{
    for(let i =0 ;i< arr.length ; i++)
    {
        $(`#${sec} .row`).append(
            ` 
                             
            <div class="col-lg-6 col-xl-3 mb-4">
                <div class="position-relative parent overflow-hidden">
                    <img src="${arr[i].strMealThumb}" alt="" class="img-fluid">
                    <div class="position-absolute overlay fs-4 d-flex align-items-center justify-content-center" ><p id="${arr[i].idMeal}">${arr[i].strMeal}</p></div>
                </div>  
            </div>
            `
            ); 
    }
    $(".overlay p").click(function(eInfo){
        getDescribtion($(eInfo.target).attr("id")).then(describeMeal)
    });
}
async function getDescribtion(mealId)
{
    let file = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    mealDescription = await file.json();
    mealDescription = mealDescription.meals;    
}
 function describeMeal()
{
    $("body").html(
        `
    <section id="deatils" class="bg-black py-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-xl-4">
                    <div class"text-lg-center">
                        <img src="${mealDescription[0].strMealThumb}" alt="" class="img-fluid mb-3 ">
                    </div>
                    <p class="text-center text-white fs-5">${mealDescription[0].strMeal}</p>
                </div>
                <div class="col-xl-8 text-white">
                    <div>
                        <h3>Instructions</h3>
                        <p>
                         ${mealDescription[0].strInstructions}   
                        </p>
                        <ul class="p-0">
                            <li class="d-flex align-items-center mb-2"><p class="fs-5">Area :</p> <p class="fs-6">${mealDescription[0].strArea}</p></li>
                            <li class="d-flex align-items-center mb-2"><p class="fs-5">Category :</p> <p class="fs-6">${mealDescription[0].strCategory}</p></li>
                        </ul>
                        <p class="fs-3">Recipes :</p>
                        <p class="h3 span-parent">
                            <span>${mealDescription[0].strIngredient1}</span>
                            <span>${mealDescription[0].strIngredient2}</span>
                            <span>${mealDescription[0].strIngredient3}</span>
                            <span>${mealDescription[0].strIngredient4}</span>
                            <span>${mealDescription[0].strIngredient5}</span>
                            <span>${mealDescription[0].strIngredient6}</span>
                            <span>${mealDescription[0].strIngredient7}</span>
                            <span>${mealDescription[0].strIngredient8}</span>
                            <span>${mealDescription[0].strIngredient9}</span>
                            <span>${mealDescription[0].strIngredient10}</span>
                            <span>${mealDescription[0].strIngredient11}</span>
                            <span>${mealDescription[0].strIngredient12}</span>
                            <span>${mealDescription[0].strIngredient13}</span>
                            <span>${mealDescription[0].strIngredient14}</span>
                            <span>${mealDescription[0].strIngredient15}</span>
                            <span>${mealDescription[0].strIngredient16}</span>
                            <span>${mealDescription[0].strIngredient17}</span>
                            <span>${mealDescription[0].strIngredient18}</span>
                            <span>${mealDescription[0].strIngredient19}</span>
                            <span>${mealDescription[0].strIngredient20}</span>
                        </p>
                        <p class="fs-3">Tags :</p>
                        <p class="fs-5">
                            <span style="background-color: #F8D7DA; padding : 10px;">${mealDescription[0].strTags}</span>
                        </p>
                        <div>
                            <a class="btn btn-success" href="${mealDescription[0].strSource}">Source</a>
                            <a class="btn btn-danger" href="${mealDescription[0].strYoutube}">YouTube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="index.html" class="text-white position-absolute top-0 start-50 translate-middle-x py-2"><i class="fa-solid fa-arrow-up-from-bracket fa-2x "></i></a>
    </section>
        
        `
    );
} 
async function getCategory ()
{
    let file = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    Category = await file.json();
    Category = Category.categories;
}
function fillCategory()
{
    $("section").hide();
    $("#category .row").empty();
    for(let i = 0 ; i<Category.length ; i++)
    {
        $("#category .row").append(
            `
            <div class="col-lg-6 col-xl-3 mb-4">
                 <div class="position-relative parent overflow-hidden">
                    <img src="${Category[i].strCategoryThumb}" alt="" class="img-fluid">
                    <div class="position-absolute overlay-cat " >
                        <p class="text-center fs-3" id="${Category[i].strCategory}">${Category[i].strCategory}</p>
                        <p class="text-center fs-6">${Category[i].strCategoryDescription}</p>
                    </div>
                 </div>  
            </div>
            `       
        );
    }
    $("#category").slideDown(1000);
    $(".overlay-cat p").click(function()
    {
        getSelectedCategry($(this).attr("id")).then(function()
        {
            $("#categorySelected .row").empty();
            homeFiller(selectedCat , "categorySelected");
            $("section").hide();
            $("#categorySelected").slideDown(1000);
            $("#categorySelected .fa-arrow-up-from-bracket").click(function()
            {
                $("#categorySelected").hide(1000 ,function(){$("#category").slideDown(1000);});
            });
        });

    });
}
async function getSelectedCategry(select)
{
    let file =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${select}`);
    selectedCat = await file.json();
    selectedCat = selectedCat.meals;
}
async function getArea()
{
    let file =  await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    area = await file.json();
    area = area.meals;
}
function fillArea()
{
    $("section").hide();
    $("#area").css({display : "block"});
    $("#area .row").empty();
    for (let i = 0; i < area.length; i++) {
        $("#area .row").append(
            `
            <div class="col-lg-6 col-xl-3 text-center">
                <i class="fa-solid fa-city fa-10x text-danger"></i>
                <p class="text-white fs-3" style="cursor : pointer;" id="${area[i].strArea}">${area[i].strArea}</p>
            </div>  
            `
        );
    }
    $("#area p" ).click(function(){
        getSelectedArea($(this).attr("id")).then(function(){
            $("#areaInCharge .row").empty();
            homeFiller(areaInCharge , "areaInCharge");
            $("section").hide();
            $("#areaInCharge").slideDown(1000); 
        })
    })
    $("#areaInCharge .fa-arrow-up-from-bracket").click(function()
    {
        $("#areaInCharge").hide(1000 ,function(){$("#area").slideDown(1000);});
    });
}
async function getSelectedArea(area)
{
    let file = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    areaInCharge = await file.json();
    areaInCharge = areaInCharge.meals;
}
async function getIngrediants (){
    let file = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    ingrdiants = await file.json();
    ingrdiants = ingrdiants.meals;
}
function fillIngrediants()
{
    $("section").hide();
    for (let i = 0; i < 25; i++) {

        $("#Ingrdients .row").append(
            `
            <div class="col-lg-6 col-xl-3">
                <div class="text-center ">
                    <i class="fa-solid fa-bowl-food fa-8x text-success "></i>
                    <p id="${ingrdiants[i].strIngredient}" class="text-white fs-3 iTarget" style="cursor : pointer;">${ingrdiants[i].strIngredient}</p>
                    <p  class=" text-white ">${(ingrdiants[i].strDescription).substring(0,(ingrdiants[i].strDescription).indexOf("."))}</p>
                </div>
            </div>
            
            `
        );             
    }
    $("#Ingrdients").slideDown();
    $("#Ingrdients .iTarget  ").click(function(){
        getSelectedIngrediants($(this).attr("id")).then(function()
        {
            $("#selectedIngrediants .row").empty();
            homeFiller(selectedIngrediants , "selectedIngrediants");
            $("section").hide();
            $("#selectedIngrediants").slideDown(1000);
        })
        $("#selectedIngrediants .fa-arrow-up-from-bracket").click(function()
        {
            $("#selectedIngrediants").hide(1000 ,function(){$("#Ingrdients").slideDown(1000);});
        });
    })
}
async function getSelectedIngrediants(ingrdiants)
{
    let file = await  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrdiants}`);
    selectedIngrediants = await file.json();
    selectedIngrediants = selectedIngrediants.meals;
}
async function searchByletter(letter)
{
    let file =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    letterMeals = await file.json();
    letterMeals = letterMeals.meals;
}
$("input").eq(0).keydown(function(){
    getMeals($(this).val());
    $("#search .row").empty();
    homeFiller(meals , "search");
});

$("input").eq(1).keydown(function(eInfo)
{  
    if(searchregex.test(eInfo.key)==true)
    {
        $(this).attr("readonly" , "readonly");
        $(this).val(eInfo.key);
        searchByletter($(this).val()).then(function(){
            $("#search .row").empty();
            homeFiller(letterMeals , "search");  
        });

    }
    else if (eInfo.key=="Backspace")
    {
        $(this).val("");
        $("#search .row").empty();
    }
});
$("#contentPhone").blur(function()
{

        if(phoneRegex.test($(this).val())==true)
        {
            $(this).siblings("i").css({display: "block"});
            $(this).siblings(".alert").css({display : "none"});
        }
        else
        {
            $(this).siblings(".alert").css({display : "block"});
            $(this).siblings("i").css({display: "none"});
        }
        if($(this).val()=="")
        {
            $(this).siblings(".alert").css({display : "none"});
            $(this).siblings("i").css({display: "none"});  
        }
});
$("#contentMail").blur(function(){
    if(($(this).val()).includes("@")==true && ($(this).val()).includes(".")==true)
    {
        $(this).siblings("i").css({display: "block"});
        $(this).siblings(".alert").css({display : "none"});
    }
    else
    {
        $(this).siblings(".alert").css({display : "block"});
        $(this).siblings("i").css({display: "none"});
    }
    if($(this).val()=="")
    {
        $(this).siblings(".alert").css({display : "none"});
        $(this).siblings("i").css({display: "none"});  
    }
});
$("#contentPassword").blur(function()
{

        if(passRegex.test($(this).val())==true)
        {
            $(this).siblings("i").css({display: "block"});
            $(this).siblings(".alert").css({display : "none"});
        }
        else
        {
            $(this).siblings(".alert").css({display : "block"});
            $(this).siblings("i").css({display: "none"});
        }
        if($(this).val()=="")
        {
            $(this).siblings(".alert").css({display : "none"});
            $(this).siblings("i").css({display: "none"});  
        }
});
$("#contentAge").blur(function()
{

        if(ageRegex.test($(this).val())==true)
        {
            $(this).siblings("i").css({display: "block"});
            $(this).siblings(".alert").css({display : "none"});
        }
        else
        {
            $(this).siblings(".alert").css({display : "block"});
            $(this).siblings("i").css({display: "none"});
        }
        if($(this).val()=="")
        {
            $(this).siblings(".alert").css({display : "none"});
            $(this).siblings("i").css({display: "none"});  
        }
});

$("#rePassword").blur(function()
{

        if($(this).val()==$("#contentPassword").val())
        {
            $(this).siblings("i").css({display: "block"});
            $(this).siblings(".alert").css({display : "none"});
        }
        else
        {
            $(this).siblings(".alert").css({display : "block"});
            $(this).siblings("i").css({display: "none"});
        }
        if($(this).val()=="")
        {
            $(this).siblings(".alert").css({display : "none"});
            $(this).siblings("i").css({display: "none"});  
        }
});
$(".switch").click(function()
{
    let navAnchors = Array.from($("#sideNav a"));
    if(selector==true)
    {
        $("#sideNav").css({ transform : "translateX(0px)"});
        $(".switch").html(`<i class=" fa-solid  fa-x fa-2x"></i>`);
        for(let i=0;i<navAnchors.length;i++)
        {
            $(navAnchors).eq(i).animate({top : `${$(navAnchors).eq(i).outerHeight()*i}px`},1000);
        }
        selector = false ;
    }
    else
    {
            $("#sideNav").css({ transform : "translateX(-78%)"});
            $(".switch").html(`<i class="fa-solid fa-bars fa-2x"></i>`);
            for(let i=0;i<navAnchors.length;i++)
            {
                $(navAnchors).eq(i).animate({top : `100%`},1000);
            } 
            selector = true;
    }
})
function submit()
{
    if($("contentName").val()!="" && phoneRegex.test($("#contentPhone").val())==true && ($("#contentMail").val()).includes("@")==true && ($("#contentMail").val()).includes(".")==true && passRegex.test($("#contentPassword").val())==true &&$("#rePassword").val()==$("#contentPassword").val()&&ageRegex.test($("#contentAge").val())==true)
    {
        $("#contact button").show();  
    } 
    else
    {
        $("#contact button").hide();  
    }
}
$("#contact").click(function(){
    submit();
})
$("#contact button").click(function(){
    $("#contact input").val("");
});
$("a").click(function()
{
    let secId = $(this).attr("href").substring(1);
    if(secId=="categories")
    {
        getCategory().then(fillCategory);
    }
    else if(secId=="area")
    {
        getArea().then(fillArea);
    }
    else if(secId=="Ingrdients")
    {
        getIngrediants().then(fillIngrediants);
    }
    else if(secId=="search")
    {
        $("section").hide();
        $("#search").slideDown();
    }
    else if (secId == "contact")
    {
        $("section").hide();
        $("#contact").slideDown(); 
    }    
});
