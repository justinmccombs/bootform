# BootForm
## Create Bootstrap 3 Forms Programatically

### Usage

HTML

    <form id='bootform' class='form form-horizontal'>
    
    </form>

JS

    var $form = $("#bootform");
    
    bootform.text({
        field: 'first_name',
        label: 'First Name',
        placeholder: 'First Name'
    }).appendTo($form);
    
    bootform.textarea({
        field: 'about_me',
        label: 'About Me',
        placeholder: 'Write something descriptive here about yourself'
    }).appendTo($form);
    
    bootform.select({
        field: 'first_name',
        label: 'First Name',
        options: [
            {value: 0, text: 'This'},
            {value: 1, text: 'Is'},
            {value: 2, text: 'A'},
            {value: 3, text: 'Select Box'},
            {value: 4, text: 'Demo'},
        ],
        selectedValue: 3
    }).appendTo($form);
    
    // OR
    
    bootform.select({
        field: 'first_name',
        label: 'First Name',
        options: [
            [0, 'This'],
            [1, 'Is'],
            [2, 'A'],
            [3, 'Select Box'],
            [4, 'Demo']
        ],
        selectedValue: 3
    }).appendTo($form);
    