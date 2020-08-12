function changeNav() {
    var header = document.getElementById('header');
    var headerClassLists = header.classList;
    if(headerClassLists.contains('header_open')){
        headerClassLists.remove('header_open');
    } else {
        headerClassLists.add('header_open');
    }
}
