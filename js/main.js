
const app = Vue.createApp({
    data(){
        return {
            title: 'Aplicacion contador',
            count: 0
        }
    },
    methods: {
        modCount(instruction = 'add', limit =1){
            if (instruction === 'dis')
                this.count -= limit
            else
                this.count += limit
        }
    },
})

const mountApp = app.mount('#app')