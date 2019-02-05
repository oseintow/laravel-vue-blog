<template>
    <div>
        <h3>Medium Editor</h3>
        <!--<medium-editor custom-tag='div'-->
                       <!--:text="text"-->
                       <!--:options='options'-->
                       <!--v-on:edit='processEditOperation'-->
                       <!--&gt;-->
        <!--</medium-editor>-->
        <trumbowyg v-model="content" :config="config" class="form-control" name="content"></trumbowyg>
    </div>
</template>

<script>
    // var editor = new MediumEditor('.editable');
    //
    // var HighlightButton = VueMediumEditor.MediumEditor.Extension.extend({
    //     extensions: {
    //         'editor': editor
    //     }
    // });
    import FileDragging from 'vue2-medium-editor'

    export default {
        name: "NewBlog",
        data() {
            return {
                text: '',
                options: {
                    spellcheck: false,
                    toolbar: {buttons: ['bold', 'strikethrough', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']},
                    extensions: {},
                    fileDragging: true,
                    mediumInsert: {
                        enable: true
                    }
                },
                content: null,
                config: {
                    // Get options from
                    // https://alex-d.github.io/Trumbowyg/documentation
                }
            }
        },
        methods: {
            processEditOperation(operation) {
                this.text = operation.api.origElements.innerHTML
            }
        }
    }
</script>

<style scoped>
    .medium-editor-element {
        outline: none;
    }
    a,
    a:hover,
    section.splash h1 span,
    .medium-editor-toolbar li button,
    .color-1,
    .color-2 {
        color: #4fc08d
    }
    body,
    pre,
    .medium-editor-button-active b,
    code {
        color: #2c3e50;
    }
    .medium-editor-button-active.medium-editor-button-active.medium-editor-button-active {
        background-color: #4fc08d
    }
    pre,
    code {
        background: #f8f8f8;
        width: 80vw;
    }
    pre#cdn,
    code.data,
    pre#usage {
        max-width: 900px
    }
    code.data {
        margin-top: 50px
    }
    .medium-toolbar-arrow-over:before {
        border-color: transparent transparent #2c3e50 transparent;
    }
    .medium-editor-toolbar li button {
        border-right: 1px solid #2c3e50 ;
    }
    section.installation,
    .medium-editor-toolbar,
    .medium-editor-toolbar-anchor-preview,
    .github-fork-ribbon {
        background: #2c3e50
    }
    .medium-toolbar-arrow-under:after {
        border-color: #2c3e50 transparent transparent transparent;
    }
    #toolbar-placeholder {
        display: none;
    }
    .medium-editor-toolbar {
        transitin: none
    }
</style>