//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookMark);

function saveBookMark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
 
    if(!siteName || !siteUrl){
       alert('Please fill in the form');
       return false;
    }
    var bookmark = {
       name: siteName,
       url: siteUrl
    }
    /*
    //
    localStorage.setItem('test','Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
       // Init array 
       var bookmarks = [];
       // Add to array
       bookmarks.push(bookmark);
       //set to localStorage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else {
       // Get bookmarks from LocalStorage
       var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       // Add bookmark to array
       bookmarks.push(bookmark);
       //Re-set back to localStorage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //clear Form
    document.getElementById('myForm').reset();

    fetchBookmarks();
    //Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop throught bookmarks
    for(var i = 0; i< bookmarks.length;i++){
        if(bookmarks[i].url == url){
        //Remove from array
        bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//re-fetch bookmarks
fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
   //Get bookmarks from LocalStorage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Get output id
   var bookmarksResults = document.getElementById('bookmarksResults');
   //Build output
   bookmarksResults.innerHTML = "";
   for(var i =0; i < bookmarks.length; i++){
       var name = bookmarks[i].name;
       var url = bookmarks[i].url;

       bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+ name +
                                    '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                    '<a onclick="deletedBookmark(\''+url+'\')" class="btn btn-danger" href="'+url+'">Delete</a>'
                                    '</h3>'+
                                    '</div>';
   }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }