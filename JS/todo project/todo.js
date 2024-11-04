let mem_list = JSON.parse(localStorage.getItem('toDoList'));
let todo_list = mem_list;
let todo_list_HTML = '';
let html_text_input = '';
let html_date_input = '';
let text_input = '';
let date_input = '';
function list_HTML_updater (){
    document.querySelector('.todoList').innerHTML ="";
    todo_list.forEach(function (item,i){
        todo_list_HTML = `<p>
        <span class="items">${todo_list[i].name}</span>
        <span class="items_date">${todo_list[i].duedate}</span>
        <button class="delete_button" onclick="todo_list.splice(${i},1);list_HTML_updater ();"">Delete</button>
        </p>`;
        document.querySelector('.todoList').innerHTML +=todo_list_HTML;        
    });
    if (todo_list.length > 1){
        document.querySelector('.clear_all').innerHTML =`<button onclick="clear_list ();">Clear all</button>`;
    }else{
        document.querySelector('.clear_all').innerHTML =``;       
    };
    list_saver();
    document.querySelector('.input_1').addEventListener('keydown',(ev) => {
        if(ev.key === "Enter"){
            add_todo();
        };       
    });
};
function add_todo (){
    html_text_input = document.querySelector('.input_1');
    html_date_input = document.querySelector('.input_2');
    text_input = html_text_input.value;
    date_input = html_date_input.value;
    if(!text_input){return};
    todo_list.push({name:text_input,duedate:date_input});
    html_date_input.value ='';
    html_text_input.value ='';    
    list_HTML_updater ();  
};
function clear_list (){
    todo_list = [];
    list_HTML_updater ();
};
function list_saver (){
    localStorage.setItem('toDoList',JSON.stringify(todo_list));
    mem_list = JSON.parse(localStorage.getItem('toDoList'));
}
function testing (){
    console.log('teste complete');
};