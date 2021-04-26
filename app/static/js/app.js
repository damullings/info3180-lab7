/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">  
            <router-link class="nav-link" to="/form">Upload<span class="sr-only">(current)</span></router-link>

            </li>
        </ul>
      </div>
    </nav>
    `,
});

const uploadForm = {
    name: 'UploadForm',
    template: `
    <h2> Upload Form</h2>

    <div v-if="isSuccess" class="alert alert-success">
        File Upload Successful
    </div>
    
    <ul v-if="!isSuccess && errors.length > 0" class="alert alert-danger">
        <li v-for="i in errors"> {{ i.error_message }}</li>
    </ul>

    

    <form id="uploadForm" @submit.prevent="uploadPhoto" method = "POST" enctype = 'multipart/form-data'> 
   
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control" name="description"> </textarea>
            </div>
            <div class="form-group">
                <label for="photo">Photo Upload</label>
                <br>
                <input type="file" name="photo">
            </div>
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Submit</button>
    </form>
    
    `,
    methods: {
        uploadPhoto(){
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                    if(jsonResponse.errors != null){
                        self.isSuccess = false;
                        self.errors = jsonResponse.errors;
                        console.log("error  detected");
                        console.log(self.errors);

                    }else if(jsonResponse.message != null){
                        self.isSuccess = true;
                        self.errors = [];
                        console.log("error not detected");
                    }
                console.log(jsonResponse);
                })
                .catch(function (error) {
                console.log(error);
                });
            
        }
    },
    data() {
        return {
            isSuccess: false,
            errors: []
        }
    }
};



app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/form", component: uploadForm },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');