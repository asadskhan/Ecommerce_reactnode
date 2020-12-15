/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    //config.line_height="1em;1.1em;1.2em;1.3em;1.4em;1.5em";
    //config.line_height="1px;1.1px;1.2px;1.3px;1.4px;1.5px";

    config.toolbar = 'Full';

    config.toolbar_Full =
    [
    // {   name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', '-', 'Templates'] },
    {   name: 'document', items: ['Source', '-'] },
    // {   name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
    // {   name: 'clipboard', items: ['Undo', 'Redo'] },
    // {   name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
    // {   name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
    // 'HiddenField']},
    
    {   name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
    {   name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-',  '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']},
    {   name: 'links', items: ['Link', 'Unlink'] },
    {   name: 'insert', items: ['Image', 'HorizontalRule'] },
   /* '/',
    {   name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
    {   name: 'colors', items: ['TextColor', 'BGColor'] }*/
    // ,{ name: 'tools', items: ['Maximize', 'ShowBlocks', '-', 'About'] }
    ];

    config.contentCss = 'fonts.css';
    config.font_names = "'Roboto Mono', monospace;"  + config.font_names;
    config.allowedContent = true;
    // config.font_names = 'Roboto Mono/RobotoMono-Regular;' + config.font_names;
    // config.font_names = 'Roboto Mono Medium/RobotoMono-Medium;' + config.font_names;
    // config.font_names = 'Roboto Mono Bold/RobotoMono-Bold;' + config.font_names;


    config.extraPlugins = 'image2';
    config.extraPlugins = 'video';
    config.extraPlugins = 'filebrowser';
    config.extraPlugins = 'uploadimage';
    config.extraPlugins = 'lineheight';
    config.removePlugins = 'save';
    config.extraAllowedContent = '*(*);*{*}';
    config.filebrowserUploadUrl = window.location.origin+'/irespmi.com/assets/plugins/ckeditor/plugins/filebrowser/upload.php?command=QuickUpload&type=Images'; //Path of the Image upload file
    config.filebrowserBrowseUrl = window.location.origin+'/irespmi.com/assets/plugins/ckeditor/plugins/filebrowser/browse.php'; //Path of the Image upload file
     
    config.protectedSource.push( /<span[\s\S]*?\>/g ); //allows beginning <i> tag
    config.protectedSource.push( /<\/span[\s\S]*?\>/g ); //allows ending </i> tag
};
