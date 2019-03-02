import Quill from 'quill'
import moment from 'moment';

export default {
    data(){
        return {
            blog: {
                body: '',
                created_at: ''
            }
        }
    },
    computed: {
        ago() {
            return moment(this.blog.created_at).fromNow() + '...';
        },
        body() {
            const article = document.createElement('article')
            let quill = new Quill(article, {})

            quill.setContents(this.blog.body)
            const body = quill.getText()

            return body.length > 200 ? body.substring(0,200) + '...' : body
        }
    }
}