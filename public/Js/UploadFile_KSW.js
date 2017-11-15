/**
 * Created by 순우 on 2017-11-14.
 */

/**
 * CUSTOM FILE INPUTS FOR IMAGES
 *
 * Version: 1.0.0
 *
 * Custom file inputs with image preview and
 * image file name on selection.
 */
$('input[type="file"]').each(function(){
    // Refs
    var $file = $(this),
        $label = $file.next('label'),
        $labelText = $label.find('span'),
        labelDefault = $labelText.text();

    // When a new file is selected
    $file.on('change', function(event){
        var fileName = $file.val().split( '\\' ).pop(),
            tmppath = URL.createObjectURL(event.target.files[0]);
        //Check successfully selection
        if( fileName ){
            $label
                .addClass('file-ok')
                .css('background-image', 'url(' + tmppath + ')');
            $labelText.text(fileName);
        }else{
            $label.removeClass('file-ok');
            $labelText.text(labelDefault);
        }
    });

// End loop of file input elements
});