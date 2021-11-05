new Vue ({
    el: "#app",
    data: {
        todos: [],
        users: [],
        user_id: null,
        title: null,
        description:null,
        status:null,
        updateId: null,
        isHidden: false
    },
    methods: {
        getInfor(){
            let base_url = "http://127.0.0.1:3000/api/books/";
            axios.get(base_url).then((res)=>{
                console.log(res.data.data);
                this.todos = res.data.data;
            })
        },

        // Create TODO
        createBook(){
            let base_url = "http://127.0.0.1:3000/api/books/";
            let data = {
                user_id:parseInt(this.user_id), 
                title:this.title,
                description:this.description, 
                status:this.status
            };
            axios.post(base_url, data).then((res)=>{
                this.getInfor();  
            }).catch(()=>{
                console.log("Error 404 not found!")
            });
            this.user_id = "";
            this.title = "";
            this.description = "";
            this.status = "";
        },
        
        // Delete TODO
        deleteTodo(todos) {
            let id = todos.id;
            let url = "http://127.0.0.1:3000/api/books/";
            axios.delete(url + id).then(response => {
                this.todos = response.data.data;
                console.log("Deleted")
            });
        },

        //Edit TODO
        editTodo(todos) {
            this.user_id = todos.user_id;
            this.title = todos.title;
            this.description = todos.description;
            if ( todos.status){
                this.status = 1
            }
            this.updateId = todos.id;
            this.isHidden = true
        },
        // Update TODO
        updateBook(){
            let url = "http://127.0.0.1:3000/api/books//";
            let data = {
                user_id: parseInt(this.user_id),
                title: this.title,
                description: this.description,
                status: parseInt(this.status)
            }
            axios.put(url + parseInt(this.updateId), data).then(()=>{
                window.location.reload();
            })
            this.isHidden = false
        }
    },
    mounted() {
        this.getInfor();
    },
});