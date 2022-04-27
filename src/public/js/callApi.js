function filter(e){
    const emlementsInput = $('input[type=checkbox]')
    let category= [];
    for( let element of emlementsInput){
        if (element.checked){
            category.push(element.value);
        }
    }
    console.log(category.join());
    $.get('/book/filter',{category :category},
    (data,status) =>{
        books = data.book
        for(var element of $('.filter-book')){
                element.style.display ='none'
               books.map(book => {
                   const category = book.category.toString()
                   const id = element.id
                //    console.log(id)
                //    console.log(category)
                // console.log(category===id)
                if(category===id){
                    element.style.display = 'block'
                }
            })
           }

    }
    )
}
$(document).ready(function(){
    $('.submit_rating').click(function(){
        const avgRating = $('#rating')[0].value
        const id= $('.rating_slug')[0].id
        $.post(`/book/${id}`,{
            avgRating: avgRating,
            slug: id
        },(book)=>{
            $('.rating')[0].innerHTML = `Rating: ${book.avgRating}/10`
        })
    })
})